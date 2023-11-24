const {prisma} = require('../src/database/prisma_client')

const levels = [
    {level: 'Ensino Fundamental 1', slug: 'ensino-fundamental-I', created_at: new Date(), updated_at: new Date()},
    {level: 'Ensino Fundamental 2', slug: 'ensino-fundamental-II', created_at: new Date(), updated_at: new Date()},
    {level: 'Ensino Médio', slug: 'ensino-medio', created_at: new Date(), updated_at: new Date()}
]

const subjects = [
    {discipline: 'Biologia', slug:'biologia', created_at: new Date(), updated_at: new Date()},
    {discipline: 'Matemática', slug:'matematica', created_at: new Date(), updated_at: new Date()},
    {discipline: 'História', slug:'historia', created_at: new Date(), updated_at: new Date()},
]

async function main(){
    for(const level of levels){
        await prisma.schoolLevel.create({
            data: level
        })
        console.log(`Nível "${level.level}" criado`)
    }

    for(const subject of subjects){
        await prisma.schoolSubject.create({
            data: subject
        })
        console.log(`M<ateria "${subject.discipline}" criado`)
    }
}

main()
.catch(error => {
    console.log("Erro ao popular dados" + error)
})
.finally(async () => {
    await prisma.$disconnect
})