const {prisma} = require('../../database/prisma_client')
const Joi = require('joi')

function validateId(req, res, next){
    const schema = Joi.object({
        id: Joi.string().required()
    })

    const {error} = schema.validate(req.params)
    if(error){
        return res.status(409).json({message: error.details[0].message})
    }

    next()
}

async function getContentController(req, res){
    const {id} = req.params
    
    validateId(req, res, async () => {
        try{
            const content = await prisma.content.findUnique({
                where: {
                    id: id,
                }
            })

            if(!content){
                return res.status(404).json('Conteúdo não encontrado')
            }

            return res.status(200).json(content)
        }
        catch(error){
            return res.status(500).json({message: 'Erro ao pesquisar conteúdo '+ error.message})
        }
    })
}

module.exports = {getContentController}