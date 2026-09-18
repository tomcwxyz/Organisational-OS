# RFC 0002 — AI runtime interoperability and the Orbital experiment

Status: Draft  
Date: 2026-09-18

## Problem

Organisational OS defines shared organisational meaning across independent tools, but it does not itself provide an AI execution runtime.

The wider Good Ship ecosystem now has clearer specialist roles:

- **TOPO** — governed, portable context and durable memory: what is known and what may be disclosed for a purpose;
- **RACK** — working practices, instructions and repeatable methods: how work should be done;
- **CRUX** — evidence, traces and reconciliation between declared and observed behaviour: what actually happened and how we know;
- **Ship Check** — independent implementation inspection and verification;
- **agent/runtime tools** — execution, delegation, tool use, project state and immediate working continuity.

The fork of `zqiren/Orbital` at `tomcwxyz/Orbital` gives us a functioning project-agent runtime with project state, worker delegation, queues, approvals, budgets and triggers. It is useful precisely because it is not a Good Ship-native implementation: it can test whether the Organisational OS protocol and the surrounding products are genuinely interoperable rather than vertically integrated.

We need to record how this runtime relates to Organisational OS and the product boundaries before implementing deep integrations.

## Decision

### 1. Organisational OS is the protocol, not the runtime

Organisational OS remains a federated set of models, protocols and architectural conventions.

It does not become an agent manager, task runner, universal memory store, evidence database or central application.

An AI runtime such as Orbital is an **OOS node**. It participates using the same four protocol operations as other nodes:

1. **Object** — project, artefact, actor, practice reference or other durable organisational concept;
2. **Event** — task started, worker dispatched, approval requested, task completed, artefact created and similar observed changes;
3. **Context** — purpose-bound requests for the minimum useful context or practice needed for a task;
4. **Action** — an authorised request for the runtime or another node to perform work.

### 2. Use Orbital as a reference runtime experiment

The fork should initially remain close to upstream Orbital.

The first purpose of the fork is not to establish a new Good Ship product. It is to answer:

> What do we actually need from an organisational AI runtime, and can our existing products interoperate with one without owning it?

Keep upstream compatibility where practical. Put Good Ship-specific behaviour behind adapters, event emitters and protocol boundaries rather than rewriting the runtime core prematurely.

Possible later outcomes are all acceptable:

- Orbital remains a suitable runtime with a thin integration layer;
- the fork becomes meaningfully different and we consciously maintain it as such;
- evidence from the experiment demonstrates requirements for a separate runtime implementation.

Do not choose between those outcomes in advance.

### 3. Preserve the product boundaries

The working division is:

| Node/layer | Core question | Owns | Does not own |
| --- | --- | --- | --- |
| TOPO | What should this system know? | governed context, provenance, durable reviewed memory | task execution, runtime queues, organisational surveillance |
| RACK | How should this system work? | practices, instructions, working methods | tasks, durable personal memory, runtime state |
| Orbital/runtime | What should happen now? | project execution, delegation, immediate/project working state | canonical organisational memory, canonical practice, evidence authority |
| CRUX | What actually happened, and how do we know? | evidence, traces, declared/observed reconciliation, receipts | task execution, automatic practice changes, canonical personal memory |
| Ship Check | What can we independently inspect or verify? | implementation findings and verification outputs | canonical evidence store, organisational memory, agent orchestration |

Every node remains independently useful.

### 4. The proving loop is Context → Practice → Action → Event → Evidence → Learning

The first end-to-end experiment should make the organisational cycle concrete:

~~~text
TOPO
  │ purpose-bound context
  ▼
RACK
  │ applicable practice
  ▼
Orbital / runtime
  │ action + execution
  ▼
OOS events
  │
  ├──────────────► CRUX
  │                 evidence / reconciliation
  │
  └──────────────► Attention / other interested nodes
                    
Ship Check ───────► CRUX
 independent        evidence
 inspection

CRUX / outcomes
  │
  ▼
reviewed learning
  ├──────────────► proposed TOPO memory
  └──────────────► proposed RACK practice change
~~~

The reverse arrows are **proposals**, not automatic authority transfers.

CRUX evidence must not silently rewrite RACK. Runtime output must not silently become TOPO memory. Ship Check findings must not become organisational truth merely because a scanner produced them.

### 5. TOPO integration is purpose-bound, not a memory dump

Before planning or executing a meaningful task, an authorised runtime may request TOPO context using a purpose, project/subject scope, sensitivity ceiling and context budget.

Example conceptual request:

~~~text
purpose: Implement the Windows release pipeline for TOPO
project: TOPO
task: Fix installer signing and release automation
sensitivity_ceiling: personal
budget: 2500 tokens
~~~

TOPO returns a bounded Context Packet with provenance. The runtime should record the packet identity/revision/digest required for lineage, not duplicate TOPO's canonical memory store.

Agent-authored project files such as `PROJECT_STATE.md`, `DECISIONS.md` or runtime worker memory are not automatically TOPO evidence. User instructions, approvals, source interactions and resulting artefacts may be captured as sources and can lead to reviewable Memory Page proposals through TOPO's normal authority model.

### 6. RACK integration supplies practice, not project state

A runtime may request or resolve RACK practices for the current purpose/task.

