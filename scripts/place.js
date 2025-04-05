function calculateWindChill(tempC, windKmh) {
    return (
        13.12 + 0.6215 * tempC - 11.37 * Math.pow(windKmh, 0.16) + 0.3965 * tempC * Math.pow(windKmh, 0.16)
    ).toFixed(1);
}

document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.getElementById("year");
    const lastModSpan = document.getElementById("last-mod");
    const windChillSpan = document.getElementById("wind-chill");
    const temp = parseFloat(document.getElementById("temperature").textContent);
    const wind = parseFloat(document.getElementById("wind-speed").textContent);

    yearSpan.textContent = new Date().getFullYear();

    lastModSpan.textContent = document.lastModified;

    if (temp <= 10 && wind > 4.8) {
        windChillSpan.textContent = calculateWindChill(temp, wind) + "°C";
    } else {
        windChillSpan.textContent = "N/A";
    }
});