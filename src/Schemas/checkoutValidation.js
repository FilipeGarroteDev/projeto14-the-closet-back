import joi from 'joi';

const checkoutSchema = joi.object({
    cpf: joi.number().required(),
    name: joi.string().required(),
    lastName: joi.string().required(),
    PhoneNumber: joi.number().required(),
    emailAdress: joi.string().email().required(),
    cep: joi.number().required(),
    state: joi.string().required(),
    city: joi.string().required(),
    district: joi.string().required(),
    adress: joi.string().required(),
    number: joi.number().required(),
    complement: joi.string(),
    reference: joi.string()
});

export { checkoutSchema };