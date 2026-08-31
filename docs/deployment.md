# Deployment model

## Deployment is a node choice

The same Actor, Decision, Commitment, Event or Context Packet should remain meaningful whether the node is local-first, managed, self-hosted, serverless, always-on or intermittently connected.

## Current proving-ground hypothesis

| Product | Natural initial mode | Shared role |
| --- | --- | --- |
| Swells | cloud-first | observations / signals |
| Tending | likely cloud-first | patterns / conditions |
| Attention | service-first, potentially local-capable | relevance / attention |
| FlowLance | cloud | operational work |
| Glade | cloud | intentions / reflection |
| Drift | cloud or hybrid | comparison / change |
| TOPO | local-first + managed/self-hosted sync | memory / context |
| RACK | local-first + managed control/sync | practice / execution |

These are implementation hypotheses, not protocol requirements.

## TOPO

TOPO should be able to exist in three separable forms.

### TOPO Core

Local memory engine: ingest, extraction, connection, retrieval, local graph/query and provenance.

### TOPO Sync

Protocol-compatible synchronisation between TOPO nodes.

Potential paths:

~~~text
local ↔ managed
local ↔ self-hosted
managed ↔ other OOS nodes
~~~

### TOPO Managed

An always-on organisational memory node for teams, cross-device use and authorised remote context.

Local-only use must remain viable.

### Memory scopes to test

- **private** — device-only; never remotely queryable;
- **shared** — synchronised with an organisation/workspace node;
- **published** — explicitly available to specified authorised OOS nodes.

## RACK

RACK has a different local/managed boundary.

### RACK Core

Practices and local execution. Work content may remain local.

### RACK Sync

Practice and version synchronisation.

### RACK Managed

Potential responsibilities include team practices, governance, policy, template distribution, evaluation summaries and workspace management.

Managed RACK should not require execution content to be synchronised by default.

## Offline-first federation

A local node may be unavailable for hours or days. The architecture therefore assumes asynchronous delivery, retention, replay, idempotency, explicit freshness, and context queries that can fail when an authoritative node is offline.

When an always-on answer is required, an organisation may choose a managed or self-hosted node containing only the context it is willing to make available.
