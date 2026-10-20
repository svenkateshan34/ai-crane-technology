const elements = {
    health: document.getElementById("health"),
    hours: document.getElementById("hours"),
    fuel: document.getElementById("fuel"),
    alerts: document.getElementById("alerts"),
    load: document.getElementById("load"),
    wear: document.getElementById("wear"),
    fuelLevel: document.getElementById("fuelLevel"),
    workingTime: document.getElementById("workingTime"),
    temperature: document.getElementById("temperature"),
    vibration: document.getElementById("vibration"),
    rpm: document.getElementById("rpm"),
    clock: document.getElementById("clock"),
    recommendations: document.getElementById("recommendations"),
    alertList: document.getElementById("alertList")
};

const crane = {
    load: 42,
    wear: 18,
    fuel: 74,
    hours: 8.5,
    temperature: 58,
    rpm: 1450,
    health: 80
};

const historyLimit = 20;
const chartLabels = [];
const chartData = {
    load: [],
    fuel: [],
    wear: [],
    hours: []
};
const charts = [];

function createChart(canvasId, type, label, color, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || typeof Chart === "undefined") {
        return null;
    }

    return new Chart(canvas, {
        type,
        data: {
            labels: chartLabels,
            datasets: [{
                label,
                data,
                borderColor: color,
                backgroundColor: `${color}26`,
                fill: type === "line",
                tension: 0.35
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            interaction: {
                mode: "index",
                intersect: false
            },
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });
}

charts.push(
    createChart("usageChart", "line", "Load (Ton)", "#2563eb", chartData.load),
    createChart("fuelChart", "line", "Fuel (%)", "#10b981", chartData.fuel),
    createChart("wearChart", "line", "Wear (%)", "#f59e0b", chartData.wear),
    createChart("hourChart", "bar", "Working Hours", "#2563eb", chartData.hours)
);

function getActiveAlerts() {
    const activeAlerts = [];

    if (crane.load >= 55) {
        activeAlerts.push("Overload warning: crane load is high.");
    }
    if (crane.fuel <= 25) {
        activeAlerts.push("Low fuel warning: refuel the crane soon.");
    }
    if (crane.temperature >= 80) {
        activeAlerts.push("High temperature warning: inspect the cooling system.");
    }
    if (crane.wear >= 70) {
        activeAlerts.push("Maintenance warning: inspect crane components for wear.");
    }

    return activeAlerts;
}

function updateRecommendations() {
    if (!elements.recommendations) {
        return;
    }

    const remainingDays = Math.max(1, Math.round((100 - crane.wear) * 0.83));
    const risk = crane.health < 70 ? "High" : crane.health < 85 ? "Medium" : "Low";
    const inspection = crane.wear >= 30
        ? "Wire rope inspection recommended"
        : "Routine wire rope inspection recommended";

    elements.recommendations.replaceChildren(
        ...[
            `${inspection}.`,
            `Estimated remaining life: ${remainingDays} days.`,
            `Next service: ${new Date(Date.now() + remainingDays * 86400000).toLocaleDateString()}.`,
            `Failure risk: ${risk}.`
        ].map((message) => {
            const item = document.createElement("p");
            item.textContent = message;
            return item;
        })
    );
}

function updateAlerts() {
    if (!elements.alertList) {
        return;
    }

    const currentAlerts = getActiveAlerts();
    elements.alerts.textContent = String(currentAlerts.length);

    elements.alertList.replaceChildren();
    if (currentAlerts.length === 0) {
        const item = document.createElement("li");
        item.textContent = "All systems operating normally.";
        elements.alertList.append(item);
        return;
    }

    currentAlerts.forEach((message) => {
        const item = document.createElement("li");
        item.textContent = message;
        elements.alertList.append(item);
    });
}

function updateDashboard() {
    crane.health = Math.max(
        0,
        Math.min(100, 100 - crane.wear * 0.45 - (100 - crane.fuel) * 0.12 - Math.max(0, crane.temperature - 40) * 0.25)
    );

    elements.health.textContent = `${Math.round(crane.health)}%`;
    elements.hours.textContent = `${crane.hours.toFixed(1)} hrs`;
    elements.fuel.textContent = `${Math.round(crane.fuel)}%`;
    elements.load.textContent = `${Math.round(crane.load)} Ton`;
    elements.wear.textContent = `${Math.round(crane.wear)}%`;
    elements.fuelLevel.textContent = `${Math.round(crane.fuel)}%`;
    elements.workingTime.textContent = `${crane.hours.toFixed(1)} Hours`;
    elements.temperature.textContent = `${Math.round(crane.temperature)}°C`;
    elements.vibration.textContent = crane.load >= 55 ? "Elevated" : "Normal";
    elements.rpm.textContent = `${Math.round(crane.rpm)} RPM`;

    updateRecommendations();
    updateAlerts();
}

function updateCharts() {
    const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    chartLabels.push(time);
    chartData.load.push(Math.round(crane.load));
    chartData.fuel.push(Math.round(crane.fuel));
    chartData.wear.push(Math.round(crane.wear));
    chartData.hours.push(Number(crane.hours.toFixed(1)));

    if (chartLabels.length > historyLimit) {
        chartLabels.shift();
        Object.values(chartData).forEach((values) => values.shift());
    }

    charts.forEach((chart) => {
        if (chart) {
            chart.update();
        }
    });
}

function simulateCrane() {
    crane.load = Math.max(20, Math.min(60, crane.load + Math.floor(Math.random() * 5) - 2));
    crane.fuel = Math.max(0, crane.fuel - Math.random() * 0.6);
    crane.wear = Math.min(100, crane.wear + Math.random() * 0.08);
    crane.hours += 1 / 180;
    crane.temperature = 40 + crane.load * 0.5 + Math.random() * 5;
    crane.rpm = 1000 + crane.load * 12;

    updateDashboard();
    updateCharts();
}

function exportReport() {
    const report = [
        "AI SMART CRANE REPORT",
        "-----------------------------",
        `Load: ${crane.load.toFixed(0)} Ton`,
        `Fuel: ${crane.fuel.toFixed(0)}%`,
        `Wear: ${crane.wear.toFixed(0)}%`,
        `Temperature: ${crane.temperature.toFixed(0)}°C`,
        `RPM: ${crane.rpm.toFixed(0)}`,
        `Working hours: ${crane.hours.toFixed(1)}`,
        `Health: ${crane.health.toFixed(0)}%`,
        `Active alerts: ${getActiveAlerts().length}`,
        `Generated: ${new Date().toLocaleString()}`
    ].join("\n");

    const reportUrl = URL.createObjectURL(new Blob([report], { type: "text/plain" }));
    const link = document.createElement("a");
    link.href = reportUrl;
    link.download = "Crane_Report.txt";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(reportUrl), 0);
}

const menuButton = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
if (menuButton && navMenu) {
    menuButton.addEventListener("click", () => {
        const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
        menuButton.setAttribute("aria-expanded", String(!isExpanded));
        navMenu.classList.toggle("is-open", !isExpanded);
    });

    navMenu.addEventListener("click", (event) => {
        if (event.target instanceof HTMLAnchorElement) {
            navMenu.classList.remove("is-open");
            menuButton.setAttribute("aria-expanded", "false");
        }
    });
}

const dashboardButton = document.getElementById("dashboardButton");
if (dashboardButton) {
    dashboardButton.addEventListener("click", () => {
        document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" });
    });
}

const reportButton = document.getElementById("reportBtn");
if (reportButton) {
    reportButton.addEventListener("click", exportReport);
}

function updateClock() {
    if (elements.clock) {
        elements.clock.textContent = new Date().toLocaleTimeString();
    }
}

updateDashboard();
updateCharts();
updateClock();
window.setInterval(simulateCrane, 5000);
window.setInterval(updateClock, 1000);
