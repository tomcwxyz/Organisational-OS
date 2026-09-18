# Product boundaries

The initial Good Ship products are proving grounds for the protocol, not mandatory modules.

| Product | Core question | Likely shared concepts |
| --- | --- | --- |
| Swells | What are we noticing? | Observation, Signal, Evidence |
| Tending | What needs tending? | Signal, Relationship, Change, Outcome |
| Attention | What deserves attention now? | Signal, Commitment, Relationship, Change, Context |
| TOPO | What do we know, and how did we get here? | Relationship, Evidence, Decision, Assumption, context/history |
| FlowLance | What are we doing? | Actor, Relationship, Commitment, Action, Decision, Outcome |
| RACK | How do we work? | Practice, Evidence, Outcome, Context |
| CRUX | What actually happened, and how do we know? | Event, Evidence, Action, Actor, Outcome, Declaration |
| Ship Check | What can we independently inspect or verify? | Observation, Evidence, Finding, Artefact, Outcome |
| Glade | What matters, and how are we doing? | Intention, Outcome, Evidence, Decision |
| Drift | Where are reality and intention diverging? | Change, Assumption, Intention, Outcome, Signal |

## Runtime nodes

Execution runtimes are participants in Organisational OS, not necessarily Organisational OS products.

The current reference experiment uses the fork `tomcwxyz/Orbital` to test a project/agent runtime that can:

- request purpose-bound context from TOPO;
- consume applicable practice from RACK;
- execute/delegate work;
- emit events and evidence to CRUX;
- invoke independent inspectors such as Ship Check;
- remain replaceable by another compatible runtime.

This is deliberate: a compatible external or third-party implementation is a success criterion for the protocol.

See [RFC 0002 — AI runtime interoperability and the Orbital experiment](../rfcs/0002-ai-runtime-interoperability.md).

## Boundary test

For every product ask:

> If this product disappeared, would the organisation lose the underlying object, or only one way of working with it?

The latter is the architectural goal.

For a runtime, ask a related question:

> If this runtime disappeared, could another authorised runtime still understand the relevant context, practice, actions and evidence through shared protocol semantics?

The architectural goal is again yes.

## Deliberate exclusions

- Swells should not become a CRM or task manager.
- Attention should not become a canonical task database, email client or universal assistant.
- TOPO should not become a mandatory universal database or runtime.
- FlowLance should not become general organisational memory.
- RACK should not become a task manager, runtime or memory store.
- CRUX should not become the execution runtime, canonical practice store or automatic organisational truth engine.
- Ship Check should not become the canonical evidence database or practice store.
- Glade should not become project management or a KPI dashboard.
- Drift should not become generic analytics.
- Orbital or another runtime should not become the canonical organisational memory, practice or evidence store merely because it coordinates execution.

Tending's boundary remains one of the areas to refine through implementation.
