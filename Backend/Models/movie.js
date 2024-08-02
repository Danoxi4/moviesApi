const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre:  {
    type: String,
    required: true,
  }  ,
  releaseDate: {
    type: String,
    required: true,
  },
  likes : {
    type : Number,
    default: 0
  },
  cast: [
    {
      actorName: {
        type: String,
        required: true,
      },
      characterName: {
        type: String,
        required: true,
      },
    },
  ],
  director: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: false, // Set to true if the poster is required
  },  
  reviews: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
      },
      comment: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
}, { toJSON: { virtuals: true } });

// Define a virtual property for calculating the average rating
movieSchema.virtual('ratingAverage').get(function () {
  if (!this.reviews || this.reviews.length === 0) {
    return 0;
  }
  
  const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / this.reviews.length;
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
