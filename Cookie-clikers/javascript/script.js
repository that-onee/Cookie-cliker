// Variabelen (┬┬﹏┬┬)
let aantal_cookies = 0;
let klik_power = 1;
let power_cost = 10;
let total_cookies_produced = 0;

class ProductionUnit {
  count;
  s;
  coost;
  production;
  idPrefix;

  constructor(starCount, startCost, startProduction, idPrefix) {
    this.count = starCount;
    this.cost = startCost;
    this.production = startProduction;
    this.idPrefix = idPrefix;
  }

  koopUnit() {
    if (aantal_cookies >= this.cost) {
      aantal_cookies -= this.cost;
      this.count++;
      this.cost = Math.floor(this.cost * 1.15);
      updateDisplay();
    }
  }

  updateDisplay() {
    document.getElementById(this.idPrefix + "-count").innerText = this.count;
    document.getElementById(this.idPrefix + "-cost").innerText = this.cost;
    document.getElementById(this.idPrefix + "-cps").innerText =
      this.count * this.production;
    document.getElementById(this.idPrefix + "-btn").disabled =
      aantal_cookies < this.cost;
  }
}

let cursor = new ProductionUnit(0, 15, 1);
let grandma = new ProductionUnit(0, 100, 5);
let farm = new ProductionUnit(0, 500, 20);
let mine = new ProductionUnit(0, 1000, 25);
let factory = new ProductionUnit(0, 1500, 40);
let bank = new ProductionUnit(0, 2000, 55);
let temple = new ProductionUnit(0, 3000, 70);
let wizard_tower = new ProductionUnit(0, 4000, 120);
let shipment = new ProductionUnit(0, 4500, 150);

//function voor resultaat(progress)
document.getElementById("aantal_cookies").innerHTML = localStorage.clickcount;

function klik() {
  aantal_cookies += klik_power;
  total_cookies_produced += klik_power;
  updateDisplay();

  //localstorage opslaan voor de progress(resultaat)
  aantal_cookies = localStorage.clickcount;

  if (localStorage.clickcount) {
    localStorage.clickcount = Number(localStorage.clickcount) + 1;
  } else {
    localStorage.clickcount = 1;
  }
  document.getElementById("aantal_cookies").innerHTML = localStorage.clickcount;
  //heb dit veranderd het origineel code is (document.getElementById("aantal_cookies").innerText =aantal_cookies)
  document.getElementById("aantal_cookies").innerText = aantal_cookies;
}

// Function om de click power te updaten ╰（‵□′）╯
function power() {
  if (aantal_cookies >= power_cost) {
    aantal_cookies -= power_cost;
    klik_power++;
    power_cost = Math.floor(power_cost * 1.5);
    updateDisplay();
  }
}

function calcularTotalCPS() {
  return (
    cursor_count * cursor_production +
    grandma_count * grandma_production +
    farm_count * farm_production
  );
}

// Function to display the cookies ヾ(⌐■_■)ノ♪
function updateDisplay() {
  //cookies update
  document.getElementById("aantal_cookies").innerText =
    Math.floor(aantal_cookies);
}

// CPS total
function calcularTotalCPS() {
  return (
    cursor_count * cursor_production +
    grandma_count * grandma_production +
    farm_count * farm_production
  );
}

// Automaties productie
setInterval(function () {
  const cps = calcularTotalCPS();
  if (cps > 0) {
    const cookies_per_tick = cps / 10;
    aantal_cookies += cookies_per_tick;
    total_cookies_produced += cookies_per_tick;
    updateDisplay();
  }
}, 100);

updateDisplay();
