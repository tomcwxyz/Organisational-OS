import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const root = process.cwd();
const schemaDir = path.join(root, "schemas");
const exampleDir = path.join(root, "examples");

const ajv = new Ajv2020({
  allErrors: true,
  strict: true,
  validateFormats: true,
});
addFormats(ajv);

const schemaFiles = fs
  .readdirSync(schemaDir)
  .filter((name) => name.endsWith(".schema.json"))
  .sort();

for (const file of schemaFiles) {
  const schema = JSON.parse(
    fs.readFileSync(path.join(schemaDir, file), "utf8"),
  );
  ajv.addSchema(schema, file);
}

for (const file of schemaFiles) {
  const validate = ajv.getSchema(file);
  if (!validate) {
    throw new Error(`Schema did not compile: ${file}`);
  }
}

const fixtures = [
  ["actor.json", "actor.schema.json"],
  ["commitment.json", "commitment.schema.json"],
  ["event.commitment-created.json", "event.schema.json"],
  ["context-packet.json", "context-packet.schema.json"],
  ["capability-manifest.rack.json", "capability-manifest.schema.json"],
  ["flowlance.actor-client.json", "actor.schema.json"],
  ["flowlance.action-task.json", "action.schema.json"],
  ["capability-manifest.flowlance.json", "capability-manifest.schema.json"],
];

let failed = false;

for (const [exampleFile, schemaFile] of fixtures) {
  const value = JSON.parse(
    fs.readFileSync(path.join(exampleDir, exampleFile), "utf8"),
  );
  const validate = ajv.getSchema(schemaFile);

  if (!validate(value)) {
    failed = true;
    console.error(`✗ ${exampleFile} does not match ${schemaFile}`);
    console.error(ajv.errorsText(validate.errors, { separator: "\n  " }));
  } else {
    console.log(`✓ ${exampleFile}`);
  }
}

if (failed) {
  process.exit(1);
}

console.log(`\nValidated ${schemaFiles.length} schemas and ${fixtures.length} fixtures.`);
