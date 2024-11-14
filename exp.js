function calculateHardness() {
    var edtaVolume = parseFloat(document.getElementById('edtaVolume').value);
    var edtaConcentration = parseFloat(document.getElementById('edtaConcentration').value);
    var waterSampleVolume = parseFloat(document.getElementById('waterSampleVolume').value);

    // Calculate initial hardness
    var hardness = (edtaVolume * edtaConcentration * 1000) / waterSampleVolume;
    document.getElementById('result1').innerText = `Hardness: ${hardness.toFixed(2)} ppm`;

    // Generate multiple data points to create a smooth curve (example data)
    var edtaVolumes = [];  // X-axis data (EDTA volume)
    var hardnessData = []; // Y-axis data (calculated hardness)
    
    for (var i = 1; i <= 10; i++) {
        var currentVolume = edtaVolume * i * 0.1; // Increase EDTA volume
        edtaVolumes.push(currentVolume.toFixed(2));
        var currentHardness = (currentVolume * edtaConcentration * 1000) / waterSampleVolume;
        hardnessData.push(currentHardness.toFixed(2));
    }

    // Get the canvas element for the chart
    var ctx = document.getElementById('hardnessChart').getContext('2d');

    // Destroy the old chart before creating a new one (if exists)
    if (window.hardnessChart instanceof Chart) {
        window.hardnessChart.destroy();
    }

    // Create a new line chart
    window.hardnessChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: edtaVolumes, // X-axis: EDTA volumes
            datasets: [{
                label: 'Hardness (ppm)',
                data: hardnessData, // Y-axis: Hardness calculated for each EDTA volume
                borderColor: 'rgba(75, 192, 192, 1)', // Line color
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Area fill color
                fill: true,
                tension: 0.4 // Creates a curvy line
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Volume of EDTA Used (mL)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Hardness (ppm)'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}


// Experiment 2: Alkalinity Calculation
function calculateAlkalinity() {
    var phenolVolume = parseFloat(document.getElementById('phenolVolume').value);
    var methylVolume = parseFloat(document.getElementById('methylVolume').value);
    var acidNormality = parseFloat(document.getElementById('acidNormality').value);
    var sampleVolume = parseFloat(document.getElementById('sampleVolume').value);

    var phenolAlkalinity = (phenolVolume * acidNormality * 1000) / sampleVolume;
    var methylAlkalinity = (methylVolume * acidNormality * 1000) / sampleVolume;

    document.getElementById('phenolAlkalinityResult').innerText = `P-Alkalinity: ${phenolAlkalinity.toFixed(2)} ppm`;
    document.getElementById('methylAlkalinityResult').innerText = `M-Alkalinity: ${methylAlkalinity.toFixed(2)} ppm`;

    // Destroy old chart if it exists
    if (window.alkalinityChart instanceof Chart) {
        window.alkalinityChart.destroy();
    }

    // Create new chart
    var ctx = document.getElementById('Alkalinity').getContext('2d');
    window.alkalinityChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['P-Alkalinity', 'M-Alkalinity'],
            datasets: [{
                label: 'Alkalinity (ppm)',
                data: [phenolAlkalinity, methylAlkalinity],
                backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1
            }]
        }
    });
}

