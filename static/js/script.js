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
  ['ONE HUNDRED', 100]
];

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

function displayPrice() {
    /* This function simply prints the price value to the #price-output element.
    It is triggered on the index.html body onload event */

    document.getElementById('price-output').innerText = `$${price}`;
}

function displayResults() {
    /* This function formats and outputs the result message to the
    #change-due element. */

    let resultMessage = `<p>Status: Working<p>`;

    resultMessage += `<p>Cash Value: $${cash}</p>`; // display cash variable value
    resultMessage += `<p>Change Amount: $${change.total}</p>`; // display total change amount

    document.getElementById('change-due').innerHTML = resultMessage;
}

function processPayment(form) {
    /* This function processes the main algorythm to assist in the
    purchase and provide the user their change.
    It is triggered with the #purchase-btn onclick event. */

    console.log("Processing Payment ...\nPlease wait ...");

    cash = form.cash.value;
    calcChange();

    displayResults(); // print results
}