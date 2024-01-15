let tables = [];
let ancienneValeur1 = 0;
setInterval(function() {
		fetch("https://airqino-api.magentalab.it/getCurrentValues/SMART189", {
			method: "get"
		}).then((response) => {
			response.json().then((data) => {
				let size = data.values.length;
				if(size > ancienneValeur1) {
					for(let i = 0; i < size; i++) {
						tables.push(new TimeSeries())
						ancienneValeur1 = size;
					}
					// Création des divs 
					let legendDiv = document.getElementById('legend-graphe2');
					let usedColors = {}; // stocker les couleurs déjà utilisées
					for(let i = 0; i < tables.length; i++) {
						let color, sensorType;
						// Générer une couleur unique pour chaque série
						do {
							color = generateRandomColor();
						} while (usedColors[color]);
						usedColors[color] = true;
						sensorType = data.values[i]["sensor"];
						unitType = data.values[i]["unit"];

						// Création de la div
						let div = document.createElement('div');
						div.textContent = sensorType+" "+unitType;
						div.style.color = 'white';
						div.style.backgroundColor = color;
						div.style.width = 'auto';
						div.style.height = '30px';
						div.style.display = 'inline-block';
						div.style.marginRight = '5px';
						// Ajout de  la légende
						legendDiv.appendChild(div);
						console.log(`Data for series ${i}: Sensor = ${sensorType}, Color = ${color}`);
						console.log(`Color for series ${i}: ${color}`);
						charts.addTimeSeries(tables[i], {
							strokeStyle: color,
							lineWidth: 2
						});
					}
					// Fonction pour générer une couleur aléatoire
					function generateRandomColor() {
						let random_r = Math.random() * 255;
						let random_g = Math.random() * 50;
						let random_b = Math.random() * 100;
						return `rgb(${random_r}, ${random_g}, ${random_b})`;
					}
				}
			});
		});
	}, 1000)
	//ajout des valeur aleatoires
setInterval(function() {
	fetch("https://airqino-api.magentalab.it/getCurrentValues/SMART189", {
		method: "get"
	}).then((response) => {
		response.json().then((data) => {
			for(let i = 0; i < tables.length; i++) {
				tables[i].append(Date.now(), data.values[i].value);
			}
		});
	});
}, 3000);
var charts = new SmoothieChart({
	grid: {
		strokeStyle: "rgb(0, 0, 0)",
		fillStyle: 'rgb(255,255,255)',
		lineWidth: 1,
		millisPerLine: 500,
		verticalSections: 3,
	},
	labels: {
		fillStyle: 'rgb(60, 0, 0)',
		showIntermediateLabels: true
	},
	tooltip: true,
	tooltipLine: {
		strokeStyle: '#bbbbbb'
	},
	maxValue: 100,
	minValue: -2,
	timestampFormatter: SmoothieChart.timeFormatter
});
var canvass = document.getElementById('smoothie-chart-smart189');
charts.streamTo(canvass, 3000);