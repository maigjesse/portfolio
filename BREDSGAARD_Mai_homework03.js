/* Homework description:
Using the internet uses electricity, but how much? This depends on many variables, one of which is the size of
the website.
Adapt your web scraper from last week to also calculate the CO2 output of each website (keep the scraping).
This time you will scrape 5000 urls, rather than 500 (file on blackboard). You have to run this scraper on your
server
 */

//----------------------Read in the list of urls from DK-top500.txt-----------------------------------------------------
const fs = require("fs");
const JSDOM = require('jsdom').JSDOM
let text = fs.readFileSync("./DK-top5000.txt", 'utf-8');
let websiteData = text.split("\n")

//------------------------require fetch---------------------------------------------------------------------------------
const fetch = require('node-fetch');


//-------require and making the CO2 calculator--------------------------------------------------------------------------
const CO2 = require('@tgwf/co2');


//-------------------For each url, use fetch to retrieve the HTML*, parse the content, and extract data-----------------
//-------------------loop fetching and storing data for the txt doc-----------------------------------------------------

for (i=0; i<websiteData.length; i++) {
    let URL = "http://" + websiteData[i];


    //---------------Timeout for the loop, 3 seconds--------------------------------------------------------------------
    setTimeout(() => {
        //-----------Making the date and time to put into the scrape results------------------------------------------------
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
        let dateTime = date+' '+time
        fetch(URL)
            .then (function (response){
                //-------Fetch using the response-----------------------------------------------------------------------
                let webSize = response.headers.get("content-length");
                let co2Emission = new CO2.co2(); //constructor

                //------------perByte are the calculations that is done by the program----------------------------------------------
                let estimatedCO2 = Math.floor(co2Emission.perByte(webSize)*1000)/1000;//is used to get three decimals


                //-------------Appending the CO2 emissions to the txt file just because-----------------------------------
                fs.appendFileSync('scrape-results2.txt', 'Total emission from the following webpage is ' + estimatedCO2 + ' grams of CO2:'+ "\n" + "\n")

                console.log(estimatedCO2);//Checking the CO2 emission in webstorm----------------------------------------------
                return response.text()
            })
            .then(function (data) {
                let DOM = new JSDOM(data);
                let document = DOM.window.document;

                //----------------Selecting the thing to fetch from website----------------------------------------------
                let title = document.querySelector('title').innerHTML
                console.log(title)

                //--------------------------Putting the titles into a .txt file--------------------------
                fs.appendFileSync('scrape-results2.txt', URL + ", Title: " + title + ', Time: ' + dateTime + "\n" + "\n")
            })
            .catch(function (error) {
                console.log(error)
                //--------------------------Putting the errors into a .txt file--------------------------
                fs.appendFileSync('log2.txt', 'Error from this website: ' + URL + ": " + "\n" + error + "\n" + 'At time: ' + dateTime + "\n" + "\n")
            })
    },i*3000)}



