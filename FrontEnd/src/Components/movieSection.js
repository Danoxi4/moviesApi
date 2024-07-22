// src/components/MovieSection.js

import React from 'react';
import {  Section,
          MovieCard,
          MovieImage,
          MovieInfo,
          MovieTitle,
          MovieDetails,
          MoviesWrapper,
          ViewAllButton } from '../styles/movieStyle'


          const MovieSection = () => {
            return (
              <Section>
                <h1>Newest Movies</h1>
                <MoviesWrapper>
                  <MovieCard>
                    <MovieImage />
                    <MovieInfo>
                      <MovieTitle>Placeholder Movie Title</MovieTitle>
                      <MovieDetails>Genre: Placeholder Genre</MovieDetails>
                      <MovieDetails>Director: Placeholder Director</MovieDetails>
                      <MovieDetails>Release Date: Placeholder Date</MovieDetails>
                    </MovieInfo>
                  </MovieCard>
                  <MovieCard>
                    <MovieImage />
                    <MovieInfo>
                      <MovieTitle>Placeholder Movie Title</MovieTitle>
                      <MovieDetails>Genre: Placeholder Genre</MovieDetails>
                      <MovieDetails>Director: Placeholder Director</MovieDetails>
                      <MovieDetails>Release Date: Placeholder Date</MovieDetails>
                    </MovieInfo>
                  </MovieCard>
                  <MovieCard>
                    <MovieImage />
                    <MovieInfo>
                      <MovieTitle>Placeholder Movie Title</MovieTitle>
                      <MovieDetails>Genre: Placeholder Genre</MovieDetails>
                      <MovieDetails>Director: Placeholder Director</MovieDetails>
                      <MovieDetails>Release Date: Placeholder Date</MovieDetails>
                    </MovieInfo>
                  </MovieCard>
                  <MovieCard>
                    <MovieImage />
                    <MovieInfo>
                      <MovieTitle>Placeholder Movie Title</MovieTitle>
                      <MovieDetails>Genre: Placeholder Genre</MovieDetails>
                      <MovieDetails>Director: Placeholder Director</MovieDetails>
                      <MovieDetails>Release Date: Placeholder Date</MovieDetails>
                    </MovieInfo>
                  </MovieCard>
                  <MovieCard>
                    <MovieImage />
                    <MovieInfo>
                      <MovieTitle>Placeholder Movie Title</MovieTitle>
                      <MovieDetails>Genre: Placeholder Genre</MovieDetails>
                      <MovieDetails>Director: Placeholder Director</MovieDetails>
                      <MovieDetails>Release Date: Placeholder Date</MovieDetails>
                    </MovieInfo>
                  </MovieCard>
                  <MovieCard>
                    <MovieImage />
                    <MovieInfo>
                      <MovieTitle>Placeholder Movie Title</MovieTitle>
                      <MovieDetails>Genre: Placeholder Genre</MovieDetails>
                      <MovieDetails>Director: Placeholder Director</MovieDetails>
                      <MovieDetails>Release Date: Placeholder Date</MovieDetails>
                    </MovieInfo>
                  </MovieCard>
                  {/* Add more movie cards as needed */}
                </MoviesWrapper>
                <ViewAllButton href="#">View All</ViewAllButton>
              </Section>
            );
          };

export default MovieSection;
