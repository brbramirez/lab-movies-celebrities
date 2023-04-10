// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const movie = require("../models/Movie.model");
const celebrity = require("../models/Celebrity.model");

// all your routes here

//Create a new movie
//Rendering the form with the actual values
router.get("/movies/create", async (req, res, next) => {
    const allCelebrities = await celebrity.find();
    res.render('movies/new-movie', { allCelebrities })
});

//Posting the info
router.post("/movies/create", async (req, res) => {
    try {
      const newMovie = req.body;
      await movie.create(newMovie);
      res.redirect('/movies');
    } catch (err) {
      console.log(err);
    }
  });

  //See all movies
  router.get("/movies", async (req, res, next) => {
    const allMovies = await movie.find();
    console.log(allMovies);
    res.render('movies/movies', { allMovies })
});

//Movie details
router.get("/movies/:id", async (req,res) => {
    const movieId = req.params.id;
    const moviePlot = await movie.findById(movieId).populate('cast');
    res.render('movies/movie-details', {moviePlot});
})

//Edit a movie
//Rendering the form
router.get("/movies/:id/edit", async (req,res) => {
    try {
        const movieId = req.params.id;
        const moviePlot = await movie.findById(movieId);
        const celebrities = await celebrity.find().populate();
        res.render('movies/edit-movie', {moviePlot, celebrities});
      } catch (err) {
        console.log(err);
      }
    
})
//Posting the info
router.post("/movies/:id/edit", (req, res) => {
    const editedMovie = req.body;
    movie.findByIdAndUpdate(req.params.id, editedMovie)
    .then((response) => {
    res.redirect('/movies');
    })
    .catch((err) => console.log(err));
  });


module.exports = router;