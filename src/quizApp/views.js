import { qn, Quiz } from "../../models/quiz.js";

export const createQuiz = async (req, res) => {
  const { name, number } = req.body;
  const questions = await qn.find({}).limit(number || 5);
  let qns = [];
  questions.forEach((q) => {
    qns.push(q._id);
  });
  const quiz = await Quiz.create({ questions: qns, name: name });
  return res.json(await quiz.populate("questions"));
};
export const getQuizes = async (req, res) => {
  const quizes = await Quiz.find({}).populate("questions");
  return res.json({ data: quizes });
};

export const getQuiz = async (req, res) => {
  const { id } = req.params;
  const quiz = await Quiz.findById(id).populate("questions");
  if (!quiz) return res.sendStatus(404);
  return res.json({
    quiz,
  });
};

export const viewScores = async (req, res) => {
  const { id } = req.params;
  const quiz = await Quiz.findById(id).populate("questions");
  console.log(req.body);
  let score = 0;
  let answers = []
  quiz.questions.forEach((question) => {
    Object.keys(req.body.answers).forEach((key) => {
      if (question._id == key) {
        if (question.trueAnswer == req.body.answers[key]) {
          score++;
          answers.push({qn:question.question, answer: question.trueAnswer, yourAnswer: req.body.answers[key], correct: true})
        } else {
          answers.push({qn:question.question, answer: question.trueAnswer, yourAnswer: req.body.answers[key], correct: false})


        }
      }
    });
  });
  return res.json({
    score: score,
    answers: answers,
    questions: quiz.questions.length,
    text: `${score}/ ${quiz.questions.length}`,
  });


};


