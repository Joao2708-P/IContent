const {prisma} = require('../../database/prisma_client')
const Joi = require('joi')

function validateContent(req, res, next){
    const schema = Joi.object({
        title: Joi.string().required(),
        assessment: Joi.string().valid('WELL_RATED', 'POORÇY_RATED').required(),
        body: Joi.string().required(),
        image_content: Joi.string(),
        schoolLevelId: Joi.string().required(),
        schoolSubjectId: Joi.string().required(),
        slug: Joi.string().required()
    })

    const {error} = schema.validate(req.body)
    if(error){
        return res.status(409).json({message: error.details[0].message})
    }

    next()
}

async function createContentController(req, res){
    const {title, assessment, body, image_content, schoolLevelId, schoolSubjectId, slug} = req.body

    validateContent(req, res, async () => {
        try{
            const createContent = await prisma.content.create({
                data: {
                    title,
                    assessment,
                    body,
                    image_content,
                    schoolLevelId,
                    schoolSubjectId,
                    slug 
                }
            })

            return res.status(200).json(createContent)
        }
        catch(error){
            console.log(error)
            return res.status(500).json({message: 'Erro ao incluir conteúdo ' + error.message})
        }
    })
}

module.exports = {createContentController}