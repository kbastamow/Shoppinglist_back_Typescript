//Necessary if I want to use req.user 

import { Request } from 'express';
import { User } from '../entities/user.entity';

// Define a custom interface that extends Request
export interface IAuthRequest extends Request {
  user?: User; 
}