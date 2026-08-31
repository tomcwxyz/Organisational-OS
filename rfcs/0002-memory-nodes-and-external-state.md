# RFC 0002 — Memory nodes and external organisational state

Status: Draft  
Date: 2026-08-31

## Problem

The first FlowLance → TOPO compatibility work exposed an important semantic boundary.

FlowLance has authoritative operational state such as Tasks, Clients and Projects.

TOPO has canonical governed memory Claims, Sources and Events. A TOPO Claim has a review/authority lifecycle and epistemic meaning: assertion, observation, inference, preference or derived pattern.

If TOPO simply converts every incoming OOS Object or Event into a confirmed Claim, two distinct things collapse:

1. **authoritative external organisational state** — for example “FlowLance task 123 is open”; and
2. **organisational memory claims** — governed assertions TOPO is willing to establish as memory.

This would weaken both systems.

## Decision

A memory node must be able to retain or reference external organisational state **without automatically promoting that state into its canonical memory model**.

For TOPO, the preferred direction is a linked external-object/event ledger alongside Claims rather than treating the OOS protocol as another direct-write path into confirmed memory.

Conceptually:

~~~text
                     TOPO
                      │
       ┌──────────────┴──────────────┐
       │                             │
EXTERNAL STATE                  CANONICAL MEMORY
linked OOS objects/events       governed Claims
       │                             │
       │   connector/review policy   │
       └──────────────► candidate ───┘
~~~

An external object may remain useful context without ever becoming a Claim.

## Why this matters

### Authority

FlowLance remains authoritative for its task state. TOPO should not create a competing canonical copy merely because it can consume the event.

### Epistemic integrity

A system-recorded operational fact is not automatically equivalent to a human-confirmed memory Claim.

### Replay and freshness

External state can be refreshed, superseded or replayed according to its source protocol without mutating TOPO's claim history.

### Permissions

A node may be permitted to reference an external object while not being permitted to promote it into shared memory.

### Portability

The OOS protocol remains neutral about how a memory product internally represents organisational memory.

## Context provision comes first

TOPO can already participate usefully without external-state ingestion by answering purpose-bound Context requests from its confirmed local memory.

~~~text
RACK
  │
  │ Context request
  ▼
TOPO
  │ confirmed claims
  │ sensitivity + validity
  ▼
Context Packet
~~~

This is the first integration path.

## External-state ledger requirements

The exact storage schema is intentionally deferred, but a compliant memory-node implementation should be able to preserve at least:

~~~text
external object/event ID
source node
object/event type
subject
source revision or event position
received_at
source_time
provenance
raw/normalised representation or reference
freshness / supersession
visibility / scope
~~~

The ledger is not necessarily part of the shared OOS ontology. It is an implementation pattern needed by memory-capable nodes.

## Promotion into memory

Promotion should be explicit.

Possible policies include:

- retain as external state only;
- propose a candidate memory Claim;
- automatically confirm only a narrowly authorised class of source assertions;
- link existing Claims to the external object as evidence.

For TOPO, proposal/review remains the default when an external source would create new canonical memory.

## Consequences

### Positive

- operational state and memory remain distinct;
- TOPO's existing user-authority model survives integration;
- FlowLance remains authoritative for work state;
- context can include live/referenced state without duplicating source databases;
- replaying events does not rewrite canonical memory.

### Costs

- TOPO needs an additional external-state/reference layer before broad event ingestion;
- context resolution may need to combine canonical Claims and external state;
- source freshness and conflict policy become explicit;
- adapters need to decide whether they are linking, proposing or confirming.

## Protocol implication

OOS does **not** require every Object received by a node to be persisted in that node's native canonical model.

Compatibility means understanding shared semantics at the boundary, not adopting one universal internal storage model.

## First proof

1. TOPO generates an OOS Context Packet from confirmed local Claims.
2. RACK consumes that packet without reading TOPO's database.
3. FlowLance exports OOS-compatible Actor/Action objects.
4. Before FlowLance events are fed into TOPO, implement a linked external-state ledger.
5. Show that an external Action can be available for context while remaining outside canonical Claims.
6. Show that a later promotion to memory is explicit and provenance-preserving.
