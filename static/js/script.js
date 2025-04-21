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

var change = new Object() // init change object
let resultMessage; // init empty global result message



function calcChange() {
    /* this function calculates the amount value we need of each denominations
    we have available in the cash in drawer (cid) and saves them in the global
    change object */

    change.total = cash - price; // save total change amount to obj

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