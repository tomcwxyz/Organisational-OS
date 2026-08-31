# Roadmap

This roadmap is evidence-driven. Each stage exists to test an architectural claim.

## 0.1 — Language

**Goal:** make the conceptual model executable enough to disagree with.

- core ontology definitions;
- JSON Schemas for initial shared objects;
- event envelope and vocabulary;
- provenance model;
- node capability manifest;
- Context Packet;
- examples and fixtures.

**Exit test:** two implementations can independently create valid compatible objects/events.

## 0.2 — Compatibility

**Goal:** prove existing products can adopt the language without rewriting their internal models.

- TypeScript protocol package;
- schema validation;
- conformance fixtures;
- FlowLance Actor/Action adapter;
- TOPO Context Packet adapter;
- RACK ContextSource/OOS packet adapter;
- CI test kit.

**Exit test:** FlowLance exports valid OOS objects, TOPO produces a valid purpose-bound Context Packet, and RACK can validate/normalise that packet without any product changing its native domain model.

## 0.3 — Local interoperability

**Status:** working alpha; automated semantic proof is green, hands-on desktop pairing remains part of alpha testing.

**Goal:** prove memory and practice can cooperate locally without merging products.

- TOPO Context Packet query;
- RACK node manifest;
- RACK ↔ TOPO local context exchange;
- controlled ContextSnapshot use in a RACK execution/build path;
- authenticated TOPO desktop discovery/context endpoint;
- opt-in RACK desktop context preview and build use;
- content-stable context provenance/digest;
- Practice granularity study rather than premature one-to-one mapping.

**Exit test:** RACK requests purpose-bound organisational context from TOPO during practice execution, records what context influenced the execution, and does not turn that context into canonical practice.

See [RFC 0003](../rfcs/0003-practice-granularity.md).

## 0.4 — External state and memory

**Goal:** prove authoritative external operational state can participate in organisational context without becoming canonical memory by accident.

- linked external-object/event ledger in TOPO or reference implementation;
- FlowLance fixture ingestion;
- freshness/supersession;
- explicit promotion-to-memory policy;
- provenance-preserving links.

**Exit test:** a FlowLance Action is available to TOPO/RACK context while remaining outside TOPO canonical Claims until explicitly promoted.

## 0.5 — Federation

**Goal:** cross a real cloud/local trust boundary.

- minimal relay;
- local Bridge;
- durable inbox/outbox;
- offline catch-up;
- capability discovery;
- cursors and replay.

**Exit test:** FlowLance emits an event while the local device is offline; TOPO receives it after reconnecting into the external-state layer without silently changing canonical memory.

## 0.6 — Trust

**Goal:** make cross-node access explicit and inspectable.

- identity reconciliation;
- scopes;
- permission decisions;
- action requests;
- agent identity;
- audit;
- context expiry/redaction.

**Exit test:** a node provides useful context while withholding restricted evidence, and an unauthorised action request fails safely.

## 0.7 — First organisational loop

Connect Attention, FlowLance, TOPO and RACK.

Demonstrate signal/context → attention assessment → commitment/action → linked state/memory → practice/context → outcome/history.

## 0.8 — TOPO shared memory

Test TOPO Sync, private/shared/published memory, managed TOPO and a self-hosted path.

## 0.9 — RACK shared practice

Test RACK Sync, shared practices, versioning, team governance and evaluation summaries.

## 0.10 — Other lenses

Bring in Swells, Tending, Glade and Drift through the protocol rather than bespoke point-to-point integration.

## 1.0 — Third-party proof

A non-Good-Ship tool participates meaningfully in the protocol.

This is a release criterion, not a nice-to-have.
