# firebaseCrud

This project is an simple CRUD (In this time, only Create) with Node.Js, Firebase and jest unit tests. The purpose is create a data into Firestore database using Functions.

**Tools and stacks used in this project:**

- `Node.js`
- `Firebase`
- `Cloud Functions`
- `Firestore database`
- `Jest`

## Project Setup

Follow this instructions to run the project in your computer.

Run the following commands to install dependencies and run in local ambient

```bash
$ git clone https://github.com/leoronchini/firebaseCrud.git
$ npm install

```

To run the project into emulator:

```bash
$ cd functions
$ npm install
$ npm run serve
```

To see the firestore local database, access the link generated in your terminal. Will look like: http://127.0.0.1:4000/firestore/default/

To call the API into your Postman, you can use:

```bash
curl --location 'http://localhost:5001/<YOUR_PROJECT_ID>/us-central1/api/addData' \
--header 'Content-Type: application/json' \
--data '{"name": "John Doe"}'
```

To run the unit tests, run the following command

```bash
npm test
```

## Screenshots

![Screenshot1](./assets/Screenshot1.png?raw=true)
![Screenshot2](./assets/Screenshot2.png?raw=true)

## Next steps

To complete this project, some steps will still be taken, such as:

- Implement another functionalities (Read, Update, Delete, authentication, etc);
- Optimize queries and access to firestore;
- Create a swagger to routes;
- ...

## About the architecture

The layered architecture was chosen for this project to enhance code organization and maintainability.
In this architecture, we have Controllers (input and output logic), Services (business logic) and Repositories (database communication).

Each layer has a clear responsibility, which simplifies debugging and allows for independent testing and development.
Furthermore, the layered architecture promotes the scalability necessary for the project.
