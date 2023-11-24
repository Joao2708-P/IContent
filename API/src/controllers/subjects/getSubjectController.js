const {prisma} = require('../../database/prisma_client')
const Joi = require('joi')

function validateSubject(req, res, next){
    const schema = Joi.object({
        discipline: Joi.string().required()
    })

    const {error} = schema.validate(req.body)
    if(error){
        return res.status(409).json({message: error.details[0].message})
    }

    next()
}

async function getSubjectController(req, res){
    const {discipline} = req.body

    validateSubject(req, res, async () => {
        try{
            const subject = await prisma.schoolSubject.findUnique({
                where:{
                    discipline: discipline
                }
            })
    
            if(!subject){
                return res.status(404).json({message: 'Materia não mencontrada'})
            }

            return res.status(200).json(subject)
        }
        catch(error){
            console.log(error)
            return res.status(500).json({message: 'Erro ao encontrar materia' + error.message})
        }
    })
}

module.exports = {getSubjectController}