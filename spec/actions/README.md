# Actions

An Action request asks another node to perform a capability.

This is deliberately different from the Action ontology object. The ontology object represents organisational work; the protocol operation represents a cross-node request to do something.

## Principles

- capability advertisement is not authorisation;
- action requests require explicit policy/permission;
- requests must be auditable;
- consumers must support refusal;
- idempotency is required for mutating actions;
- proposal/dry-run modes should be available where useful;
- human confirmation can be required by policy.

## Draft request shape

~~~text
id
type
requested_by
target_node
subject
purpose
parameters
requested_at
idempotency_key
confirmation_policy?
provenance
~~~

## Example

A node may advertise action.create as a capability.

Attention may then request that FlowLance create an Action, but only if the connection grants that specific capability. Reading FlowLance context does not imply permission to create work.

The precise wire schema is deferred until the first Attention ↔ FlowLance implementation.
