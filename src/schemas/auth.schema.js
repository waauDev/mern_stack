import {z} from "zod"



export const registerSchema = z.object({
    username:z.string({
        required_error: 'Usuario es requerido',
    }),
    email: 
    z.string({
        required_error:"Email es requerido",
    })
    .email({
        message:"Email invalido"
    }),
    password:
    z.string({
        required_error:"Password requerida",
    })
    .min(6,{
        message:" Contraseña debe tener por lo menos 6 caracteres",
    })
});

export const loginSchema = z.object({
    email: 
    z.string({
        required_error:"Email es requerido",
    })
    .email({
        message:"Email invalido",
    }),
    password:
    z.string({
        required_error:"Password requerida",
    })
    .min(6,{
        message:" Contraseña debe tener por lo menos 6 caracteres",
    })
});