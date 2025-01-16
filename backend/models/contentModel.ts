import db from "../config/db";
class Content {
  static create(title, description, userId, callback) {
    db.query(
      'INSERT INTO content (title, description, user_id) VALUES (?, ?, ?)',
      [title, description, userId],
      (err, results) => {
        if (err) return callback(err);
        callback(null, (results as any).insertId);
      }
    );
  }

  static list(page, limit, search, callback) {
    const offset = (page - 1) * limit;
    const query = `SELECT * FROM content WHERE title LIKE ? LIMIT ? OFFSET ?`;
    db.query(query, [`%${search}%`, limit, offset], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }

  static update(id, title, description, callback) {
    db.query(
      'UPDATE content SET title = ?, description = ? WHERE id = ?',
      [title, description, id],
      (err, results) => {
        if (err) return callback(err);
        callback(null, (results as any).affectedRows);
      }
    );
  }

  static delete(id, callback) {
    db.query('DELETE FROM content WHERE id = ?', [id], (err, results) => {
      if (err) return callback(err);
      callback(null, (results as any).affectedRows);
    });
  }
}
export default Content;