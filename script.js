// const anime = require('animejs')

const gateContainer = document.querySelector('.gate-container');
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
const showAddressBtn = document.querySelector('.show-address-btn');
const addressBook = document.querySelector('.address-book-container');
const closeAddressBtn = document.querySelector('.close');
const translateBtn = document.querySelector('.show-nums');
const address = document.querySelector('.address');

let dialedAddress = [];
let hideSymbol;
let idNum;
let world;
let gateAddress;
let dialedSymbol;
let matchedGateSymbol;
let chevDeg;
let lockedChevron;

//~ //////////////////////
//!      GATE ADDRESS BOOK      ||
//~ //////////////////////

//, THE POINT OF ORIGIN SYMBOL (LAST IN GATE ADDRESS) FOR PEGASUS IS GILLTIN (E)

const gateAddressBook = [
  {
    reference: 'earth',
    world: 'Earth',
    gateAddress: ['o', 'q', 'H', 'p', 'G', 'J', 'r'],
  },
  {
    reference: 'asuras',
    world: 'Asuras',
    gateAddress: ['g', 'f', 'k', 's', 'I', 'j', 'E'],
  },
  {
    reference: 'athos',
    world: 'Athos',
    gateAddress: ['p', 'i', 's', 'F', 'A', 'u', 'E'],
  },
  {
    reference: 'fords-planet',
    world: "Ford's Planet",
    gateAddress: ['a', 'n', '?', 'm', '?', '?', 'E'],
  },
  {
    reference: 'genii',
    world: 'Genii Homeworld',
    gateAddress: ['G', 'q', 'l', 'c', 'v', 'h', 'E'],
  },
  {
    reference: 'hoff',
    world: 'Hoff',
    gateAddress: ['s', 'c', 'a', 'F', 'q', 'r', 'E'],
  },
  {
    reference: 'lantea',
    world: 'Lantea',
    gateAddress: ['w', 'J', 'l', 'y', 'a', 'g', 'E'],
  },
  {
    reference: 'lord-protector',
    world: "Lord Protector's Planet",
    gateAddress: ['t', 'o', 'w', 'e', 'r', '?', 'E'],
  },
  {
    reference: 'lucius',
    world: "Lucius's Planet",
    gateAddress: ['g', 'h', 'j', 'f', 'u', 'n', 'E'],
  },
  {
    reference: 'm4d-058',
    world: 'M4D-058',
    gateAddress: ['s', 'a', 'l', 'k', 'm', 'h', 'E'],
  },
  {
    reference: 'olesia',
    world: 'Olesia',
    gateAddress: ['g', 'o', 't', 'e', 'a', 'm', 'E'],
  },
  {
    reference: 'sateda',
    world: 'Sateda',
    gateAddress: ['g', 'm', 'n', 'q', 'u', 's', 'E'],
  },
  {
    reference: 'taranis',
    world: 'Taranis',
    gateAddress: ['t', 'm', 'a', 'r', 'n', 'i', 'E'],
  },
  //~ shadow monster planet
  {
    reference: 'shadow',
    world: 'M4X-337',
    gateAddress: ['t', 'r', 'q', 'o', 'C', 'B', 'E'],
  },
];

function buildAddressBook() {
  gateAddressBook.forEach((address) => {
    const addressBook = document.querySelector('.address-book-container');
    const div = document.createElement('div');
    div.classList.add('address-line');
    const planet = document.createElement('div');
    planet.classList.add('world');
    planet.innerText = address.world;
    const planetAddress = document.createElement('div');
    planetAddress.classList.add('address');
    planetAddress.innerText = address.gateAddress;
    div.appendChild(planet);
    div.appendChild(planetAddress);
    addressBook.appendChild(div);
    return;
  });
  const btn = document.createElement('button');
  btn.classList.add('close');
  btn.innerText = 'close';
  const btnDiv = document.createElement('div');
  btnDiv.classList.add('btn-container');
  btnDiv.appendChild(btn);
  addressBook.appendChild(btnDiv);
  btn.addEventListener('click', () => {
    addressBook.classList.remove('show-address-book');
    translateBtn.style.opacity = '0';
    dhdSymbols.forEach(symbol => symbol.setAttribute('id', ''))
  });
}

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

placeholderSymbols.forEach((symbol, i) => {
  hideSymbol = placeholderSymbols[i];
  hideSymbol.setAttribute('id', i + 1);
  return;
});

let index = 0;
//~ //////////////////////
//!       DIALING  DHD                                                      ||
//~ //////////////////////
let matchedKey;
let key;
let dhd = new Audio('./assets/sound/dhd_atlantis.mp3');

