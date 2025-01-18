import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

interface Requestx {
  body: {
    username: string;
    email: string;
    password: string;
  };
}
interface RequestWithCookies extends Request {
  cookies: { [key: string]: string };
}

interface Responsex {
  cookie(
    arg0: string,
    token: string,
    arg2: {
      httpOnly?: boolean;
      secure?: boolean; // Set secure flag in production
      maxAge: number;
      sameSite?: 'strict' | 'lax' | 'none';
      path?: string;
    }
  ): unknown;
  status: (code: number) => Response;
  json: (body: any) => void;
}

interface SessionRequest extends Request {
  session?: {
    destroy: (callback: (err: any) => void) => void;
  };
}

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const userId = await User.create(username, email, password);
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(201).json({ token });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: 'Error registering user', error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user: any = await User.findByEmail(email);
    if (!user) {
      res.status(400).json({ message: 'Invalid email or password' });
      return
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid email or password' });
      return
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    //set the token HTTP-ONLY COOKIE
    res.cookie('token', token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production', // Set secure flag in production
      maxAge: 3600000, // 1 hour
    });
    res.json({ token, msg: 'login succesfull' });
  } catch (err: any) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};

// export const logout = (req:Request,res:Response) => {
//   res.cookie('token', '', { maxAge: 0 });
//   res.json({ message: "Logout successful" });
// }

export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      expires: new Date(0)
    });

    res.status(200).json({ 
      success: true,
      message: 'Logged out successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error during logout' 
    });
  }
};

export const verify = (req: Request, res: Response) => {
  try {
    // Check if the token in the cookie is valid
    const token = req.cookies.token; // or whatever your cookie name is
    if (!token) {
      res.status(401).json({ message: 'No token found' });
      return
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    res.status(200).json({ message: 'Token is valid', user: decoded });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.getAllUsers();
    res.status(200).json(users);
  } catch (err: any) {
    res
      .status(500)
      .json({ message: 'Error fetching users', error: err.message });
  }
};
