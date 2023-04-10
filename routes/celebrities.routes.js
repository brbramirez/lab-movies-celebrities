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

//Celebrities details
router.get("/celebrities/:id", async (req,res) => {
  const celebrityId = req.params.id;
  const celebrityDetails = await celebrity.findById(celebrityId);
  res.render('celebrities/celebrities-details', {celebrityDetails});
})

//Delete a celebrity
router.post("/celebrities/:id/delete", async (req, res) => {
  try {
    await celebrity.findByIdAndDelete(req.params.id);
    const allCelebrities = await celebrity.find();
    res.render('celebrities/celebrities', {allCelebrities});
  } catch (err) {
    console.log(err);
  }
});

//Edit a celebrity
//Rendering the form
router.get("/celebrities/:id/edit", (req, res) => {
  celebrity.findById(req.params.id)
    .then((celebrityFromDB) => {
      res.render("celebrities/edit-celebrity", { celebrity: celebrityFromDB });
    })
    .catch((err) => console.log(err));
});
//Posting the info
router.post("/celebrities/:id/edit", async (req, res) => {
  try {
    const editedCelebrity = req.body;
    await celebrity.findByIdAndUpdate(req.params.id, editedCelebrity)
    const allCelebrities = await celebrity.find();
    res.render('celebrities/celebrities', {allCelebrities});
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;