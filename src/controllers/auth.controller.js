import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import  jwt  from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const register= async (req, res) => {
    const {email, password, username} = req.body;

    console.log(email, password, username);

   try {

    const UserFound=await User.findOne({email});

    if (UserFound){
       return res.status(400).json(["el email ingresado ya se encuentra registrado"]);
    }    
    const passwordHash= await bcrypt.hash(password,10) //

    const newUser = new User ({
        username,
        email,
        password:passwordHash,

    })
    const userSaved= await newUser.save();
    const token = await createAccessToken({id:userSaved._id});
    //res.cookie('token', token);
    res.cookie('token', token, {
    httpOnly: true,
    secure: false, // true en producción
    sameSite: 'none', // o 'none' si usas cookies entre dominios con HTTPS
    });

    //res.json(userSaved);

    res.json({
        id:userSaved.id,
        username: userSaved.username,
        email: userSaved.email
    })
    //res.send("Registrando...");
   } catch (error) {
    console.log(error);
    res.status(500).json({message:error.message})
   }
   //console.log(newUser);
   

}

export const login= async (req, res) => {
    const {email, password} = req.body;

    console.log(email, password);

   try {

    const UserFound = await User.findOne({email});

    if(!UserFound) return res.status(400).json({message: "Usuario no encontrado"});

    const isMatch = await bcrypt.compare(password, UserFound.password);

    if(!isMatch) return res.status(400).json({message:"Credenciales incorrectas"});



    const token = await createAccessToken({id:UserFound._id});
    res.cookie('token', token);
    
    //res.json(userSaved);

    res.json({
        id:UserFound.id,
        username: UserFound.username,
        email: UserFound.email
    })
    //res.send("Registrando...");
   } catch (error) {
    console.log(error);
    res.status(500).json({message:error.message})
   }
   //console.log(newUser);
   

}


export const logout = (req,res)=>{
    res.cookie("token", "",{
        expires: new Date(0)    
    })

    return res.sendStatus(200);
}


export const profile = async (req, res) =>{
    const userFound = await User.findById(req.user.id);

    if (!userFound) return res.status(400).json({message:"User not found"});

    return res.json({
        id: userFound._id,
        username: userFound.username,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,

    });
}

export const verify = async(req,res )=>{
    const {token} = req.cookies
    if(!token) return res.status(401).json({message:"Unauthorized"});

    jwt.verify(token,  TOKEN_SECRET, async (err, user)=>{
        if(err) return res.status(401).json({message:"Unauthorized"});
        const userFound = await User.findById(user.id);

        if(!userFound) return res.status(401).json({message:"Unauthorized"});
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        })
    })
    
   
}