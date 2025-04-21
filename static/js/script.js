let price = 1.87; // variable provided by freeCodeCamp project
let cash = 0.00; // init empty global cash input user value
let cid = [ // array provided by freeCodeCamp project
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONEHUNDRED', 100]
];
// create cash register object
var cashRegister = Object.fromEntries(cid);

// init change object
var change = {
    'total': 0.00,
    'centsTotal': 0.00,
    'dollarsTotal': 0.00,
    'PENNY': 0.00,
    'NICKEL': 0.00,
    'DIME': 0.00,
    'QUARTER': 0.00,
    'ONE': 0.00,
    'FIVE': 0.00,
    'TEN': 0.00,
    'TWENTY': 0.00,
    'ONEHUNDRED': 0.00,
} 
let resultMessage; // init empty global result message
let changeOutput; // init empty global change output message

// init validationFlag object
var validationFlags = {
    'insufficientFunds': false,
    'insufficientCashFromUser': false,
}



function calcChange() {
    /* this function calculates the amount value we need of each denominations
    we have available in the cash in drawer (cid) and saves them in the global
    change object */

    change.total = cash - price; // update total change amount to obj

    // separate change into cents and dollar parts
    change.centsTotal = change.total - Math.trunc(change.total); // store cents total to obj
    change.dollarsTotal = Math.trunc(change.total); // store dollars total to obj

    // tally cent denominations until there is less than a penny left
    do {
        if (change.centsTotal >= 0.25) {
            change.QUARTER += 0.25;
            change.centsTotal -= 0.25;
        } else if (change.centsTotal >= 0.10) {
            change.DIME += 0.10;
            change.centsTotal -= 0.10;
        } else if (change.centsTotal >= 0.05) {
            change.NICKEL += 0.05;
            change.centsTotal -= 0.05;
        } else if (change.centsTotal >= 0.01) {
            change.PENNY += 0.01;
            change.centsTotal -= 0.01;
        }
    } while (change.centsTotal >= 0.01)

    // tally dollar denominations until there is less than a dollar left
    do {
        if (change.dollarsTotal >= 100) {
            change.ONEHUNDRED += 100;
            change.dollarsTotal -= 100;
        } else if (change.dollarsTotal >= 20) {
            change.TWENTY += 20;
            change.dollarsTotal -= 20;
        } else if (change.dollarsTotal >= 10) {
            change.TEN += 10;
            change.dollarsTotal -= 10;
        } else if (change.dollarsTotal >= 5) {
            change.FIVE += 5;
            change.dollarsTotal -= 5;
        } else if (change.dollarsTotal >= 1) {
            change.ONE += 1;
            change.dollarsTotal -= 1;
        }
    } while ( change.dollarsTotal >= 1)

}

function confirmTransaction() {
    /* This function compares the cash in drawer vs the change amount
    to confirm we have the sufficient cash to process the purchase and user 
    pays with the correct amount. */

    // confirm we have the sufficient cash in the register for the necessary change
    if (
        cashRegister.ONEHUNDRED < change.ONEHUNDRED ||
        cashRegister.TWENTY < change.TWENTY ||
        cashRegister.TEN < change.TEN ||
        cashRegister.FIVE < change.FIVE ||
        cashRegister.ONE < change.ONE ||
        cashRegister.QUARTER < change.QUARTER ||
        cashRegister.DIME < change.DIME ||
        cashRegister.NICKEL < change.NICKEL ||
        cashRegister.PENNY < change.PENNY 
    ) {
        validationFlags.insufficientFunds = true; // trigger insufficient funds flag
    }

    if (cash < price) {
        validationFlags.insufficientCashFromUser = true;
    }

}

