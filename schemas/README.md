# JSON Schemas

These schemas make the v0.1 conceptual model concrete enough to test interoperability.

## Initial integration subset

The first set intentionally prioritises the FlowLance → TOPO → RACK proving path:

- provenance;
- actor;
- relationship;
- commitment;
- action;
- decision;
- practice;
- event envelope;
- Context Packet;
- node capability manifest.

The remaining ontology concepts — Observation, Signal, Evidence, Intention, Assumption, Outcome and Change — are defined conceptually but should only receive stable schemas as real integrations need them.

## Compatibility

Schemas use JSON Schema 2020-12.

The draft currently uses strict core fields plus an extensions object for implementation-specific additions. This is itself an architectural choice to test: it may prove too rigid during early interoperability work.

## Conformance

Run:

~~~sh
npm install
npm test
~~~

The current tests compile every schema and validate the example fixtures.

This is the beginning of the conformance kit, not a full protocol test suite.
