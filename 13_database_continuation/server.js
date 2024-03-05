import mongodb from "mongodb";
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

const MongoClient = mongodb.MongoClient;
const url = process.env.MONGO_URI;

// connection to the MongoDB database
MongoClient.connect(url)
  .then((client) => {
    console.log("Connected to MongoDB!");
    const db = client.db("bookstore"); 
    const bookstoreCollection = db.collection("books");

    app.get("/users", async (req, res) => {
      const users = await bookstoreCollection.find().toArray();
      res.json(users);
    });

    app.post("/users", async (req, res) => {
      const newUser = req.body;
      const result = await bookstoreCollection.insertOne(newUser);
      res.json(result);
    });
    app.get("/books", async (req, res) => {
      const books = await bookstoreCollection.find().toArray();
      res.json(books);
    });

    app.post("/books", async (req, res) => {
      const newBooks = req.body;
      const result = await bookstoreCollection.insertOne(newBooks);
      res.json(result);
    });

    app.listen(4433, () => {
      console.log("Server is listening on port 4433!");
    });
  })

  .catch((err) => {
    console.error("Error connecting to MongoDB: ", err);
  });
