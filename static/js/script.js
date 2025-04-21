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

// init validationFlag object
var validationFlags = {
    'insufficientFunds': false,
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

function confirmCashInDrawerFunds() {
    /* This function compares the cash in drawer vs the change amount
    to confirm we have the sufficient cash to process the purchase. */

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

}

function deductChangeFromDrawer() {
    /* This function updates the cash register obj by deducting the change provided
    to the user */

    cashRegister.ONEHUNDRED -= change.ONEHUNDRED;
    cashRegister.TWENTY -= change.TWENTY;
    cashRegister.TEN -= change.TEN;
    cashRegister.ONE -= change.ONE;
    cashRegister.QUARTER -= change.QUARTER;
    cashRegister.DIME -= change.DIME;
    cashRegister.NICKEL -= change.NICKEL;
    cashRegister.PENNY -= change.PENNY
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

    let resultMessage = `<p>Status: Working<p>`;

    resultMessage += `<p>Cash Value: $${cash}</p>`; // display cash variable value
    resultMessage += `<p>Change Amount: $${change.total}</p>`; // display total change amount
    resultMessage += `<p>Validation Flags</p><ul>`;
    resultMessage += `<li>Insufficient Funds: ${validationFlags.insufficientFunds}</li>`;
    resultMessage += `</ul>`;

    document.getElementById('change-due').innerHTML = resultMessage;
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
    confirmCashInDrawerFunds();

    // if sufficient funds..
    if (!validationFlags.insufficientFunds) {
        deductChangeFromDrawer(); // provide change to user
        updateCashInDrawer(); // update ciw 2d array
    }

    displayResults(); // print results
    displayCashInDrawer(); // display cash in drawer
}