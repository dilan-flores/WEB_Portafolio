
            // ejm2
const {Router} = require('express') 

const router = Router()

            // ejm1
/* sin el uso de controllers
router.get('/',(req,res)=>{
    res.render('index')
})

router.get('/login',(req,res)=>{
    res.render('login')
})
*/
            // ejm2
const {renderIndex,renderLogin} = require('../controllers/index.controllers.js')


router.get('/',renderIndex) // Con el uso de controllers
router.get('/login',renderLogin) // Con el uso de controllers

module.exports = router

