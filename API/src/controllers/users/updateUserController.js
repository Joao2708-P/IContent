const {prisma} = require('../../database/prisma_client')
const Joi = require('joi')
const bcrypt = require('bcryptjs')

async function validateUser(req, res, next){
    const schema = Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        image_user: Joi.string().required(),
        password: Joi.string().required(),
        schoolLevelId: Joi.string().required(),
        user_name: Joi.string().required()
    })

    const {error} = schema.validate(req.body)
    if(error){
        return res.status(409).json({message: error.details[0].message})
    }

    next()
}

async function updateUserController(req, res){
    const {id, name, email, image_user, password, schoolLevelId, user_name} = req.body

    validateUser(req, res, async () => {
        try{
            const user = await prisma.user.findUnique({where: {id: id}})

            if(!user){
                return res.status(404).json({message: 'Usuário não encontrado'})
            }

            let hashedPassword = await bcrypt.hash(password, 10)

            const updateUser = await prisma.user.update({
                where:{id: id},
                data: {
                    name,
                    email,
                    image_user,
                    password: hashedPassword,
                    schoolLevelId,
                    user_name
                }
            })

            return res.status(200).json(updateUser)
        }
        catch(error){
            console.log(error)
            return res.status(500).json({message: 'Erro ao atualizar usuário' + error.message})
        }
    })
}

module.exports = {updateUserController}