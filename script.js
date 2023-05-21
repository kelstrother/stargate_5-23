const gateSymbols = [...document.querySelectorAll('.gate-symbols')];
const gateSymbolContainers = [
  ...document.querySelectorAll('.gate-symbol-container'),
];
const dhdContainer = document.querySelector('.dhd-container');
const chevrons = [...document.querySelectorAll('.chevron')];
const chevron1 = document.getElementById('c-1');
const chevron2 = document.getElementById('c-2');
const chevron3 = document.getElementById('c-3');
const chevron4 = document.getElementById('c-4');
const chevron5 = document.getElementById('c-5');
const chevron6 = document.getElementById('c-6');
const chevron7 = document.getElementById('c-7');
const dialGate = document.querySelector('.dial-address');
const wormhole = document.querySelector('.inner-circle');

const outerCircle = document.querySelector('.outer-circle');
const centerX = outerCircle.offsetWidth / 2;
const centerY = outerCircle.offsetHeight / 2;
const r = 500;
const angleDeg = 360;
const angleRadians = (angleDeg * Math.PI) / 180;
const x = centerX + r * Math.cos(angleRadians);
const y = centerY + r * Math.sin(angleRadians);
// console.log('x :', x, 'Y :', x);

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

function getPosition() {
  // chevrons.forEach((chevron, i) => {
  //   chevron = chevrons[i];
  // })
  for (let i = 0; i < chevrons.length; i++) {
    let chevron = chevrons[i];
    const chevronTop = chevron.getBoundingClientRect().top;
    const chevronX = chevron.getBoundingClientRect().x;
    const chevronY = chevron.getBoundingClientRect().y;
    console.log(
      `chevron ${i} top: `,
      chevronTop,
      `chevron ${i} X: `,
      chevronX,
      `chevron ${i} Y: `,
      chevronY
    );
  }
}
getPosition();

function spinGate() {
  gateSymbolContainers.forEach((container) => {
    container.classList.toggle('spin');
  })
}
function removeSpinGate() {
   gateSymbolContainers.forEach((container) => {
     container.classList.remove('spin');
   });
  // for (gateSymbol of gateSymbolContainers) {
  //   gateSymbol.classList.remove('spin');
  // }
}
// spinGate()

let index = 0;

function dialing(e) {
  let dialedSymbol = e.target;
  gateSymbols.forEach((symbol, i) => {
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
      lockedChevron.classList.add('chevron-locked');
      // lockedChevron.style.animation = "chevronEncoded .25s ease-in-out forwards"
      matchedGateSymbol.dataset.matched = true;
      matchedGateSymbol.classList.add('gate-symbol-activate');
      dialedSymbol.classList.add('activate');
      console.log(`chevron ${index} locked!`);
    }
  }
});
if (dialedAddress.length === chevrons.length) {
  wormhole.classList.add('gate-activated');
  spinGate()
}
  return dialedAddress;
}

// function dialing(e) {
//   let dialedSymbol = e.target;
//   for (let i = 0; i < gateSymbols.length; i++) {
//     let matchedGateSymbol = gateSymbols[i];
//     if (
//       matchedGateSymbol.dataset.gate === dialedSymbol.dataset.dhd &&
//       !matchedGateSymbol.classList.contains('gate-symbol-activate')
//       ) {
//       if (index < chevrons.length) {
//         index++;
//         spinGate()
//         let id = 'c-' + index.toString();
//         const lockedChevron = document.getElementById(id);
//         dialedAddress.push(dialedSymbol);
//         lockedChevron.classList.add('activate');
//         matchedGateSymbol.dataset.matched = true;
//         matchedGateSymbol.classList.add('gate-symbol-activate');
//         dialedSymbol.classList.add('activate');
//         console.log(`chevron ${index} locked!`);
//       }
//     }
//   }
//   if (dialedAddress.length === chevrons.length) {
//     wormhole.classList.add('gate-activated');
//   }
//   return dialedAddress;
// }
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

//~ /////////////////////////////////////
//!         EVENT LISTENERS         \\
//~ /////////////////////////////////////
dhdSymbols.forEach((dhdSymbol) => dhdSymbol.addEventListener('click', dialing));
// document.addEventListener('click', (e) =>
//   console.log('X: ', e.clientX, 'Y: ', e.clientY)
// );
// button.addEventListener('click', () => {
//   gateSymbolContainers.forEach((container) => {
//     container.style.animation = 'animation: spin-gate 2s ease forwards';

//   })
// })

// const gateContainers = document.querySelectorAll('.gate-symbol-container')
// for (let i = 0; i < gateContainers.length; i++) {
//   let symbol = gateContainers[i];
//   symbol.style.transform = "rotate(1 turn)";

// }
//! POSITION SCRATCH FUNCTIONS
// function getOffset(chev, sym) {
//   const chevBottom = chev.getBoundingClientRect();
//   const symTop = sym.getBoundingClientRect();
//   return chevBottom.bottom - symTop.top;
// }
// console.log(getOffset(chevron1, wormhole));

// function chevronLocation() {
//   chevrons.forEach((chevron, i) => {
//     gateSymbolContainers.forEach((symbol, i) => {
//       chevron = chevrons[i];
//       // console.log('chev[i]: ', chevron);
//       let chevLocation = chevron.getBoundingClientRect();
//       console.log('chev location: ', chevLocation);
//       symbol = gateSymbolContainers[i];
//       // console.log('symbol[i]: ', symbol);
//       let symbolLocation = symbol.getBoundingClientRect();
//       console.log('symbol location: ', symbolLocation);
//       console.log('offset= ', symbolLocation.top - chevLocation.top);
//       // console.log((symbolLocation - chevLocation));
//       return symbolLocation - chevLocation;
//     });
//   });
// }
// chevronLocation()
// const offset = chevronLocation(chevLocation - symbolLocation);
// console.log(offset);
// const offset = (chevLocation - symbolLocation);
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
