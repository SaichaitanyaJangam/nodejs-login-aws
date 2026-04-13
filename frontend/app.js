const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 🔴 Replace after API Gateway creation
const API_URL = "https://YOUR_API_ID.execute-api.REGION.amazonaws.com/login";

app.get("/", (req, res) => {
    res.send(`
        <h2>Login Page</h2>
        <form method="POST" action="/login">
            <input name="email" placeholder="Email" required /><br/><br/>
            <input name="password" type="password" placeholder="Password" required /><br/><br/>
            <button type="submit">Login</button>
        </form>
    `);
});

app.post("/login", async (req, res) => {
    try {
        const response = await axios.post(API_URL, req.body, {
            headers: { "Content-Type": "application/json" }
        });
        res.send(`<h3>${response.data.message}</h3>`);
    } catch (err) {
        res.send(`<h3>Error: ${err.response?.data?.message || "Server error"}</h3>`);
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
