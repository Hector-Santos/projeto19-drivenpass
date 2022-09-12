import Joi from 'joi';

export const credentialsSchema = Joi.object({        
  userName: Joi.string().required(),
  url:Joi.string().uri().required(),      
  tag:Joi.string().min(3).max(50).required(),      
  password: Joi.string().required()
});
