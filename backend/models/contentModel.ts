import { QueryError, QueryResult } from "mysql2";
import db from "../config/db";
class Content {
  static create(title: any, description: any, userId: any, callback: (arg0: QueryError | null, arg1: undefined) => void) {
    db.query(
      'INSERT INTO content (title, description, user_id) VALUES (?, ?, ?)',
      [title, description, userId],
      (err, results) => {
        if (err) return callback(err, undefined);
        callback(null, (results as any).insertId);
      }
    );
  }

  static list(page: number, limit: number, search: any, callback: (arg0: QueryError | null, arg1: QueryResult | undefined) => void) {
    const offset = (page - 1) * limit;
    const query = `SELECT * FROM content WHERE title LIKE ? LIMIT ? OFFSET ?`;
    db.query(query, [`%${search}%`, limit, offset], (err, results) => {
      if (err) return callback(err, undefined);
      callback(null, results);
    });
  }

  static update(id: any, title: any, description: any, callback: (arg0: QueryError | null, arg1: undefined) => void) {
    db.query(
      'UPDATE content SET title = ?, description = ? WHERE id = ?',
      [title, description, id],
      (err, results) => {
        if (err) return callback(err, undefined);
        callback(null, (results as any).affectedRows);
      }
    );
  }

  static delete(id: any, callback: (arg0: QueryError | null, arg1: undefined) => void) {
    db.query('DELETE FROM content WHERE id = ?', [id], (err, results) => {
      if (err) return callback(err, undefined);
      callback(null, (results as any).affectedRows);
    });
  }
}
export default Content;