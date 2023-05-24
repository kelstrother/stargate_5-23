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
const innerChevrons = [...document.querySelectorAll('.inner-chevron')];
const stargate = document.getElementById('stargate');
const chevronCircle = document.getElementById('chevron-circle');
const gate = document.querySelector('.gate');
const chevronContainers = [
  ...document.querySelectorAll('.chevron-symbol-container'),
];

const centerX = gate.offsetWidth / 2;
const centerY = gate.offsetHeight / 2;
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

let idNum;

gateSymbols.forEach((gateSymbol, i) => {
  idNum = (i + 1).toString();
  gateSymbol.setAttribute('id', 'gs-' + idNum);
  return;
});
// let matchedID = document.getElementById(`gs-${idNum}`);
let matchedID = document.querySelectorAll(`#gs-${idNum}`);
console.log(matchedID);

let index = 0;
// let gsID;
// let matchedID;
function dialing(e) {
  let dialedSymbol = e.target;

  gateSymbols.forEach((symbol, i) => {
    matchedGateSymbol = gateSymbols[i];
    if (
      matchedGateSymbol.dataset.gate === dialedSymbol.dataset.dhd &&
      !matchedGateSymbol.classList.contains('gate-symbol-activate')
    ) {
      if (index < chevrons.length && innerChevrons.length) {
        index++;
        const hideSymbol = document.getElementById(`gs-${index}`);
        hideSymbol.style.display = 'none';
        dialedAddress.push(dialedSymbol);

        matchedGateSymbol.classList.add('gate-symbol-activate');

        createSymbolID();
        createSymbol();

        const chevronSymbol = document.getElementById(
          'chevron-symbol-' + index.toString()
        );
        chevronSymbol.style.setProperty('--deg', `${chevDeg}`);
        chevronSymbol.classList.add('active-chev-symbol');
        chevronCircle.style.transition = `2s ease-in-out`;
        chevronCircle.style.transform = `rotate(1turn)`;
        // matchedGateSymbol.style.transform = 'rotate(1turn)'
        // matchedGateSymbol.style.color = 'goldenrod'
        // stargate.style.transform = `rotate(calc((2turn - ${parentDegree}) + ${chevDeg}))`;
        dialedSymbol.classList.add('activate');
        return;
      }
    }
  });
  if (dialedAddress.length === chevrons.length) {
    wormhole.classList.add('gate-activated');
    return;
  }
}
let chevContainer;
let chevDeg;

function createSymbolID() {
  chevContainer = document.getElementById('csc-' + index.toString());
  let id = 'c-' + index.toString();
  let ic = 'ic-' + index.toString();
  let lockedChevron = document.getElementById(id);
  let lockedInnerChevron = document.getElementById(ic);
  lockedChevron.classList.add('chevron-locked');
  lockedInnerChevron.style.opacity = '1';

  let chevronDegree = getComputedStyle(lockedChevron);
  chevDeg = chevronDegree.getPropertyValue('--deg');
  chevContainer.style.setProperty('--deg', `${chevDeg}`);
  return;
}
let matchedGateSymbol;

function createSymbol() {
  const activatedSymbol = document.createElement('p');
  activatedSymbol.classList.add('gate-symbols', 'chevron-symbol');
  let chevSymbol = 'chevron-symbol-' + index.toString();
  activatedSymbol.setAttribute('id', chevSymbol);
  activatedSymbol.innerText = matchedGateSymbol.innerText;
  chevContainer.appendChild(activatedSymbol);
  return;
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

//~ /////////////////////////////////////
//!         EVENT LISTENERS         \\
//~ /////////////////////////////////////
dhdSymbols.forEach((dhdSymbol) => dhdSymbol.addEventListener('click', dialing));

//! REFACTORED SCRATCH CODE
// const chevContainer = document.getElementById('csc-' + index.toString())
// let id = 'c-' + index.toString();
// let ic = 'ic-' + index.toString();
// let lockedChevron = document.getElementById(id);
// let lockedInnerChevron = document.getElementById(ic);

// lockedChevron.classList.add('chevron-locked');
// lockedInnerChevron.style.opacity = '1';

// let chevronDegree = getComputedStyle(lockedChevron)
// let chevDeg = chevronDegree.getPropertyValue('--deg')

// const activatedSymbol = document.createElement('p');
// activatedSymbol.classList.add('gate-symbols', 'chevron-symbol');
// let chevSymbol = 'chevron-symbol-' + index.toString();
// activatedSymbol.setAttribute('id', chevSymbol);
// activatedSymbol.innerText = matchedGateSymbol.innerText;
// chevContainer.appendChild(activatedSymbol)

// chevContainer.style.setProperty('--deg', `${chevDeg}`)
