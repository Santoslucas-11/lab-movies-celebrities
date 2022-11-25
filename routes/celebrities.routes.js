const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity.model');

router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity');
});

router.post('/celebrities/create', (req, res, next) => {
    // console.log(req.body);
    const { name, occupation, catchPhrase } = req.body;
   
    Celebrity.create({ name, occupation, catchPhrase })
      
      .then(() => res.redirect('/celebrities'))
      .catch(error => next(error));
  });

  router.get('/celebrities', async (req, res, next) => {
    try{
    const celebrities = await Celebrity.find();
    res.render('celebrities/celebrities', {celebrities});
    } catch(error) {
        next(error);
    }
});

module.exports = router;