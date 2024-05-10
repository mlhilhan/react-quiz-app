import axios from "axios";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export const fetchQuestions = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const allQuestions = response.data;
    shuffleArray(allQuestions);
    return allQuestions.slice(0, 10);
  } catch (error) {
    console.error("API error:", error);
  }
};
