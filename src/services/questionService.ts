import { isGeneratorFunction } from "util/types";
import { question } from "../types/questionTypes";
import { CreateQuestionData } from "../types/questionTypes";

export async function createQuestionService(question:string, askedBy:string){

  const createQuestionData: CreateQuestionData = {
    question,
    askedBy
  }
  
  insert(createQuestionData)
}
