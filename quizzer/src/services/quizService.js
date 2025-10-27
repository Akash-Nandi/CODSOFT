const STORAGE_KEY = 'quizzes';

export const quizService = {
  getQuizzes: () => {
    const quizzes = localStorage.getItem(STORAGE_KEY);
    return quizzes ? JSON.parse(quizzes) : [];
  },

  addQuiz: (quiz) => {
    const quizzes = quizService.getQuizzes();
    const newQuiz = {
      ...quiz,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    quizzes.push(newQuiz);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes));
    return newQuiz;
  },

  getQuizById: (id) => {
    const quizzes = quizService.getQuizzes();
    return quizzes.find(quiz => quiz.id === id);
  }
};