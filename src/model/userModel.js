const db = require("../config/db");

class User {
  constructor(
    id,
    firstname,
    lastname,
    phonenumber,
    address,
    imageUrl,
    role = "user",
    dob,
    gender,
    googleId,
    provider,
    isVerified,
    email,
    password
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.phonenumber = phonenumber;
    this.dob = dob;
    this.gender = gender;
    this.address = address;
    this.imageUrl = imageUrl;
    this.role = role;
    this.googleId = googleId;
    this.provider = provider;
    this.isVerified = isVerified;
    this.email = email;
    this.password = password;
  }

  static async getAll() {
    try {
      const result = await db.query("SELECT * FROM users");
      return result[0].map(
        (row) =>
          new User(
            row.id,
            row.firstname,
            row.lastname,
            row.phonenumber,
            row.gender,
            row.dob,
            row.address,
            row.imageUrl,
            row.googleId,
            row.provider,
            row.isVerified,
            row.email,
            row.password
          )
      );
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const result = await db.query("SELECT * FROM users WHERE id = ?", [id]);
      if (result[0].length === 0) {
        return null;
      }
      const row = result[0][0];
      return new User(
        row.firstname,
        row.lastname,
        row.phonenumber,
        row.gender,
        row.dob,
        row.address,
        row.imageUrl,
        row.googleId,
        row.provider,
        row.isVerified,
        row.email,
        row.password
      );
    } catch (error) {
      throw error;
    }
  }

  static async create(user) {
    try {
      const result = await db.query(
        "INSERT INTO users ( firstname, lastname, phonenumber, gender, dob, address, imageUrl, googleId, isVerified, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,)",
        [
          user.firstname,
          user.lastname,
          user.phonenumber,
          user.address,
          user.imageUrl,
          user.gender,
          user.googleId,
          user.isVerified,
          user.dob,
          user.email,
          user.password,
        ]
      );
      const insertedId = result[0].insertId;
      return new User(
        insertedId,
        user.firstname,
        user.lastname,
        user.phonenumber,
        user.address,
        user.imageUrl,
        user.gender,
        user.googleId,
        user.isVerified,
        user.dob,
        user.email,
        user.password
      );
    } catch (error) {
      throw error;
    }
  }

  async update() {
    try {
      await db.query(
        "UPDATE users SET firstname = ?, lastname = ?, address = ?, phonenumber = ?, imageUrl = ?, email = ?, password = ? WHERE id = ?",
        [
          this.firstname,
          this.lastname,
          this.address,
          this.phonenumber,
          this.email,
          this.imageUrl,
          this.password,
          this.id,
        ]
      );
    } catch (error) {
      throw error;
    }
  }

  async delete() {
    try {
      await db.query("DELETE FROM users WHERE id = ?", [this.id]);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
