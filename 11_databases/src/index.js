import express from "express";
import dotenv from "dotenv";
import { Sequelize, DataTypes } from "sequelize";

dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const databaseName = process.env.DATABASE_NAME;
const databaseUsername = process.env.DATABASE_USERNAME;
const databasePassword = process.env.DATABASE_PASSWORD;

// Connect to sequelize
const sequelize = new Sequelize(
  databaseName,
  databaseUsername,
  databasePassword,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

const User = sequelize.define("users", {
  first_name: {
    column: "first_name",
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    column: "last_name",
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hobbies: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

app.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.post("/", async (req, res) => {
  const { first_name, last_name: last_name, email, password, hobbies } = req.body;
  const user = await User.create({
    first_name,
    last_name,
    email,
    password,
    hobbies,
  });
  res.json(user);
});

sequelize
  .authenticate()
  .then(() => {
    sequelize.sync({ force: true });
    console.log("Connection has been established successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
