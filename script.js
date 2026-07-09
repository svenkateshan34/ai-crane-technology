// =========================================
// AI SMART CRANE MONITORING SYSTEM
// Part 1
// =========================================

// ================================
// Dashboard Elements
// ================================

const health = document.getElementById("health");
const hours = document.getElementById("hours");
const fuel = document.getElementById("fuel");
const alerts = document.getElementById("alerts");

const load = document.getElementById("load");
const wear = document.getElementById("wear");
const fuelLevel = document.getElementById("fuelLevel");
const workingTime = document.getElementById("workingTime");
const temperature = document.getElementById("temperature");
const vibration = document.getElementById("vibration");
const rpm = document.getElementById("rpm");

// ================================
// Initial Sensor Values
// ================================

let crane = {

    load:42,

    wear:18,

    fuel:100,

    hours:8,

    temp:45,

    rpm:1350,

    health:100

};

// ================================
// Charts Data
// ================================

const labels=[];

const loadData=[];

const fuelData=[];

const wearData=[];

const hourData=[];

// ================================
// Chart Options
// ================================

const chartOptions={

responsive:true,

maintainAspectRatio:false,

animation:{

duration:1800,

easing:"easeInOutQuart"

},

interaction:{

mode:"index",

intersect:false

},

plugins:{

legend:{

display:true

}

},

elements:{

line:{

tension:.45,

borderWidth:3

},

point:{

radius:4,

hoverRadius:7

}

}

};

// ================================
// LOAD CHART
// ================================

const usageChart=new Chart(

document.getElementById("usageChart"),

{

type:"line",

data:{

labels:labels,

datasets:[{

label:"Load (Ton)",

data:loadData,

borderColor:"#2563eb",

backgroundColor:"rgba(37,99,235,.15)",

fill:true

}]

},

options:chartOptions

}

);

// ================================
// Fuel Chart
// ================================

const fuelChart=new Chart(

document.getElementById("fuelChart"),

{

type:"line",

data:{

labels:labels,

datasets:[{

label:"Fuel (%)",

data:fuelData,

borderColor:"#10b981",

backgroundColor:"rgba(16,185,129,.15)",

fill:true

}]

},

options:chartOptions

}

);

// ================================
// Wear Chart
// ================================

const wearChart=new Chart(

document.getElementById("wearChart"),

{

type:"line",

data:{

labels:labels,

datasets:[{

label:"Wear (%)",

data:wearData,

borderColor:"#f59e0b",

backgroundColor:"rgba(245,158,11,.15)",

fill:true

}]

},

options:chartOptions

}

);

// ================================
// Working Hours Chart
// ================================

const hourChart=new Chart(

document.getElementById("hourChart"),

{

type:"bar",

data:{

labels:labels,

datasets:[{

label:"Working Hours",

data:hourData,

backgroundColor:"#2563eb"

}]

},

options:chartOptions

}

);

// ================================
// Realistic Simulation
// ================================

function simulateCrane(){

// Load

crane.load+=Math.floor(Math.random()*5)-2;

crane.load=Math.max(20,Math.min(60,crane.load));

// Fuel

crane.fuel-=Math.random()*1.5;

crane.fuel=Math.max(10,crane.fuel);

// Wear

crane.wear+=Math.random()*0.4;

crane.wear=Math.min(100,crane.wear);

// Hours

crane.hours+=0.2;

// Temperature

crane.temp=40+(crane.load/2)+(Math.random()*5);

// RPM

crane.rpm=1200+crane.load*10;

// Health

crane.health=100-(crane.wear*.5);

}
// =========================================
// AI SMART CRANE MONITORING SYSTEM
// Part 1
// =========================================

// ================================
// Dashboard Elements
// ================================

const health = document.getElementById("health");
const hours = document.getElementById("hours");
const fuel = document.getElementById("fuel");
const alerts = document.getElementById("alerts");

const load = document.getElementById("load");
const wear = document.getElementById("wear");
const fuelLevel = document.getElementById("fuelLevel");
const workingTime = document.getElementById("workingTime");
const temperature = document.getElementById("temperature");
const vibration = document.getElementById("vibration");
const rpm = document.getElementById("rpm");

// ================================
// Initial Sensor Values
// ================================

let crane = {

    load:42,

    wear:18,

    fuel:100,

    hours:8,

    temp:45,

    rpm:1350,

    health:100

};

// ================================
// Charts Data
// ================================

const labels=[];

const loadData=[];

const fuelData=[];

const wearData=[];

const hourData=[];

// ================================
// Chart Options
// ================================

const chartOptions={

responsive:true,

maintainAspectRatio:false,

animation:{

duration:1800,

easing:"easeInOutQuart"

},

interaction:{

mode:"index",

intersect:false

},

plugins:{

legend:{

display:true

}

},

elements:{

line:{

tension:.45,

borderWidth:3

},

point:{

radius:4,

hoverRadius:7

}

}

};

// ================================
// LOAD CHART
// ================================

