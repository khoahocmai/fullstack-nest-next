# Fullstack Application with Next.js & NestJS

This repository features a fullstack web application built with [Next.js v14](https://nextjs.org/) (TypeScript) for the frontend and [NestJS v10](https://nestjs.com/) (TypeScript) for the backend. The project includes various authentication features using JWT (JSON Web Token) and MongoDB for the database, managed through MongoDB Atlas. Docker setup files are provided for your convenience.

## Technologies Used

- **Frontend**: Next.js v14, TypeScript, auth.js v5 (next-auth)
- **Backend**: NestJS v10, TypeScript, JWT for authentication
- **Database**: MongoDB (managed via MongoDB Atlas)

## Main Features

- **Project Setup and Documentation**

  - How to start the project from scratch, including reading documentation and initial setup.

- **User CRUD Operations**

  - Implement CRUD operations for users using both Next.js and NestJS.

- **JWT Integration**

  - Secure the backend API endpoints with JSON Web Tokens (JWT).

- **Email Functionality**

  - Send emails using predefined templates with NestJS.

- **Authentication Processes**
  - **Registration**: New account registration requires email verification.
  - **Login**: If the account is not verified, email verification is required before login.
  - **Forgot Password**: Password recovery requires email confirmation.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) >= 14.x
- MongoDB Atlas account (for database management)

### Clone the Repository

```bash
git clone https://github.com/khoahocmai/fullstack-next-nest.git
cd fullstack-nextjs-nestjs
```
