function lowestPrices(input) {
    let products = {}

    for (let line of input){
        let town = line.split(' | ')[0]
        let product = line.split(' | ')[1]
        let price = Number(line.split(' | ')[2])
 
        if (product in products){           
            products[product][town] = price
        }
        else{
            let obj = {}
            obj[town] = price
            products[product] = obj
        }
    }
    for (let product in products){
        let minCity = ""
        let minValue=""
      
        for(let thisCity in products[product]) {
            if (minValue === "") {
                minValue = products[product][thisCity]
                minCity = thisCity
            }

            if(products[product][thisCity] < minValue ) {
                minValue = products[product][thisCity]
                minCity = thisCity
            }
        }
        console.log(product + " -> " + minValue + ' (' + minCity + ')')
    }
}
lowestPrices(['Sofia City | Audi | 100000',
'Sofia City | BMW | 100000',
'Sofia City | Mitsubishi | 10000',
'Sofia City | Mercedes | 10000',
'Sofia City | NoOffenseToCarLovers | 0',
'Mexico City | Audi | 1000',
'Mexico City | BMW | 99999',
'New York City | Mitsubishi | 10000',
'New York City | Mitsubishi | 1000',
'Mexico City | Audi | 100000',
'Washington City | Mercedes | 1000'])