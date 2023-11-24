const {prisma} = require('../../database/prisma_client')
const Joi = require('joi')
const bcrypt = require('bcryptjs')

async function validateUser (req, res, next){
    const schema = Joi.object({
        user_name: Joi.string().required(),
        password: Joi.string().required(),
    })

    const {error} = schema.validate(req.body)
    if(error){
        return res.status(409).json({message : error.details[0].message})
    }

    next()
}

async function deleteUserController(req, res){
    const {user_name, password} = req.body

    validateUser(req, res, async () => {
        try{
            const existingUser = await prisma.user.findUnique({
                where: {
                    user_name: user_name
                }
            })
            if(!existingUser){
                return res.status(404).json({message : 'Usuário não encontrado'})
            }

            const passwordMatch = await bcrypt.compare(password, existingUser.password)

            if(!passwordMatch){
                return res.status(401).json({message : 'Senha incorreta'})
            }

            await prisma.user.delete({
                where: {
                    id: existingUser.id,
                }
            })

            return res.status(200).json({message : 'Usuário deletado com sucesso'})
        }
        catch(error){
            console.log(error)
            return res.status(500).json({message : 'Erro na exclusão'})
        }
    })
}

module.exports = {deleteUserController}