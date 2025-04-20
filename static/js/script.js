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

// init empty registerStatus variable. This is updated with the onclick event
let registerStatus;
// init empty total cid dollar amount. This will be updated with the onclick event.
let cidAmount;


function processPayment(form) {
    calcCashInDrawer()
    console.log(`CID: $${cidAmount}`);

    let cash = form.cash.value;
    console.log(`Cash Given: $${cash}`);

    updateRegisterStatus(cash);
    console.log(`Status: ${registerStatus}`);

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