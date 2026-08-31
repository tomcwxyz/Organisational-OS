import { chmodSync, existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";

function parseArgs(argv) {
  const values = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg.startsWith("--")) throw new Error(`Unexpected argument: ${arg}`);
    const key = arg.slice(2);
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) throw new Error(`${arg} requires a value`);
    values[key] = value;
    index += 1;
  }
  return values;
}

function executable(name) {
  return process.platform === "win32" ? `${name}.cmd` : name;
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd,
    encoding: "utf8",
    env: process.env,
    shell: false,
    maxBuffer: 10 * 1024 * 1024,
  });

  if (result.status !== 0) {
    const detail = [
      `Command failed: ${command} ${args.join(" ")}`,
      result.stdout?.trim(),
      result.stderr?.trim(),
    ]
      .filter(Boolean)
      .join("\n\n");
    throw new Error(detail);
  }

  return result.stdout;
}

function json(command, args, options) {
  const output = run(command, args, options).trim();
  try {
    return JSON.parse(output);
  } catch {
    throw new Error(`Expected JSON from ${command}, received:\n${output}`);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function buildTopo(topo) {
  const npm = executable("npm");
  for (const workspace of [
    "@topo/schemas",
    "@topo/core",
    "@topo/store",
    "@topo/store-node",
    "@topo/formats",
    "@topo/oos",
    "@topo/cli",
  ]) {
    run(npm, ["run", "build", "--workspace", workspace], { cwd: topo });
  }
}

function buildRack(rack) {
  run(executable("pnpm"), ["--filter", "@rack/cli...", "build"], { cwd: rack });
}

function createTopoWrapper(directory, topoCli) {
  if (process.platform === "win32") {
    const wrapper = path.join(directory, "topo-alpha.cmd");
    writeFileSync(
      wrapper,
      `@echo off\r\n"${process.execPath}" "${topoCli}" %*\r\n`,
      "utf8",
    );
    return wrapper;
  }

  const wrapper = path.join(directory, "topo-alpha");
  const escapedNode = process.execPath.replaceAll('"', '\\"');
  const escapedCli = topoCli.replaceAll('"', '\\"');
  writeFileSync(
    wrapper,
    `#!/bin/sh\nexec "${escapedNode}" "${escapedCli}" "$@"\n`,
    "utf8",
  );
  chmodSync(wrapper, 0o755);
  return wrapper;
}

const args = parseArgs(process.argv.slice(2));
const topo = path.resolve(args.topo ?? "");
const rack = path.resolve(args.rack ?? "");

if (!existsSync(path.join(topo, "apps", "cli", "package.json"))) {
  throw new Error(`TOPO repo not found at ${topo}`);
}
if (!existsSync(path.join(rack, "packages", "cli", "package.json"))) {
  throw new Error(`RACK repo not found at ${rack}`);
}

console.log("Building the local interoperability surfaces…");
buildTopo(topo);
buildRack(rack);

const directory = mkdtempSync(path.join(tmpdir(), "oos-local-alpha-"));
const store = path.join(directory, "topo.sqlite");
const topoCli = path.join(topo, "apps", "cli", "dist", "index.js");
const rackCli = path.join(rack, "packages", "cli", "dist", "index.js");
const fixture = path.join(rack, "test-fixtures", "coding-basic");

try {
  console.log("Creating disposable TOPO memory…");
  const ordinary = json(
    process.execPath,
    [
      topoCli,
      "--store",
      store,
      "--json",
      "claim",
      "add",
      "writing.locale",
      "en-GB",
      "--subject",
      "project:rack",
      "--type",
      "preference",
      "--sensitivity",
      "ordinary",
    ],
  );

  const restricted = json(
    process.execPath,
    [
      topoCli,
      "--store",
      store,
      "--json",
      "claim",
      "add",
      "internal.secret",
      "must-not-cross-default-boundary",
      "--subject",
      "project:rack",
      "--type",
      "assertion",
      "--sensitivity",
      "restricted",
    ],
  );

  assert(ordinary.status === "confirmed", "Ordinary test memory was not confirmed.");
  assert(restricted.status === "confirmed", "Restricted test memory was not confirmed.");

  console.log("Checking TOPO purpose-bound context selection…");
  const packet = json(process.execPath, [
    topoCli,
    "--store",
    store,
    "oos",
    "context",
    "--subject",
    "project:rack",
    "--purpose",
    "prepare implementation",
    "--requester",
    "rack",
  ]);

  const packetIds = packet.objects.map((item) => item.id);
  assert(packetIds.includes(ordinary.id), "Context Packet omitted the ordinary claim.");
  assert(!packetIds.includes(restricted.id), "Context Packet disclosed restricted memory by default.");
  assert(packet.provenance?.created_by?.id === "topo", "Context Packet did not preserve TOPO provider provenance.");

  const topoCommand = createTopoWrapper(directory, topoCli);

  console.log("Checking RACK context consumption…");
  const snapshot = json(process.execPath, [
    rackCli,
    "context",
    "topo",
    "--subject",
    "project:rack",
    "--purpose",
    "prepare implementation",
    "--topo-store",
    store,
    "--topo-command",
    topoCommand,
  ]);

  assert(snapshot.sourceId === "topo", "RACK did not identify TOPO as the context provider.");
  assert(snapshot.objects.some((item) => item.id === ordinary.id), "RACK did not receive the ordinary claim.");
  assert(!snapshot.objects.some((item) => item.id === restricted.id), "RACK received restricted memory unexpectedly.");

  console.log("Comparing baseline and context-aware RACK builds…");
  const baseline = json(process.execPath, [
    rackCli,
    "build",
    fixture,
    "--profile",
    "coding",
    "--target",
    "prompt",
    "--json",
  ]);

  const contextual = json(process.execPath, [
    rackCli,
    "build",
    fixture,
    "--profile",
    "coding",
    "--target",
    "prompt",
    "--context-subject",
    "project:rack",
    "--context-purpose",
    "prepare implementation",
    "--topo-store",
    store,
    "--topo-command",
    topoCommand,
    "--json",
  ]);

  assert(baseline.built === true && contextual.built === true, "One of the RACK builds was blocked.");
  assert(
    baseline.manifest.source.digest === contextual.manifest.source.digest,
    "Transient context changed the canonical RACK source digest.",
  );
  assert(contextual.manifest.context?.source === "topo", "Build manifest did not record TOPO context provenance.");
  assert(contextual.manifest.context?.packet_id, "Build manifest omitted the Context Packet ID.");
  assert(
    contextual.manifest.context?.object_ids?.includes(ordinary.id),
    "Build manifest did not record the ordinary context object.",
  );
  assert(
    !contextual.manifest.context?.object_ids?.includes(restricted.id),
    "Build manifest recorded restricted memory that should not have crossed the boundary.",
  );

  const baselinePrompt = baseline.artifacts?.[0]?.content ?? "";
  const contextualPrompt = contextual.artifacts?.[0]?.content ?? "";
  assert(!baselinePrompt.includes("# Organisational context"), "Baseline build unexpectedly contained organisational context.");
  assert(contextualPrompt.includes("# Organisational context"), "Context-aware build did not render organisational context.");
  assert(contextualPrompt.includes("en-GB"), "Context-aware build did not include the ordinary memory value.");
  assert(
    !contextualPrompt.includes("must-not-cross-default-boundary"),
    "Restricted memory leaked into generated RACK output.",
  );
  assert(
    contextualPrompt.includes("does not override Rack instructions or boundaries"),
    "Generated output omitted the context/practice authority boundary.",
  );

  console.log("\n✓ Local Organisational OS alpha smoke passed.");
  console.log("  TOPO selected purpose-bound context.");
  console.log("  Restricted memory stayed local by default.");
  console.log("  RACK used context without changing canonical source.");
  console.log("  Build provenance records the Context Packet.");
} finally {
  rmSync(directory, { recursive: true, force: true });
}
