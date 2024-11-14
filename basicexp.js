function calculateDensity() {
    var mass = parseFloat(document.getElementById("mass").value);
    var volume = parseFloat(document.getElementById("volume").value);
    if (mass && volume) {
        var density = mass / volume;
        document.getElementById("densityResult").innerText = "Density: " + density.toFixed(2) + " g/cm³";
    } else {
        document.getElementById("densityResult").innerText = "Please enter valid values.";
    }
}

function determinePH() {
    var pH = parseFloat(document.getElementById("solutionPH").value);
    if (pH) {
        document.getElementById("pHResult").innerText = "pH Level: " + pH.toFixed(1);
    } else {
        document.getElementById("pHResult").innerText = "Please enter a valid pH value.";
    }
}

function checkBoilingPoint() {
    var temperature = parseFloat(document.getElementById("temperature").value);
    if (temperature === 100) {
        document.getElementById("boilingPointResult").innerText = "The boiling point of water is 100°C.";
    } else {
        document.getElementById("boilingPointResult").innerText = "The boiling point of water is not 100°C.";
    }
}

function calculateBaseVolume() {
    var acidAmount = parseFloat(document.getElementById("acidAmount").value);
    var acidConcentration = parseFloat(document.getElementById("acidConcentration").value);
    var baseConcentration = parseFloat(document.getElementById("baseConcentration").value);
    if (acidAmount && acidConcentration && baseConcentration) {
        var baseVolume = (acidAmount * acidConcentration) / baseConcentration;
        document.getElementById("baseVolumeResult").innerText = "Base Volume Required: " + baseVolume.toFixed(2) + " mL";
    } else {
        document.getElementById("baseVolumeResult").innerText = "Please enter valid values.";
    }
}
