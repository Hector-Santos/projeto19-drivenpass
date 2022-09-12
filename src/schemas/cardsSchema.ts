import Joi from 'joi';

export const cardsSchema = Joi.object({        
    userId: Joi.number().required(),
    nameOnCard: Joi.string().required(),
    tag: Joi.string().required(),
    cardNumber: Joi.string().regex(/^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}/).required(),
    cvc: Joi.string().regex(/^\d{3}/).required(),
    password: Joi.string().required(),
    isVirtual: Joi.boolean().required(),
    expirationDate: Joi.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})/).required(),
    cardType:Joi.string().valid( "CREDIT","DEBIT","CREDIT_DEBIT").required()
});