const usageChart=new Chart(

document.getElementById("usageChart"),

{

type:"line",

data:{

labels:labels,

datasets:[{

label:"Load (Ton)",

data:loadData,

borderColor:"#2563eb",

backgroundColor:"rgba(37,99,235,.15)",

fill:true

}]

},

options:chartOptions

}

);

// ================================
// Fuel Chart
// ================================

const fuelChart=new Chart(

document.getElementById("fuelChart"),

{

type:"line",

data:{

labels:labels,

datasets:[{

label:"Fuel (%)",

data:fuelData,

borderColor:"#10b981",

backgroundColor:"rgba(16,185,129,.15)",

fill:true

}]

},

options:chartOptions

}

);

// ================================
// Wear Chart
// ================================

const wearChart=new Chart(

document.getElementById("wearChart"),

{

type:"line",

data:{

labels:labels,

datasets:[{

label:"Wear (%)",

data:wearData,

borderColor:"#f59e0b",

backgroundColor:"rgba(245,158,11,.15)",

fill:true

}]

},

options:chartOptions

}

);

// ================================
// Working Hours Chart
// ================================

const hourChart=new Chart(

document.getElementById("hourChart"),

{

type:"bar",

data:{

labels:labels,

datasets:[{

label:"Working Hours",

data:hourData,

backgroundColor:"#2563eb"

}]

},

options:chartOptions

}

);

// ================================
// Realistic Simulation
// ================================

function simulateCrane(){

// Load

crane.load+=Math.floor(Math.random()*5)-2;

crane.load=Math.max(20,Math.min(60,crane.load));

// Fuel

crane.fuel-=Math.random()*1.5;

crane.fuel=Math.max(10,crane.fuel);

// Wear

crane.wear+=Math.random()*0.4;

crane.wear=Math.min(100,crane.wear);

// Hours

crane.hours+=0.2;

// Temperature

crane.temp=40+(crane.load/2)+(Math.random()*5);

// RPM

crane.rpm=1200+crane.load*10;

// Health

crane.health=100-(crane.wear*.5);

}
// =========================================
// PART 3
// Auto Update + 90 Days + AI Score
// =========================================

// -------------------------------
// 90 Days History
// -------------------------------

const history = [];

for(let i=1;i<=90;i++){

    history.push({

        day:i,

        load:30+Math.random()*25,

        fuel:100-i*.7,

        wear:10+i*.6,

        hours:6+Math.random()*5

    });

}

// -------------------------------
// AI Health Score
// -------------------------------

function calculateHealth(){

    crane.health =

    100
    - (crane.wear*0.45)
    - ((100-crane.fuel)*0.12)
    - ((crane.temp-40)*0.25);

    crane.health=Math.max(60,Math.min(100,crane.health));

}

// -------------------------------
// Fuel Consumption
// -------------------------------

function consumeFuel(){

    crane.fuel-=crane.load*0.01;

    if(crane.fuel<10){

        crane.fuel=100;

    }

}

// -------------------------------
// Wear Increase
// -------------------------------

function increaseWear(){

    crane.wear+=crane.load*0.005;

    crane.wear=Math.min(crane.wear,100);

}

// -------------------------------
// Temperature Logic
// -------------------------------

function updateTemperature(){

    crane.temp=40+(crane.load*0.5);

}

// -------------------------------
// Working Hours
// -------------------------------

function updateHours(){

    crane.hours+=0.2;

}

// -------------------------------
// RPM Logic
// -------------------------------

function updateRPM(){

    crane.rpm=1000+(crane.load*12);

}

// -------------------------------
// Complete Simulation
// -------------------------------

function updateSystem(){

    simulateCrane();

    consumeFuel();

    increaseWear();

    updateTemperature();

    updateHours();

    updateRPM();

    calculateHealth();

    updateDashboard();

}

// -------------------------------
// Initial Load
// -------------------------------

updateSystem();

// -------------------------------
// Every 20 Seconds
// -------------------------------

setInterval(function(){

    updateSystem();

},20000);

// -------------------------------
// Digital Clock
// -------------------------------

setInterval(function(){

    const clock=document.getElementById("clock");

    if(clock){

        clock.innerHTML=new Date().toLocaleTimeString();

    }

},1000);

// -------------------------------
// Export Report
// -------------------------------

function exportReport(){

    const report=`

AI SMART CRANE REPORT

-----------------------------

Load : ${crane.load.toFixed(0)} Ton

Fuel : ${crane.fuel.toFixed(0)} %

Wear : ${crane.wear.toFixed(0)} %

Temperature : ${crane.temp.toFixed(0)} °C

RPM : ${crane.rpm.toFixed(0)}

Working Hours : ${crane.hours.toFixed(1)}

Health : ${crane.health.toFixed(0)} %

Generated :
${new Date().toLocaleString()}

`;

    const blob=new Blob([report],{

        type:"text/plain"

    });

    const a=document.createElement("a");

    a.href=URL.createObjectURL(blob);

    a.download="Crane_Report.txt";

    a.click();

}

// -------------------------------
// Button
// -------------------------------

const reportBtn=document.getElementById("reportBtn");

if(reportBtn){

    reportBtn.addEventListener("click",exportReport);

}
updateDashboard();