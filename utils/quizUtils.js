// utils/quizUtils.js

/**
 * Load questions from Excel file into memory
 * @returns {Array} Array of question objects
 */
function loadQuestions() {
  // TODO: implement XLSX loading logic
  return [];
}

/**
 * Get a random MCQ from the question bank
 * @param {Array} questions - Array of all loaded questions
 * @returns {Object} Single question object
 */
function getRandomQuestion(questions) {
  // TODO: pick and return random question
  return {};
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
