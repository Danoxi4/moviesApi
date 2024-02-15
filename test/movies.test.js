const request = require('supertest')
const app = require('../App/app')
const { mongoConnect, mongoDisconnect } = require('../Config/dbConnect')
const Movie = require('../Models/movie')
const User = require('../Models/user')
const mongoose = require('mongoose')

describe('Test POST /movies', () => {
    test('It should respond with 201 and the created movie details', async () => {
      // Create a test movie data
      const testMovie = {
        title: 'Test Movie',
        genre: 'Action',
        rating: 4.5,
        releaseDate: '2023-07-01',
        director: 'Test Director',
      };
  
      // Make a request to upload a new movie
      const response = await request(app)
        .post('/movies')
        .send(testMovie)
        .expect('Content-Type', /json/)
        .expect(201);
  
      // Get the movie ID from the response
      const movieId = response.body._id;
  
      // Retrieve the movie from the database
      const createdMovie = await Movie.findById(movieId);
  
      // Assertions
      expect(createdMovie).toBeDefined();
      expect(createdMovie.title).toEqual(testMovie.title);
      expect(createdMovie.genre).toEqual(testMovie.genre);
      expect(createdMovie.rating).toEqual(testMovie.rating);
      expect(createdMovie.releaseDate.toISOString()).toEqual(testMovie.releaseDate);
      expect(createdMovie.director).toEqual(testMovie.director);
    });
  
    test('It should respond with 400 for missing required movie details', async () => {
      const incompleteMovie = {
        title: 'Test Movie',
        genre: 'Action',
        rating: 4.5,
      };
  
      // Make a request with incomplete movie details
      const response = await request(app)
        .post('/movies')
        .send(incompleteMovie)
        .expect('Content-Type', /json/)
        .expect(400);
  
      // Assertion for the error message
      expect(response.body.message).toBe('Please provide all required movie details');
    });
  });
  

describe('Search Movies by Name', () => {
    beforeAll(async () => {
      // Perform any setup or data seeding if needed
      // For example, you can add some movies to the database for testing
      await Movie.create([
        {
          title: 'The Avengers',
          genre: 'Action',
          releaseDate: new Date('2012-04-11'),
          director: 'Joss Whedon',
        },
        {
          title: 'Inception',
          genre: 'Science Fiction',
          releaseDate: new Date('2010-07-16'),
          director: 'Christopher Nolan',
        },
      ]);
    });
  
    afterAll(async () => {
      // Cleanup after the test, remove any temporary data, etc.
      await Movie.deleteMany();
    });
  
    test('It should return a list of movies with matching title', async () => {
      const searchKeyword = 'ave';
      const response = await request(app)
        .get(`/api/movies/search?name=${searchKeyword}`)
        .expect('Content-Type', /json/)
        .expect(200);
  
      // Check if the response contains the expected movies
      expect(response.body).toHaveLength(1); // Since 'The Avengers' matches the search keyword
      expect(response.body[0].title).toEqual(expect.stringContaining(searchKeyword));
    });
  
    test('It should return an empty array if no matching movies found', async () => {
      const searchKeyword = 'xyz';
      const response = await request(app)
        .get(`/api/movies/search?name=${searchKeyword}`)
        .expect('Content-Type', /json/)
        .expect(200);
  
      // Check if the response is an empty array
      expect(response.body).toHaveLength(0);
    });
  
    test('It should return 400 if no search keyword provided', async () => {
      const response = await request(app)
        .get('/api/movies/search')
        .expect('Content-Type', /json/)
        .expect(400);
  
      // Check if the response contains the expected error message
      expect(response.body.message).toEqual('Please provide a search name');
    });
  });


