<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">NestJS Project</h1>

<p align="center">
  A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
</p>

## Table of Contents

- [About](#about)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [License](#license)

## About

This project is built using [NestJS](https://nestjs.com/), a framework for building efficient, scalable Node.js server-side applications. NestJS uses modern JavaScript, is built with TypeScript (preserves compatibility with pure JavaScript), and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your local machine:

- Node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.x)
- Docker (optional, for running the database)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

3. Copy the `env.template` file and rename it to `.env`:

   ```sh
   cp env.template .env
   ```

4. Update the environment variables in the `.env` file.

### Running the Application

1. Start the database (if using Docker):

   ```sh
   docker-compose up -d
   ```

2. Start the application:

   ```sh
   npm run start:dev
   # or
   yarn start:dev
   ```

3. The application will be running at `http://localhost:3000`.

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```properties
DB_HOST=your_db_host
DB_PORT=your_db_port
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
WOMPI_BASE_URL=https://api-sandbox.co.uat.wompi.dev/v1
WOMPI_PUBLIC_KEY=your_wompi_public_key
WOMPI_SECRET_INTEGRITY=your_wompi_secret_integrity
```
