const express = require('express');
const pokemon = require('./pokemon');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'entrypoint generale per API pokemon',
  });
});

router.use('/pokemon', pokemon);

module.exports = router;
