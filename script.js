const gateSymbols = [...document.querySelectorAll('.gate-symbols')];
const gateSymbolContainers = [
  ...document.querySelectorAll('.gate-symbol-container'),
];
const placeholderContainers = [
  ...document.querySelectorAll('.placeholder-container'),
];
const placeholderSymbols = [
  ...document.querySelectorAll('.placeholder-symbol'),
];
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
const spinningGate = document.getElementById('spinning-gate');
const gate = document.querySelector('.gate');
const lockedContainers = [
  ...document.querySelectorAll('.locked-symbol-container'),
];
const reservedSymbol = document.getElementById('1');
const dhdContainer = document.querySelector('.dhd-container');

//~ //////////////////////
//!       BUILDING  DHD      ||
//~ //////////////////////

placeholderContainers.forEach((container, i) => {
  const symbolName = container.dataset.gate;
  const symbolText = container.firstElementChild.textContent;
  const dhdDial = document.createElement('button');
  dhdDial.classList.add('dhd-btn');
  dhdDial.setAttribute('data-dhd', symbolName);
  dhdDial.setAttribute('data-matched', false);
  dhdDial.innerText = symbolText;
  dhdContainer.appendChild(dhdDial);
  return dhdDial;
});

const dhdSymbols = [...document.querySelectorAll('.dhd-btn')];

let hideSymbol;
let idNum;

placeholderSymbols.forEach((symbol, i) => {
  hideSymbol = placeholderSymbols[i];
  hideSymbol.setAttribute('id', i + 1);
  return;
});

let index = 0;

//~ //////////////////////
//!       DIALING  DHD      ||
//~ //////////////////////

function dialing(e) {
  let dialedSymbol = e.target;
  hideSymbol.setAttribute('data-id', index);
  placeholderSymbols.forEach((symbol, i) => {
    matchedGateSymbol = placeholderSymbols[i];
    if (
      matchedGateSymbol.dataset.gate === dialedSymbol.dataset.dhd &&
      !matchedGateSymbol.classList.contains('matched')
    ) {
      matchedGateSymbol.classList.add('matched');
      if (index < chevrons.length) {
        index++;
        chevronLocked();
        createLockedSymbol();
        animateLockedSymbol();
        dialedSymbol.classList.add('activate');
        dialedAddress.push(lockedSymbol);
        return;
      }
    }
  });
  if (dialedAddress.length === chevrons.length) {
    lockedAddress.push(...dialedAddress);
    setTimeout(() => {
      wormhole.classList.add('gate-activated');
    }, 1100);
    return lockedAddress;
  }
}
let lockedAddress = [];
let matchedGateSymbol;
let dialedAddress = [];
let lockedSymbol;
let chevDeg;
let lockedChevron;
let ic = 'ic-' + index.toString();
let lockedInnerChevron = document.getElementById(ic);

function animateLockedSymbol() {
  reserveSpot();
  lockedSymbol = document.getElementById('locked-symbol-' + index);
  lockedSymbol.style.setProperty('--deg', `${chevDeg}`);
  spinningGate.classList.add('spin-chevron-gate');

  document.body.style.pointerEvents = 'none';
  setTimeout(() => {
    document.body.style.pointerEvents = 'auto';
    spinningGate.classList.remove('spin-chevron-gate');
  }, 1250);
  return;
}

function reserveSpot() {
  if (index === 1) {
    document.getElementById('1').classList.add('hide-symbol');
    return;
  } else {
    if (index === 2) {
      document.getElementById('5').classList.add('hide-symbol');
      return;
    } else {
      if (index === 3) {
        document.getElementById('9').classList.add('hide-symbol');
        return;
      } else {
        if (index === 4) {
          document.getElementById('13').classList.add('hide-symbol');
          return;
        } else {
          if (index === 5) {
            document.getElementById('25').classList.add('hide-symbol');
            return;
          } else {
            if (index === 6) {
              document.getElementById('29').classList.add('hide-symbol');
              return;
            } else {
              if (index === 7) {
                document.getElementById('33').classList.add('hide-symbol');
                return;
              }
            }
          }
        }
      }
    }
  }
}

function chevronLocked() {
  lockedContainer = document.getElementById('csc-' + index.toString());
  let id = 'c-' + index.toString();
  let ic = 'ic-' + index.toString();
  lockedChevron = document.getElementById(id);
  let chevronDegree = getComputedStyle(lockedChevron);
  chevDeg = chevronDegree.getPropertyValue('--deg');
  let lockedInnerChevron = document.getElementById(ic);
  setTimeout(() => {
    lockedInnerChevron.classList.add('chevron-locked');
  }, 1300);
  return;
}

function createLockedSymbol() {
  const lockedSymbolContainer = document.createElement('div');
  lockedSymbolContainer.setAttribute('id', 'lsc-' + index.toString());
  lockedSymbolContainer.classList.add('locked-symbol-container');
  lockedSymbolContainer.style.setProperty('--deg', `${chevDeg}`);
  const activatedSymbol = document.createElement('p');
  activatedSymbol.classList.add('locked-symbol');
  let chevSymbol = 'locked-symbol-' + index.toString();
  activatedSymbol.setAttribute('id', chevSymbol);
  activatedSymbol.innerText = matchedGateSymbol.innerText;
  spinningGate.appendChild(lockedSymbolContainer);
  lockedSymbolContainer.appendChild(activatedSymbol);
  return;
}

//~ /////////////////////////////////////
//!         EVENT LISTENERS         \\
//~ /////////////////////////////////////
dhdSymbols.forEach((dhdSymbol) => dhdSymbol.addEventListener('click', dialing));
