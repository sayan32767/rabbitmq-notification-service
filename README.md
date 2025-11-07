# 🐇 Microservices Task Platform (Node.js + RabbitMQ + MongoDB + Docker)

A simple microservices-based project demonstrating how to use **RabbitMQ** for message queuing between independent services.  
The system contains three core services:

- **User Service** — Handles user registration & authentication 
- **Task Service** — Creates tasks & pushes them to MongoDB + RabbitMQ  
- **Notification Service** — Consumes task events from RabbitMQ and logs notifications  

This project is containerized using **Docker** and orchestrated using **Docker Compose**.

---

## 🚀 Features

### User Service
- Register a new user  
- Stores user data in **MongoDB**  
- Exposes REST API endpoints  

### Task Service
- Create new tasks  
- Saves tasks to **MongoDB**  
- Publishes `"task_created"` messages into RabbitMQ  

### Notification Service
- Listens to RabbitMQ queue `"task_created"`  
- Consumes messages & logs notifications  
- Demonstrates how async communication works between microservices  

---

## 🏗️ Architecture Overview

    +-------------------+           +------------------+
    |   User Service    |           |   Task Service   |
    | (Express + Mongo) |  writes   | (Express + MQ)   |
    +---------+---------+  users    +--------+---------+
              |                            |
              |  HTTP Requests             |  Publishes
              |                            v
       +------+---------------------------- RabbitMQ -------------+
       |                                                          |
       |                                                          v
    +----+----------------------+                      +-----------------------+
    |  MongoDB (docker volume)  |                      | Notification Service  |
    |   Stores users & tasks    |                      |  (RabbitMQ consumer)  |
    +---------------------------+                      +-----------------------+



---

## 🐳 Docker Setup

This project uses **Docker Compose** to run:

- MongoDB  
- RabbitMQ  
- User Service  
- Task Service  
- Notification Service  

### Start the entire stack

```bash
docker-compose up --build
```

### Stop everything

```bash
docker-compose down
```
---
### Contributing
Feel free to submit PRs or raise issues if you'd like to improve the project!
