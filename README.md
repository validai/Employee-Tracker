# Employee Tracker

## Description
The **Employee Tracker** is a command-line application that allows users to manage a company's employee database. Built using **Node.js**, **PostgreSQL**, and **Inquirer.js**, this system provides an interface for performing essential operations such as **viewing, adding, and updating employee records**.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Database Schema](#database-schema)
- [Future Enhancements](#future-enhancements)
- [License](#license)
- [Walkthrough Video Link](#video-link)

---

## Installation
1. Clone the repository:
   git clone https://github.com/validai/Employee-Tracker

2. Navigate to the project directory:
   cd employee-tracker

3. Install dependencies:
   npm install

4. Set up the PostgreSQL database:
   - Create a database named `employee_tracker`
   - Run the `schema.sql` file to create tables:
     psql -U postgres -d employee_tracker -f db/schema.sql
   - (Optional) Seed the database with sample data:
     psql -U postgres -d employee_tracker -f db/seeds.sql

5. Configure environment variables:
   - Create a `.env` file in the root directory:
   touch .env

   - Define the following variables in `.env`:
     
     DB_USER=your_postgres_username
     DB_HOST=localhost
     DB_NAME=employee_tracker
     DB_PASSWORD=your_postgres_password
     DB_PORT=5432
     
6. Ensure you have a `.gitignore` file to exclude unnecessary files:
   
   node_modules/
   .env
---

## Usage
1. Start the application:
   npm start

2. Use the interactive menu to:
   - View all **departments, roles, and employees**
   - **Add** a new department, role, or employee
   - **Update** an employee’s role

---

## Features
- **View all departments, roles, and employees**
- **Add new** departments, roles, and employees
- **Update an employee’s role**
- **Persistent storage** using PostgreSQL
- **User-friendly CLI interface** powered by Inquirer.js

---

## Technologies Used
- **Node.js** - JavaScript runtime for backend execution
- **PostgreSQL** - Relational database for storing employee records
- **Inquirer.js** - CLI prompts for user interaction
- **dotenv** - Secure environment variable management
- **console.table** - Formatting results in a readable table

---

## Database Schema
The application consists of three main tables:

### Department Table
| Column   | Type      | Constraints |
|----------|----------|-------------|
| id       | SERIAL   | PRIMARY KEY |
| name     | VARCHAR  | NOT NULL    |

### Role Table
| Column       | Type       | Constraints         |
|-------------|-----------|---------------------|
| id          | SERIAL    | PRIMARY KEY        |
| title       | VARCHAR   | NOT NULL           |
| salary      | DECIMAL   | NOT NULL           |
| department_id | INTEGER  | REFERENCES department(id) |

### Employee Table
| Column     | Type     | Constraints                  |
|-----------|---------|------------------------------|
| id        | SERIAL  | PRIMARY KEY                  |
| first_name | VARCHAR | NOT NULL                     |
| last_name  | VARCHAR | NOT NULL                     |
| role_id    | INTEGER | REFERENCES role(id)          |
| manager_id | INTEGER | REFERENCES employee(id), NULLABLE |

---

## Future Enhancements
- **Implement employee search**
- **Improve validation and error handling**
- **Integrate additional queries like salary reports**

---

## License
This project is licensed under the **MIT License**.


---

## Video Link
https://www.loom.com/share/9dcf84ab552b457c824ad320cdbac426?sid=eac6536c-d803-4eae-ad81-c5b0613618ee
