const {prisma} = require('../../database/prisma_client')

async function getAllUserController(req, res){
    try{
        const allUsers = await prisma.user.findMany()
        return res.status(200).json(allUsers)
    }
    catch(error){
        return res.status(500).json({message: 'Erro ao pesquisar todos usuarios '+ error.message})
    }
}

module.exports = {getAllUserController}