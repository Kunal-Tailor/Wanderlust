# 🧭 Wanderlust

> An Airbnb-inspired full-stack vacation rental web application built with **Node.js**, **Express.js**, **MongoDB**, **EJS**, and **MapTiler SDK**.

---

## 🌟 Key Features

- **🏡 Listing Management (CRUD)**: Create, view, edit, and delete travel listings with titles, prices, descriptions, locations, and high-resolution images.
- **🧭 Interactive Category Filters**: Filter stays across curated categories:
  - 🔥 **Trending**
  - 🛏️ **Rooms**
  - 🏙️ **Iconic Cities**
  - ⛰️ **Mountains**
  - 🏰 **Castles**
  - 🏊 **Amazing Pools**
  - ⛺ **Camping**
  - 🐄 **Farms**
  - ❄️ **Arctic**
  - 🏖️ **Beachfront**
- **🗺️ Interactive MapTiler Maps**: Dynamic geocoding with custom MapTiler markers and popups on listing show pages.
- **⭐ Reviews & Ratings**: Submit guest reviews with an interactive rating slider and read verified reviews.
- **🎨 Refined Modern UI**:
  - Clean card-grid layout with hover micro-interactions.
  - Consistent center-column alignment across all detail and form views.
  - Plus Jakarta Sans typography.
  - Sticky responsive footer and brand navigation bar.
- **🏛️ Model-View-Controller (MVC) Architecture**: Modular code separation with dedicated `controllers/`, `routes/`, `models/`, and `views/`.
- **🚀 Vercel Ready**: Pre-configured with `vercel.json` for serverless deployment.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database & ODM**: MongoDB, Mongoose
- **Templating**: EJS, EJS-Mate
- **Maps & Geocoding**: [MapTiler SDK JS](https://www.maptiler.com/)
- **Validation**: Joi
- **Styling**: Vanilla CSS, Bootstrap 5.3, FontAwesome Icons
- **Deployment**: Vercel

---

## 📁 Project Structure

```text
MAJOR/
├── controllers/          # Business logic handlers
│   ├── listings.js       # Listing CRUD & category filtering logic
│   └── reviews.js        # Review creation & deletion logic
├── init/                 # Database seed data and initialization scripts
│   ├── data.js           # Sample listings dataset
│   └── index.js          # DB seeder script with category mapping
├── models/               # Mongoose Schemas
│   ├── listing.js        # Listing schema
│   └── reviews.js        # Review schema
├── public/               # Static assets
│   ├── css/style.css     # Global styles & responsive design
│   └── js/script.js      # Client-side form validation scripts
├── routes/               # Express Routers
│   ├── listing.js        # /listings routes
│   └── review.js         # /listings/:id/reviews routes
├── utils/                # Utility helpers & custom error classes
│   ├── ExpressError.js
│   └── wrapAsync.js
├── views/                # EJS Templates
│   ├── includes/         # Navbar and footer partials
│   ├── layouts/          # Boilerplate layout template
│   ├── listings/         # Index, Show, New, and Edit pages
│   └── error.ejs         # User-friendly error page
├── .env                  # Environment secrets (gitignored)
├── .gitignore            # Git ignore file
├── app.js                # Express app entry point
├── package.json          # Node dependencies & metadata
├── schema.js             # Joi schema validations
└── vercel.json           # Vercel deployment configuration
```

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (local MongoDB instance or MongoDB Atlas account)
- **MapTiler Account** (for free API key)

### 2. Clone the Repository
```bash
git clone https://github.com/Kunal-Tailor/Wanderlust.git
cd Wanderlust
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the root directory:
```env
MAP_TOKEN=your_maptiler_api_key
MAPTILER_API_KEY=your_maptiler_api_key
MONGO_URL=mongodb://127.0.0.1:27017/wanderlust
# For MongoDB Atlas (production):
# ATLASDB_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/wanderlust?retryWrites=true&w=majority
```

### 5. Seed the Database
Populate sample listings with pre-assigned categories:
```bash
node init/index.js
```

### 6. Start the Server
```bash
node app.js
```

Open [http://localhost:8088/listings](http://localhost:8088/listings) in your browser.

---

## ☁️ Deployment on Vercel

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Deploy Wanderlust"
   git push origin main
   ```
2. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import the `Kunal-Tailor/Wanderlust` repository.
4. Add the following **Environment Variables**:
   - `ATLASDB_URL`: Your MongoDB Atlas connection URI
   - `MAP_TOKEN`: Your MapTiler API Key
   - `MAPTILER_API_KEY`: Your MapTiler API Key
   - `NODE_ENV`: `production`
5. Click **Deploy**. Vercel will handle the serverless build automatically using `vercel.json`.

---

## 📄 License
This project is open source and available under the [ISC License](LICENSE).
