import Joi from 'joi';

export const notesSchema = Joi.object({        
  userId: Joi.number().required(),      
  title:Joi.string().min(3).max(50).required(),      
  note: Joi.string().min(3).max(1000).required()  
});
