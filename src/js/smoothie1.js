let table = [];
//verifier la taille 
let ancienneValeur = 0;
setInterval(function() {
		fetch("https://airqino-api.magentalab.it/getCurrentValues/SMART188", {
			method: "get"
		}).then((response) => {
			response.json().then((data) => {
				let size = data.values.length;
				if(size > ancienneValeur) {
					for(let i = 0; i < size; i++) {
						table.push(new TimeSeries())
						ancienneValeur = size;
						//console.log("go");
					}
					
					// Création des divs basées sur les données
					let legendDiv = document.getElementById('legend-graphe1');
					let usedColors = {}; // Pour stocker les couleurs déjà utilisées
					for(let i = 0; i < table.length; i++) {
						let color, sensorType;
						// Générer une couleur unique pour chaque série
						do {
							color = generateRandomColorWithoutGreen();
						} while (usedColors[color]);
						// Stocker la couleur utilisée
						usedColors[color] = true;
						sensorType = data.values[i]["sensor"];
						unitType = data.values[i]["unit"];
						// Création de la div
						let div = document.createElement('div');
						div.textContent = sensorType+" "+unitType;
						div.style.backgroundColor = color;
						div.style.color = 'white'; 
						div.style.width = 'auto';
						div.style.height = '30px';
						
						div.style.display = 'inline-block';
						div.style.marginRight = '5px';
						// Ajout de la div à la légende
						legendDiv.appendChild(div);
						console.log(`Data for series ${i}: Sensor = ${sensorType}, Color = ${color}`);
						console.log(`Color for series ${i}: ${color}`);
						chart.addTimeSeries(table[i], {
							strokeStyle: color,
							lineWidth: 2
						});
					}
					// Fonction pour générer une couleur aléatoire sans nuances de vert
					function generateRandomColorWithoutGreen() {
						let random_r = Math.random() * 255;
						let random_g = Math.random() * 100; // Ajustez la plage pour exclure les nuances de vert
						let random_b = Math.random() * 255;
						return `rgb(${random_r}, ${random_g}, ${random_b})`;
					}
				}
			});
		});
	}, 1000)
	//ajouté des valeurs aleatoires
setInterval(function() {
	fetch("https://airqino-api.magentalab.it/getCurrentValues/SMART188", {
		method: "get"
	}).then((response) => {
		response.json().then((data) => {
			// console.log(data.values);
			for(let i = 0; i < table.length; i++) {
				table[i].append(Date.now(), data.values[i].value);
			}
		});
	});
}, 3000);
var chart = new SmoothieChart({
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
var canvas = document.getElementById('smoothie-chart');
chart.streamTo(canvas, 3000);