import express from "express";
import Question from "../models/Questions.js";
import Result from "../models/Result.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

const auth = authMiddleware;

//start
router.get("/start", auth, async(req, res)=>{
    try{
        const questions = await Question.aggregate([{$sample: {size: 5}}]);
        res.json(questions);
    }catch(err){
        res.status(500).json({error: err.message});
    }
})

//add q
router.post("/add", async(req, res)=>{
    try{
        const {question, options, correctAnswer} = req.body;

        if(!question || !options || !correctAnswer === undefined){
            return res.status(400).json({message: "All fields are required"});
        }

        const newQuestion = new Question({
            question,
            options,
            correctAnswer
        })
        await newQuestion.save();
        res.status(201).json({message: "Question added successfully", newQuestion});
    }catch(err){
        res.status(500).json({error: err.message});
    }
})

//submit
router.post("/submit", auth, async(req,res)=>{
    try{
        const {answers} = req.body; //array
        let score = 0;

        for(const ans of answers){
            const question = await Question.findById(ans.questionId);
            if(question && question.correctAnswer === ans.selectedOption){
                score++;
            }
        }

        const result = new Result({
            userId: req.user.id,
            score,
            total: answers.length,
        })

        await result.save();

        res.json({message: "Exam submitted successfully", score, total: answers.length});
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

export default router;