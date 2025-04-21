let price = 1.87;
let cash; // init empty cash input user value
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

function displayPrice() {
    /* This function simply prints the price value to the #price-output element.
    It is triggered on the index.html body onload event */

    document.getElementById('price-output').innerText = `$${price}`;
}

function displayResults() {
    /* This function formats and outputs the result message to the
    #change-due element. */

    let resultMessage = `<p>Status: Working<p>`;

    resultMessage += `<p>Cash Value: ${cash}</p><br>`; // display cash variable value

    document.getElementById('change-due').innerHTML = resultMessage;
}

function processPayment(form) {
    /* This function processes the main algorythm to assist in the
    purchase and provide the user their change.
    It is triggered with the #purchase-btn onclick event. */

    console.log("Processing Payment ...\nPlease wait ...");

    cash = form.cash.value;

    displayResults(); // print results
}