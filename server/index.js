const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

require("dotenv").config();

const User = require("./models/User");

const app = express();
app.use(express.json());
app.use(cors());


// Connect to MongoDB
mongoose
    .connect("mongodb://127.0.0.1:27017/authMern", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ status: "error", error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ status: "error", error: "Access denied. Invalid token format." });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => { // use environment variable for secret key
        if (err) {
            return res.status(403).json({ status: "error", error: "Invalid or expired token." });
        }
        req.user = user;
        next();
    });
};

// Register 
app.post("/api/register", async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword,
        });
        res.json({ status: "ok", user });
    } catch (err) {
        res.json({ status: "error", error: "Username already in use or other issue" });
    }
});

// Login 
app.post("/api/login", async(req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.json({ status: "error", error: "Invalid Username or password" });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.json({ status: "error", error: "Invalid Username or password" });
        }

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.json({ status: "ok", token });
    } catch (err) {
        res.json({ status: "error", error: "An error occurred during login" });
    }
});

// Home 
app.get("/home", authenticateToken, (req, res) => {
    res.send("Welcome to the home page");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});