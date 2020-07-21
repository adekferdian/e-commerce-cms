const router = require('express').Router()
const productRoutes = require('./productRoutes')
const UserController = require('../controllers/UserController')

router.get('/', (req, res) => {
    res.send(`Welcome bruh`)
})
router.post('/login', UserController.login)
router.use('/products',productRoutes)

module.exports = router