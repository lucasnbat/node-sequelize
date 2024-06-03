const express = require('express');

const router = express.Router();

router.get('/', (request, response) => {
    return response.send('Teste vindo do routes.js')
})

// exportando minha var router
module.exports = router;