function getMatch() {
  placeholderSymbols.forEach((symbol, i) => {
    matchedGateSymbol = placeholderSymbols[i];
    if (
      matchedGateSymbol.dataset.gate === dialedSymbol.dataset.dhd &&
      !matchedGateSymbol.classList.contains('matched')
    ) {
      matchedGateSymbol.classList.add('matched');
      if (index < chevrons.length) {
        index++;
        dhd.play();
        chevronLocked();
        animateLockedSymbol();
        lockedGateID = document.getElementById(`lg-${index}`);
        lockedGateID.animate(spinNewGate, spinTiming);
        dialedSymbol.classList.add('activate');
        dialedAddress.push(lockedSymbol.textContent);
        return;
      }
    }
  });
  if (dialedAddress.length === chevrons.length) {
    addAddressToStorage(dialedAddress);
    referenceDatabase();
    addressDatabase();
  }
}

function dialOut(e) {
  hideSymbol.setAttribute('data-id', index);
  if (e.type === 'click') {
    dialedSymbol = e.target;
    getMatch();
  } else if (e.type === 'keypress') {
    key = e.key;
    dhdSymbols.forEach((symbol) => {
      if (key === symbol.innerText) {
        dialedSymbol = symbol;
      }
    });
    getMatch();
  }
  return;
}

function animateLockedSymbol() {
  createLockedGate();
  lockedSymbolID = document.getElementById('locked-symbol-' + index);
  lockedSymbolID.style.setProperty('--deg', chevDeg);
  lockedSymbolContainerID = document.getElementById(`lsc-${index}`);
  lockedSymbolContainerID.style.setProperty('--deg', chevDeg);
  document.body.style.pointerEvents = 'none';
  reserveSpot();
  setTimeout(() => {
    document.body.style.pointerEvents = 'auto';
  }, 1150);
  return;
}

const spinNewGate = [
  { transform: 'rotate(0)' },
  { transform: 'rotate(1turn)' },
];
const spinTiming = {
  duration: 1150,
  iterations: 1,
};

//~ /////////////////////////////////////
//!        REMOVE SYMBOL TO BE REPLACED BY DIALED SYMBOL         \\
//~ /////////////////////////////////////
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
//~ /////////////////////////////////////
//!        LOCK CHEVRON ENCODERS         \\
//~ /////////////////////////////////////
let ic = 'ic-' + index.toString();
let lockedInnerChevron = document.getElementById(ic);
function chevronLocked() {
  lockedContainer = document.getElementById('csc-' + index.toString());
  let id = 'c-' + index.toString();
  let ic = 'ic-' + index.toString();
  lockedChevron = document.getElementById(id);
  let chevronDegree = getComputedStyle(lockedChevron);
  chevDeg = chevronDegree.getPropertyValue('--deg');
  lockedInnerChevron = document.getElementById(ic);
  const lockChevron = new Audio('./assets/sound/chev_usual_3.wav');
  setTimeout(() => {
    lockChevron.play();
  }, 1100);
  setTimeout(() => {
    lockedInnerChevron.classList.add('chevron-locked');
  }, 1300);
  return;
}

//~ /////////////////////////////////////
//!        CREATE DIALED SYMBOL         \\
let lockedGate;
let lockedGateID;
let lockedSymbolContainer;
let lockedSymbolContainerID;
let lockedSymbol;
let lockedSymbolID;
//~ /////////////////////////////////////
//!        CREATE NEW GATE WITH MATCHED SYMBOL PER CLICK         \\
//~ /////////////////////////////////////
function createLockedGate() {
  lockedGate = document.createElement('div');
  lockedGate.classList.add('locked-gate');
  lockedGate.setAttribute('id', 'lg-' + index.toString());

  lockedSymbolContainer = document.createElement('div');
  lockedSymbolContainer.setAttribute('id', 'lsc-' + index.toString());
  lockedSymbolContainer.classList.add('locked-symbol-container');

  lockedSymbol = document.createElement('p');
  lockedSymbol.classList.add('locked-symbol');
  lockedSymbol.setAttribute('id', 'locked-symbol-' + index.toString());
  lockedSymbol.innerText = matchedGateSymbol.innerText;
  lockedSymbolContainer.appendChild(lockedSymbol);
  lockedGate.appendChild(lockedSymbolContainer);
  gateContainer.appendChild(lockedGate);
  return;
}
//~ /////////////////////////////////////
//!        TRAVEL TO DIALED ADDRESS         \\
//~ /////////////////////////////////////
let gateAddressMatched;
function referenceDatabase() {
  for (let i = 0; i < gateAddressBook.length; i++) {
    gateAddress = gateAddressBook[i].gateAddress;
    gateWorld = gateAddressBook[i].world;
    if (JSON.stringify(dialedAddress) === JSON.stringify(gateAddress)) {
      gateAddressMatched = true;
    }
  }
  return gateAddressMatched;
}

let gateWorld;
let reference;
function addressDatabase() {
  for (let i = 0; i < gateAddressBook.length; i++) {
    gateAddress = gateAddressBook[i].gateAddress;
    gateWorld = gateAddressBook[i].world;
    reference = gateAddressBook[i].reference;
    if (JSON.stringify(dialedAddress) == JSON.stringify(gateAddress)) {
      gateAddressMatched = true;
      gateTravel();
      break;
    }
  }
  if (!gateAddressMatched) {
    gateFail();
  }
  return;
}

