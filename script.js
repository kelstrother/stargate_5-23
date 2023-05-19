const gateSymbols = [...document.querySelectorAll('.gate-symbols')];
const gateSymbolContainers = [
  ...document.querySelectorAll('.gate-symbol-container'),
];
const dhdContainer = document.querySelector('.dhd-container');

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

let dialedAddress = [];

function dialing(e) {
  let dialedSymbol = e.target;
  for (let i = 0; i < gateSymbols.length; i++) {
    let matchedGateSymbol = gateSymbols[i];
    if (
      matchedGateSymbol.dataset.gate === dialedSymbol.dataset.dhd &&
      !matchedGateSymbol.classList.contains('gate-symbol-activate')
    ) {
      matchedGateSymbol.dataset.matched = true;
      matchedGateSymbol.classList.add('gate-symbol-activate');
      dialedSymbol.classList.add('activate');
      dialedAddress.push(matchedGateSymbol);
      console.log(`chevron ${matchedGateSymbol.dataset.gate} locked!`);
      console.log('outgoing wormhole: ', dialedAddress);
      return dialedAddress;
    } 
  }
}

dhdSymbols.forEach((dhdSymbol) =>
  dhdSymbol.addEventListener('click', dialing)
);

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
