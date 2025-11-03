// Check of je classes kan gebruiken en eficient maken. 
// BTW: Ik heb meer code menner maar door mijn type fouten heb ik ze appart gezet en ziet ze na te kijken

// Variabelen (┬┬﹏┬┬) 
let aantal_cookies = 0;
let klik_power = 1;
let power_cost = 10;
let total_cookies_produced = 0;

class ProductionUnit{
    count;
    coost;
    production;
    idPrefix;

    constructor(starCount, startCost, startProduction, idPrefix){
        this.count = starCount;
        this.cost = startCost;
        this.production = startProduction;
        this.idPrefix = idPrefix
    }

koopUnit(){
    if (aantal_cookies >= this.cost) {
    aantal_cookies -= this.cost;
    this.count++;
    this.cost = Math.floor(this.cost * 1.15);
    updateDisplay();
    }
}

updateDisplay(){
    document.getElementById(this.idPrefix + "-count").innerText = this.count;
    document.getElementById(this.idPrefix + "-cost").innerText = this.cost;
    document.getElementById(this.idPrefix + "-cps").innerText = this.count * this.production;
    document.getElementById(this.idPrefix + "-btn").disabled = aantal_cookies < this.cost;
}
}

let cursor = new ProductionUnit(0,15,1)
let grandma = new ProductionUnit(0,100,5)
let farm = new ProductionUnit(0,500,20)
let mine = new ProductionUnit(0,1000,25)
let factory = new ProductionUnit(0,1500,40)
let bank = new ProductionUnit(0,2000,55)
let temple = new ProductionUnit(0,3000,70)
let wizard_tower = new ProductionUnit(0,4000,120)
let shipment = new ProductionUnit(0,4500,150)

// // Cursor gedeelte ᓚᘏᗢ
//  let cursor_count = 0;
//  let cursor_cost = 15;
// const cursor_production = 1;

//  // Grandma varibelen ᓚᘏᗢ
// let grandma_count = 0;
// let grandma_cost = 100;
// const grandma_production = 5;
            
// // Farm variábelen ᓚᘏᗢ
// let farm_count = 0;
// let farm_cost = 500;
// const farm_production = 20;

//function voor resultaat(progress)
document.getElementById("aantal_cookies").innerHTML = localStorage.clickcount;

// Functions!!!!! make a class???

function klik(){
aantal_cookies += klik_power; 
total_cookies_produced += klik_power;
updateDisplay();

//localstorage opslaan voor de progress(resultaat)
aantal_cookies = localStorage.clickcount;
if(localStorage.clickcount) {
    localStorage.clickcount = Number(localStorage.clickcount)+1;
} else{
    localStorage.clickcount = 1;
}
document.getElementById("aantal_cookies").innerHTML =localStorage.clickcount;
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

 // Funtion to buy Cursor ╰(*°▽°*)╯
// function koopCursor() {
// if (aantal_cookies >= cursor_cost) {
// aantal_cookies -= cursor_cost;
// cursor_count++;
// cursor_cost = Math.floor(cursor_cost * 1.15);
// updateDisplay();
//     }
// }
        
// // Function to buy Grandma ╰(*°▽°*)╯
// function koopGrandma() {
// if (aantal_cookies >= grandma_cost) {
// aantal_cookies -= grandma_cost;
// grandma_count++;
// grandma_cost = Math.floor(grandma_cost * 1.15);
// updateDisplay();
//     }
// }
        
// // Function to buy Farm ╰(*°▽°*)╯
// function koopFarm() {
// if (aantal_cookies >= farm_cost) {
// aantal_cookies -= farm_cost;
// farm_count++;
// farm_cost = Math.floor(farm_cost * 1.15);
// updateDisplay();
//     }
// }

function calcularTotalCPS() {
return (cursor_count * cursor_production) + 
        (grandma_count * grandma_production) + 
        (farm_count * farm_production);
        }


// Function to display the cookies ヾ(⌐■_■)ノ♪
function updateDisplay() {
//cookies update
document.getElementById("aantal_cookies").innerText = Math.floor(aantal_cookies);
}

// CPS total
function calcularTotalCPS() {
return (cursor_count * cursor_production) + 
        (grandma_count * grandma_production) + 
        (farm_count * farm_production);
}

 // Update click power - oude
// document.getElementById("click-power").innerText = klik_power;
// document.getElementById("power-cost").innerText = power_cost;
            
// // Update Cursor
// document.getElementById("cursor-count").innerText = cursor_count;
// document.getElementById("cursor-cost").innerText = cursor_cost;
// document.getElementById("cursor-cps").innerText = cursor_count * cursor_production;
            
// // Update Grandma
// document.getElementById("grandma-count").innerText = grandma_count;
// document.getElementById("grandma-cost").innerText = grandma_cost;
// document.getElementById("grandma-cps").innerText = grandma_count * grandma_production;
            
// // Update Farm
// document.getElementById("farm-count").innerText = farm_count;
// document.getElementById("farm-cost").innerText = farm_cost;
// document.getElementById("farm-cps").innerText = farm_count * farm_production;
            
// // Update estatísticas
// document.getElementById("total-cps").innerText = calcularTotalCPS();
// document.getElementById("total-cookies").innerText = Math.floor(total_cookies_produced);
            
// // Als er niet genoeg cookies er zijn
// document.getElementById("cursor-btn").disabled = aantal_cookies < cursor_cost;
// document.getElementById("grandma-btn").disabled = aantal_cookies < grandma_cost;
// document.getElementById("farm-btn").disabled = aantal_cookies < farm_cost;
        
        
// Automaties productie
        setInterval(function() {
            const cps = calcularTotalCPS();
            if (cps > 0) {
                const cookies_per_tick = cps / 10;
                aantal_cookies += cookies_per_tick;
                total_cookies_produced += cookies_per_tick;
                updateDisplay();
            }
        }, 100);

updateDisplay();
