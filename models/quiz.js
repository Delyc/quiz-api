import mongoose from "mongoose";
import random from "mongoose-simple-random";

const QnSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answers: {
      type: Array,
    },
    trueAnswer: {
      type: String,
    },

    isAnswered: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);


const codegenarator = () => {
  const code = Math.random().toString(36).slice(-8);
  return code.toUpperCase();
};

export const qn = mongoose.model("question", QnSchema);

const QuizSchema = new mongoose.Schema({
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "question",
    },
  ],
  name: {
    type: String,
    required: false,
  },
  code: {
    type: String,
    required: false,
  },
});

QuizSchema.pre("save", async function (next) {
  const quiz = this;
  if (!quiz.code) {
    quiz.code = codegenarator();
  }
  if (!quiz.name) {
    quiz.name = quiz.code;
  }
  next();
});

QuizSchema.methods.getMarks = () => {
  return this.questions.length;
};

export const Quiz = mongoose.model("quizModel", QuizSchema);
