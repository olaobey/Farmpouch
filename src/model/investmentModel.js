const mysql = require("mysql");
const db = require("../config/db");

class Investment {
  constructor(name, location, duration, amountPerUnit, isAvailable) {
    this.name = name;
    this.location = location;
    this.duration = duration;
    this.amountPerUnit = amountPerUnit;
    this.isAvailable = isAvailable;
  }

  async createInvestment(investmentData) {
    this.name = investmentData.name || this.name;
    this.location = investmentData.location || this.location;
    this.duration = investmentData.duration || this.duration;
    this.amountPerUnit = investmentData.amountPerUnit || this.amountPerUnit;
    this.available = investmentData.isAvailable || this.isAvailable;
    try {
      const connection = mysql.createConnection(db);
      const query =
        "INSERT INTO investments (name, location, duration, amountPerUnit, isAvailable) VALUES (?, ?, ?, ?, ?)";
      const values = [
        this.name,
        this.location,
        this.duration,
        this.amountPerUnit,
        this.isAvailable,
      ];

      connection.query(query, values, (err, result) => {
        if (err) throw err;
        resolve(result.insertId);
      });

      connection.end();
    } catch (err) {
      console.error(err);
      throw new Error("Unable to save investment");
    }
  }

  async updateInvestment(investmentData) {
    this.name = investmentData.name || this.name;
    this.location = investmentData.location || this.location;
    this.duration = investmentData.duration || this.duration;
    this.amountPerUnit = investmentData.amountPerUnit || this.amountPerUnit;
    this.available = investmentData.isAvailable || this.isAvailable;
    try {
      const connection = mysql.createConnection(db);
      const query =
        "UPDATE investments SET name = ?, location = ?, duration = ?, amountPerUnit = ?, isAvailable = ? WHERE id = ?";
      const values = [
        this.name,
        this.location,
        this.duration,
        this.amountPerUnit,
        this.isAvailable,
        this.id,
      ];

      connection.query(query, values, (err, result) => {
        if (err) throw err;
        resolve(result.affectedRows);
      });

      connection.end();
    } catch (err) {
      console.error(err);
      throw new Error("Unable to update investment");
    }
  }

  static async getAll(page, limit) {
    try {
      const connection = mysql.createConnection(db);
      const offset = (page - 1) * limit;
      const query = `SELECT * FROM investments LIMIT ?, ?`;
      const values = [offset, limit];

      const result = new Promise((resolve, reject) => {
        connection.query(query, values, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      connection.end();
      return result;
    } catch (err) {
      console.error(err);
      throw new Error("Unable to fetch investments");
    }
  }

  static async getById(id) {
    try {
      const connection = mysql.createConnection(db);
      const query = `SELECT * FROM investments WHERE id = ?`;
      const values = [id];

      return new Promise((resolve, reject) => {
        connection.query(query, values, (err, results) => {
          if (err) throw err;
          if (results.length === 0) {
            reject(new Error("Investment not found"));
          } else {
            const investment = new Investment(
              results[0].name,
              results[0].location,
              results[0].duration,
              results[0].amountPerUnit,
              results[0].isAvailable
            );
            investment.id = results[0].id;
            resolve(investment);
          }
        });
        connection.end();
      });
    } catch (err) {
      console.error(err);
      throw new Error("Unable to fetch investment");
    }
  }

  static async deleteById(id) {
    try {
      const connection = mysql.createConnection(db);
      const query = `DELETE FROM investments WHERE id = ?`;
      const values = [id];

      const result = new Promise((resolve, reject) => {
        connection.query(query, values, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
      connection.end();
      return result;
    } catch (err) {
      console.error(err);
      throw new Error("Unable to delete investments");
    }
  }
}

module.exports = Investment;
