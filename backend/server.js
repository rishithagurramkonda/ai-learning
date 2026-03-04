require("dotenv").config()

const express = require("express")
const axios = require("axios")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.post("/ask-ai", async (req, res) => {

  try {

    const message = req.body.message

    const response = await axios({
      method: "POST",
      url: "https://api.groq.com/openai/v1/chat/completions",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      data: {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: message
          }
        ]
      }
    })

    res.json({
      reply: response.data.choices[0].message.content
    })

  } catch (error) {

    console.log("FULL ERROR:", error.response?.data)

    res.status(500).json({
      error: "API Error",
      details: error.response?.data
    })
  }

})

app.listen(5000, () => {
  console.log("Server running on port 5000")
})