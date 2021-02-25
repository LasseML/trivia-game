const QUESTION_URL = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"

export const getQuestions = () => {
    return fetch(QUESTION_URL)
    .then(response => response.json())
    .then(response => response.results)
}