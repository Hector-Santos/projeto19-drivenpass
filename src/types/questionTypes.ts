import questionRouter from "../routes/questionRouter";

export interface question{
    id:number;
    askedBy:string;      
    question:String;
}

export type CreateQuestionData = Omit<question, 'id'>