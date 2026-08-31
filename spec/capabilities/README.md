# Node capabilities

A node advertises what it provides, emits, accepts, queries and can do.

Example capability groups:

- provides: actor, relationship, commitment, action;
- emits: relationship.created, commitment.created, action.completed;
- accepts: signal.detected;
- queries: actor, relationship, commitment, context;
- actions: action.create, organisation.create.

## Why advertise capabilities?

A federated system cannot assume that every node implements every concept.

Capability discovery allows connectors and Bridges to know what a node can provide, which events are meaningful to it, what it may be asked to do, and which protocol versions/extensions it understands.

## Constraint

A capability manifest advertises possibility, not permission.

Advertising action.create does not mean every connected node is authorised to invoke it.
