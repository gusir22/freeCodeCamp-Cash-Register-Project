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
// init empty change array.
change = new Array();

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
        calcChange(cash);
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

    // validate if user given cash is sufficient
    // and registerStatus is not insufficient_funds
    if (price <= cash && !registerStatus.includes("INSUFFICIENT_FUNDS")) {
        validPurchase = true;
    } else {
        // alert user if they do not have enough money for the purchase
        if (price > cash) {
            alert("Customer does not have enough money to purchase the item");
        }
        validPurchase = false;
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

function calcChange(cash) {
    /* This function updates the gloabl change 2D array */

    let changeAmount = (cash - price).toFixed(2); // calculate the change amount rounded to the hundredths place

    // separate change into cents and dollar parts
    let changeCents = Math.round(((changeAmount - Math.trunc(changeAmount))*100)); // adjust cents to integers to prevent validations errors
    let changeDollars = Math.trunc(changeAmount);

    console.log(`START | changeAmount: $${changeAmount} \n changeCents: $${changeCents/100} \n changeDollars: $${changeDollars}`);

    // create change list
    let pennies = 0;
    let nickels = 0;
    let dimes = 0;
    let quarters = 0;
    let ones = 0;
    let fives = 0;
    let tens = 0;
    let twenties = 0;
    let hundreds = 0;

    // tally cent denominations
    do {
        if (changeCents >= 25) {
            quarters += 25;
            changeCents -= 25;
            console.log(`\t[+] Plus $0.25 (${changeCents})`);
        } else if (changeCents >= 10) {
            dimes += 10;
            changeCents -= 10;
            console.log(`\t[+] Plus $0.10 (${changeCents})`);
        } else if (changeCents >= 5) {
            nickels += 5;
            changeCents -= 5;
            console.log(`\t[+] Plus $0.05 (${changeCents})`);
        } else if (changeCents >= 1) {
            pennies += 1;
            changeCents -= 1;
            console.log(`\t[+] Plus $0.01 (${changeCents})`);
        }
    } while (changeCents > 0)

    // tally dollar denominations
    do {
        if (changeDollars >= 100) {
            hundreds += 100;
            changeDollars -= 100;
            console.log(`\t[+] Plus $100 (${changeDollars})`);
        } else if (changeDollars >= 20) {
            twenties += 20;
            changeDollars -= 20;
            console.log(`\t[+] Plus $20 (${changeDollars})`);
        } else if (changeDollars >= 10) {
            tens += 10;
            changeDollars -= 10;
            console.log(`\t[+] Plus $10 (${changeDollars})`);
        } else if (changeDollars >= 5) {
            fives += 5;
            changeDollars -= 5;
            console.log(`\t[+] Plus $5 (${changeDollars})`);
        } else if (changeDollars >= 1) {
            ones += 1;
            changeDollars -= 1;
            console.log(`\t[+] Plus $1 (${changeDollars})`);
        }
    } while ( changeDollars > 0)

    // update change array with tallied values
    if (pennies) {
        change.push(['PENNY', pennies/100]);
    }

    if (nickels) {
        change.push(['NICKEL', nickels/100]);
    }

    if (dimes) {
        change.push(['DIME', dimes/100]);
    }

    if (quarters) {
        change.push(['QUARTER', quarters/100]);
    }

    if (ones) {
        change.push(['ONE', ones]);
    }

    if (fives) {
        change.push(['FIVE', fives]);
    }

    if (tens) {
        change.push(['TEN', tens]);
    }

    if (twenties) {
        change.push(['TWENTY', twenties]);
    }

    if (hundreds) {
        change.push(['ONE HUNDRED', hundreds]);
    }
    
    console.log(change);
    console.log(`END | changeAmount: $${changeAmount} \n changeCents: $${changeCents} \n changeDollars: $${changeDollars}`);
}