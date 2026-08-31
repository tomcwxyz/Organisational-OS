# Transports

The Organisational OS protocol defines **meaning and interaction**, not one mandatory network transport.

Object, Event, Context and Action should remain recognisable whether they move through a file, local process boundary, HTTP service, Bridge or relay.

## Current transport ladder

### 1. Fixtures and files

Used for conformance and semantic testing.

This is the lowest-cost way to prove that two implementations understand the same object without choosing deployment infrastructure.

### 2. Local command / stdout

The first live local interoperability proof uses TOPO's CLI:

~~~sh
topo --store ~/.topo/topo.sqlite oos context \
  --subject project:rack \
  --purpose "review implementation" \
  --requester rack
~~~

TOPO returns a JSON Context Packet.

RACK has a Node-specific transport adapter that can execute this command without a shell and pass the packet through its protocol-neutral ContextSource abstraction.

This is deliberately **experimental transport plumbing**, not the preferred permanent UX.

It proves several architectural properties cheaply:

- RACK and TOPO remain separate applications;
- RACK does not read TOPO's SQLite database;
- context crosses an explicit protocol boundary;
- TOPO remains authoritative for selection and sensitivity filtering;
- RACK remains authoritative for practice;
- the transport can later be replaced without changing the semantic contract.

### 3. Authenticated desktop-local endpoint

Implementation evidence from TOPO and RACK now gives us a concrete first desktop transport profile without making it part of the semantic protocol.

While TOPO desktop is running it publishes a user-local discovery record containing:

- protocol/profile version;
- node identity and application version;
- a loopback-only endpoint;
- a random per-process bearer token;
- process/start metadata.

RACK validates that discovery, checks TOPO's capabilities, and requests a purpose-bound Context Packet over the loopback endpoint.

Current profile requirements:

- bind only to `127.0.0.1`, using an ephemeral port;
- never advertise or accept a non-loopback endpoint;
- protect discovery credentials with user-only file permissions where the OS supports that directly;
- authenticate every request with a high-entropy per-process token;
- treat discovery as presence, not permission;
- start context sharing disabled on each provider launch;
- require explicit person-controlled consent before advertising/serving context;
- expose capability discovery before application requests;
- bound request/response sizes and timeouts;
- make unavailable/stale discovery fail clearly;
- keep the endpoint read-only unless a future capability explicitly adds stronger authority;
- preserve the same Object/Event/Context/Action semantics as other transports.

The current TOPO profile exposes Context only after the person explicitly enables **Local app access** for that TOPO session, and fixes the disclosure ceiling to ordinary + personal memory. A client cannot request elevation to sensitive/restricted memory through this endpoint. Restarting TOPO revokes the session permission.

This is a **local application transport**, not yet the full OOS Bridge. It is deliberately small enough to replace later with named pipes, Unix-domain sockets or another native mechanism without changing Context semantics.

### 4. Bridge + federated relay

Cloud/local federation adds a Bridge plus durable store-and-forward delivery.

The local Bridge has broader responsibilities than the desktop endpoint: outbound relay connection, node discovery/routing, inbox/outbox, catch-up, cursors, consent and capability negotiation.

The relay should route Events and requests while knowing as little as practical about organisational content.

It is expected to support:

- node authentication;
- durable delivery;
- per-consumer cursors;
- acknowledgements;
- expiry;
- offline catch-up;
- request/response correlation.

The relay must not become the canonical organisational database.

### 5. Transport evolution

The current ladder is therefore:

~~~text
fixtures/files
      ↓
CLI/stdout
      ↓
authenticated desktop-local endpoint
      ↓
Bridge + relay
~~~

## Transport is replaceable

A useful test is:

> Can we replace the transport without changing what Object, Event, Context or Action means?

If not, transport concerns have leaked into the organisational protocol.

## Current local proving paths

The cross-repository automated smoke uses the CLI transport because it is deterministic and headless:

~~~text
TOPO local SQLite
       │
       ▼
TOPO oos context CLI
       │
       ▼
RACK ContextSource
       │
       ▼
context-aware prompt build
~~~

The human-facing desktop alpha uses the authenticated local endpoint:

~~~text
TOPO desktop
  context resolver
       │
       ├── user-local discovery + token
       │
       ▼
127.0.0.1 ephemeral endpoint
       │
       ▼
RACK desktop
  capability check
       │
       ├── if disabled: ask person to enable
       │   Local app access in TOPO
       │
       ▼
preview Context Packet
       │
       ▼
context-aware prompt build
~~~

Both paths preserve the same Context Packet and build-provenance semantics. The desktop path does not read TOPO SQLite directly and does not require the user to configure a TOPO CLI executable.

These paths are intentionally local-only.

The first cloud/local proof comes later:

~~~text
FlowLance cloud
      │
     Event
      ▼
    Relay
      │
    Bridge
      │
      ▼
TOPO external-state layer
      │
      └── context to RACK
~~~
