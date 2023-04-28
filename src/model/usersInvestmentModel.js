const mysql = require("mysql");
const db = require("../config/db");

class UsersInvestmentsModel {
  // CREATE
  static async create(usersInvestmentData) {
    try {
      const connection = mysql.createConnection(db);
      const query = `INSERT INTO users_investments SET ?`;
      const result = await new Promise((resolve, reject) => {
        connection.query(query, usersInvestmentData, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
      connection.end();
      return result.insertId;
    } catch (error) {
      console.error(`Error creating user's investment: ${error}`);
      throw error;
    }
  }

  // READ
  static async getById(usersInvestmentId) {
    try {
      const connection = mysql.createConnection(db);
      const query = `SELECT * FROM users_investments WHERE id = ?`;
      const result = await new Promise((resolve, reject) => {
        connection.query(query, [usersInvestmentId], (error, results) => {
          if (error) {
            reject(error);
          } else if (results.length === 0) {
            reject("User's investment not found.");
          } else {
            resolve(results[0]);
          }
        });
      });
      connection.end();
      return result;
    } catch (error) {
      console.error(`Error getting user's investment by ID: ${error}`);
      throw error;
    }
  }

  // UPDATE
  static async update(usersInvestmentId, updatedUsersInvestmentData) {
    try {
      const connection = mysql.createConnection(db);
      const query = `UPDATE users_investments SET ? WHERE id = ?`;
      const result = await new Promise((resolve, reject) => {
        connection.query(
          query,
          [updatedUsersInvestmentData, usersInvestmentId],
          (error, results) => {
            if (error) {
              reject(error);
            } else if (results.affectedRows === 0) {
              reject("User's investment not found.");
            } else {
              resolve(true);
            }
          }
        );
      });
      connection.end();
      return result;
    } catch (error) {
      console.error(`Error updating user's investment: ${error}`);
      throw error;
    }
  }

  // DELETE
  static async delete(usersInvestmentId) {
    try {
      const connection = mysql.createConnection(db);
      const query = `DELETE FROM users_investments WHERE id = ?`;
      const result = await new Promise((resolve, reject) => {
        connection.query(query, [usersInvestmentId], (error, results) => {
          if (error) {
            reject(error);
          } else if (results.affectedRows === 0) {
            reject("User's investment not found.");
          } else {
            resolve(true);
          }
        });
      });
      connection.end();
      return result;
    } catch (error) {
      console.error(`Error deleting user's investment: ${error}`);
      throw error;
    }
  }
}

module.exports = UsersInvestmentsModel;
