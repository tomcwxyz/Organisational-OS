# RFC 0003 — Practice granularity and composition

Status: Exploration  
Date: 2026-08-31

## Problem

The first RACK compatibility work exposed a second useful mismatch between the shared ontology and a real product.

The OOS draft currently describes **Practice** as a reusable description of how work is performed.

RACK has several related but distinct things:

- instruction modules;
- Set-ups/profiles that compose modules for a purpose;
- shared-practice publications;
- compiled destination packages;
- evaluation and verification plans.

None is obviously identical to one universal OOS Practice object.

Forcing the first available RACK record into the shared primitive would make the ontology mirror a product implementation rather than organisational meaning.

## Current position

Do **not** choose a canonical RACK → OOS Practice mapping yet.

RACK can participate in OOS immediately as a Context consumer while the Practice boundary is studied separately.

Its draft node manifest therefore advertises:

~~~text
queries:
  context
~~~

and does not yet claim that it provides Practice objects.

## Organisational question

The shared ontology should answer:

> What is the organisational thing that persists when its instructions, tools, implementation and destination change?

A Practice might be:

1. a single reusable method or rule;
2. a composed set of working instructions;
3. a versioned organisational practice publication;
4. an abstract practice identity with versioned components underneath it.

The fourth option currently looks promising but is not yet a decision.

Conceptually:

~~~text
Practice
  identity / purpose
       │
       ├── components / instructions
       ├── roles
       ├── tools
       ├── constraints
       ├── evaluation
       └── versions
              │
              └── implementation-specific projections
                     RACK modules
                     RACK Set-up
                     shared publication
                     generated package
~~~

## Important distinction

A generated destination package is probably **not** the Practice itself.

Likewise, a RACK context module is not necessarily Practice: descriptive context and normative practice should remain separate.

## Questions to test

- Can one Practice be composed from several smaller Practices?
- Does Practice need stable identity independent of version?
- Should OOS standardise components or leave composition product-specific?
- Is a RACK Set-up an implementation of Practice, a Practice composition, or merely an execution configuration?
- How should binding organisational practice and adaptable defaults appear?
- Where do verification/evaluation rules belong?
- Can a non-RACK process handbook or SOP map to the same concept without distortion?

## First test

Use a real RACK project and identify:

1. the organisational practice being described;
2. the source modules that contribute to it;
3. the Set-up that selects those modules;
4. the generated package used by a destination.

Then ask which of these should survive if RACK were replaced by another tool.

That surviving layer is the strongest candidate for the shared OOS Practice semantics.

## Consequence for roadmap

Practice mapping is now an explicit semantic investigation, not a prerequisite for the first TOPO ↔ RACK Context exchange.
