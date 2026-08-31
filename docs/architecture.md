# Architecture

## Federated by design

Organisational OS does not require participating systems to share a database, authentication provider, cloud, language, runtime or vendor.

They share a small set of organisational semantics and interaction patterns.

## Node

A **node** is anything that participates in the protocol.

A node can declare:

~~~text
WHAT I KNOW
objects/context I can provide

WHAT I NOTICE
events I can emit

WHAT I NEED
events/context I can consume

WHAT I CAN DO
authorised actions I can perform
~~~

A node can be cloud-hosted, local-first, self-hosted or third-party.

## Four protocol operations

### Object — what exists?

A portable representation of an organisational concept such as an Actor, Relationship, Decision, Commitment or Practice.

### Event — what happened?

A durable statement of change such as relationship.created, decision.made, commitment.created, action.overdue or practice.updated.

Events describe what happened. They do not instruct another node what to do.

### Context — what is relevant to this purpose?

A purpose-bound query and response. A node should return the minimum useful context rather than exposing an entire graph or database.

### Action — what may happen?

An explicit request for another authorised node to perform a capability. Action requests require stronger permission and audit than event or context access.

## Cross-cutting architecture

~~~text
                  ORGANISATIONAL MODEL
                          │
       ┌──────────────────┼──────────────────┐
       │                  │                  │
     OBJECT             EVENT              CONTEXT
   what exists        what changed       what matters
                                              │
                                           ACTION
                                        what may happen

       ───────────────── TRUST ─────────────────
       identity · permission · provenance · agency

       ───────────────── TIME ──────────────────
       history · sync · replay · offline state

       ─────────────── DEPLOYMENT ──────────────
       local · managed · self-hosted · third-party
~~~

## Authority is not exclusivity

A product may be authoritative for an object without becoming the only place that object can appear.

FlowLance may be authoritative for an operational Action. TOPO may retain its history and relationships. Attention may assess its significance. Glade may view it against an Intention.

## Move meaning before moving content

The default is to reference evidence rather than copy it. Original email, file, message or dataset content should remain in its authoritative source unless replication is intentionally required.

## Durable events

Cloud/local interoperability requires store-and-forward semantics. Producers should persist events durably, preferably through a transactional outbox. Consumers should track cursors and consume idempotently.

This allows offline nodes, catch-up, replay, audit and new consumers joining later.

## Relay

The relay should authenticate nodes, route events and requests, retain durable messages until delivered or expired, and manage acknowledgements.

It should not become the canonical organisation database, universal search index or AI layer.

## Bridge

A local Bridge allows cloud and local nodes to participate without opening inbound ports.

Responsibilities include outbound secure connection, local node discovery, event catch-up, context/action routing, identity mapping support, consent, and protocol negotiation.

RACK and TOPO may bundle it, but the Bridge is not conceptually part of either product.
