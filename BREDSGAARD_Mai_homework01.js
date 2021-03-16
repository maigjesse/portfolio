/* Homework description
5000 digital liv students applied for a job as a data scientist. You need to come up with an algorithm to
reduce this number to just 10 people. How you decide which are the best candidates is up to you!
All the applicant data is stored in a JSON file called applicantData.json. The data structure is an array of
objects (applicants), containing two properties: their name (string), and their grades. The grades is also an
array of objects. Each object has the property class, with the name of the class as a value (string), and the
property grade, with the final grade for the class (integer).

Your code should:
Read in the JSON file (hint: remember Code Camp I?)
Process the data and select 10 people
Turn their names into ASCII Art using the figlet package: https://www.npmjs.com/
package/figlet
Write the 10 ASCII names to a text file called "selected_applicants.txt"*/


const fs = require('fs');
let rawData = fs.readFileSync('applicantData.json', 'utf8');
let allApplicants = JSON.parse(rawData);

//array to store in the applicants

let applicants = []


//random thing that makes exactly 10 applicants
/*for (let chosenApplicant of allApplicants) {
    if (chosenApplicant.grades[0].grade === 12 && chosenApplicant.grades[4].grade === 12 && chosenApplicant.grades[2].grade === 12 && chosenApplicant.grades[3].grade === 12) {
        applicants.push(chosenApplicant.name)
    }
}
*/

//loop that calculates the average of their grades and pushes the candidates into an empty array

for (let applicant of allApplicants) {
    if (((applicant.grades[0].grade + applicant.grades[1].grade + applicant.grades[2].grade + applicant.grades[3].grade
        + applicant.grades[4].grade + applicant.grades[5].grade)/6)>11) {
        applicants.push(applicant.name)
    }
}

//Turn their names into ASCII Art using the figlet package
/*
var figlet = require('figlet');


let applicantVariable = figlet(applicants, function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    return data
});*/



//Write the 10 ASCII names to a text file called "selected_applicants.txt"


let figlet = require('figlet');

for (let name of applicants) {
    figlet(name, function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
        fs.appendFileSync('selected_applicants.txt', data)
    });
}






