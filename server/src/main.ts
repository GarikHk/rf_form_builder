import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import formRoutes from "./routes/form.router";

dotenv.config();
const URI = process.env.MONGO_URI;

if (!URI) {
  throw new Error("Provide the DB URI in the enviroments!");
}

mongoose
  .connect(URI)
  .then(() => console.log("Connected to the Database!"))
  .catch(() => console.error("Couldn't connect to the Database! :("));

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/api/forms", formRoutes);

app.get("/", (_req, res) => {
  res.send("RF Dynamic Form Builder BE");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
