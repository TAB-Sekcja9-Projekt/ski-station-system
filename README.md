# Ski Station Management System

Welcome to the **Ski Station Management System** repository! This project is a full-stack application designed to manage ski station operations such as ticket sales, lift usage tracking, reporting, and more. Below you will find detailed instructions on how to set up, run, and maintain the project, including database integration with PostgreSQL and .NET migrations.

---

## Table of Contents

1. [Overview](#overview)  
2. [Tech Stack](#tech-stack)  
3. [Prerequisites](#prerequisites)  
4. [Repository Structure](#repository-structure)  
5. [Installation](#installation)  
   - [1. Clone the Repository](#1-clone-the-repository)  
   - [2. Client Setup (React + TypeScript)](#2-client-setup-react--typescript)  
   - [3. Server Setup (.NET + PostgreSQL)](#3-server-setup-net--postgresql)  
6. [Database Configuration](#database-configuration)  
   - [Connection String](#connection-string)  
   - [Applying Migrations](#applying-migrations)  
   - [Seeding the Database](#seeding-the-database)  
   - [Updating the Database Schema](#updating-the-database-schema)  
7. [Running the Application](#running-the-application)  
8. [Testing the API](#testing-the-api)  
9. [Troubleshooting](#troubleshooting)  
10. [Contributing](#contributing)  

---

## Overview

The goal of this system is to provide a **client-server** application that manages various aspects of a ski station:
- Selling tickets and passes
- Tracking lift usage
- Generating management and operational reports
- Blocking or unlocking tickets
- Additional administrative features

All data is stored in **PostgreSQL**, and the back end is built with **.NET** (ASP.NET Core + Entity Framework Core), while the front end uses **React** and **TypeScript**.

---

## Tech Stack

- **Client:** React + TypeScript  
- **Server:** .NET (ASP.NET Core) + Entity Framework Core  
- **Database:** PostgreSQL  
- **Other:**  
  - Node.js (for the React application)  
  - pgAdmin or psql (optional, for managing PostgreSQL)  

---

## Prerequisites

1. **Node.js** (v14 or higher)  
   - [Download Node.js](https://nodejs.org/)  
2. **.NET SDK** (6.0 or higher recommended)  
   - [Download .NET](https://dotnet.microsoft.com/download)  
3. **PostgreSQL**  
   - [Download PostgreSQL](https://www.postgresql.org/download/)  
   - Install pgAdmin if you want a GUI client to manage the database.  
4. **Git**  
   - [Download Git](https://git-scm.com/downloads)  

Make sure each of these tools is installed and accessible via your system’s PATH.

---

## Repository Structure

```
ski-station-system/
├── client/              # React + TypeScript application
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── ...
├── server/              # .NET (ASP.NET Core) application
│   ├── Controllers/
│   ├── Data/
│   ├── Migrations/
│   ├── Models/
│   ├── Program.cs
│   ├── DesignTimeDbContextFactory.cs
│   ├── appsettings.json
│   └── ...
├── docs/                # Project documentation
└── README.md            # This file
```

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/<your-organization-or-username>/ski-station-system.git
cd ski-station-system
```

### 2. Client Setup (React + TypeScript)

1. **Navigate to the client folder:**
   ```bash
   cd client
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```
3. **(Optional) Configure environment variables:**  
   If you have environment-specific settings, place them in `.env`, `.env.development`, etc. (They are ignored by Git via `.gitignore`.)

### 3. Server Setup (.NET + PostgreSQL)

1. **Navigate to the server folder:**
   ```bash
   cd ../server
   ```
2. **Restore .NET dependencies:**
   ```bash
   dotnet restore
   ```
3. **Check `appsettings.json`:**  
   Make sure your `appsettings.json` contains a valid connection string (see [Database Configuration](#database-configuration)).

---

## Database Configuration

### Connection String

In the **server** folder, you’ll find `appsettings.json`. Inside, there should be a `"ConnectionStrings"` section. For example:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=ski_station_db;Username=postgres;Password=YOUR_PASSWORD"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

- **Host:** Hostname or IP of your PostgreSQL server (often `localhost`).  
- **Port:** Default is `5432`.  
- **Database:** The database name (e.g., `ski_station_db`).  
- **Username & Password:** Credentials for your PostgreSQL user (often `postgres`).

### Applying Migrations

We use **Entity Framework Core** migrations to manage database schema changes.

1. **Open Package Manager Console** in Visual Studio **or** open a terminal in the `server` folder.
2. **Create** the initial migration (if none exists yet):
   ```powershell
   Add-Migration InitialCreate
   ```
   or via CLI:
   ```bash
   dotnet ef migrations add InitialCreate
   ```
3. **Apply** the migration to your database:
   ```powershell
   Update-Database
   ```
   or
   ```bash
   dotnet ef database update
   ```

### Seeding the Database

If you have a **SeedData** class (for example, `SeedData.cs` in `server`) that populates the database with initial data, it is typically called in `Program.cs` after the app is built. On first run, the app checks if the data exists, and if not, it inserts sample data.

Example snippet in `Program.cs`:

```csharp
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    SeedData.Initialize(services);
}
```

After you run the server, check your database to confirm the seeded data was inserted.

### Updating the Database Schema

When you **change your models** or **add new ones**:

1. **Add a new migration** (e.g., `Add-LiftsTable`):
   ```powershell
   Add-Migration AddLiftsTable
   ```
2. **Apply** the migration:
   ```powershell
   Update-Database
   ```
3. **Commit** and **push** the generated migration files in the `Migrations` folder so everyone on the team can sync.

---

## Running the Application

1. **Start the PostgreSQL server** (if not already running). If you use Docker, run:
   ```bash
   docker-compose up -d
   ```
   or ensure your local PostgreSQL service is up.

2. **Run the .NET server**:
   ```bash
   cd server
   dotnet run
   ```
   By default, it may listen on `https://localhost:5001/` or `http://localhost:5000/`.

3. **Run the React client** (in a separate terminal):
   ```bash
   cd client
   npm run dev
   ```
   or
   ```bash
   yarn run dev
   ```
   The client typically runs on `http://localhost:3000`.

---

## Testing the API

1. **Swagger UI (if enabled):**  
   Navigate to `https://localhost:5001/swagger/index.html` (or the relevant port) to see a list of available endpoints and test them directly in the browser.

2. **Postman/Insomnia:**  
   Alternatively, use any REST client to send requests to your endpoints. For example:
   - `GET https://localhost:5001/api/Tickets`
   - `POST https://localhost:5001/api/Tickets`

3. **Check the Database:**  
   Use **pgAdmin** or `psql` to confirm the data is being persisted in the `ski_station_db` database.

---

## Troubleshooting

- **Migrations Not Found**  
  - Make sure you have installed the EF Tools package:  
    ```powershell
    Install-Package Microsoft.EntityFrameworkCore.Tools
    ```
  - Ensure you’re in the correct folder (`server`) and the `ApplicationDbContext` is properly configured.

- **Connection Issues**  
  - Verify your `appsettings.json` connection string matches the actual PostgreSQL credentials.
  - If you’re running PostgreSQL via Docker, confirm the container is up and the port mapping is correct.

- **Duplicate Migrations**  
  - If multiple people add migrations at once, you may need to rebase or merge branches carefully to avoid conflicts.

- **Seed Data Not Appearing**  
  - Check the `SeedData.Initialize` method. Ensure you call it before `app.Run()` in `Program.cs`.
  - Verify your logic doesn’t skip seeding if any records exist.

---

## Contributing

1. **Branching**: Create a feature branch for new features or bug fixes (e.g., `feature/add-reporting-module`).  
2. **Pull Requests**: Submit a pull request to the `main` (or `develop`) branch. Make sure to include a clear description of changes.  
3. **Code Reviews**: Wait for at least one other team member to review and approve before merging.  
4. **Documentation**: Update the `docs/` folder (if necessary) and this README whenever you add significant new functionality or architectural changes.

---

Thank you for contributing to the **Ski Station Management System**! If you have any questions or run into issues, please reach out in the team’s Discord channel.

With love
Zoreslav Sushko