function gateFail() {
  const gateFail = new Audio('./assets/sound/dial_fail_atlantis.mp3');
  setTimeout(() => {
    gateFail.play();
    innerChevrons.forEach((chevron) => {
      chevron.classList.add('invalid-gate');
    });
    stargate.classList.add('gate-failed');
    spinningGate.classList.add('gate-failed');
    lockedSymbol.classList.add('gate-failed');
  }, 1250);
  clearGateRoom();
  return;
}


function getRandomColor() {
  const hb = 204;
  let s = Math.floor(Math.random() * 107);
  let l = Math.floor(Math.random() * 80);
  const a = 0.1;
  let randomBlue = `hsla(${hb}, ${s}%, ${l}%, ${a})`;
  return randomBlue;
}
function getRandomWhite() {
  const hb = 0;
  const sf = 100;
  let s = Math.floor(Math.random() * 100);
  let l = Math.floor(Math.random() * 100);
  const lf = 100;
  const a = 0.25;
  let randomWhite = `hsla(${hb}, ${sf}%, ${lf}%, ${a})`;
  return randomWhite;
}

function gateTravel() {
  const gateOpen = new Audio('./assets/sound/gate_open_atlantis.mp3');
  setTimeout(() => {
    gateOpen.play();
    wormhole.classList.add('gate-activated');
    wormhole.setAttribute('id', 'base-wormhole');
    base = document.querySelector('.base');
    Array.from({ length: 20 }).forEach(() => {
      const div = document.createElement('div');
      div.classList.add('wormhole-circle', 'forwards');
      const blue = getRandomColor();
      const white = getRandomWhite();
      let odd = document.querySelectorAll('.wormhole-circle :nth-of-type(odd)');
      div.style.border = `5px groove ${white}`;
      div.style.background = blue;
      odd.forEach((every) => {
        every.classList.remove('forwards');
        every.classList.add('reverse');
      });
      base.appendChild(div);
      base = div;
    });
  }, 1300);
  setTimeout(() => {
    const gateTravel = new Audio('./assets/sound/gate_travel.mp3');
    gateTravel.play();
  }, 1500);
  setTimeout(() => {
    window.location.href = `./${reference}.html`;
  }, 7500);
  return;
}

//~ /////////////////////////////////////
//!        ADD LOCKED ADDRESSES         \\
//~ /////////////////////////////////////
function addAddressToStorage(dialedAddress) {
  const addressesFromStorage = getAddressesFromStorage();
  addressesFromStorage.push(dialedAddress);
  localStorage.setItem('addresses', JSON.stringify(addressesFromStorage));
}
//~ /////////////////////////////////////
//!        GET STORED LOCKED ADDRESSES         \\
//~ /////////////////////////////////////
function getAddressesFromStorage() {
  let addressesFromStorage;
  if (localStorage.getItem('addresses') === null) {
    addressesFromStorage = [];
  } else {
    addressesFromStorage = JSON.parse(localStorage.getItem('addresses'));
  }
  return addressesFromStorage;
}
//~ /////////////////////////////////////
//!         CLEAR THE UI                   \\
//~ /////////////////////////////////////
function clearGateRoom() {
  index = 0;
  dialedAddress = [];
  console.log('cleared index: ', index, dialedAddress);
  setTimeout(() => {
    dhdSymbols.forEach((dhd) => {
      dhd.classList.remove('activate');
    });
    innerChevrons.forEach((chevron) => {
      chevron.classList.remove('chevron-locked', 'invalid-gate');
    });
    placeholderSymbols.forEach((symbol) => {
      symbol.classList.remove('matched', 'hide-symbol');
    });
    const lockGate = document.querySelectorAll('.locked-gate');
    lockGate.forEach((gate) => gate.remove());
    wormhole.classList.remove('gate-activated');
  }, 2200);
  return;
}

//~ /////////////////////////////////////
//!         EVENT LISTENERS         \\
//~ /////////////////////////////////////
dhdSymbols.forEach((dhdSymbol) => dhdSymbol.addEventListener('click', dialOut));
window.addEventListener('keypress', dialOut);
showAddressBtn.addEventListener('click', () => {
  addressBook.classList.add('show-address-book');
  translateBtn.style.opacity = '1';
});
window.addEventListener('DOMContentLoaded', buildAddressBook);
translateBtn.addEventListener('click', () => {
  const translateAddress = document.querySelectorAll('.address');
  translateAddress.forEach((address) => address.classList.toggle('translate'));
  dhdSymbols.forEach((dhdSymbol) => {
    console.log(dhdSymbol);
    dhdSymbol.setAttribute('id', 'translate')
  })
});
