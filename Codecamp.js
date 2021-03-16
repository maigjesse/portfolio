/* codecamp description
Gladsaxe kommune has provided you with data about the 4.994 children between the
ages of 0 and 5 that currently reside there (see source below).
The data about each child is saved in an object with a number of properties that the
kommune has chosen to be "riskindikatorer". Each riskindikator corresponds to a particular
score.
Your job is to find out which children exceed the risk threshold, and should be shown to an
employee at the kommune for possible preventative evaluation.
 */

const fs = require('fs');

let rawData = fs.readFileSync('childrenData.json', 'utf8');
let children = JSON.parse(rawData);

// Create an empty array and store it in the variable arrayOfAtRiskChildren (EASY)
let arrayOfAtRiskChildren = [];

//Create a function calculateChildScore which, when passed a child object as an argument,
// returns an array with the risk score of that particular child and the number of risk categories met (HARD)


function calculateChildScore (child) {
    let riskScore = 0
    let riskCategories = 0
    if (child.ethnicity === 'nonwestern') {
        riskScore += 500 //kan også skrives som childScore + childScore + 500
        riskCategories++
    }

    if (child.missedDentistAppointments > 0) {
        riskScore += (child.missedDentistAppointments * 300)
        riskCategories++
    }

    if (child.missedDoctorAppointments > 0) {
        riskScore += (child.missedDoctorAppointments * 600)
        riskCategories++
    }

    if (child.father.timeInEmployment <= 2920) {
        let riskScoreFather = (2920 - child.father.timeInEmployment) / 365
        riskScore += Math.floor(riskScoreFather) * 500
        riskCategories++
    }

    if ((child.father.civilStatus === 'divorced') ||
        (child.father.civilStatus === 'single')) {
        riskScore += 1000
        riskCategories++
    }

    if ((child.father.psychologicalCondition === 'depression') ||
        (child.father.psychologicalCondition ==='bipolar') ||
        (child.father.psychologicalCondition ==='anxiety')) {
        riskScore += 3000
        riskCategories++
    }

    if (child.mother.timeInEmployment <= 2920) {
        let riskScoreMother = (2920 - child.mother.timeInEmployment)/365
        riskScore += Math.floor(riskScoreMother)*500
        riskCategories++
    }

    if ((child.mother.civilStatus === 'divorced') ||
        (child.mother.civilStatus === 'single')) {
        riskScore += 1000
        riskCategories++
    }

    if ((child.mother.psychologicalCondition === 'depression') ||
        (child.mother.psychologicalCondition ==='bipolar') ||
        (child.mother.psychologicalCondition ==='anxiety')) {
        riskScore += 3000
        riskCategories++
    }

    return ([riskScore, riskCategories])

}


//Create a function updateChildObject which, when passed a child object, a score, and number of criteria as
// arguments, updates the child object with that information (MEDIUM)

function updateChildObject (newObjectChild) {
    let childObject = calculateChildScore (newObjectChild);
    newObjectChild.riskScore=childObject[0];
    newObjectChild.riskCategories=childObject[1]
}


//Create a function determineIfChildAtRisk which, when passed a child object as an argument, determines whether
// the child has a risk score of at least 13000 and meets at least two criteria, and pushes the cpr of that
// child into the arrayOfAtRiskChildren (MEDIUM)

function determineIfChildAtRisk (childObjects) {
    if (childObjects.riskScore >= 13000 && childObjects.riskCategories >=2) {
        arrayOfAtRiskChildren.push (childObjects.cpr)
    }
}


//Create a loop which loops over all the children and calls each of the functions with the required arguments (HARD)

for (i = 0; i < children.length; i++) {
    updateChildObject(children[i]); determineIfChildAtRisk(children[i])
}

console.log(arrayOfAtRiskChildren)