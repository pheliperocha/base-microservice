# Base Microservice

- Framework/Library Independent
- Uncoupled components
- Flexibility
- Highly Testability

===

## Entries

- Server (Keep listening)
- Workers (Faas/CronJobs/Consumers)

===

## Layers

- Infra Layer
  - Entrypoints
  - Frameworks
  - Drivers

- Adpter Layer
  - Controllers
  - Protocols

- Core
  - Use cases
  - Services
  - Command
  - Repository
  - Event
  - Entities

===

## Entrypoint

- Functions
- Jobs
- REST
  - Koa
  - Express
  - Fastify
- gRPC
- jsonRPC
- graphQL
- Websocket
  - Socket.io
- Pubsub/Queue
  - MQTT
  - NATS
  - AMQP
  - RabbitMQ
  - Pub/Sub
  - SNS
  - GCloud PubSub
  - ZeroMQ
  - Queue
  - Redis
    - Bull
  - SQS
  - Command/Event
  - EventEmitter2
  - Kafka
  - Kinesis

===

## Dataprovider

- Databases
  - Mongo
  - Postgres
  - MySQL
  - MariaDB
  - sqlite
  - Redis
  - Memcached

- DB Framework
  - Sequelize
  - TypeORM
  - Mongoose
  - Knex

- File System
- 3rd parties
- Network devices

---

## Infra

Kubernetes
Helm
Sops
Terraform
Docker
Lambda
