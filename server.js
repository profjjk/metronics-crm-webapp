// Import dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    next();
});

app.use('*', cors());

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );
//     if (req.method === "OPTIONS") {
//         res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//         return res.status(200).json({});
//     }
//     next();
// });

// Static asset middleware
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/public"));
}

// Add routes, both API and view
app.use(routes);

// Connect to database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/metronicsDB")
    .then(() => console.log("Connected to Metronics database."))
    .catch(err => console.log("Failed to connect to database." + "\n" + `Error: ${err.message}`));

// Start the server
app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));

// TODO: deploy on Netlify?