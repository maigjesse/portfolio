/* Homework description:
Build your own web scraper and use it to collect data from the top 500 most popular Danish
websites
Store the data in the file scrape-results.txt: consider what the data structure should be so that
you can analyse it again later (i.e., what url is it from, what time/date was it scraped, etc)
 */

//----------------------Read in the list of urls from DK-top500.txt-----------------------------------------------------
const fs = require("fs");
const JSDOM = require('jsdom').JSDOM
let text = fs.readFileSync("./DK-top500.txt", 'utf-8');
let websiteData = text.split("\n")

//-------------------making the date and time to put into the scrape results-----------------------------------------------------



//-------------------For each url, use fetch to retrieve the HTML*, parse the content, and extract data-----------------

const fetch = require('node-fetch');


//-------------------loop fetching and storing data for the txt doc-----------------------------------------------------

for (i=0; i<websiteData.length; i++) {
    let URL = "http://" + websiteData[i];
    setTimeout(() => { //-----------------------------------timeout for the loop, 3 seconds----------------------
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+' '+time
        fetch(URL)
            .then(function (response) {
                return response.text()
            })
            .then(function (data) {
                let DOM = new JSDOM(data);
                let document = DOM.window.document;
                let title = document.querySelector('title').innerHTML //selecting the thing to fetch from website
                console.log(title)
                fs.appendFileSync('scrape-results.txt', URL + ", Title: " + title + ', Time: ' + dateTime + "\n" + "\n") //putting the titles into a .txt file
            })
            .catch(function (error) {
                console.log(error)
                fs.appendFileSync('log.txt', 'Error from this website: ' + URL + ": " + "\n" + error + "\n" + 'At time: ' + dateTime + "\n" + "\n") //putting the errors into a .txt file
            })
    },i*3000)}



