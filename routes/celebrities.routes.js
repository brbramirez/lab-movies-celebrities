// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const celebrity = require("../models/Celebrity.model")

// all your routes here
//Adding new celebrities
router.get("/celebrities/create",(req, res, next) => res.render('celebrities/new-celebrity'))
router.post("/celebrities/create", (req,res) => {
    const newCelebrity = req.body;
    celebrity.create(newCelebrity)
    .then((response) => {
        res.render('celebrities/celebrities');
    })
    .catch((err) => console.log(err));
});

//Listing our celebrities
router.get("/celebrities", async (req, res, next) => {
    const allCelebrities = await celebrity.find();
    console.log(allCelebrities);
    res.render('celebrities/celebrities', { allCelebrities })
});


module.exports = router;