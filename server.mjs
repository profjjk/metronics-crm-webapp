// Import dependencies
import express from 'express';
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 8080;

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static asset middleware
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Connect to database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/metronicsDB")
    .then(() => console.log("Connection to Metronics database successful."))
    .catch(err => console.log("Failed to connect to database." + "\n" + `Error: ${err.message}`));

// Start the server
app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));