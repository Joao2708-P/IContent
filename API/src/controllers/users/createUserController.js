const {prisma} = require('../../database/prisma_client')
const Joi = require('joi')
const bcrypt = require('bcryptjs')

async function validateUsers(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        user_name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        image_user: Joi.string(),
        schoolLevelId: Joi.string().required()
    })

    const {error} = schema.validate(req.body)
    if(error){
        return res.status(400).json({message : error.details[0].message})
    }

    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                {user_name: req.body.user_name},
                {email: req.body.email}
            ]
        }
    })

    if(existingUser){
        return res.status(409).json({message : 'Nome de usuário ou email já cadastrados'})
    }

    next()
}

async function createUserController(req, res){
    const{name, email, image_user, password,  schoolLevelId,  user_name} = req.body

    validateUsers(req, res, async () => {
        try{
            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    image_user,
                    password : hashedPassword,
                    schoolLevelId,
                    user_name
                }
            })

            res.status(200).json(newUser)
        }
        catch(error){
            res.status(500).json({message : 'Erro na inclusão de usuário' + error})
        }
    })
}

module.exports = {createUserController}