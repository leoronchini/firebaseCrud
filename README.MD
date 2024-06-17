# firebaseCrud

This project is an simple CRUD (In this time, only Create) using  Node.Js and Firebase. The purpose is create a data into Firestore database using Functions.

**Tools and stacks used in this project:**
- `Node.js`
- `Firebase`
- `Cloud Functions`
- `Firestore database`

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


## Next steps
To complete this project, some steps will still be taken, such as:

- ...