function deductChangeFromDrawer() {
    /* This function updates the cash register obj by deducting the change provided
    to the user */

    changeOutput = ""; // reset change output string for new data

    if (change.ONEHUNDRED) {
        cashRegister.ONEHUNDRED -= change.ONEHUNDRED; // update cash in register
        changeOutput += `ONE HUNDRED: $${change.ONEHUNDRED} ` // update the change output message
        change.ONEHUNDRED = 0.00; // reset change memory to prepare for next purchase
    }

    if (change.TWENTY) {
        cashRegister.TWENTY -= change.TWENTY; // update cash in register
        changeOutput += `TWENTY: $${change.TWENTY} `; // update the change output message
        change.TWENTY = 0.00; // reset change memory to prepare for next purchase
    }

    if (change.TEN) {
        cashRegister.TEN -= change.TEN; // update cash in register
        changeOutput += `TEN: $${change.TEN} `; // update the change output message
        change.TEN = 0.00; // reset change memory to prepare for next purchase
    }

    if (change.FIVE) {
        cashRegister.FIVE -= change.FIVE; // update cash in register
        changeOutput += `FIVE: $${change.FIVE} `; // update the change output message
        change.FIVE = 0.00; // reset change memory to prepare for next purchase
    }

    if (change.ONE) {
        cashRegister.ONE -= change.ONE; // update cash in register
        changeOutput += `ONE: $${change.ONE} `; // update the change output message
        change.ONE = 0.00; // reset change memory to prepare for next purchase
    }

    if (change.QUARTER) { // update cash in register
        cashRegister.QUARTER -= change.QUARTER; // update cash in register
        changeOutput += `QUARTER: $${change.QUARTER} `; // update the change output message
        change.QUARTER = 0.00; // reset change memory to prepare for next purchase
    }

    if (change.DIME) {
        cashRegister.DIME -= change.DIME; // update cash in register
        changeOutput += `DIME: $${change.DIME} `; // update the change output message
        change.DIME; // reset change memory to prepare for next purchase
    }

    if (change.NICKEL) {
        cashRegister.NICKEL -= change.NICKEL; // update cash in register
        changeOutput += `NICKEL: $${change.NICKEL} `; // update the change output message
        change.NICKEL = 0.00; // reset change memory to prepare for next purchase
    }

    if (change.PENNY) {
        cashRegister.PENNY -= change.PENNY // update cash in register
        changeOutput += `PENNY: $${change.PENNY} `; // update the change output message
        change.PENNY = 0.00; // reset change memory to prepare for next purchase
    }
}

function updateCashInDrawer() {
    /* This function saves the updated cash in drawer values from the cash register object
    into the 2d cid array using their matching key/value pairs */

    for (let denomination of cid) {
        denomination[1] = cashRegister[denomination[0]];
    }
}

function displayPrice() {
    /* This function simply prints the price value to the #price-output element. */

    document.getElementById('price-output').innerText = `$${price}`;
}

function displayResults() {
    /* This function formats and outputs the result message to the
    #change-due element. */

    let resultMessage = `Status: Working `;
    resultMessage += changeOutput;

    document.getElementById('change-due').innerText = resultMessage;
}

function displayCashInDrawer() {
    /* This function outputs the cash in drawer amounts to the
    index.html #cash-in-register div */

    let cashHTML = `<p>CASH IN DRAWER</p><ul>`;
    cashHTML += `<li>ONE HUNDRED: $${cashRegister.ONEHUNDRED}</li>`;
    cashHTML += `<li>TWENTY: $${cashRegister.TWENTY}</li>`;
    cashHTML += `<li>TEN: $${cashRegister.TEN}</li>`;
    cashHTML += `<li>FIVE: $${cashRegister.FIVE}</li>`;
    cashHTML += `<li>ONE: $${cashRegister.ONE}</li>`;
    cashHTML += `<li>QUARTER: $${cashRegister.QUARTER}</li>`;
    cashHTML += `<li>DIME: $${cashRegister.DIME}</li>`;
    cashHTML += `<li>NICKEL: $${cashRegister.NICKEL}</li>`;
    cashHTML += `<li>PENNY: $${cashRegister.PENNY}</li>`;
    cashHTML += `</ul>`;

    document.getElementById('cash-in-register').innerHTML = cashHTML;
}

function preloadCashData() {
    /* This function preloads the cash data to the user and cashier */

    displayPrice();
    displayCashInDrawer();
}

function processPayment(form) {
    /* This function processes the main algorythm to assist in the
    purchase and provide the user their change.
    It is triggered with the #purchase-btn onclick event. */

    console.log("Processing Payment ...\nPlease wait ...");

    cash = form.cash.value;
    calcChange();
    confirmTransaction();

    // validate and process payment as necessary..
    if (!validationFlags.insufficientFunds && !validationFlags.insufficientCashFromUser) {
        deductChangeFromDrawer(); // provide change to user
        updateCashInDrawer(); // update ciw 2d array
        displayResults(); // print results
    } else if (validationFlags.insufficientCashFromUser) {
        alert("Customer does not have enough money to purchase the item");

        validationFlags.insufficientCashFromUser = false; // reset flag for next use
    }

    
    displayCashInDrawer(); // display cash in drawer
}