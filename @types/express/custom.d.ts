// custom.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { Express } from 'express-serve-static-core';
import { User } from '../../src/entities/user.entity'

// export {}
// //To be able to use req.user in authentication, we must extend Expresses request interface and add property user to it
// declare global {
//   namespace Express {
//     export interface Request {
//       user?: User; // Add the user property and specify its type (User in this case)
//     }
//   }
// }



// declare module 'express-serve-static-core' {
//   interface Request {
//     user: User
//   }
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}