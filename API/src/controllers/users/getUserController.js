const {prisma} = require('../../database/prisma_client')
const Joi = require('joi')

function validateUser(req, res, next){
    const schema = Joi.object({
        email : Joi.string().email().required()
    })

    const {error} = schema.validate(req.body)
    if(error){
        return res.status(409).json({message: error.details[0].message})
    }

    next()
}

async function getUserController(req, res){
    const {email} = req.body

    validateUser(req, res, async () => {
        try{
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })

            if(!user){
                return res.status(404).json({message: 'Usuário não encontrado'})
            }

            return res.status(200).json(user)
        }
        catch(error){
            console.log(error)
            return res.status(500).json({message: 'Erro ao encontrar usuário' + error.message})
        }
    })
}

module.exports = {getUserController}