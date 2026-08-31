# Conceptual blueprint

## Independent tools. Shared meaning.

The organisation is already a system. Its software usually is not.

Most organisational software sees its own objects: a CRM sees contacts, an inbox sees messages, a project tool sees tasks, and a drive sees documents.

The organisation has to retain the connections between them.

The Organisational OS starts from a different unit of design: portable organisational meaning.

## Master model

The active organisational cycle is:

~~~text
NOTICE → DECIDE → ACT → LEARN → ADAPT ↺
~~~

Four cross-cutting capabilities make the cycle coherent:

~~~text
                         ATTENTION
                what matters here, now?
                            ↓

        NOTICE ──► DECIDE ──► ACT ──► LEARN ──► ADAPT
           ▲                                      │
           └──────────────────────────────────────┘

      ═══════════════ RELATIONSHIPS ═══════════════
             gives organisational state shape

      ─────────────── MEMORY / TIME ───────────────
                 keeps the thread intact

      ··············· PROVENANCE ················
                   tells us why we trust it
~~~

These are capabilities, not stages.

## 1. Relationships — an organisation is a graph, not a list

People, organisations and work matter because of how they are connected.

Software often treats relationships as fields on records. But relationships have their own history and meaning. They begin, strengthen, weaken, change type and end. Evidence can attach to them. Attention may depend on them.

Small schema:

~~~text
Relationship
  from_actor
  to_actor
  type
  valid_from
  valid_until?
  description?
  provenance
~~~

Useful test:

> If the relationship changed tomorrow, could the system represent the change without rewriting either actor?

Question worth asking:

> What becomes visible when the connection is treated as data, not metadata?

## 2. Observation and signal — what happened is not the same as what matters

An organisation needs somewhere for observations to remain observations before they become conclusions.

~~~text
observation ─┐
observation ─┼── pattern ── signal
observation ─┘                │
                              ├─ relevant now
                              └─ not yet
~~~

An Observation is something noticed. A Signal is an interpretation that one or more observations may be meaningful.

The distinction leaves room for ambiguity, contradiction and later reinterpretation.

Small schema:

~~~text
Observation
  observer
  subject[]
  content
  occurred_at
  evidence[]

Signal
  derived_from[]
  significance
  confidence
  status
~~~

Useful test:

> Can we retain the original observation after the interpretation changes?

Question worth asking:

> What should the organisation be able to notice before it knows what it means?

## 3. Intention, assumption and decision — direction is more than a plan

To understand whether reality has changed, the organisation has to know what it expected and why.

~~~text
            intention
                │
          based partly on
                ▼
            assumption
                │
 evidence ──────┼────── constraints
                ▼
             decision
                │
                ▼
            commitment
~~~

Organisational software usually retains the task that followed, the approved document, or a message saying “agreed”. The useful object is the Decision itself: what was chosen, why, what evidence mattered, which alternatives existed, and which assumptions were being made.

Small schema:

~~~text
Decision
  statement
  decision_makers[]
  evidence[]
  alternatives[]
  assumptions[]
  decided_at
  supersedes?
~~~

Useful test:

> Six months later, can somebody tell what would have made this decision different?

Question worth asking:

> Can the organisation distinguish a bad decision from a decision made under assumptions that later changed?

## 4. Commitment and action — work starts when intention becomes commitment

Goals describe direction. Commitments create obligations. Actions discharge them.

~~~text
intention
    │
 decision
    │
 commitment ───── who owes what to whom, by when
    │
 actions
    │
 outcome
~~~

A task is not always the most meaningful unit of work. “Send the revised figures” is a task. “We will provide revised figures by Friday” is a commitment with an actor, recipient and expectation.

Small schema:

~~~text
Commitment
  statement
  committed_by[]
  committed_to[]
  due_at?
  status
  related_actions[]
~~~

Useful test:

> If the task were delegated or split into three tasks, would the underlying promise still be visible?

Question worth asking:

> What has the organisation actually promised — and to whom?

## 5. Practice — how we work should be something the organisation can know

A practice is more than a prompt and more than a process diagram.

~~~text
                 practice
       ┌────────────┼────────────┐
     people         tools       agents
       │              │            │
       └──────────── work ─────────┘
                      │
                   evaluate
                      │
                   improve
~~~

As AI participates in work, practices need to become more explicit without becoming rigid. A Practice can describe purpose, roles, steps, tools, constraints, instructions, exceptions and evaluation.

Small schema:

