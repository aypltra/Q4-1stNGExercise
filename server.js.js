// Loads the express module
const express = require("express");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const path = require("path");

// Creates our express server
const app = express();
const port = 3000;

// Serves static files (for CSS and images)
app.use(express.static(path.join(__dirname, "public")));

// Set Handlebars as the template engine
app.set("view engine", "hbs");

// Middleware for form data
app.use(bodyParser.urlencoded({ extended: true }));

// Render the initial page with the number input form
app.get("/", (req, res) => {
  res.render("index");
});

// Route to handle form submission
app.post("/draw", (req, res) => {
  const A = parseFloat(req.body.sideA);
  const B = parseFloat(req.body.sideB);

  if (isNaN(A) || isNaN(B) || A <= 0 || B <= 0) {
    return res.send("Invalid input! Please enter positive numbers.");
  }

  const C = Math.sqrt(A * A + B * B).toFixed(2); // Compute hypotenuse
  res.render("draw", { A, B, C });
});

// Prevent direct access to draw.hbs without input
app.get("/dra
