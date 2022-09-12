import Joi from 'joi';

export const notesSchema = Joi.object({             
  title:Joi.string().min(3).max(50).required(),      
  note: Joi.string().min(3).max(1000).required()  
});
