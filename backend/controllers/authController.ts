import User from "../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

interface Request {
  body: {
    username: string;
    email: string;
    password: string;
  };
}

interface Response {
  status: (code: number) => Response;
  json: (body: any) => void;
}

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const userId = await User.create(username, email, password);
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (err: any) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

export const login = async (req:Request, res:Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err:any) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};