const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const categoryMap = {
  "Cozy Beachfront Cottage": "Beachfront",
  "Modern Loft in Downtown": "Rooms",
  "Mountain Retreat": "Mountains",
  "Historic Villa in Tuscany": "Castles",
  "Secluded Treehouse Getaway": "Camping",
  "Beachfront Paradise": "Beachfront",
  "Rustic Cabin by the Lake": "Arctic",
  "Luxury Penthouse with City Views": "Iconic Cities",
  "Ski-In/Ski-Out Chalet": "Arctic",
  "Safari Lodge in the Serengeti": "Camping",
  "Historic Canal House": "Iconic Cities",
  "Private Island Retreat": "Amazing Pools",
  "Charming Cottage in the Cotswolds": "Farms",
  "Historic Brownstone in Boston": "Iconic Cities",
  "Beachfront Bungalow in Bali": "Beachfront",
  "Mountain View Cabin in Banff": "Mountains",
  "Art Deco Apartment in Miami": "Rooms",
  "Tropical Villa in Phuket": "Amazing Pools",
  "Historic Castle in Scotland": "Castles",
  "Desert Oasis in Dubai": "Amazing Pools",
  "Rustic Log Cabin in Montana": "Mountains",
  "Beachfront Villa in Greece": "Beachfront",
  "Eco-Friendly Treehouse Retreat": "Camping",
  "Historic Cottage in Charleston": "Farms",
  "Modern Apartment in Tokyo": "Rooms",
  "Lakefront Cabin in New Hampshire": "Farms",
  "Luxury Villa in the Maldives": "Amazing Pools",
  "Ski Chalet in Aspen": "Arctic",
  "Secluded Beach House in Costa Rica": "Beachfront"
};

const initDB = async () => {
  await Listing.deleteMany({});
  const listingsWithCategory = initData.data.map((obj) => ({
    ...obj,
    category: categoryMap[obj.title] || "Trending"
  }));
  await Listing.insertMany(listingsWithCategory);
  console.log("data was initialized with categories");
  mongoose.connection.close();
};

initDB();