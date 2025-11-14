// LETSSS GOOOOOOOOOOOOOOOOOOOOOOO alles naar de shit!!!

class Game {
  constructor() {
    this.cookies = 0;
    this.clickPower = 1;
    this.powerCost = 10;
    this.totalCookiesProduced = 0;
    this.units = [];
    this.upgradeManager = new UpgradeManager();
    this.saveManager = new SaveManager(this);
    this.initializeUnits();
  }
  // verzamelng van de "producties"
  initializeUnits() {
    this.units.push(new ProductionUnit(0, 15, 1, "cursor"));
    this.units.push(new ProductionUnit(0, 100, 5, "grandma"));
    this.units.push(new ProductionUnit(0, 500, 20, "farm"));
    this.units.push(new ProductionUnit(0, 1000, 25, "mine"));
    this.units.push(new ProductionUnit(0, 1500, 40, "factory"));
    this.units.push(new ProductionUnit(0, 2000, 55, "bank"));
    this.units.push(new ProductionUnit(0, 3000, 70, "temple"));
    this.units.push(new ProductionUnit(0, 4000, 120, "wizard_tower"));
    this.units.push(new ProductionUnit(0, 4500, 150, "shipment"));
  }
  // click （⊙ｏ⊙）
  click() {
    this.cookies += this.clickPower;
    this.totalCookiesProduced += this.clickPower;
    this.updateDisplay();
    this.saveManager.save();
  }
  // Upgrades 👈(ﾟヮﾟ👈)
  buyPowerUpgrade() {
    if (this.cookies >= this.powerCost) {
      this.cookies -= this.powerCost;
      this.clickPower++;
      this.powerCost = Math.floor(this.powerCost * 1.5);
      this.updateDisplay();
      this.saveManager.save();
    }
  }
  // Dat is om de shit te berekenen 👈(ﾟヮﾟ👈
  calculateTotalCPS() {
    return this.units.reduce((total, unit) => {
      return total + unit.calculateCPS();
    }, 0);
  }
  //  Als er geen shit er is, dan komt deze binnen, click!!! ╰(*°▽°*)╯
  producePassiveCookies() {
    const cps = this.calculateTotalCPS();
    if (cps > 0) {
      const cookiesPerTick = cps / 10;
      this.cookies += cookiesPerTick;
      this.totalCookiesProduced += cookiesPerTick;
      this.updateDisplay();
    }
  }
  //   Eerlijk, ik heb dit ergens gewoonden en ctrl-c, ctrl-v gedaan ಥ_ಥ
  updateDisplay() {
    const cookieElement = document.getElementById("aantal_cookies");
    if (cookieElement) {
      cookieElement.innerText = Math.floor(this.cookies);
    }

    this.units.forEach((unit) => unit.updateDisplay(this.cookies));
  }

  getUnitByPrefix(prefix) {
    return this.units.find((unit) => unit.idPrefix === prefix);
  }

  showOverview() {
    const stats = new Statistics(this);
    stats.display();
  }

  start() {
    this.saveManager.load();
    this.upgradeManager.initialize(this);
    this.updateDisplay();

    setInterval(() => this.producePassiveCookies(), 100);

    setInterval(() => this.saveManager.save(), 5000);
  }
}
// Classic d=====(￣▽￣*)b
class ProductionUnit {
  constructor(startCount, startCost, startProduction, idPrefix) {
    this.count = startCount;
    this.cost = startCost;
    this.baseProduction = startProduction;
    this.production = startProduction;
    this.idPrefix = idPrefix;
  }
  //   This, this! was bullshit! be beter. Shame on you.
  buy(game) {
    if (game.cookies >= this.cost) {
      game.cookies -= this.cost;
      this.count++;
      this.cost = Math.floor(this.cost * 1.15);
      game.updateDisplay();
      game.saveManager.save();
      return true;
    }
    return false;
  }
  // Also a CPS, but not the total!!! 👈(ﾟヮﾟ👈
  calculateCPS() {
    return this.count * this.production;
  }
  //   EVerthing I think, he gets everthing and just updates. I could do beter I think.
  updateDisplay(currentCookies) {
    const countElement = document.getElementById(this.idPrefix + "-count");
    const costElement = document.getElementById(this.idPrefix + "-cost");
    const cpsElement = document.getElementById(this.idPrefix + "-cps");
    const button = document.getElementById(this.idPrefix + "-btn");

    if (countElement) countElement.innerText = this.count;
    if (costElement) costElement.innerText = this.cost;
    if (cpsElement) cpsElement.innerText = this.calculateCPS();
    if (button) button.disabled = currentCookies < this.cost;
  }
  // I....don't know why this is here actually but it works. ヾ(⌐■_■)ノ♪
  toJSON() {
    return {
      count: this.count,
      cost: this.cost,
      production: this.production,
      idPrefix: this.idPrefix,
    };
  }

