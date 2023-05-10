const mysql = require("mysql");
const db = require("../config/db");

class investment_packageModel {
  // CREATE
  static async create(investment_packageData) {
    try {
      const connection = mysql.createConnection(db);
      const query = `INSERT INTO investment_package SET ?`;
      const result = await new Promise((resolve, reject) => {
        connection.query(query, investment_packageData, (error, results) => {
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
      console.error(`Error occurred in creating investment package: ${error}`);
      throw error;
    }
  }

  // READ
  static async getById(investment_packageId) {
    try {
      const connection = mysql.createConnection(db);
      const query = `SELECT * FROM investment_package WHERE id = ?`;
      const result = await new Promise((resolve, reject) => {
        connection.query(query, [investment_packageId], (error, results) => {
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
      console.error(
        `Error occurred in getting investment package by ID: ${error}`
      );
      throw error;
    }
  }

  // UPDATE
  static async update(investment_packageId, updateInvestment_packageData) {
    try {
      const connection = mysql.createConnection(db);
      const query = `UPDATE investment_package SET ? WHERE id = ?`;
      const result = await new Promise((resolve, reject) => {
        connection.query(
          query,
          [updateInvestment_packageData, investment_packageId],
          (error, results) => {
            if (error) {
              reject(error);
            } else if (results.affectedRows === 0) {
              reject("investment package not found.");
            } else {
              resolve(true);
            }
          }
        );
      });
      connection.end();
      return result;
    } catch (error) {
      console.error(`Error occurred in updating investment package: ${error}`);
      throw error;
    }
  }

  // DELETE
  static async delete(investment_packageId) {
    try {
      const connection = mysql.createConnection(db);
      const query = `DELETE FROM investment_package WHERE id = ?`;
      const result = await new Promise((resolve, reject) => {
        connection.query(query, [investment_packageId], (error, results) => {
          if (error) {
            reject(error);
          } else if (results.affectedRows === 0) {
            reject("investment package not found.");
          } else {
            resolve(true);
          }
        });
      });
      connection.end();
      return result;
    } catch (error) {
      console.error(`Error occurred in deleting investment package: ${error}`);
      throw error;
    }
  }
}

module.exports = investment_packageModel;
