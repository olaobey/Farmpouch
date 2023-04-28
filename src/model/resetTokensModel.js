const mysql = require("mysql");
const db = require("../config/db");

class ResetToken {
  constructor({ id, userId, token, createdAt }) {
    this.id_token = id_token;
    this.access_token = access_token;
    this.userId = userId;
    this.refresh_token = refresh_token;
    this.expires_in = expires_in;
    this.createdAt = createdAt;
  }

  static async create(userId, token) {
    try {
      const connection = mysql.createConnection(db);
      const now = new Date();
      const createdAt = now.toISOString().slice(0, 19).replace("T", " ");

      const query =
        "INSERT INTO reset_tokens (user_id, token, created_at) VALUES (?, ?, ?)";
      const [result] = await connection.execute(query, [
        userId,
        token,
        createdAt,
      ]);

      return new ResetToken({ id: result.insertId, userId, token, createdAt });
    } catch (error) {
      console.error("Error creating reset token:", error);
      throw error;
    }
  }

  static async findByToken(token) {
    try {
      const connection = mysql.createConnection(db);

      const query = "SELECT * FROM reset_tokens WHERE token = ?";
      const [rows] = await connection.execute(query, [token]);

      if (!rows || rows.length === 0) {
        return null;
      }

      const { id, user_id, created_at } = rows[0];
      return new ResetToken({
        id,
        userId: user_id,
        token,
        createdAt: created_at,
      });
    } catch (error) {
      console.error("Error finding reset token by token:", error);
      throw error;
    }
  }

  static async deleteByToken(token) {
    try {
      const connection = mysql.createConnection(db);

      const query = "DELETE FROM reset_tokens WHERE token = ?";
      const [result] = await connection.execute(query, [token]);

      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error deleting reset token by token:", error);
      throw error;
    }
  }
}

module.exports = ResetToken;
