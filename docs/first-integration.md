# First integration plan

## Why start with our own tools?

The protocol is meant to work beyond Good Ship products, but our own tools give us a controlled proving ground across genuinely different deployment models.

We should use them to find flaws in the protocol before asking anybody else to implement it.

## Target topology

~~~text
             FLOWLANCE
                cloud
                  │
             event relay
                  │
               Bridge
                  │
              ┌───┴───┐
              │       │
            TOPO     RACK
            local    local
~~~

Attention joins after the basic interoperability works.

## Phase A — FlowLance compatibility

Do not replace FlowLance's internal domain model.

Add an OOS adapter around existing state.

Initial mappings to test:

- FlowLance user → Actor/person;
- contact → Actor/person;
- client → Actor with preserved ambiguity where FlowLance does not reliably distinguish person from organisation;
- contact/client link → Relationship;
- task → Action;
- genuine obligation → Commitment **only when FlowLance has explicit evidence that it is an obligation**;
- selected recorded choice → Decision.

### Findings from the first schema review

The real FlowLance model has already exposed three useful corrections to the draft protocol:

1. **Task is Action, not Commitment.** FlowLance's existing Attention API explicitly treats those concepts as different. We should not manufacture commitments from tasks.
2. **Actor classification can be uncertain.** A legacy/client record may not reliably tell us whether it represents a person or organisation. The OOS Actor draft therefore permits `unknown` rather than forcing an invented classification.
3. **Deadlines may be date-only.** FlowLance tasks use a date for `dueDate`. OOS now preserves date precision rather than coercing it into an invented timestamp.

This is exactly how the specification should evolve: adapters expose semantic mismatches and the shared model changes only where the mismatch is genuinely organisational rather than product-specific.

### First compatibility surface

Before building federation, FlowLance should be able to:

- export valid Actor and Action objects;
- expose a draft node capability manifest;
- validate those objects against the OOS v0.1 schemas;
- retain FlowLance IDs as external identifiers;
- keep product-specific project/client detail in extensions rather than expanding the core ontology prematurely.

### Events after object compatibility

Only after the mappings are stable should FlowLance add durable events.

Initial candidates:

- relationship.created;
- action.created;
- action.completed;
- action.overdue;
- commitment.created / fulfilled once commitments are explicit;
- decision.made once a genuine decision source exists.

Implementation requirement: a transactional outbox or equivalent durable event record so an application state change and its event cannot silently diverge.

## Phase B — TOPO as consumer and context provider

TOPO should:

- ingest OOS events idempotently;
- retain original provenance;
- keep a per-source event cursor;
- reconcile external identifiers with local Actors;
- retain source authority rather than duplicating arbitrary content;
- answer a simple structured Context request.

First Context query:

~~~text
subject: actor or organisation
purpose: CRM discovery / qualification
wanted:
  relationships
  active commitments
  recent decisions
  relevant evidence references
~~~

The result is a Context Packet rather than raw TOPO storage.

## Phase C — RACK as practice node

RACK should:

- expose a node capability manifest;
- represent/export Practice using the shared schema;
- request Context from TOPO while executing a practice;
- keep execution content local unless explicitly shared;
- emit practice/evaluation events where useful.

First proof:

> RACK is executing a CRM discovery practice for Actor X and can request only the relevant organisational history from TOPO.

## Phase D — Relay and Bridge

Build these only after local fixture-based interoperability works.

### Relay v0

Responsibilities:

- authenticate nodes;
- durable store-and-forward;
- per-consumer delivery state;
- route Event, Context and later Action messages;
- expiry and acknowledgement.

Non-goals:

- canonical organisational database;
- search/indexing;
- embeddings;
- model inference;
- business logic.

### Bridge v0

Responsibilities:

- outbound connection only;
- local node discovery;
- inbox/outbox;
- catch-up;
- Context request routing;
- capability discovery;
- permission/consent hooks.

First federation test:

1. laptop is offline;
2. FlowLance emits an organisational event;
3. relay retains it;
4. laptop returns;
5. Bridge resumes from its cursor;
6. TOPO ingests event once;
7. provenance and external identity survive;
8. RACK can use the resulting context locally.

## Phase E — Attention

Attention becomes the first cross-boundary consumer that tests whether the OS adds qualitative value.

It should be able to combine:

- cloud events;
- current FlowLance state;
- purpose-bound TOPO context when available;
- deterministic rules;
- model judgement where useful.

It may propose an Action request, but mutating actions require explicit capability and permission.

## Managed TOPO roadmap implication

TOPO needs an always-on option if cloud services are expected to query organisational memory while local devices are unavailable.

The likely split is:

- TOPO Core — local memory;
- TOPO Sync — selective synchronisation;
- TOPO Managed — always-on shared organisational memory;
- self-hosted TOPO — same role under organisational control.

The local-only product remains complete.

## Managed RACK roadmap implication

RACK's managed boundary is different.

Likely split:

- RACK Core — practices and local execution;
- RACK Sync — practice/version synchronisation;
- RACK Managed — teams, governance, shared practices, policy and evaluation summaries.

Execution content should not need to move to managed RACK by default.

## Definition of the first architectural proof

We are done with the first proof when all of these are true:

- the producer and consumer do not share a database;
- the consumer can be offline at event time;
- the event is delivered later exactly once from the consumer's perspective;
- provenance survives the journey;
- identity reconciliation is explicit;
- RACK requests a purpose-bound Context Packet rather than TOPO storage;
- local content need not be uploaded;
- every product remains independently useful.

Only then should we broaden the protocol or add more products.
