# Local alpha interoperability smoke

This smoke test is the first executable acceptance test for the Organisational OS local integration.

It deliberately uses real current TOPO and RACK implementations rather than protocol-only fixtures.

## What it proves

The test:

1. creates a disposable TOPO SQLite store;
2. adds one ordinary and one restricted confirmed memory claim;
3. asks TOPO for purpose-bound context;
4. verifies restricted memory is excluded by default;
5. passes the Context Packet through RACK's OOS ContextSource;
6. builds the same RACK once without context and once with TOPO context;
7. verifies the canonical RACK source digest is identical;
8. verifies generated output contains the permitted context;
9. verifies restricted memory does not appear in generated output;
10. verifies the build manifest records the context provider, packet, digest, purpose and object IDs.

This tests the central local-alpha claim:

> TOPO can provide governed organisational context to RACK without becoming RACK practice, and RACK can use that context without taking ownership of TOPO memory.

## Run locally

Have sibling/local checkouts of TOPO and RACK with dependencies installable, then run:

~~~sh
node scripts/smoke-local-alpha.mjs --topo ../TOPO --rack ../rack
~~~

The script builds only the packages needed for the test and uses a disposable temporary TOPO store. It does not modify your normal `~/.topo/topo.sqlite`.

## CI

`.github/workflows/local-alpha-smoke.yml` checks out current public `main` for TOPO and RACK and runs the same smoke.

This is intentionally a cross-repository acceptance test. Product-level tests still live with each product.

## Not proved yet

This smoke does **not** prove:

- installed desktop-to-desktop discovery or IPC;
- cloud/local relay delivery;
- FlowLance event ingestion;
- managed TOPO sync;
- team permissions;
- third-party OOS compatibility.

Those should only be layered on after the local semantics are useful in practice.
