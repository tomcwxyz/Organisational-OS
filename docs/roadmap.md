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
- FlowLance adapter;
- TOPO ingest adapter;
- CI test kit.

**Exit test:** FlowLance emits a valid event and TOPO ingests it from a fixture with no direct database dependency.

## 0.3 — Local interoperability

**Goal:** prove memory and practice can cooperate locally without merging products.

- TOPO Context Packet query;
- RACK node manifest;
- RACK Practice mapping;
- RACK ↔ TOPO local context exchange.

**Exit test:** RACK requests purpose-bound organisational context from TOPO during practice execution.

## 0.4 — Federation

**Goal:** cross a real cloud/local trust boundary.

- minimal relay;
- local Bridge;
- durable inbox/outbox;
- offline catch-up;
- capability discovery;
- cursors and replay.

**Exit test:** FlowLance emits an event while the local device is offline; TOPO receives it after reconnecting.

## 0.5 — Trust

**Goal:** make cross-node access explicit and inspectable.

- identity reconciliation;
- scopes;
- permission decisions;
- action requests;
- agent identity;
- audit;
- context expiry/redaction.

**Exit test:** a node provides useful context while withholding restricted evidence, and an unauthorised action request fails safely.

## 0.6 — First organisational loop

Connect Attention, FlowLance, TOPO and RACK.

Demonstrate signal/context → attention assessment → commitment/action → memory → practice/context → outcome/history.

## 0.7 — TOPO shared memory

Test TOPO Sync, private/shared/published memory, managed TOPO and a self-hosted path.

## 0.8 — RACK shared practice

Test RACK Sync, shared practices, versioning, team governance and evaluation summaries.

## 0.9 — Other lenses

Bring in Swells, Tending, Glade and Drift through the protocol rather than bespoke point-to-point integration.

## 1.0 — Third-party proof

A non-Good-Ship tool participates meaningfully in the protocol.

This is a release criterion, not a nice-to-have.
