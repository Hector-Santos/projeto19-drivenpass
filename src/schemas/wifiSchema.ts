import Joi from 'joi';

export const wifiSchema = Joi.object({            
  tag:Joi.string().min(3).max(50).required(),      
  password: Joi.string().required()
});
