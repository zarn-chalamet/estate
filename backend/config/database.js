const mongoose = require("mongoose");

async function connect() {
  try {
    const connect = await mongoose.connect(process.env.DATABASE_URI);
    console.log(
      "Database connected: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log(error);
  }
}
module.exports = connect;
