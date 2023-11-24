const {prisma} = require('../../../database/prisma_client')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const bcrypt = require('bcryptjs')
require('dotenv').config()

function validateUser (req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
     })
 
    const {error} = schema.validate(req.body) 
    if(error){
        return res.status(400).json({message: error.details[0].message})
    }
 
    next()
}

async function authUserController (req, res){
   const {email, password} = req.body

   validateUser(req, res, () =>{
        try{
            prisma.user.findFirst({
                where:{
                    email: email,
                },
            })
            .then(async (user) => {
                if(!user){
                    return res.status(401).json({message : 'Usuário não encontrado'})
                }

                const passwordMatch = await bcrypt.compare(password, user.password)

                if(!passwordMatch){
                    console.log( user.password, password, passwordMatch)
                    return res.status(401).json({message : 'Credenciais inválidas'})
                }

                const signature = process.env.SIGNATURE
                const token = jwt.sign({id : user.id, name: user.name, user_name: user.user_name, email: user.email, image_user: user.image_user, schoolLevelId: user.schoolLevelId}, signature, {
                    expiresIn: '1h',
                });

                return res.status(200).json({token})
            })
        }
        catch(error){
            console.log(error)
            return res.status(500).json({message : 'Erro durante a autentificação'})
        }
    })
}

module.exports = {authUserController}