import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';





// const authMiddleware = (req:Request, res:Response, next:NextFunction) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');

//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   try {
//     if (!process.env.JWT_SECRET) {
//       return res.status(500).json({ message: 'JWT secret is not defined' });
//     }
//     const decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
//     req.user = { id: decoded.id as string };
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// };

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;