  loadFromJSON(data) {
    this.count = data.count || 0;
    this.cost = data.cost || this.cost;
    this.production = data.production || this.baseProduction;
  }
}
// Upgrades2 👈(ﾟヮﾟ👈
class Upgrade {
  constructor(id, name, cost, effectCallback, description) {
    this.id = id;
    this.name = name;
    this.cost = cost;
    this.effectCallback = effectCallback;
    this.description = description;
    this.purchased = false;
  }
  // Give me you cookies ♨︎_♨︎
  buy(game) {
    if (game.cookies >= this.cost && !this.purchased) {
      game.cookies -= this.cost;
      this.effectCallback(game);
      this.purchased = true;
      game.updateDisplay();
      game.saveManager.save();
      return true;
    }
    return false;
  }
}

class UpgradeManager {
  constructor() {
    this.upgrades = [];
    this.purchasedUpgradeIds = [];
  }
  // This could be in OOP I think, it can but...idk
  initialize(game) {
    this.upgrades = [
      new Upgrade(
        1,
        "Dubbele Cursor",
        100,
        (g) => {
          const cursor = g.getUnitByPrefix("cursor");
          if (cursor) cursor.production = cursor.baseProduction * 2;
        },
        "Verdubbelt cursor productie"
      ),

      new Upgrade(
        2,
        "Super Oma",
        500,
        (g) => {
          const grandma = g.getUnitByPrefix("grandma");
          if (grandma) grandma.production = grandma.baseProduction * 2;
        },
        "Verdubbelt grandma productie"
      ),

      new Upgrade(
        3,
        "Mega Farm",
        1000,
        (g) => {
          const farm = g.getUnitByPrefix("farm");
          if (farm) farm.production = farm.baseProduction * 2;
        },
        "Verdubbelt farm productie"
      ),

      new Upgrade(
        4,
        "Klik Boost",
        200,
        (g) => {
          g.clickPower += 5;
        },
        "Voegt +5 toe aan klik power"
      ),

      new Upgrade(
        5,
        "Efficiënte Mijn",
        2000,
        (g) => {
          const mine = g.getUnitByPrefix("mine");
          if (mine) mine.production = mine.baseProduction * 2;
        },
        "Verdubbelt mine productie"
      ),
    ];
  }
  // Eerlijk. ctrl-c ctrl-v.
  getAvailableUpgrades(game) {
    return this.upgrades.filter(
      (upgrade) =>
        !upgrade.purchased &&
        !this.purchasedUpgradeIds.includes(upgrade.id) &&
        game.cookies >= upgrade.cost
    );
  }

  showUpgradeMenu(game) {
    const available = this.getAvailableUpgrades(game);

    if (available.length === 0) {
      alert(
        "Geen upgrades beschikbaar! Je hebt niet genoeg cookies of alle upgrades zijn al gekocht."
      );
      return;
    }

    let upgradeList = "Beschikbare Upgrades:\n\n";
    available.slice(0, 5).forEach((upgrade, index) => {
      upgradeList += `${index + 1}. ${upgrade.name} - ${
        upgrade.cost
      } cookies\n   ${upgrade.description}\n\n`;
    });

    const choice = prompt(
      upgradeList +
        "Voer het nummer in van de upgrade die je wilt kopen (of annuleer):"
    );

    if (choice) {
      const index = parseInt(choice) - 1;
      if (index >= 0 && index < available.length) {
        const upgrade = available[index];
        if (upgrade.buy(game)) {
          this.purchasedUpgradeIds.push(upgrade.id);
          alert(`Je hebt ${upgrade.name} gekocht!`);
        }
      }
    }
  }

  markUpgradeAsPurchased(upgradeId) {
    const upgrade = this.upgrades.find((u) => u.id === upgradeId);
    if (upgrade) {
      upgrade.purchased = true;
    }
  }
}
// IT's HIM, WHAT A SAVE!!! ┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻
class SaveManager {
  constructor(game) {
    this.game = game;
    this.saveKey = "cookieClickerSave";
  }

