const Investment = require("../model/investmentModel");

exports.parseInvestmentsFromCSV = (csvData) => {
  // Your implementation to parse CSV data and return an array of investments
  // Parse the CSV data into an array of rows
  const rows = csvData
    .trim()
    .split("\n")
    .map((row) => row.split(","));

  // Extract the headers from the first row
  const headers = rows.shift();

  // Map the rows to investment objects using the headers as keys
  return rows.map((row) => {
    const investment = {};
    for (let i = 0; i < headers.length; i++) {
      investment[headers[i]] = row[i];
    }
    return investment;
  });
};

// Function to insert new investments into the database
exports.insertInvestments = async (investments) => {
  try {
    const createdInvestments = await Investment.bulkCreate(investments);
    return createdInvestments;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to insert investments");
  }
};
