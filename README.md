
# Farm 2 Table

## Overview
Farm 2 Table is a web application that connects local farmers with consumers within their geographical area. The platform allows farmers to post their farm produce, while consumers can browse and purchase directly from nearby farmers, promoting fresh, organic, and locally sourced products.

## Features
- **Farmer Profiles**: Farmers can create profiles and list their available produce with details such as price, quantity, and location.
- **Consumer Interface**: Consumers can browse listings by location, filter by product type, and contact farmers directly for purchases.
- **Geolocation**: Users are matched based on their proximity to ensure fresh and timely delivery of farm products.
- **Mobile-Responsive**: The platform is fully responsive and can be accessed from mobile devices.

## Technology Stack
- **Frontend**: 
  - React.js
  - HTML5/CSS3
  - JavaScript (ES6+)
  
- **Backend**: 
  - Node.js
  - Express.js

- **Database**: 
  - MySQL (or PostgreSQL, based on preference)

## Installation and Setup
To run this project locally:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/farm2table.git
    cd farm2table
    ```

2. **Install the dependencies**:
    - Frontend:
      ```bash
      cd frontend
      npm install
      ```

    - Backend:
      ```bash
      cd backend
      npm install
      ```

3. **Create a `.env` file in the backend directory**:
    Add the following environment variables:
    ```env
    PORT=5000
    DB_HOST=your_database_host
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_NAME=your_database_name
    ```

4. **Set up the SQL database**:
    - Make sure you have MySQL (or your preferred SQL database) installed.
    - Create the database manually using a MySQL client:
      ```sql
      CREATE DATABASE farm2table;
      ```

    - Run any migration scripts you’ve written to create the necessary tables.

5. **Run the application**:
    - Frontend:
      ```bash
      npm start
      ```
    - Backend:
      ```bash
      npm run server
      ```

6. **Access the application**:
    The frontend will be available at `http://localhost:3000` and the backend API at `http://localhost:5000`.

## Folder Structure
    ```
    /frontend
        /src
            /components - Reusable components
            /pages - Individual page components
            /styles - Global and page-specific styles
    /backend
        /routes - API routes
        /controllers - Business logic
        /models - SQL table models
        /migrations - SQL migration scripts
    ```

## Contributing
If you’d like to contribute to Farm 2 Table, feel free to submit a pull request. For major changes, please open an issue to discuss what you would like to change.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
- **Project Lead**: Ian Kipkorir
- **Email**: your-email@example.com
- **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)

### Notes:
1. **Environment Variables**: You will need `DB_HOST`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` in your `.env` file to connect to your SQL database.
2. **Database Setup**: Instructions include creating the SQL database manually and using migration scripts for table creation (if you have any).
3. **Migrations Folder**: This folder can contain SQL scripts for creating and managing the database schema.

Let me know if you need help with specific sections like database migrations or setting up SQL with Node.js!