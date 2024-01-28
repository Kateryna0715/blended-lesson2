const { connect } = require("mongoose");

// const Cat = mongoose.model("Cat", { name: String });

// const kitty = new Cat({ name: "Zildjian" });
// kitty.save().then(() => console.log("meow"));
const connectDb = async () => {
  try {
    const db = await connect(process.env.DB_STRING);
    console.log(
      `DB is connected. Name: ${db.connection.name}. Host: ${db.connection.host}. Port: ${db.connection.port}`
        .green.bold
    );
  } catch (error) {
    console.log(error.message.red.bold);
    process.exit(1);
  }
};

module.exports = connectDb;
