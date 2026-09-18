# Organisational OS

**Independent tools. Shared meaning. An organisation that can keep the thread.**

Organisational OS is an open set of models, protocols and architectural conventions for representing organisational attention, memory, decisions, relationships, work, practice and learning.

It is **not one giant platform**.

> The organisation is already a system. Its software usually is not.

## Working model

The active organisational cycle is:

NOTICE → DECIDE → ACT → LEARN → ADAPT ↺

Four cross-cutting capabilities make that cycle coherent:

- **Relationships** give organisational state shape.
- **Memory / time** keeps the thread intact.
- **Attention** determines what matters here and now.
- **Provenance** tells us why we should trust what we think we know.

## Protocol

The first protocol surface is deliberately small:

- **Object** — what exists?
- **Event** — what happened?
- **Context** — what is relevant to this purpose?
- **Action** — what are you asking another authorised node to do?

Identity, permissions, provenance, agency, time and versioning sit underneath all four.

## A federated system

The OS does not assume that participating tools share a database, runtime or deployment model. A participating **node** may be a cloud application, local-first desktop application, self-hosted service, agent, third-party system, or adapter around an existing tool.

Local and cloud are deployment choices made by nodes, not different versions of the organisational model.

## Initial proving ground

The first implementation deliberately starts with:

- **FlowLance** — cloud operational work and commitments;
- **TOPO** — local-first organisational memory and context;
- **RACK** — local-first organisational practice;
- **Attention** — contextual prioritisation and intervention;
- **CRUX** — evidence and declared/observed reconciliation;
- **Ship Check** — independent implementation inspection.

The first architectural proof is:

1. FlowLance emits a durable commitment.created event.
2. A local device may be offline when it happens.
3. TOPO receives the event later with provenance and identity reconciliation.
4. RACK requests a purpose-bound Context Packet from TOPO while executing a practice.
5. The applications remain independently useful and do not share databases.

A second proving ground now uses the fork `tomcwxyz/Orbital` as a **reference AI/project runtime**:

1. Orbital requests purpose-bound context from TOPO.
2. It resolves applicable working practice from RACK.
3. It executes/delegates a real task while preserving context/practice lineage.
4. It emits structured runtime events to CRUX.
5. Ship Check contributes independent implementation evidence.
6. CRUX reconciles declared, observed and independently inspected behaviour without becoming the runtime.
7. Evidence may inform reviewable learning in TOPO or RACK, but never rewrites either automatically.

Orbital is a proving runtime, not a mandatory OOS component. The experiment exists to discover whether an existing runtime is sufficient and, if not, what a future runtime would genuinely need.

The protocol must eventually prove itself with software we did not build.

## Repository status

This repository is currently **pre-alpha / specification first**. The ontology and protocol are expected to change as they are tested against real products and runtimes.

### Start here

- [Conceptual blueprint](docs/conceptual-blueprint.md)
- [Thesis](docs/thesis.md)
- [Architecture](docs/architecture.md)
- [First integration plan](docs/first-integration.md)
- [Deployment model](docs/deployment.md)
- [Transports](docs/transports.md)
- [Trust model](docs/trust-model.md)
- [Product boundaries](docs/product-boundaries.md)
- [Roadmap](docs/roadmap.md)

### Specification

- [Protocol](spec/README.md)
- [Ontology](spec/ontology/README.md)
- [Events](spec/events/README.md)
- [Context](spec/context/README.md)
- [Actions](spec/actions/README.md)
- [Identity](spec/identity/README.md)
- [Provenance](spec/provenance/README.md)
- [Capabilities](spec/capabilities/README.md)
- [JSON Schemas](schemas/README.md)
- [RFC 0001: Federated node protocol](rfcs/0001-federated-node-protocol.md)
- [RFC 0002: AI runtime interoperability and the Orbital experiment](rfcs/0002-ai-runtime-interoperability.md)

## Principles

1. Products are lenses, not modules.
2. Shared models do not require shared databases.
3. Every product works alone.
4. Standards over dependencies.
5. Move meaning before moving content.
6. Human and machine knowledge remain distinguishable.
7. AI is a participant, not the architecture.
8. Organisational history should remain inspectable.
9. Connection must not imply universal visibility.
10. A compatible third-party implementation is a success criterion.
