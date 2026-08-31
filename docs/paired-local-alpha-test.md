# Paired local alpha acceptance test

This is the first hands-on test for the TOPO ↔ RACK desktop pairing.

It complements the automated cross-repository smoke. The automated test proves the protocol/build semantics; this test checks whether the actual desktop interaction is understandable and appropriately permissioned.

## What this test is trying to prove

A useful result is not simply “RACK can read TOPO”.

The test should show that:

- TOPO and RACK remain independent applications;
- TOPO decides whether local context may be shared at all;
- RACK decides whether a particular build should use TOPO context;
- the request states a subject and purpose;
- the person can preview what TOPO selected before it affects a build;
- ordinary/personal context can cross the boundary;
- sensitive/restricted memory does not cross the desktop-local boundary;
- the resulting RACK build records which context influenced it;
- changing memory changes generated output without changing canonical RACK practice;
- stopping/restarting TOPO revokes local sharing.

## Preparation

Use a disposable or backed-up TOPO store for the first run.

You need:

- TOPO desktop from current local-alpha source/build;
- RACK desktop from current pilot/local source/build;
- a small RACK project with a prompt destination, such as a coding or writing Rack.

The two applications do **not** need to share a project folder or database.

## 1. Create test memory in TOPO

Create three confirmed claims with the same subject, for example:

~~~text
subject: project:rack
~~~

Suggested claims:

| Key | Value | Sensitivity |
| --- | --- | --- |
| `writing.locale` | `en-GB` | ordinary |
| `project.test-note` | `Prefer small, reviewable changes` | personal |
| `internal.secret` | `must-not-cross-local-boundary` | restricted |

Confirm them in TOPO.

## 2. Verify TOPO starts closed

Restart TOPO before the test.

In **Context preview → Local app access**, verify the state is:

~~~text
Off
~~~

Open RACK and go to **Preview and export → TOPO organisational context** for a prompt build.

Expected:

- RACK detects that TOPO exists;
- RACK does not claim context is available;
- RACK tells you to enable **Local app access** in TOPO.

This proves discovery is not permission.

## 3. Enable local sharing in TOPO

In TOPO, choose **Allow local context**.

Expected:

- TOPO says local app access is on for this session;
- the copy explains that the maximum local sensitivity is personal;
- the permission is explicitly session-scoped.

Return to RACK and choose **Check again**.

Expected:

~~~text
Available · <TOPO version>
~~~

## 4. Make an explicit RACK request

In RACK:

1. enable **Include TOPO context in this prompt build**;
2. set subject to `project:rack`;
3. set a concrete purpose such as `prepare implementation`;
4. choose **Preview context**.

Expected:

- RACK shows a Context Packet ID;
- `writing.locale` is selected;
- `project.test-note` is selected;
- `internal.secret` is **not** selected;
- values are not unnecessarily displayed in the compact selection summary.

If restricted memory appears, stop the alpha test and treat it as a security defect.

## 5. Inspect the generated prompt before installation

The destination preview should now be the context-aware prompt.

Expected:

- normal Rack practice remains present;
- a separate **Organisational context** section appears;
- the permitted TOPO values appear there;
- `must-not-cross-local-boundary` does not appear;
- the context section says that it does not override Rack instructions or boundaries.

Turn TOPO context off again.

Expected:

- the organisational context disappears from the preview;
- the underlying Rack source files have not changed.

## 6. Build with context

Enable TOPO context again, preview it, then **Build into Rack**.

Inspect the generated `build.json`.

Expected context provenance includes:

- source `topo`;
- Context Packet ID;
- stable context digest;
- subject;
- purpose;
- generation/expiry metadata;
- permissions;
- selected object IDs.

The canonical Rack source digest should be the same as an equivalent build made without TOPO context.

## 7. Test context change detection

Back in TOPO, change the ordinary `writing.locale` value, or add another ordinary claim for the same subject.

In RACK, refresh the TOPO context preview.

Expected:

- a new Context Packet may have a new packet ID;
- if the selected context content changed, the context digest changes;
- an installed build made with the old context is reported as needing a rebuild;
- canonical Rack source still reports no source change.

Now refresh TOPO context again **without changing any memory**.

Expected:

- the packet ID may change;
- the semantic context digest remains the same;
- a build should not become stale merely because TOPO generated a fresh packet.

## 8. Revoke access

In TOPO choose **Stop sharing**.

In RACK choose **Check again**.

Expected:

- TOPO is detected but context is unavailable;
- RACK explains that Local app access is off;
- a new context request cannot be made.

Restart TOPO.

Expected:

- Local app access is off again even if it was enabled before restart.

## 9. Record qualitative findings

Beyond pass/fail, note:

- was “subject” understandable without knowing the protocol?
- was “purpose” specific enough to influence what you expected TOPO to return?
- did preview-before-use feel reassuring or cumbersome?
- was it clear which application owned memory and which owned practice?
- did the sensitivity boundary feel understandable?
- did the workflow feel like two cooperating tools, or like plumbing exposed to the user?
- where did you expect automatic behaviour that was intentionally explicit?

These findings should shape the next UX iteration before adding more infrastructure.

## Exit criterion

The paired local alpha is ready to move from engineering proof to regular self-use when this flow works repeatedly without needing a terminal, direct database access or knowledge of the transport implementation.

Only then should 0.4 external-state ingestion become the main implementation focus.
