const movies = [
    {
        title: 'The Dark Knight',
        producer: 'Christopher Nolan',
        rating: 9.0,
        type: 'Action',
    },
    {
        title: 'Inception',
        producer: 'Christopher Nolan',
        rating: 8.8,
        type: 'Thriller',
    },
    {
        title: 'Titanic',
        producer: 'James Cameron',
        rating: 7.8,
        type: 'Romance',
    },
    {
        title: 'Mad Max: Fury Road',
        producer: 'George Miller',
        rating: 8.1,
        type: 'Action',
    },
    {
        title: 'The Notebook',
        producer: 'Nick Cassavetes',
        rating: 7.9,
        type: 'Romance',
    },
];

export type Movie = (typeof movies)[number];
export const fetchMovies = () => Promise.resolve(movies);
