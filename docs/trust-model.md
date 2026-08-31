# Trust model

## Connection is not permission

A connected organisational system needs stronger boundaries, not weaker ones.

The architecture must distinguish identity from authority, knowledge from permission, suggestion from action, an agent from its human owner, and a derived assertion from its source evidence.

## Agents are actors

Agents should have their own identity, capabilities and provenance.

When an agent acts, history should record that the agent acted. If a human confirms the action, that confirmation should remain visible too.

## Provenance

Every consequential object should be able to answer: **where did this come from?**

Source type examples:

human, email, calendar, meeting, document, dataset, web, API, application, agent, model, rule, sensor.

Method examples:

recorded, imported, extracted, calculated, inferred, summarised, suggested, generated, confirmed.

Assertion type examples:

fact, claim, interpretation, inference, prediction, recommendation, decision.

Source and method are separate. An email may be the source while model extraction is the method.

## Permissions

The detailed permission language is not yet defined.

The model must be capable of restrictions around object, relationship, property, evidence source, context purpose and action capability.

Knowing that sensitive evidence exists does not imply permission to retrieve it.

## Context minimisation

Context responses should be purpose-bound. A node should ask for a subject, purpose, wanted object types and relevant scope rather than asking for everything.

## Action safety

Action requests should eventually support capability advertisement, scoped authorisation, confirmation policies, idempotency, audit, refusal and proposal/dry-run modes where useful.

No node should infer permission to act merely because it can read related context.
