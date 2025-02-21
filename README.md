# Employee Tracker

## Description
The Employee Tracker is a command-line application that allows users to manage a company's employee database. Built using **Node.js**, **PostgreSQL**, and **Inquirer.js**, this system provides an interface for performing essential operations such as viewing, adding, and updating employee records.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Database Schema](#database-schema)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Installation
1. Clone the repository:
   git clone https://github.com/validai/Employee-Tracker

2. Navigate to the project directory:
   cd employee-tracker
   
3. Install dependencies:
   npm install
   
4. Set up the database in PostgreSQL:
   - Create a database named `employee_tracker`
   - Run the `schema.sql` file to create tables
   - Optionally, seed the database using `seeds.sql`
5. Configure environment variables:
   - Create a `.env` file in the root directory
   - Define database credentials:
     DB_USER=your_postgres_username
     DB_HOST=localhost
     DB_NAME=employee_tracker
     DB_PASSWORD=your_postgres_password
     DB_PORT=5432
     

## Usage
1. Start the application:
   npm start
   
2. Use the interactive menu to:
   - View departments, roles, and employees
   - Add departments, roles, and employees
   - Update employee roles

## Features
- View all departments, roles, and employees
- Add new departments, roles, and employees
- Update an employee’s role
- Store and manage data using PostgreSQL
- User-friendly command-line interface

## Technologies Used
- **Node.js** - Backend runtime environment
- **PostgreSQL** - Relational database
- **Inquirer.js** - Command-line user interface
- **dotenv** - Environment variable management

## Database Schema
The application consists of three tables:

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

## Future Enhancements
- Implement search functionality
- Add manager filtering for employees
- Improve error handling and validation

## License
This project is licensed under the MIT License.

