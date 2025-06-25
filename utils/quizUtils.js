// utils/quizUtils.js

/**
 * Load questions from Excel file into memory
 * @returns {Array} Array of question objects
 */
function loadQuestions() {
  // TODO: implement XLSX loading logic
  return [
    {
      id: 1,
      question: "What is the capital of India?",
      options: {
        A: "Delhi",
        B: "Mumbai",
        C: "Kolkata",
        D: "Chennai",
      },
      correctAnswer: "A",
      explanation: "Delhi is the capital of India.",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: {
        A: "Earth",
        B: "Mars",
        C: "Jupiter",
        D: "Saturn",
      },
      correctAnswer: "B",
      explanation:
        "Mars is called the Red Planet due to its reddish appearance.",
    },
  ];
}

/**
 * Get a random MCQ from the question bank
 * @param {Array} questions - Array of all loaded questions
 * @returns {Object} Single question object
 */
function getRandomQuestion(questions) {
  const index = Math.floor(Math.random() * questions.length);
  return questions[index];
  // TODO: pick and return random question
}

/**
 * Check if user's answer is correct
 * @param {string} userAnswer - e.g., "A" or "A,B"
 * @param {string} correctAnswer - e.g., "A" or "A,B"
 * @returns {boolean}
 */
function isAnswerCorrect(userAnswer, correctAnswer) {
  return userAnswer.trim().toUpperCase() === correctAnswer.trim().toUpperCase();
}

module.exports = {
  loadQuestions,
  getRandomQuestion,
  isAnswerCorrect,
};