  save() {
    const data = {
      cookies: this.game.cookies,
      clickPower: this.game.clickPower,
      powerCost: this.game.powerCost,
      totalProduced: this.game.totalCookiesProduced,
      upgrades: this.game.upgradeManager.purchasedUpgradeIds,
      units: this.game.units.map((unit) => unit.toJSON()),
    };
    localStorage.setItem(this.saveKey, JSON.stringify(data));
  }

  load() {
    const saved = localStorage.getItem(this.saveKey);
    if (!saved) return;

    try {
      const data = JSON.parse(saved);
      this.game.cookies = data.cookies || 0;
      this.game.clickPower = data.clickPower || 1;
      this.game.powerCost = data.powerCost || 10;
      this.game.totalCookiesProduced = data.totalProduced || 0;

      // Laad upgrades 👈(ﾟヮﾟ👈
      if (data.upgrades) {
        this.game.upgradeManager.purchasedUpgradeIds = data.upgrades;
        data.upgrades.forEach((id) => {
          this.game.upgradeManager.markUpgradeAsPurchased(id);
          const upgrade = this.game.upgradeManager.upgrades.find(
            (u) => u.id === id
          );
          if (upgrade) {
            upgrade.effectCallback(this.game);
          }
        });
      }

      // Laad units 👈(ﾟヮﾟ👈
      if (data.units) {
        data.units.forEach((unitData, index) => {
          if (this.game.units[index]) {
            this.game.units[index].loadFromJSON(unitData);
          }
        });
      }
    } catch (error) {
      console.error("Fout bij laden van opgeslagen data:", error);
    }
  }

  clear() {
    localStorage.removeItem(this.saveKey);
  }
}

class Statistics {
  constructor(game) {
    this.game = game;
  }

  display() {
    let overview = "=== COOKIE CLICKER OVERZICHT ===\n\n";
    overview += `Totaal cookies: ${Math.floor(this.game.cookies)}\n`;
    overview += `Totaal geproduceerd: ${Math.floor(
      this.game.totalCookiesProduced
    )}\n`;
    overview += `Klik power: ${this.game.clickPower}\n`;
    overview += `Cookies per seconde: ${this.game.calculateTotalCPS()}\n\n`;
    overview += "=== GEKOCHTE ITEMS ===\n";

    this.game.units.forEach((unit) => {
      if (unit.count > 0) {
        overview += `${unit.idPrefix}: ${
          unit.count
        } (CPS: ${unit.calculateCPS()})\n`;
      }
    });

    overview += `\n=== UPGRADES ===\n`;
    overview += `Gekocht: ${this.game.upgradeManager.purchasedUpgradeIds.length}/${this.game.upgradeManager.upgrades.length}\n`;

    alert(overview);
  }
}

let game;

function klik() {
  if (game) game.click();
}

function power() {
  if (game) game.upgradeManager.showUpgradeMenu(game);
}

function toonOverzicht() {
  if (game) game.showOverview();
}

let cursor, grandma, farm, mine, factory, bank, temple, wizard_tower, shipment;

window.addEventListener("load", function () {
  game = new Game();

  cursor = game.getUnitByPrefix("cursor");
  grandma = game.getUnitByPrefix("grandma");
  farm = game.getUnitByPrefix("farm");
  mine = game.getUnitByPrefix("mine");
  factory = game.getUnitByPrefix("factory");
  bank = game.getUnitByPrefix("bank");
  temple = game.getUnitByPrefix("temple");
  wizard_tower = game.getUnitByPrefix("wizard_tower");
  shipment = game.getUnitByPrefix("shipment");

  const createBuyMethod = (unit) => {
    return () => unit.buy(game);
  };

  cursor.koopUnit = createBuyMethod(cursor);
  grandma.koopUnit = createBuyMethod(grandma);
  farm.koopUnit = createBuyMethod(farm);
  mine.koopUnit = createBuyMethod(mine);
  factory.koopUnit = createBuyMethod(factory);
  bank.koopUnit = createBuyMethod(bank);
  temple.koopUnit = createBuyMethod(temple);
  wizard_tower.koopUnit = createBuyMethod(wizard_tower);
  shipment.koopUnit = createBuyMethod(shipment);

  game.start();
});
