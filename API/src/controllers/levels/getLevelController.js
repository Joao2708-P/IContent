const {prisma} = require('../../database/prisma_client')
const Joi = require('joi')

function validateLevel(req, res, next){
    const schema = Joi.object({
        id: Joi.string().required()
    });

    const {error} = schema.validate(req.params)
    if(error){
        return res.status(409).json({message: error.details[0].message})
    }

    next()
}

async function getLevelController(req, res){
    const {id} = req.params

    validateLevel(req, res, async () => {
        try {
            const levels = await prisma.schoolLevel.findUnique({
                where: {
                    id: id,
                }
            })
    
            if(!levels){
                return res.status(404).json({message: 'Usuário não encontrado'})
            }
    
            return res.status(200).json(levels)
        }
        catch(error){
            console.log(error)
            return res.status(500).json({message: 'Erro ao encontrar nivel escolas' + error.message})
        }
    })
}

module.exports = {getLevelController}