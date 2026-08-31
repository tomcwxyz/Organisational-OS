# Provenance

Provenance is part of the trust model, not optional metadata.

Every consequential object or event should be able to say where it came from and how it was derived.

## Source type

Examples include human, email, calendar, meeting, document, dataset, web, API, application, agent, model, rule and sensor.

## Method

Examples include recorded, imported, extracted, calculated, inferred, summarised, suggested, generated and confirmed.

Source and method are intentionally separate.

An email can be the source while model extraction is the method.

## Assertion type

Examples include fact, claim, interpretation, inference, prediction, recommendation and decision.

## Confidence

Where uncertainty is meaningful, the draft core vocabulary is high, medium or low.

A numeric value should only be added when it has a defensible interpretation.

## Derived lineage

derived_from may point to prior organisational objects, evidence or events. This allows later inspection of how an assertion came to exist.

## Human confirmation

Machine inference should not silently become human assertion.

A confirmation should create new provenance or an explicit confirmation event rather than rewriting history.
