# Identity

Identity is federated rather than globally assigned by Organisational OS.

## Three layers

### Product identity

The account or record identifier used inside one application.

### Organisational identity

The Actor represented in organisational data.

### External identity

Identifiers from other systems such as email, CRM records or directory accounts.

An Actor may therefore carry multiple identifiers without requiring a Good Ship global ID.

## Reconciliation

A Bridge, TOPO or another reconciliation-capable node may determine that multiple identifiers refer to the same Actor.

Reconciliation can be:

- deterministic when an identifier is authoritative;
- probabilistic when matching is uncertain;
- human-confirmed when ambiguity matters.

The mapping and its provenance should remain inspectable.

## Agent identity

Agents are Actors in their own right. Their actions should not be attributed to the human owner unless the human actually performed or confirmed them.

## Open question

The protocol still needs a portable way to refer to actors across nodes without imposing a central identity authority. Initial implementations should preserve local IDs plus external identifiers and explicit reconciliation mappings.