describe('Update Movie API', () => {
    // Create a variable to hold the movieId of the test movie
    let testMovieId;
  
    beforeAll(async () => {
      // Connect to the test database
      await mongoose.connect('mongodb://localhost/test_db', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      // Create a test movie in the database
      const testMovie = await Movie.create({
        title: 'Test Movie',
        genre: 'Action',
        rating: 4.5,
        releaseDate: new Date('2023-01-01'),
      });
  
      // Assign the movieId of the test movie to the variable
      testMovieId = testMovie._id.toString();
    });
  
    afterAll(async () => {
      // Disconnect from the test database after all tests
      await mongoose.disconnect();
    });
  
    describe('Test PUT /movies/:movieId', () => {
      test('It should respond with 200 success and update the movie', async () => {
        const updatedData = {
          title: 'Updated Movie Title',
          genre: 'Comedy',
          rating: 4.0,
          releaseDate: new Date('2022-12-31'),
        };
  
        const response = await request(app)
          .put(`/movies/${testMovieId}`)
          .send(updatedData)
          .expect('Content-Type', /json/)
          .expect(200);
  
        expect(response.body).toMatchObject(updatedData);
      });
  
      test('It should respond with 404 if the movieId is invalid', async () => {
        const invalidMovieId = 'invalid-id';
  
        const response = await request(app)
          .put(`/movies/${invalidMovieId}`)
          .expect('Content-Type', /json/)
          .expect(404);
  
        expect(response.body).toEqual({ message: 'Movie not found' });
      });
  
      test('It should respond with 400 if some required fields are missing', async () => {
        const invalidData = {
          genre: 'Comedy',
          rating: 4.0,
          releaseDate: new Date('2022-12-31'),
        };
  
        const response = await request(app)
          .put(`/movies/${testMovieId}`)
          .send(invalidData)
          .expect('Content-Type', /json/)
          .expect(400);
  
        expect(response.body).toEqual({ message: 'Please provide all required movie details' });
      });
    });
  });


describe('Review Movie API', () => {
    // Create a variable to hold the movieId of the test movie
    let testMovieId;
  
    beforeAll(async () => {
      // Connect to the test database
      await mongoose.connect('mongodb://localhost/test_db', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      // Create a test movie in the database
      const testMovie = await Movie.create({
        title: 'Test Movie',
        genre: 'Action',
        rating: 4.5,
        releaseDate: new Date('2023-01-01'),
      });
  
      // Assign the movieId of the test movie to the variable
      testMovieId = testMovie._id.toString();
    });
  
    afterAll(async () => {
      // Disconnect from the test database after all tests
      await mongoose.disconnect();
    });
  
    describe('Test POST /movies/:movieId/reviews', () => {
      test('It should respond with 200 success and add the comment', async () => {
        const commentData = {
          comment: 'This is a great movie!',
        };
  
        const response = await request(app)
          .post(`/movies/${testMovieId}/reviews`)
          .send(commentData)
          .expect('Content-Type', /json/)
          .expect(200);
  
        expect(response.body).toEqual({ message: 'Comment added successfully' });
      });
  
      test('It should respond with 404 if the movieId is invalid', async () => {
        const invalidMovieId = 'invalid-id';
  
        const response = await request(app)
          .post(`/movies/${invalidMovieId}/reviews`)
          .expect('Content-Type', /json/)
          .expect(404);
  
        expect(response.body).toEqual({ message: 'Invalid movie ID' });
      });
    });
  });


describe('Like Movie API', () => {
  // Create variables to hold the movieId and userId of the test data
  let testMovieId;
  let testUserId;

  beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect('mongodb://localhost/test_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create a test movie in the database
    const testMovie = await Movie.create({
      title: 'Test Movie',
      genre: 'Action',
      rating: 4.5,
      releaseDate: new Date('2023-01-01'),
    });

    // Create a test user in the database
    const testUser = await User.create({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'testpassword',
      role: 'regular',
      favoriteGenre: 'Action',
    });

    // Assign the movieId and userId of the test data to the variables
    testMovieId = testMovie._id.toString();
    testUserId = testUser._id.toString();
  });

  afterAll(async () => {
    // Disconnect from the test database after all tests
    await mongoose.disconnect();
  });

  describe('Test POST /movies/:id/like', () => {
    test('It should respond with 200 success and like the movie', async () => {
      const response = await request(app)
        .post(`/movies/${testMovieId}/like`)
        .set('Authorization', `Bearer ${createToken(testUserId)}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual({ message: 'Movie liked successfully' });
    });

    test('It should respond with 404 if the movieId is invalid', async () => {
      const invalidMovieId = 'invalid-id';

      const response = await request(app)
        .post(`/movies/${invalidMovieId}/like`)
        .set('Authorization', `Bearer ${createToken(testUserId)}`)
        .expect('Content-Type', /json/)
        .expect(404);

      expect(response.body).toEqual({ message: 'Invalid movie ID' });
    });

    test('It should respond with 404 if the user is not found', async () => {
      const invalidUserId = 'invalid-id';

      const response = await request(app)
        .post(`/movies/${testMovieId}/like`)
        .set('Authorization', `Bearer ${createToken(invalidUserId)}`)
        .expect('Content-Type', /json/)
        .expect(404);

      expect(response.body).toEqual({ message: 'User not found' });
    });

    test('It should respond with 409 if the movie is already in the user favorites', async () => {
      // Add the movie to the test user's favorites
      await User.findByIdAndUpdate(
        testUserId,
        { $addToSet: { favorites: testMovieId } },
        { new: true }
      );

      const response = await request(app)
        .post(`/movies/${testMovieId}/like`)
        .set('Authorization', `Bearer ${createToken(testUserId)}`)
        .expect('Content-Type', /json/)
        .expect(409);

      expect(response.body).toEqual({ message: 'Movie is already in favorites' });
    });
  });
});


describe('Search by Release Date API', () => {
    // Create variables to hold the movieId and userId of the test data
    let testMovieId;
  
    beforeAll(async () => {
      // Connect to the test database
      await mongoose.connect('mongodb://localhost/test_db', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      // Create a test movie in the database
      const testMovie = await Movie.create({
        title: 'Test Movie',
        genre: 'Action',
        rating: 4.5,
        releaseDate: new Date('2023-01-01'),
      });
  
      // Assign the movieId of the test data to the variable
      testMovieId = testMovie._id.toString();
    });
  
    afterAll(async () => {
      // Disconnect from the test database after all tests
      await mongoose.disconnect();
    });
  
    describe('Test GET /movies/search', () => {
      test('It should respond with 200 success and return movies with the specified release date', async () => {
        const releaseDate = '2023-01-01';
  
        const response = await request(app)
          .get(`/movies/search?releaseDate=${releaseDate}`)
          .expect('Content-Type', /json/)
          .expect(200);
  
        // Ensure that the response contains the test movie
        expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining({ _id: testMovieId })]));
      });
  
      test('It should respond with 200 success and return an empty array if no movies are found', async () => {
        const releaseDate = '2023-01-02';
  
        const response = await request(app)
          .get(`/movies/search?releaseDate=${releaseDate}`)
          .expect('Content-Type', /json/)
          .expect(200);
  
        // Ensure that the response is an empty array
        expect(response.body).toEqual([]);
      });
    });
  });


describe('Search by Genre API', () => {
    // Create variables to hold the movieId and userId of the test data
    let testMovieId;
  
    beforeAll(async () => {
      // Connect to the test database
      await mongoose.connect('mongodb://localhost/test_db', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      // Create a test movie in the database
      const testMovie = await Movie.create({
        title: 'Test Movie',
        genre: 'Action',
        rating: 4.5,
        releaseDate: new Date('2023-01-01'),
      });
  
      // Assign the movieId of the test data to the variable
      testMovieId = testMovie._id.toString();
    });
  
    afterAll(async () => {
      // Disconnect from the test database after all tests
      await mongoose.disconnect();
    });
  
    describe('Test GET /movies/search', () => {
      test('It should respond with 200 success and return movies with the specified genre', async () => {
        const genre = 'Action';
  
        const response = await request(app)
          .get(`/movies/search?genre=${genre}`)
          .expect('Content-Type', /json/)
          .expect(200);
  
        // Ensure that the response contains the test movie
        expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining({ _id: testMovieId })]));
      });
  
      test('It should respond with 200 success and return an empty array if no movies are found', async () => {
        const genre = 'Comedy';
  
        const response = await request(app)
          .get(`/movies/search?genre=${genre}`)
          .expect('Content-Type', /json/)
          .expect(200);
  
        // Ensure that the response is an empty array
        expect(response.body).toEqual([]);
      });
    });
  });


describe('Get Movie API', () => {
    // Create a variable to hold the movieId of the test data
    let testMovieId;
  
    beforeAll(async () => {
      // Connect to the test database
      await mongoose.connect('mongodb://localhost/test_db', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      // Create a test movie in the database
      const testMovie = await Movie.create({
        title: 'Test Movie',
        genre: 'Action',
        rating: 4.5,
        releaseDate: new Date('2023-01-01'),
      });
  
      // Assign the movieId of the test data to the variable
      testMovieId = testMovie._id.toString();
    });
  
    afterAll(async () => {
      // Disconnect from the test database after all tests
      await mongoose.disconnect();
    });
  
    describe('Test GET /movies/:id', () => {
      test('It should respond with 200 success and return the movie with the specified ID', async () => {
        const response = await request(app)
          .get(`/movies/${testMovieId}`)
          .expect('Content-Type', /json/)
          .expect(200);
  
        // Ensure that the response matches the test movie
        expect(response.body).toEqual(expect.objectContaining({ _id: testMovieId }));
      });
  
      test('It should respond with 400 if the movie ID is invalid', async () => {
        const invalidMovieId = 'invalid-id';
  
        const response = await request(app)
          .get(`/movies/${invalidMovieId}`)
          .expect('Content-Type', /json/)
          .expect(400);
  
        // Ensure that the response contains the error message
        expect(response.body).toEqual({ message: 'Invalid movie ID' });
      });
  
      test('It should respond with 404 if the movie is not found', async () => {
        const nonExistentMovieId = new mongoose.Types.ObjectId();
  
        const response = await request(app)
          .get(`/movies/${nonExistentMovieId}`)
          .expect('Content-Type', /json/)
          .expect(404);
  
        // Ensure that the response contains the error message
        expect(response.body).toEqual({ message: 'Movie not found' });
      });
    });
  });


describe('Delete Movie API', () => {
    // Create a variable to hold the movieId of the test data
    let testMovieId;
  
    beforeAll(async () => {
      // Connect to the test database
      await mongoose.connect('mongodb://localhost/test_db', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      // Create a test movie in the database
      const testMovie = await Movie.create({
        title: 'Test Movie',
        genre: 'Action',
        rating: 4.5,
        releaseDate: new Date('2023-01-01'),
      });
  
      // Assign the movieId of the test data to the variable
      testMovieId = testMovie._id.toString();
    });
  
    afterAll(async () => {
      // Disconnect from the test database after all tests
      await mongoose.disconnect();
    });
  
    describe('Test DELETE /movies/:id', () => {
      test('It should respond with 200 success and delete the movie with the specified ID', async () => {
        const response = await request(app)
          .delete(`/movies/${testMovieId}`)
          .expect('Content-Type', /json/)
          .expect(200);
  
        // Ensure that the response contains the success message
        expect(response.body).toEqual({ message: 'Movie deleted successfully' });
  
        // Check that the movie with the specified ID no longer exists in the database
        const deletedMovie = await Movie.findById(testMovieId);
        expect(deletedMovie).toBeNull();
      });
  
      test('It should respond with 400 if the movie ID is invalid', async () => {
        const invalidMovieId = 'invalid-id';
  
        const response = await request(app)
          .delete(`/movies/${invalidMovieId}`)
          .expect('Content-Type', /json/)
          .expect(400);
  
        // Ensure that the response contains the error message
        expect(response.body).toEqual({ message: 'Invalid movie ID' });
      });
  
      test('It should respond with 404 if the movie is not found', async () => {
        const nonExistentMovieId = new mongoose.Types.ObjectId();
  
        const response = await request(app)
          .delete(`/movies/${nonExistentMovieId}`)
          .expect('Content-Type', /json/)
          .expect(404);
  
        // Ensure that the response contains the error message
        expect(response.body).toEqual({ message: 'Movie not found' });
      });
    });
  });