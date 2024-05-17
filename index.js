require("dotenv").config()
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())
app.use(express.json())

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// ...


app.get("/home", (req, res) => {
    res.json("HomePage")
})
app.post("/data", async (req, res) => {
    const { input } = req.body
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // const prompt = "Write a story about a magic backpack."

    const result = await model.generateContent(input);
    const response = await result.response;
    const text = response.text();
    res.json({ "message": text })
})
app.listen(process.env.PORT, () => {
    console.log("listening to the port")
})


// run("what is the capital of telangana?");

// ...