Practice may shape planning, prompts, worker inheritance, checks or completion criteria. The runtime should retain stable practice identifiers/versions for lineage where possible.

The runtime may produce evidence that a practice was applied or ignored, but it cannot unilaterally establish or mutate canonical RACK practice.

### 7. CRUX is the evidence plane around execution

The runtime should emit a deliberately small initial event/evidence vocabulary rather than export full internal logs indiscriminately.

Candidate events:

- `project.started`
- `task.started`
- `context.requested`
- `context.used`
- `practice.applied`
- `worker.dispatched`
- `tool.called`
- `approval.requested`
- `approval.resolved`
- `artifact.created`
- `task.completed`
- `task.blocked`
- `evaluation.completed`

CRUX may associate these with declared system information, model/runtime identity, context packet references, practice versions, evaluations and artefacts to produce inspectable evidence and receipts.

Telemetry should primarily use structured API/event envelopes. MCP may provide an agent-facing query interface, but should not be the only or canonical telemetry path.

### 8. Ship Check is an evidence producer, not the evidence plane

Ship Check remains an independent inspector.

Its findings can be represented as evidence associated with a project, artefact, build, release, practice or runtime action. CRUX may ingest these findings through an evidence envelope and reconcile them with declarations and runtime events.

Ship Check should not need to become a CRUX client internally to remain useful; an adapter or exporter is sufficient.

### 9. Human and machine knowledge remain distinguishable

The existing OOS distinction between human and machine knowledge applies throughout the runtime experiment.

Important examples:

- a human instruction or approval is not equivalent to an agent-generated summary of it;
- a runtime decision log is not automatically durable organisational memory;
- a CRUX observation is evidence of an observed event, not automatically a human decision;
- a Ship Check finding is scanner evidence with its own provenance and confidence;
- context received from TOPO remains governed by its original authority and disclosure constraints.

### 10. Preserve licensing and implementation boundaries

The Orbital fork remains subject to GPL-3.0. TOPO and other Good Ship projects retain their own licences.

Integration should therefore prefer documented protocols, local APIs, CLI adapters, event envelopes and other clean boundaries. Do not copy Orbital implementation code into differently licensed projects merely for convenience.

## Initial experiment

### Phase 0 — Record and preserve boundaries

- keep the fork close to upstream;
- record the architecture in OOS, TOPO, RACK, CRUX, Ship Check and Orbital;
- make no product claim that Orbital is the permanent Good Ship runtime.

### Phase 1 — TOPO context source

- request bounded purpose-aware context before selected Orbital tasks;
- record context packet lineage;
- capture resulting user/assistant interaction through TOPO's governed capture path;
- do not sync Orbital project memory into TOPO canonical memory.

### Phase 2 — RACK practice source

- resolve applicable practice for a task;
- propagate practice identifiers/versions into worker dispatch where useful;
- record whether completion evidence exists for relevant practice expectations.

### Phase 3 — CRUX runtime evidence

- emit the small event vocabulary above;
- correlate project, task, worker, model, practice, context packet and artefact identifiers;
- test declared-versus-observed reconciliation on real runs.

### Phase 4 — Ship Check evidence

- run Ship Check against relevant projects/builds;
- export findings as CRUX-compatible evidence without making either product dependent on the other;
- test whether implementation inspection and runtime evidence form a coherent receipt.

### Phase 5 — Evaluate the runtime requirement

After real use, record where Orbital fits well and where it resists the organisational model.

Build a separate Good Ship runtime only if evidence shows meaningful requirements that cannot be handled cleanly through adapters or upstream-compatible changes.

Candidate questions include:

- Does project-level state remain the right unit of execution?
- Can TOPO context remain purpose-bound through worker delegation?
- Does RACK practice survive delegation into actual behaviour?
- Can CRUX obtain useful evidence without invasive full-session capture?
- Do Action/Event semantics map cleanly onto runtime tasks and outcomes?
- Is human approval/agency represented well enough?
- How does the runtime interact with local/distributed execution such as RELAY?
- Which runtime capabilities belong in a reusable protocol and which are implementation choices?

## Consequences

### Positive

- tests OOS against a real external-style runtime;
- avoids prematurely building another agent framework;
- gives TOPO, RACK and CRUX an end-to-end interoperability proving ground;
- makes the NOTICE → DECIDE → ACT → LEARN → ADAPT cycle executable rather than theoretical;
- preserves independent product value;
- creates evidence for any future runtime decision.

### Costs

- maintaining an upstream fork has ongoing merge cost;
- identifiers and provenance must be correlated across independent nodes;
- disclosure and telemetry boundaries require careful implementation;
- there will be pressure to let the runtime become a central database or to let OOS become a central orchestrator; both should be resisted.

## Invariants

1. Organisational OS is not the agent runtime.
2. Orbital is a proving runtime, not a mandatory dependency.
3. TOPO context remains governed and purpose-bound.
4. RACK practice remains distinct from task/project state.
5. CRUX records evidence; it does not automatically rewrite memory or practice.
6. Ship Check produces inspectable findings; it does not become the evidence authority.
7. Every product continues to work without the others.
8. Shared semantics are preferred to shared databases.
9. Connection never implies universal visibility.
10. Evidence from the experiment, not architectural preference, should determine whether a separate runtime is eventually needed.
