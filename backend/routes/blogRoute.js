const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
    res.json({msg:'I\'m a blog route'})
})


module.exports = router