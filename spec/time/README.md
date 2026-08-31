# Time and temporal precision

Organisational systems do not always know an exact instant.

A task may be due on **4 September** without being due at a particular hour. An event, by contrast, normally happened at a specific timestamp.

The protocol should preserve the precision of the source rather than inventing false precision.

## Draft convention

Fields such as `due_at` may therefore contain either:

- an ISO 8601 date, for example `2026-09-04`;
- an ISO 8601 date-time, for example `2026-09-04T16:00:00Z`;
- `null`.

Fields representing an actual recorded occurrence, such as `completed_at` or Event `time`, remain date-time values.

## Why this matters

Adapters must not turn a date-only deadline into an invented midday or midnight timestamp merely to satisfy a schema.

Temporal precision is part of provenance.

## Open question

If later use cases need richer semantics — approximate periods, recurring windows, local time zones or uncertain dates — the protocol may introduce a structured temporal value. We should not do that until a real integration requires it.
