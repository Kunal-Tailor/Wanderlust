if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");

const dbUrl = process.env.ATLASDB_URL || process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust";

async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  if (process.env.VERCEL && (!process.env.ATLASDB_URL && !process.env.MONGO_URL)) {
    throw new ExpressError(
      500,
      "MongoDB Atlas URL is missing! Please add 'ATLASDB_URL' in Vercel Project Settings -> Environment Variables."
    );
  }
  await mongoose.connect(dbUrl, {
    serverSelectionTimeoutMS: 5000,
  });
  console.log("Connected to DB");
}

// App configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// Ensure DB connection before handling requests
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (err) {
    next(err);
  }
});

// Pass mapToken to all views
app.use((req, res, next) => {
  res.locals.mapToken = process.env.MAP_TOKEN || process.env.MAPTILER_API_KEY;
  next();
});

// Root Route - Redirect to /listings
app.get("/", (req, res) => {
  res.redirect("/listings");
});

// Mount Routers
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);

// 404 Handler
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

// Global Error Handler
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

// Start server locally or in non-serverless environments
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  const port = process.env.PORT || 8088;
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

// Export for Vercel serverless deployment
module.exports = app;