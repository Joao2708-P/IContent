const {prisma} = require('../../database/prisma_client')

async function getAllContentController(req, res){
    try{
        const { search } = req.query
        let contents = []

        if (!search) 
        {
            contents = await prisma.content.findMany();
        }
        else 
        {
            contents = await prisma.content.findMany({
                where: {
                    body: {
                        contains: search
                    }
                }
            })
        }

        return res.status(200).json(contents)
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message: 'Erro as pequisar todos os conteúdos ' + error.message})
    }
}

module.exports = {getAllContentController}