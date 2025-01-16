import mysql from 'mysql2';
import dotenv from 'dotenv';

// Memuat variabel lingkungan dari file .env
dotenv.config();

// Membuat koneksi ke database MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',  // Ganti dengan host Anda
  user: process.env.DB_USER || 'root',      // Ganti dengan user MySQL Anda
  password: process.env.DB_PASSWORD || 'admin',  // Ganti dengan password MySQL Anda
  database: process.env.DB_NAME || 'mydb'   // Ganti dengan nama database Anda
});

// Fungsi untuk membuat tabel jika belum ada
const createTables = async () => {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const createContentTable = `
    CREATE TABLE IF NOT EXISTS content (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      user_id INT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `;

  try {
    await db.promise().query(createUsersTable);  // Menggunakan Promise untuk query
    console.log('Users table checked or created');
    await db.promise().query(createContentTable);  // Menggunakan Promise untuk query
    console.log('Content table checked or created');
  } catch (err:any) {
    console.error('Error creating tables:', err.stack);
  }
};

// Koneksi ke database dan menjalankan fungsi untuk membuat tabel
export const connectDb = async () => {
  try {
    await db.promise().connect();
    console.log('Database connected');
    await createTables();  // Membuat tabel jika belum ada
  } catch (err:any) {
    console.error('Error connecting to the database:', err.stack);
    throw err; // Rethrow the error to handle it in the server.ts
  }
};

// Memanggil koneksi database
// connectDb();

export default db;