// Experiment 3: Flash/Fire Point Calculation
function calculatePoints() {
    var flashPoint = parseFloat(document.getElementById('flashPoint').value);
    var firePoint = parseFloat(document.getElementById('firePoint').value);

    document.getElementById('result2').innerText = `Flash Point: ${flashPoint}°C, Fire Point: ${firePoint}°C`;

    // Destroy old chart if it exists
    if (window.flashFireChart instanceof Chart) {
        window.flashFireChart.destroy();
    }

    // Create new chart
    var ctx = document.getElementById('flashFireChart').getContext('2d');
    window.flashFireChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Flash Point', 'Fire Point'],
            datasets: [{
                label: 'Temperature (°C)',
                data: [flashPoint, firePoint],
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }]
        }
    });
}
// Experiment 4: Flash Point Calculation
function calculateFlashPoint() {
    var initialTemp = parseFloat(document.getElementById('initialTemp').value);
    var heatingRate = parseFloat(document.getElementById('heatingRate').value);
    var timeToFlash = parseFloat(document.getElementById('timeToFlash').value);

    // Calculate the final flash point temperature
    var flashPoint = initialTemp + (heatingRate * timeToFlash);
    document.getElementById('result3').innerText = `Flash Point: ${flashPoint.toFixed(2)}°C`;

    // Generate multiple data points to create a smooth curve (example data)
    var timeIntervals = [];  // X-axis data (time intervals)
    var flashPointData = []; // Y-axis data (calculated flash point at each time interval)

    // Create data points by incrementing time and calculating the flash point at each step
    for (var i = 1; i <= timeToFlash; i++) {
        var currentTime = i;
        timeIntervals.push(currentTime); // Add time interval to X-axis
        var currentFlashPoint = initialTemp + (heatingRate * currentTime);
        flashPointData.push(currentFlashPoint.toFixed(2)); // Add calculated flash point to Y-axis
    }

    // Get the canvas element for the chart
    var ctx = document.getElementById('flashPointChart').getContext('2d');

    // Destroy the old chart before creating a new one (if it exists)
    if (window.flashPointChart instanceof Chart) {
        window.flashPointChart.destroy();
    }

    // Create a new line chart
    window.flashPointChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeIntervals, // X-axis: Time intervals
            datasets: [{
                label: 'Flash Point (°C)',
                data: flashPointData, // Y-axis: Flash point temperature
                borderColor: 'rgba(153, 102, 255, 1)', // Line color
                backgroundColor: 'rgba(153, 102, 255, 0.2)', // Area fill color
                fill: true,
                tension: 0.4 // Creates a curvy line
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time (minutes)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Flash Point (°C)'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

// Declare global variables to hold the chart instances
let moistureChart = null;
let viscosityChart = null;
let anilinePointChart = null;

// Experiment 5: Moisture Content Calculation
function calculateMoisture() {
    var emptyCrucibleWeight = parseFloat(document.getElementById('emptyCrucibleWeight').value);
    var initialCoalWeight = parseFloat(document.getElementById('initialCoalWeight').value);
    var finalWeight = parseFloat(document.getElementById('finalWeight').value);

    var moistureContent = ((initialCoalWeight - finalWeight) / initialCoalWeight) * 100;
    document.getElementById('result4').innerText = `Moisture Content: ${moistureContent.toFixed(2)}%`;

    // Destroy the previous chart instance if it exists
    if (moistureChart instanceof Chart) {
        moistureChart.destroy();
    }

    // Create a new chart instance for moisture content
    var ctx = document.getElementById('moistureChart').getContext('2d');
    moistureChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Moisture Content'],
            datasets: [{
                label: 'Moisture Content (%)',
                data: [moistureContent],
                backgroundColor: 'rgba(255, 159, 64, 0.5)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            }]
        }
    });
}

// Experiment 6: Viscosity Calculation
function calculateViscosity() {
    var redwoodSeconds = parseFloat(document.getElementById('redwoodSeconds').value);
    var oilDensity = parseFloat(document.getElementById('oilDensity').value);

    // Calculate initial kinematic viscosity
    var kinematicViscosity = redwoodSeconds * oilDensity;
    document.getElementById('result5').innerText = `Kinematic Viscosity: ${kinematicViscosity.toFixed(2)} cSt`;

    // Generate multiple data points to create a smooth curve
    var timeIntervals = [];  // X-axis data (Redwood seconds)
    var viscosityData = [];  // Y-axis data (calculated kinematic viscosity)

    // Create data points by incrementing redwoodSeconds and calculating viscosity at each step
    for (var i = 1; i <= 10; i++) {
        var currentSeconds = redwoodSeconds * i * 0.1; // Incremental redwood seconds
        timeIntervals.push(currentSeconds.toFixed(2)); // Add each increment to X-axis
        var currentViscosity = currentSeconds * oilDensity;
        viscosityData.push(currentViscosity.toFixed(2)); // Add calculated viscosity to Y-axis
    }

    // Get the canvas element for the chart
    var ctx = document.getElementById('viscosityChart').getContext('2d');

    // Destroy the old chart before creating a new one (if it exists)
    if (window.viscosityChart instanceof Chart) {
        window.viscosityChart.destroy();
    }

    // Create a new line chart
    window.viscosityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeIntervals, // X-axis: Redwood seconds (time intervals)
            datasets: [{
                label: 'Kinematic Viscosity (cSt)',
                data: viscosityData, // Y-axis: Kinematic viscosity for each time interval
                borderColor: 'rgba(54, 162, 235, 1)', // Line color
                backgroundColor: 'rgba(54, 162, 235, 0.2)', // Area fill color
                fill: true,
                tension: 0.4 // Creates a curvy line
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Redwood Seconds'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Kinematic Viscosity (cSt)'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

// Experiment 7: Aniline Point Calculation
function calculateAnilinePoint() {
    var oilVolume = parseFloat(document.getElementById('oilVolume').value);
    var anilineVolume = parseFloat(document.getElementById('anilineVolume').value);
    var miscibilityTemp = parseFloat(document.getElementById('miscibilityTemp').value);

    document.getElementById('result6').innerText = `Aniline Point: ${miscibilityTemp}°C`;

    // Destroy the previous chart instance if it exists
    if (anilinePointChart instanceof Chart) {
        anilinePointChart.destroy();
    }

    // Create a new chart instance for aniline point
    var ctx = document.getElementById('anilinePointChart').getContext('2d');
    anilinePointChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Aniline Point'],
            datasets: [{
                label: 'Aniline Point (°C)',
                data: [miscibilityTemp],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        }
    });
}

// Declare a global variable to hold the chart instance
let penetrationChart = null;

// Experiment 8: Penetration Calculation
function calculateAverage() {
    // Get the values from the input fields
    var pen1 = parseFloat(document.getElementById("pen1").value);
    var pen2 = parseFloat(document.getElementById("pen2").value);
    var pen3 = parseFloat(document.getElementById("pen3").value);

    // Calculate the average penetration value
    var average = (pen1 + pen2 + pen3) / 3;

    // Display the result
    document.getElementById("result8").textContent = "Average Penetration: " + average.toFixed(2) + " mm";

    // Destroy the previous chart instance if it exists and is valid
    if (penetrationChart instanceof Chart) {
        penetrationChart.destroy();
    }

    // Create a new chart instance and assign it to the global variable
    var ctx = document.getElementById('penetrationChart').getContext('2d');
    penetrationChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Penetration Value 1', 'Penetration Value 2', 'Penetration Value 3'],
            datasets: [{
                label: 'Penetration Values (mm)',
                data: [pen1, pen2, pen3],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
