# RFC 0001 — Federated node protocol

Status: Draft  
Date: 2026-08-31

## Problem

The initial Organisational OS proving tools span different deployment models.

FlowLance and Attention are naturally cloud/service based. RACK and TOPO are local-first. Future participating software may be managed, self-hosted, third-party or intermittently connected.

A design based on shared databases or direct point-to-point product APIs would couple the ecosystem to particular applications and deployment choices.

## Decision

Treat every participating system as a **node** and define interoperability through four protocol operations:

1. Object — what exists?
2. Event — what happened?
3. Context — what is relevant to this purpose?
4. Action — what may another authorised node ask this node to do?

Nodes advertise capabilities.

Cloud/local federation uses store-and-forward events plus purpose-bound request/response. Local nodes should connect outbound through a small Bridge rather than expose inbound network services.

A relay may route durable events and requests but must not become the canonical organisational database.

## Consequences

### Positive

- local and cloud share the same semantics;
- products remain independently deployable;
- offline nodes can catch up;
- third-party systems can participate;
- evidence can remain at authoritative sources;
- managed TOPO/RACK can evolve without becoming mandatory.

### Costs

- identity reconciliation becomes explicit;
- distributed permissions are harder than central permissions;
- freshness and offline state must be represented;
- eventual consistency becomes normal;
- debugging requires event lineage and correlation.

## First proof

~~~text
FlowLance cloud
      │
commitment.created
      │
    Relay
      │
    Bridge
      │
     TOPO ── Context Packet ──► RACK
    local                      local
~~~

The local device must be offline when the event is emitted and still recover correctly when it reconnects.

## Open questions

- relay encryption model;
- portable actor references;
- context permission vocabulary;
- schema/version negotiation;
- retention and expiry;
- exact split between TOPO Core, Sync and Managed;
- exact split between RACK Core, Sync and Managed;
- whether the Bridge is a package, daemon or both.