~~~text
Practice
  purpose
  roles[]
  steps[]
  tools[]
  constraints[]
  instructions[]
  evaluation[]
  version
~~~

Useful test:

> Could somebody new — human or agent — understand not just what to do, but what good looks like and where judgement is required?

Question worth asking:

> What does this organisation know about how it does good work?

## 6. Memory and provenance — keep the thread, not the archive

Memory is not storing more. It is retaining the relationships that make the past intelligible.

~~~text
2024             2025                 2026
 │                │                    │
observation ── decision ── outcome ── new signal
       \          │              /       │
        evidence  assumption ───┘      decision

                THE THREAD
~~~

Documents preserve artefacts. Organisational memory needs to preserve meaning across artefacts and across time.

Provenance makes that memory trustworthy.

Small schema:

~~~text
Provenance
  source_type
  source_id
  created_by
  method
  assertion_type
  confidence?
  created_at
~~~

Useful test:

> Can the system show both the current understanding and the path by which the organisation arrived there?

Question worth asking:

> Can the organisation remember why, not just what?

## 7. Events and change — state tells you what is true; events tell you what happened

The connective tissue between independent products should be change, not database access.

~~~text
FlowLance                     TOPO
    │                           ▲
    ├─ commitment.created ──────┤
    │                           │
    ├─ action.overdue ─────┐    │
    │                      │    │
    ▼                      ▼    │
  local state           Attention
                           │
                           └─ significance assessment
~~~

Shared events allow applications to remain sovereign while making change legible elsewhere.

Small schema:

~~~text
Event
  id
  type
  source
  subject
  actor
  organisation
  time
  data
  provenance
  causation_id?
~~~

Useful test:

> Could a product publish the event without knowing which other products exist?

Question worth asking:

> What changed, and who needs to care? Those are two separate questions.

## 8. Attention — the system should know when not to interrupt

Attention is a scarce organisational resource, not another inbox to fill.

~~~text
signals ───────────┐
commitments ───────┤
relationships ─────┤
changes ───────────┼── context + rules + judgement ──► attention
calendar ──────────┤                                  │
email ─────────────┤                                  ├─ now
history ───────────┘                                  ├─ later
                                                       └─ ignore
~~~

Attention combines urgency, significance, relationships, commitments, timing, organisational context and judgement.

Useful test:

> Does connecting another source reduce the amount a person has to monitor, or increase it?

Question worth asking:

> What deserves a person's attention that the system can determine they should not have to discover themselves?

## 9. Adaptation — learning means being allowed to become wrong

An organisation that remembers but never revises itself has built an archive, not an adaptive system.

~~~text
intention ───────────── expected state
   │
assumption
   │
   │          observations
   │               │
   ▼               ▼
              actual state
                   │
                   ▼
                 drift
                   │
          ┌────────┴────────┐
       respond           revise
       action            belief
~~~

Drift is not simply anomaly detection. It is the meaningful gap between what an organisation intended, expected or believed and what appears to be happening.

Useful test:

> Can new evidence change not only what the organisation does next, but what it thinks is true?

Question worth asking:

> When reality and intention diverge, which one should change?

## 10. Agency, permission and trust — knowing something does not grant permission to use it

A connected organisational system needs stronger boundaries, not weaker ones.

Interoperability increases the blast radius of bad permissions. Identity must be separate from authority and knowledge from permission.

Agents should be first-class Actors. When an agent acts, organisational history should say that the agent acted — and whether a human confirmed it.

Useful test:

> Can we explain who knew what, who was allowed to do what, and who actually acted?

Question worth asking:

> What should be connected without becoming universally visible?

## Products are lenses

~~~text
                    SWELLS
             what are we noticing?
                      │
       TENDING ───────┼────── ATTENTION
   what needs tending?│   what matters now?
                      │
 GLADE ─────── ORGANISATION ─────── FLOWLANCE
what matters?         │            what are we doing?
                      │
        DRIFT ────────┼──────── RACK
where are we diverging?       how do we work?
                      │
                     TOPO
          what do we know, and why?
~~~

The products overlap in what they can see. They remain distinct in the questions they help people answer.

## Standalone. Compatible. Connected.

### Standalone

Use the tool independently.

### Compatible

Adopt shared organisational schemas and interchange without a live connection.

### Connected

Explicitly exchange events, context and authorised actions.

Participation in the ecosystem must not be the price of using a product.

## Closing thesis

The goal is not software that knows everything.

It is an organisation better able to keep the thread between what it notices, what it knows, what it intends, what it does and what it learns.
