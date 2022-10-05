## Employees service (Node + React)

To start up with the project use docker-compose command within project root folder:

`docker-compose up -d`

This will launch five containers: with postgres database, pgAdmin portal, database seeder, express server and react client.

The web server will be available on: `localhost:5000`. It will support following routes:

- `/token` GET
- `/users` GET/POST
- `/users/{id}` GET
- `/positions` GET

For authorization the user JSON Web Token will be used. It will represent default application user and will be active for 40min. There is a restriction for its usage only once per request.

The client react application will be running on `localhost:3000`. It will give to user the possibility to play with application through web interface. It will display table of employees with personal photos. Photos are thumbed with tinify.com service to 70x70px. Also it will give the ability to add new employee and request for specified employee by id.

The postgres server will be installed on `localhost:5432`.

The main purpose of the database seeder is the filling of database with sample data (45 User records + 13 Position records). After successful seeding seeder will be exited.

pgAdmin panel will be available for testing purposes on localhost: 
`http://localhost:15432/`

To access it you can use following credentials on the splash screen:
- email: **admin@pgadmin.com**
- password: **password**

After that you will be able to add the project database to panel, use for that Add Server dialog with following credentials:

- Host: **postgres**
- Username: **username**
- Password: **password**

