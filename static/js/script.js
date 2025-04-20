let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

// init validPurchase flag. This keeps track if the program should execute the
// payment process or not. False by default for security reasons.
let validPurchase = false;
// init empty registerStatus variable. This is updated with the onclick event
let registerStatus;
// init empty total cid dollar amount. This will be updated with the onclick event.
let cidAmount;

function processPayment(form) {
    calcCashInDrawer()
    console.log(`CID: $${cidAmount}`);

    // parseFloat to ensure value does not turn into a string and cause validation issues
    let cash = parseFloat(form.cash.value); 
    console.log(`Cash Given: $${cash}`);

    updateRegisterStatus(cash);
    console.log(`Status: ${registerStatus}`);

    validatePurchase(cash);

    if (validPurchase) {
        console.log("Purchase is valid. Calculating change.....");
    } else {
        console.log("Purchase is not valid. Please leave the items in the cart.");
    }

}

function updatePriceScreen() {
    /* This function updates the price total screen with the price variable value.
    It runs on a onload event from the body element in index.html */
    document.getElementById('price-output').innerHTML = `$${price}`;
}

function validatePurchase(cash) {
    /* this function updates the global validPurchase flag to direct the program flow
    to process the rest of the payment or cancel the purchase */

    if (price > cash) {
        validPurchase = false;
    } else {
        validPurchase = true;
    }
}

function calcCashInDrawer() {
    /* This function calculates the total amount inside the cash drawer (cid array) */

    cidAmount = 0.00; // reset cid amount to prevent bugs

    // add up the amount of each denomination
    for (let denomination of cid){
        cidAmount += denomination[1];
    }

    cidAmount = cidAmount.toFixed(2); // round to the hundredths place
}

function updateRegisterStatus(cash) {
    /* This function compares the user given cash amount against
    the total amount in the cash drawer and updates the registerStatus
    code to the appropriate scenario response */

    if (cash < cidAmount) {
        registerStatus = "OPEN";
    } else if (cash == cidAmount) {
        registerStatus = "CLOSED";
    } else if (cash > cidAmount) {
        registerStatus = "INSUFFICIENT_FUNDS";
    }
}