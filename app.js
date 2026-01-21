import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import expressEjsLayouts from 'express-ejs-layouts';
import diaryRoutes from "./routes/diaryRoutes.js";
import mongoose from "mongoose";
import methodOverride from 'method-override';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Configure method-override with a query string parameter
app.use(methodOverride('_method'));

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/main');

// Middleware - Order is important here!
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressEjsLayouts);
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies
app.use(express.json());  // Parse JSON bodies



// Routes
app.use("/", diaryRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

app.get("/", (req, res) => {
  res.redirect("/diary");
});