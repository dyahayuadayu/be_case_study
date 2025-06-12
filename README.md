
# 📦 Payroll API System

**Back End Case Study - Dealls**

This repository contains a Payroll API system built with ExpressJS, Sequelize, PostgreSQL, and JWT-based authentication. The system supports both admin and employee roles to manage payrolls, attendances, reimbursements, overtimes, and payslip generation. It also includes logging, audit trails, and testing support.

📌 **GitHub Repository**: [github link](https://github.com/dyahayuadayu/be_case_study)
📌 **Postman API Collection**: [Postman Collection](https://martian-robot-713148.postman.co/workspace/My-Workspace~49709345-8b02-4098-8ae8-62d56c3009d1/collection/7117163-f2a88de2-0404-4f1b-bb7a-6ffed838f76b?action=share&creator=7117163)

---

## 1. 🚀 Overview

This project provides:

- Clean architecture implementation
- JWT authentication
- Sequelize ORM with PostgreSQL
- Audit trail via Sequelize hooks
- Integration & load testing

---

## 2. 🛠️ Tooling & Stack

| Category         | Tool/Library                        |
|------------------|-------------------------------------|
| Framework        | ExpressJS                           |
| ORM              | Sequelize                           |
| Database         | PostgreSQL                          |
| Authentication   | JWT                                 |
| Validation       | Joi                                 |
| Logging          | Request & Audit via Sequelize Hooks |
| Integration Test | Jest + Supertest                    |
| Load Testing     | Artillery                           |

---

## 3. 🏗️ System Architecture

This project uses **Clean Architecture** with clear separation between:

- **Controllers** – handle HTTP requests
- **Services** – contain business logic
- **Repositories** – handle Sequelize DB queries
- **Models** – Sequelize model definitions
- **Middlewares** – JWT auth, logging, RBAC
- **Utils** – e.g., payroll calculation helpers

---

## 4. 📁 Project Structure

| Folder          | Description                                    |
|-----------------|------------------------------------------------|
| `configs/`      | DB configs and environment variables           |
| `controllers/`  | Route handlers                                 |
| `middlewares/`  | Auth, request logging, audit                   |
| `models/`       | Sequelize model definitions                    |
| `repositories/` | DB operations using Sequelize                  |
| `routes/`       | Define application endpoints                   |
| `services/`     | Business logic layer                           |
| `utils/`        | Payroll calculation and helper functions       |
| `validators/`   | Joi schemas for request validation             |
| `helpers/`      | Common helpers (e.g., response formatter)      |
| `tests/`        | Integration/unit tests                         |
| `load_test/`    | Artillery scripts and load test reports        |

---

## 5. ⚙️ Middlewares

### 5.1 Request Logging

Automatically logs:

- HTTP method
- URL
- User ID
- IP address
- Request body
- Request ID

Saved to `request_logs` table.

### 5.2 Audit Logging

On data changes (create/update), Sequelize hooks log:

- Model name
- Operation type
- Modified fields
- User ID
- Request ID
- IP address

Saved to `audit_logs` table.

---

## 6. 🔧 Running the Service

### Seed dummy users before starting:

```bash
node seed.js
```

### Start development server (with nodemon):

```bash
npm run dev
```

---

## 7. ✅ Integration Testing

Using **Jest** and **Supertest**:

```bash
npm run test
```

---

## 8. 📈 Load Testing

Before load testing:

- Ensure users are seeded in the test database
- Because integration tests truncate all data in the environment

### Steps:

1. Generate users:

```bash
node seed.js
```

2. Run load testing:

```bash
npm run loadtesting
```

3. Open `report-generator.html` and upload the Artillery JSON output file.

The dashboard will show charts and metrics such as:

- Summary Metrics
- Endpoint Status Breakdown
- Response Time per Endpoint

---
