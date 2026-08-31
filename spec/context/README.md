# Context

## Context Packet

A Context Packet is a purpose-bound response to a request for relevant organisational context.

It is **not** a database export.

A packet can contain:

- subject;
- purpose;
- requesting node;
- selected organisational objects;
- evidence references;
- scope;
- generated time;
- expiry;
- provenance;
- permission/reuse restrictions.

## Design goals

### Minimise data movement

The requesting node receives what it needs for the declared purpose rather than blanket access to organisational memory.

### Preserve authority

Evidence may be represented by reference. The original source remains authoritative.

### Carry trust information

Returned objects retain provenance and source references.

### Carry restrictions

The response can express restrictions or expiry independent of the underlying object's existence.

## Query shape

The initial request should be able to express:

- subject;
- purpose;
- wanted object types;
- time range;
- scope;
- maximum depth.

The exact query language is intentionally unresolved. We should test simple structured requests between RACK and TOPO before designing a general graph query language.
