import Joi from 'joi';
// import { IQuestionData } from '../types/questionTypes';

// export const questionSchema = Joi.object<IQuestionData>({
export const questionSchema = Joi.object({
  askedBy: Joi.string().required(),
  question: Joi.string().required()
});
