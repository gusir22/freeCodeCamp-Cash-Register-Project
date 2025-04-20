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

let registerStatus;
let cidAmount = 0.00;


function processPayment(form) {
    calcCashInDrawer()
    console.log(`CID: $${cidAmount}`);

    let cash = form.cash.value;
    console.log(`Cash Given: $${cash}`);

    updateRegisterStatus(cash);
    console.log(`Status: ${registerStatus}`);

}

function calcCashInDrawer() {
    cidAmount = 0.00;
    for (let denomination of cid){
        cidAmount += denomination[1];
    }

    cidAmount = cidAmount.toFixed(2);
}

function updateRegisterStatus(cash) {
    if (cash < cidAmount) {
        registerStatus = "OPEN";
    } else if (cash == cidAmount) {
        registerStatus = "CLOSED";
    } else if (cash > cidAmount) {
        registerStatus = "INSUFFICIENT_FUNDS";
    }
}