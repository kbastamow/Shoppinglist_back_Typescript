# Backend Project "Shopping list" with Node.js and Typescript

## Description

This is the backend for a simple shopping list app, where users can log in and create a shopping list or lists. 
The project is a study of typescript usage which is why the readme contains explanations and clarifications, rather like study notes.

## Tech and tools

- Node.js and Express
- MySQL database
- Typeorm as the ORM
- Express-validator to validate requests from client
- Bcrypt & JSON webtoken for password security and user validation

Dev:
- Eslint & prettier for linting

## Project structure

At the root we have **index.ts**.

**Config** folder holds the database connection.

**Dist** folder is where js files are created on compilation.

**Src** holds the files that are worked on and has the following structure:

    SRC: 

    ├── controllers 
    │   ├── CategoryController.ts 
    │   ├── ItemController.ts 
    │   ├── ListController.ts 
    │   └── UserController.ts 
    │
    ├── entities 
    │   ├── category.entity.ts 
    │   ├── item.entity.ts 
    │   ├── list.entity.ts 
    │   └── user.entity.ts 
    │
    ├── interfaces 
    │   ├── IAuthRequest.ts 
    │   └── IJwtPayload.ts 
    │ 
    ├── middlewares 
    │   ├── authentication 
    │   │   └── authentication.ts 
    │   │
    │   └── validators 
    │       └── userValidator.ts 
    │
    └── routes
        ├── categories.ts
        ├── items.ts
        ├── lists.ts
        └── users.ts

where **controllers** holds the logic for the endpoints; **entities** are typeorm models for the database tables; **interfaces** holds type definitions; **middlewares** contains user authentication code through token, and validators for client requests; and finally, endpoint paths are defined in **routes** .