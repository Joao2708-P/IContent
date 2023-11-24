const {prisma} = require('../../database/prisma_client')

async function getAllLevelController(req, res){
    try{
        const allLevels = await prisma.schoolLevel.findMany()
        return res.status(200).json(allLevels)
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({message: 'Erro ao pesquisar todos os niveis ' + error.message})
    }
}

module.exports = {getAllLevelController}