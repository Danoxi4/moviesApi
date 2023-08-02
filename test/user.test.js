const request = require('supertest')
const app = require('../App/app')
const { mongoConnect, mongoDisconnect } = require('../Config/dbConnect')
const User = require('../Models/user')

describe('test Users Routes', () => {

    describe('test GET /users', () => { 

        let userToken;

        // Login before running the tests
        beforeAll(async () => {

            const loginResponse = await request(app)
            .post('/api/users/login')
            .send({ email: 'dan@gmail.com', password: '1234' })
            .expect(200);

            userToken = loginResponse.body.token; // Save the token for later use
                 });

        afterAll(async () => { await mongoDisconnect(); });

        test('It should respond with 200 success', async () => {
            const response = await request('app')
            .get('/api/users/favorites')
            .set('Authorization', `Bearer ${userToken}`)
            .expect(200)
            .expect('Content-Type', 'application/json')
        } )

        test('It should respond with 200 success', async () => {
            const response = await request('app')
            .get('/api/users/recommendations')
            .set('Authorization', `Bearer ${userToken}`)
            .expect(200)
            .expect('Content-Type', 'application/json')
        } )

        test('It should respond with 200 success', async () => {
            const response = await request('app')
            .get('/api/users/watchlist')
            .set('Authorization', `Bearer ${userToken}`)
            .expect(200)
            .expect('Content-Type', 'application/json')
        } )

    } )

    describe('test POST /users', () => { 
        
        
        beforeAll(async () => {
            await mongoConnect();
        });

        afterAll(async () => { await mongoDisconnect(); })
    
        // Test a successful user registration
        test('should register a new user and return a 201 status code', async () => {
            const userData = {
            username: 'testUser',
            email: 'test@gmail.com',
            password: '12345',
            favoriteGenre: 'action',
            };
        
            const response = await request(app)
            .post('/api/users/register')
            .send(userData)
            .expect('Content-Type', /json/)
            .expect(201);
        
            // Assert that the response contains the expected properties
            expect(response.body).toHaveProperty('username', userData.username);
            expect(response.body).toHaveProperty('email', userData.email);
            expect(response.body).toHaveProperty('favoriteGenre', userData.favoriteGenre);
            expect(response.body).toHaveProperty('createdAt');
        
            // Check if the user was successfully saved to the database
            const user = await User.findOne({ email: userData.email });
            expect(user).toBeDefined();
            expect(user.username).toBe(userData.username);
            expect(user.favoriteGenre).toBe(userData.favoriteGenre);
        });
    
        // Test user registration with missing or invalid data
        test('should return a 400 status code for invalid user data', async () => {
            // Invalid data (missing required fields)
            const invalidUserData = {
            // Missing 'email', 'password', and 'favoriteGenre'
            username: 'testUser',
            };
        
            // Send the invalid data in the request
            const response = await request(app)
            .post('/api/users/register')
            .send(invalidUserData)
            .expect('Content-Type', /json/)
            .expect(400);
        
            // Assert that the response contains the expected error message
            expect(response.body).toHaveProperty('error', 'Validation failed: email: Path `email` is required., password: Path `password` is required., favoriteGenre: Path `favoriteGenre` is required.');
        
            // Check that the user was not saved to the database
            const user = await User.findOne({ username: invalidUserData.username });
            expect(user).toBeNull();
        });

        //Test a successful user Login 
        test('should log in a user and return a 200 status code', async () => {

                testUser = {
                    username: 'testuser',
                    email: 'test@example.com',
                    password: 'password123',
                    favoriteGenre: 'Action',
                  };

              const loginData = {
                email: 'test@example.com',
                password: 'password123',
              };
          
              const response = await request(app)
                .post('/api/users/login')
                .send(loginData)
                .expect('Content-Type', /json/)
                .expect(200);
          
              // Assert that the response contains the expected properties
              expect(response.body).toHaveProperty('username', 'testuser');
              expect(response.body).toHaveProperty('email', 'test@example.com');
              expect(response.body).toHaveProperty('favoriteGenre', 'Action');
              expect(response.body).toHaveProperty('token');
        });
          
        // Test user login with incorrect password
        test('should return a 401 status code for incorrect password', async () => {
            
            testUser = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
                favoriteGenre: 'Action',
              };

            const loginData = {
                email: 'test@example.com',
                password: 'wrongpassword',
              };
          
              const response = await request(app)
                .post('/api/users/login')
                .send(loginData)
                .expect('Content-Type', /json/)
                .expect(401);
          
              // Assert that the response contains the expected error message
              expect(response.body).toHaveProperty('error', 'Invalid credentials');
        });
          
        // Test user login with non-existent email
        test('should return a 401 status code for non-existent email', async () => {

              const loginData = {
                email: 'nonexistent@example.com',
                password: 'password123',
              };
          
              const response = await request(app)
                .post('/api/users/login')
                .send(loginData)
                .expect('Content-Type', /json/)
                .expect(401);
          
              // Assert that the response contains the expected error message
              expect(response.body).toHaveProperty('error', 'Invalid credentials');
        });

    });

    describe('test POST /users with params', () => {

        const testUser = {
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'testpassword',
            favoriteGenre: 'Action',
          };
          
          // A variable to store the user's JWT token for authentication in the tests
          let userToken;
          
          beforeAll(async () => {
            // Connect to the test database
            await mongoose.connect('mongodb://localhost:27017/testDB', {
              useNewUrlParser: true,
              useUnifiedTopology: true,
            });
          
            // Create a test user in the database
            await User.create(testUser);
          
            // Login the test user to get the JWT token
            const loginResponse = await request(app)
              .post('/api/login')
              .send({ email: testUser.email, password: testUser.password });
            userToken = loginResponse.body.token;
          });
          
          afterAll(async () => {
            // Disconnect from the test database
            await mongoose.disconnect();
          });


            describe('Test POST /api/users/favorites', () => {
                test('It should add a movie to user favorites', async () => {
                const movieIdToAdd = '1234567890'; // Replace with a valid movie ID
            
                const response = await request(app)
                    .post('/api/users/favorites')
                    .set('Authorization', `Bearer ${userToken}`)
                    .send({ movieId: movieIdToAdd })
                    .expect('Content-Type', /json/)
                    .expect(200);
            
                // Check the response body for the updated user with the movie added to favorites
                expect(response.body).toHaveProperty('favorites');
                expect(response.body.favorites).toContain(movieIdToAdd);
                });
            });
            
            describe('Test POST /api/users/watchlist', () => {
                test('It should add a movie to user watchlist', async () => {
                const movieIdToAdd = '0987654321'; // Replace with a valid movie ID
            
                const response = await request(app)
                    .post('/api/users/watchlist')
                    .set('Authorization', `Bearer ${userToken}`)
                    .send({ movieId: movieIdToAdd })
                    .expect('Content-Type', /json/)
                    .expect(200);
            
                // Check the response body for the updated user with the movie added to watchlist
                expect(response.body).toHaveProperty('watchlist');
                expect(response.body.watchlist).toContain(movieIdToAdd);
                });
            });
    })

    describe('test DELETE /users', () => {
        
    })

}) 