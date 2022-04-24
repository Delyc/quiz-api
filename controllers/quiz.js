import pkg from "http-errors";
import mongoose from "mongoose";
const Mongoose = mongoose;


import { qn } from "../models/quiz.js";


export const createQn = async (req, res) => {
  const question = req.body.question;

  const existingQn = await qn.findOne({ question: question });

  if (existingQn) {
    return res.status(409).json({
      success: false,
      data: {
        message: " This question already exists",
      },
    });
  }


  try {
    const Obj = { ...req.body, isAnswered: "false" };
    const question = await qn.create(Obj);
    console.log(req.body);
    res.status(201).json({
      success: true,
      data: { message: "question created successfully" },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: {
        message: error.message,
      },
    });
  }
};



export const getQnById = async (req, res) => {
  if (!req.params.id || !Mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      success: false,
      data: {
        message: "Missing quiz id",
      },
    });
  }

  const id = req.params.id;
  const question = await qn.findById(id);

  if (!question) {
    return res.status(400).json({
      success: false,
      data: {
        message: "no question exist for this id",
      },
    });
  } else {
    return res.status(200).json({
      message: true,
      data: question,
    });
  }
};

//get all

export const viewAllQns = async (req, res) => {
  const questions = await qn.find();
  return res.status(200).json({
    success: true,
    data: {
      data: questions,
    },
  });
};

//update

export const updateQn = async (req, res) => {
  const id = req.params.id;
  const question = await qn.findById(id);

  if (!question) {
    return res.status(400).json({
      success: false,
      data: {
        message: "No such question found",
      },
    });
  }

  const updatedQn = await qn.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  return res.status(200).json({
    success: true,
    data: {
      message: "question successfully updated",
    },
  });
};

//complete qn
export const completeQn = async (req, res) => {
  const id = req.params.id;
  const question = await qn.findById(id);

  if (!question) {
    return res.status(400).json({
      success: false,
      data: {
        message: "No such question found",
      },
    });
  }

  const updatedQn = await qn.findByIdAndUpdate(
    id,
    {
      isAnswered: !qn.isAnswered,
    },
    { new: true }
  );

  return res.status(200).json({
    success: true,
    data: {
      message: "answered",
    },
  });
};

// delete a qn
export const deleteQn = async (req, res) => {
  const id = req.params.id;
  const question = await qn.findById(id);

  if (!question) {
    return res.status(400).json({
      success: false,
      data: {
        message: "No question found",
      },
    });
  }

  await qn.findByIdAndDelete(id);
  return res.status(200).json({
    success: true,
    data: {
      message: "question deleted successfully",
    },
  });
};
