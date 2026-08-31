# Events

Events represent things that happened.

## Core vocabulary draft

Actor / relationship:

actor.created, actor.updated, relationship.created, relationship.changed, relationship.ended.

Perception:

observation.created, observation.updated, signal.detected, signal.updated, signal.dismissed, signal.resolved.

Evidence:

evidence.added, evidence.removed, evidence.challenged.

Direction:

intention.created, intention.changed, intention.completed, intention.abandoned, decision.proposed, decision.made, decision.superseded, decision.reversed, assumption.created, assumption.supported, assumption.challenged, assumption.invalidated.

Action:

commitment.created, commitment.changed, commitment.fulfilled, commitment.breached, action.created, action.started, action.completed, action.cancelled, action.overdue, practice.created, practice.updated, practice.retired.

Learning:

outcome.recorded, change.detected.

## Semantics

Good event: commitment.created

Bad event: tell_attention_to_check_commitment

Consumers decide what an event means for them.

## Delivery requirements

Transports may range from JSON files to HTTP/webhooks and durable relays.

Delivery should support stable IDs, idempotent consumption, cursors, retries, replay, offline catch-up and expiry where appropriate.
