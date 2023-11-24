const {prisma} = require('../../database/prisma_client')

async function getAllSubjectController(req, res){
    try{
        const allSubjects = await prisma.schoolSubject.findMany()
        return res.status(200).json(allSubjects)
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message: 'Erro ao pesquisar todas as materias ' + error.message })
    }
}

module.exports = {getAllSubjectController}