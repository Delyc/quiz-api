import mongoose from "mongoose";


const QnSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      unique: true,
      
     
    },
    answer: {
      type: Boolean,
      required: true,
     
    },

    isAnswered:{
        type: Boolean,
        required: true,
    }
  
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export const qn = mongoose.model("quiz", QnSchema);
