/* homework description:
Calculate the average price of all IKEA items from the CSV-file
 */
const Papa = require('papaparse');
const fs = require('fs');
const IKEAFurniture = fs.readFileSync('IKEA_SA_Furniture_Web_Scrapings_sss.csv', 'utf-8');
const parsedData = Papa.parse(IKEAFurniture);
//----------------------------------------------------------------------------------------------------------------------

//Use .forEach to loop over the IKEA array and extract the price from them----------------------------------------------
let priceOfIkeaItem = []

parsedData.data.forEach(function(currentArray) {
    priceOfIkeaItem.push(currentArray[4])
    })

//Use .map() to convert all items into integers-------------------------------------------------------------------------
let mappedPrices = priceOfIkeaItem.map(function (price){
    return parseInt(price)
})

//Use .filter() to make sure the array really only contains integers----------------------------------------------------
let filteredPrices = mappedPrices.filter(function (price){
    if (price !== NaN){
        return price
    }
    //return (parseInt(price) == price) - this also works, but I don't know exactly why
})

//Use .reduce() to calculate the total price of the items in that array-------------------------------------------------
let totalPrice = filteredPrices.reduce((totalPrice, price) => totalPrice + price)


//Log the total price---------------------------------------------------------------------------------------------------
console.log(totalPrice)





