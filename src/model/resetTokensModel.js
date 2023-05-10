const mysql = require("mysql");
const db = require("../config/db");

class ResetToken {
  constructor({ id_token, userId, access_token, expires_in, createdAt }) {
    this.id_token = id_token;
    this.access_token = access_token;
    this.userId = userId;
    this.expires_in = expires_in;
    this.createdAt = createdAt;
  }

  static async create(userId, access_token) {
    try {
      const connection = mysql.createConnection(db);
      const now = new Date();
      const createdAt = now.toISOString().slice(0, 19).replace("T", " ");

      const query =
        "INSERT INTO reset_tokens (user_id, access_token, created_at) VALUES (?, ?, ?)";
      const [result] = await connection.execute(query, [
        userId,
        access_token,
        createdAt,
      ]);

      return new ResetToken({
        id: result.insertId,
        userId,
        access_token,
        createdAt,
      });
    } catch (error) {
      console.error("Error creating reset access_token:", error);
      throw error;
    }
  }

  static async findByToken(access_token) {
    try {
      const connection = mysql.createConnection(db);

      const query = "SELECT * FROM reset_tokens WHERE access_token = ?";
      const [rows] = await connection.execute(query, [access_token]);

      if (!rows || rows.length === 0) {
        return null;
      }

      const { id, user_id, created_at } = rows[0];
      return new ResetToken({
        id,
        userId: user_id,
        access_token,
        createdAt: created_at,
      });
    } catch (error) {
      console.error("Error finding reset token by access_token:", error);
      throw error;
    }
  }

  static async deleteByToken(token) {
    try {
      const connection = mysql.createConnection(db);

      const query = "DELETE FROM reset_tokens WHERE access_token = ?";
      const [result] = await connection.execute(query, [access_token]);

      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error deleting reset token by access_token:", error);
      throw error;
    }
  }
}

module.exports = ResetToken;
