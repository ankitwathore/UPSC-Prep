// index.js
const express = require("express");
const bodyParser = require("body-parser");
const {
  loadQuestions,
  getRandomQuestion,
  isAnswerCorrect,
} = require("./utils/quizUtils");

require("dotenv").config();
const axios = require("axios");
const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("UPSC QuizBot is running.");
});

// Load questions once at startup
const questions = loadQuestions();

console.log(questions);

// Gupshup webhook endpoint
app.post("/webhook", (req, res) => {
  const payload = req.body;
  const incomingMsg = payload?.text?.toLowerCase()?.trim();
  const from = payload?.sender;
  const token = req.headers["x-api-key"];
  const SECRET_TOKEN = process.env.SECRET_TOKEN;

  if (token !== SECRET_TOKEN) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  console.log(`Message from ${from}: ${incomingMsg}`);

  // Send a new question if user types "hi"
  if (incomingMsg === "hi") {
    setTimeout(async () => {
      const q = getRandomQuestion(questions);

      const messageText = `📌 *Question #${q.id}*\n\n${q.question}\n\nA) ${q.options.A}\nB) ${q.options.B}\nC) ${q.options.C}\nD) ${q.options.D}\n\n_Reply with your answer (A/B/C/D)_`;

      try {
        const gupshup = await import("@api/gupshup");

        const { data } = await gupshup.default.postWaApiV1Msg({
          channel: "whatsapp",
          source: parseInt(process.env.GUPSHUP_SOURCE),
          destination: parseInt(from.replace("whatsapp:", "")),
          message: {
            type: "text",
            text: messageText,
          },
          "src.name": process.env.GUPSHUP_APP_NAME,
          disablePreview: false,
          encode: false,
          apikey: process.env.GUPSHUP_APP_TOKEN,
        });

        console.log("Gupshup SDK response:", data);
        console.log(`✅ Sent delayed question to ${from}`);
        console.log("Im in try block");
      } catch (err) {
        console.error(
          "❌ Failed to send message:",
          err.response?.data || err.message,
        );
        console.log(err);
      }
    }, 10000);
  }

  // Check if input looks like an answer (A, B, A,B etc.)
  const validOptions = ["a", "b", "c", "d"];

  if (validOptions.includes(incomingMsg)) {
    const lastQuestion = getRandomQuestion(questions); // temp: will replace later with real tracking
    const isCorrect = isAnswerCorrect(
      incomingMsg.toUpperCase(),
      lastQuestion.correctAnswer,
    );

    const feedback = isCorrect
      ? `✅ Correct!\n\n${lastQuestion.explanation || ""}`
      : `❌ Incorrect. Correct Answer: ${lastQuestion.correctAnswer}`;

    return res.json({ message: feedback });
  }

  // Fallback response
  return res.json({
    message: `Please type 'Hi' to begin or reply with A/B/C/D to answer.`,
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`QuizBot running on port ${PORT}`);
});
