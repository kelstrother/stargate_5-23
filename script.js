const gateSymbols = [...document.querySelectorAll('.gate-symbols')];
const gateSymbolContainers = [
  ...document.querySelectorAll('.gate-symbol-container'),
];
const dhdContainer = document.querySelector('.dhd-container');
const chevrons = [...document.querySelectorAll('.chevron')];
const chevron1 = document.getElementById('#c-1');
const chevron2 = document.getElementById('#c-2');
const chevron3 = document.getElementById('#c-3');
const chevron4 = document.getElementById('#c-4');
const chevron5 = document.getElementById('#c-5');
const chevron6 = document.getElementById('#c-6');
const chevron7 = document.getElementById('#c-7');
const dialGate = document.querySelector('.dial-address');

//! BUILDING DHD
gateSymbolContainers.forEach((container, i) => {
  const symbolName = container.dataset.gate;
  const symbolText = container.firstElementChild.textContent;
  const dhdDial = document.createElement('button');
  dhdDial.classList.add('dhd-btn');
  dhdDial.setAttribute('data-dhd', symbolName);
  dhdDial.innerText = symbolText;
  dhdContainer.appendChild(dhdDial);
  return dhdDial;
});

const dhdSymbols = [...document.querySelectorAll('.dhd-btn')];

let index = 0;
function dialing(e) {
  let dialedSymbol = e.target;
  for (let i = 0; i < gateSymbols.length; i++) {
    let matchedGateSymbol = gateSymbols[i];
    if (
      matchedGateSymbol.dataset.gate === dialedSymbol.dataset.dhd &&
      !matchedGateSymbol.classList.contains('gate-symbol-activate')
    ) {
      if (index < chevrons.length) {
        index++;
        let id = 'c-' + index.toString();
        const lockedChevron = document.getElementById(id);
        dialedAddress.push(dialedSymbol);
        lockedChevron.classList.add('activate');
        matchedGateSymbol.dataset.matched = true;
        matchedGateSymbol.classList.add('gate-symbol-activate');
        dialedSymbol.classList.add('activate');
        console.log(`chevron ${index} locked!`);
      }
    }
  }
  if (dialedAddress.length === chevrons.length) {
    wormhole.classList.add('gate-activated');
  }
  return dialedAddress;
}
let dialedAddress = [];

//~ /////////////////////////////////////
//!         STRORING DIALED SYMBOLS         \\
//~ /////////////////////////////////////
function getStoredSymbols() {
  let symbols;
  if (localStorage.getItem('symbols') === null) {
    symbols = [];
  } else {
    symbols = JSON.parse(localStorage.getItem('symbols'));
  }
  return symbols;
}

dhdSymbols.forEach((dhdSymbol) => dhdSymbol.addEventListener('click', dialing));

//, CREATING GATE AND DHD SYMBOL OBJECTS
// let gateData;
// let gateSymbol;
// let gateArray = [];
// let gateObject = {};

// function createGateObject() {
//   gateSymbolContainers.forEach((container, i) => {
//     matchedData = container.getAttribute('data-matched');
//     gateData = container.getAttribute('data-gate');
//     gateSymbol = container.firstElementChild.textContent || innerText;
//     gateObject = {
//       index: i,
//       name: gateData,
//       symbol: gateSymbol,
//     };
//     gateArray.push(gateObject);
//     return gateData, gateSymbol, gateArray, matchedData;
//   });
// }
// createGateObject();

// let dhdData;
// let dhdSymbol;
// let dhdArray = [];
// let dhdObject = {};

// function createDhdObject() {
//   dhdSymbols.forEach((symbol, i) => {
//     dhdData = symbol.getAttribute('data-dhd');
//     dhdSymbol = symbol.textContent || innerText;
//     dhdObject = {
//       index: i,
//       name: dhdData,
//       symbol: dhdSymbol,
//       matched: false,
//     };
//     dhdArray.push(dhdObject);
//     return dhdData, dhdSymbol, dhdArray;
//   });
// }
// createDhdObject();

// let dhdButtons = dhdArray;

// let gateButtons = gateArray;

// let dhdDataName = dhdData;

// let gateDataName = gateData;
