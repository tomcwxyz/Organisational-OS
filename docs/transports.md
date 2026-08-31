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

### 3. Local native / Bridge transport

The likely next local transport is a small Bridge or native IPC surface.

Requirements:

- no open public listening port by default;
- explicit node discovery;
- authenticated local requests;
- capability discovery;
- permission/consent checks;
- request correlation;
- bounded payloads;
- clear failure when the target node is unavailable.

Whether the first implementation uses loopback HTTP, Unix-domain sockets/named pipes, MCP or a Tauri/native mechanism should be decided by implementation evidence rather than embedded in the OOS specification.

### 4. Federated relay

Cloud/local federation adds durable store-and-forward delivery.

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

## Transport is replaceable

A useful test is:

> Can we replace the transport without changing what Object, Event, Context or Action means?

If not, transport concerns have leaked into the organisational protocol.

## First live proving path

~~~text
TOPO local SQLite
       │
       │ governed context resolution
       ▼
TOPO oos context CLI
       │
       │ JSON Context Packet
       ▼
RACK command transport
       │
       ▼
RACK ContextSource
       │
       └── controlled execution/build integration next
~~~

This path is intentionally local-only.

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
