# Protocol specification

The Organisational OS protocol begins with four interaction types:

- **OBJECT** — what exists?
- **EVENT** — what happened?
- **CONTEXT** — what is relevant to this purpose?
- **ACTION** — what are you asking another authorised node to do?

The protocol is intentionally smaller than the ontology. Not every application needs to implement every object or operation.

## Status

Version: **0.1-draft**

Nothing in this directory should yet be treated as stable.

## Design rules

- shared semantics over shared storage;
- events describe occurrences, not remote procedure calls;
- context is purpose-bound and minimised;
- actions require explicit capability and authorisation;
- consequential records can carry provenance;
- local and cloud nodes use the same semantics;
- extensions are allowed without requiring every node to understand them;
- consumers tolerate unknown optional fields and event types.

See the ontology, events, context and capabilities subdirectories, plus JSON Schemas in /schemas.
