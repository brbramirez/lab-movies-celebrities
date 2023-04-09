// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const celebrity = require("../models/Celebrity.model")

//All your routes here
//Adding new celebrities
router.get("/celebrities/create",(req, res, next) => res.render('celebrities/new-celebrity'));

router.post("/celebrities/create", async (req, res) => {
    try {
      const newCelebrity = req.body;
      await celebrity.create(newCelebrity);
      res.redirect('/celebrities');
    } catch (err) {
      console.log(err);
    }
  });

//Listing our celebrities
router.get("/celebrities", async (req, res, next) => {
    const allCelebrities = await celebrity.find();
    console.log(allCelebrities);
    res.render('celebrities/celebrities', { allCelebrities })
});



module.exports = router;