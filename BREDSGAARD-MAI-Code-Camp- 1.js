/*The Bechdel Test is a simple test to see whether a book or movie treats women as fully-fledged
characters or mostly as set-pieces for male action. The test was popularised by the Alison Bechdel’s
comic (pictured above) and consists of three rules. The movie has to have: (1) at least two women in it,
who (2) talk to each other, about (3) something besides a man.
In this Code Camp we will use a dataset containing 1776 movies with the answers to these questions to
investigate whether fair female representation is correlated (positively or negatively) with the rating of
that movie*/

const Papa = require('papaparse');
const fs = require('fs');
const rawData = fs.readFileSync('Bechdel-test.csv', 'utf-8');
const parsedData = Papa.parse(rawData);
const fetch = require('node-fetch');
const JSDOM = require('jsdom').JSDOM

//Regression stuff
const regression = require('regression');

//----------------------------------------------------------------------------------------------------------------------

let movies = parsedData.data.map(function(movie) {
    if (movie[8] == 0 && movie[9] == 0 && movie[10] == 0) { //gives the movies that pass a 1 and the failed a 0
        movie.push(1)
    } else {
        movie.push(0)
    }
   return movie;
});

//----------------------------------------------------------------------------------------------------------------------
//--------Filter movies with weird text-----------------------------------------------------------------------------------------

let filteredMovies = movies.filter(function (movie){
    return !movie[1].includes('&') //return all movies that do not have the '&'
})


//-----------Dividing query into two-----------------------------------------------------------------------------------------------

let firstApiQuery = filteredMovies.slice(0,900) // dividing the API query into two, as we only have 1000 queries pr. day.
let secondApiQuery = filteredMovies.slice(901,1679)

//------Fetching and getting rating-------------------------------------------------------------------------------------

const URL = 'http://www.omdbapi.com/?apikey=cc3462bf&t=' + filteredMovies[1];

firstApiQuery.forEach(function (movie){


    fetch(URL)
        .then(function (response) {
            return response.json()
        })
        .then(function (jsonData) {
            fs.appendFileSync("moviedata.txt", jsonData["imdbRating"] + "\n")
        })
        .catch(function (error) {
            console.log(error)
        });

});


secondApiQuery.forEach(function (movie){

    fetch(URL)
        .then(function (response) {
            return response.json()
        })
        .then(function (jsonData) {
            movie.push(jsonData["imdbRating"])
            fs.appendFileSync("moviedata.txt", jsonData["imdbRating"] + "\n")
        })
        .catch(function (error) {
            console.log(error)
        });

});

//--------Regression----------------------------------------------------------------------------------------------------
//can't get the next part to work


const newRawData = fs.readFileSync('moviedata.txt', 'utf8'); //read moviedata file and parsing it into json
let newParsedData = Papa.parse(newRawData);

let filteredNewParsedData = newParsedData.data.filter(function (movie){ //filtering the data for all undefined numbers
    if (movie[17] !== undefined && movie[18] !== undefined){
        return movie
    }
});



let regArray = [];

filteredNewParsedData.forEach(function (movie){
    regArray.push(movie[17], movie[18])
})


const result = regression.linear(regArray)
const gradient = result.equation[0]
const yIntercept = result.equation[1]

console.log(result)

