import { prisma } from "../config/database.js"
import { CreateQuestionData } from "../types/questionTypes.js";



export async function insert(createQuestionData: CreateQuestionData) {
    await prisma.questions.create({
        data: createQuestionData
    });
  }