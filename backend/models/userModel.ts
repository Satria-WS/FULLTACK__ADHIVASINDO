import db from "../config/db";
import bcrypt from "bcryptjs";
import { RowDataPacket } from "mysql2";

interface UserRow extends RowDataPacket {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: Date;
}

class User {
  // Metode untuk membuat user baru
  static async create(username: string, email: string, password: string): Promise<number> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);  // Hash password
      const [result]: any = await db.promise().query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
      );
      return result.insertId;
    } catch (err: any) {
      throw new Error('Error creating user: ' + err.message);
    }
  }

  // Metode untuk mencari user berdasarkan email
  static async findByEmail(email: string): Promise<UserRow | null> {
    try {
      const [rows]: [UserRow[], any] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
      return rows.length > 0 ? rows[0] : null;  // Mengembalikan baris pertama jika ditemukan
    } catch (err: any) {
      throw new Error('Error finding user: ' + err.message);
    }
  }

  static async getAllUsers(): Promise<UserRow[]> {
    try {
      const [rows]: [UserRow[], any] = await db.promise().query('SELECT id, username, email, created_at FROM users');
      return rows;
    } catch (err: any) {
      throw new Error('Error fetching users: ' + err.message);
    }
  }
}

export default User;