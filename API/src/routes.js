const express = require('express')
const { spawn } = require('child_process');
/*
import user controllers
*/
const {createUserController} = require('./controllers/users/createUserController')
const {authUserController}   = require('./controllers/users/auth/authUserController')
const {deleteUserController} = require('./controllers/users/deleteUserController')
const {updateUserController} = require("./controllers/users/updateUserController")
const {getUserController}    = require("./controllers/users/getUserController")
const {getAllUserController} = require('./controllers/users/getAllUsersController')

/*
import subjects controllers
*/
const {getSubjectController}    = require('./controllers/subjects/getSubjectController')
const {getAllSubjectController} = require('./controllers/subjects/getAllSubjectController')

/*
import levels controllers
*/
const {getLevelController}    = require('./controllers/levels/getLevelController')
const {getAllLevelController} = require('./controllers/levels/getAllLevelController')

/*
import contents controllers
*/
const {createContentController} = require('./controllers/contents/createContentController')
const {getAllContentController} = require('./controllers/contents/getAllContentController')
const {getContentController}    = require('./controllers/contents/getContentController')

const routes = express.Router()

/*
Default route
*/
routes.get('/', (req, res) => {
    return res.json({message: 'Api IContent - TCC'})
})

/*
Users routes
*/
routes.post('/create-user', createUserController)
routes.post('/auth-user',authUserController)
routes.delete('/delete-user', deleteUserController)
routes.put('/update-user', updateUserController)
routes.get('/get-user', getUserController)
routes.get('/get-all-users', getAllUserController)

/*
Subjects routes
*/
routes.get('/get-subject', getSubjectController)
routes.get('/get-all-subjects', getAllSubjectController)

/*
Levels routes
*/
routes.get('/get-level/:id', getLevelController)
routes.get('/get-all-levels', getAllLevelController)

/*
Contents routes
*/
routes.post('/create-content', createContentController)
routes.get('/get-all-contents', getAllContentController)
routes.get('/get-content/:id', getContentController)

routes.post('/analyze', (req, res) => {
    
    const { query } = req.body;
    const python = spawn('python', ['IA-DetecdetFake.py', query]);

    python.stdout.on('data', function (data) {

        const analysisResults = JSON.parse(data.toString()); // Certifique-se de que o Python envia dados no formato JSON
    
        // Aqui, você pode processar os resultados da análise conforme necessário
        res.json(analysisResults);
    });

    python.on('close', (code) => {
       console.log(`child process close all stdio with code ${code}`);
    });
});

module.exports = routes