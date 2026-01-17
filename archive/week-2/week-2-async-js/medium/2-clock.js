function formatTime(date, use24Hours = true) {
    const hours = use24Hours ? date.getHours() : date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const ampm = use24Hours ? "" : date.getHours() >= 12 ? "PM" : "AM";

    return `${hours.toString().padStart(2, "0")}:${minutes}:${seconds}${
        ampm ? " " + ampm : ""
    }`;
}

function displayTime() {
    const now = new Date();
    const time24 = formatTime(now);
    const time12 = formatTime(now, false);
    console.clear();
    console.log(`24-Hour format: ${time24}`);
    console.log(`12-Hour format: ${time12}`);
}

function startClock() {
    displayTime();
    setInterval(displayTime, 1000);
}

startClock();
