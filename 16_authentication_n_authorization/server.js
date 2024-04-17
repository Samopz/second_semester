import { connect } from "./src/database/connection.js";
import app from "./src/index.js";
import { userSeeder } from "./src/seeder/user.seeder.js";

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;

connect(MONGO_URL).then(() => {
    console.log("Connected to MongoDB");
    userSeeder()
        .then()
        .catch((error) => {
            console.error("Error seeding data", error);
        });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});