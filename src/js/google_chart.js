function affichage_form1() {
	document.getElementById("form1").style.display = "block";
	document.getElementById("form2").style.display = "none";
	document.getElementById("myChart_2dates").style.display = "none";
}

function affichage_form2() {
	document.getElementById("form2").style.display = "block";
	document.getElementById("form1").style.display = "none";
	document.getElementById("myChartGoogle").style.display = "none";
}

function info_2dates() {
	document.getElementById("loadingIcon2").style.display = "block";
	let debut = document.getElementById("date_debut").value;
	let fin = document.getElementById("date_fin").value;
	let station_select = document.getElementById("valeur_station").value;
	console.log(debut);
	console.log(fin);
	console.log(station_select);
	let graphDiv2 = document.getElementById("myChart_2dates");
	graphDiv2.style.display = "block";
	fetch(`https://airqino-api.magentalab.it/getSingleDay/${station_select}/${debut}`, {
		method: "get"
	}).then((response) => {
		if(response.status != 200){
			alert(res.statusText);
			return
		}
		response.json().then((data) => {
			if(data.raw_data.length == 0) {
				alert("absence de données");
				document.getElementById("loadingIcon2").style.display = "none";
				return;
			}

			document.getElementById("loadingIcon2").style.display = "none";
			google.charts.load('current', {
				packages: ['corechart']
			});
			google.charts.setOnLoadCallback(drawChart2);

			function drawChart2() {
				//update data 
				const AUX3 = new google.visualization.DataTable();
				let test1 = [...data.raw_data.map((e) => {
					let nonNull = Object.values(e).map((el) => {
						return el ?? 0;
					})
					return nonNull;
				})];
				test1 = test1.map((e) => {
					return e.reverse();
				})
				AUX3.addColumn('string', 'Date');
				AUX3.addColumn('number', 'rh');
				AUX3.addColumn('number', 'pm25');
				AUX3.addColumn('number', 'pm10');
				AUX3.addColumn('number', 'o3');
				AUX3.addColumn('number', 'no2');
				AUX3.addColumn('number', 'lon');
				AUX3.addColumn('number', 'lat');
				AUX3.addColumn('number', 'intT');
				AUX3.addColumn('number', 'extT');
				AUX3.addColumn('number', 'co');
				AUX3.addColumn('number', 'AUX3');
				AUX3.addColumn('number', 'AUX2_INPUT');
				AUX3.addColumn('number', 'AUX2');
				AUX3.addColumn('number', 'AUX1_INPUT');
				AUX3.addColumn('number', 'AUX1');
				AUX3.addRows(
						[...test1])
					// Set Options
				const options = {
					hAxis: {
						title: 'Date'
					},
					vAxis: {
						title: 'Valeur'
					},
					legend: 'true',
				};
				// Draw Chart
				const chart = new google.visualization.LineChart(document.getElementById('myChart_2dates'));
				chart.draw(AUX3, options);
			}
		});
	})
}

function info_date() {
	document.getElementById("loadingIcon").style.display = "block";
	let debut = document.getElementById("date_jour").value;
	let station_select = document.getElementById("station_selection").value;
	var graphDiv = document.getElementById("myChartGoogle");
	graphDiv.style.display = "block";
	fetch(`https://airqino-api.magentalab.it/getSingleDay/${station_select}/${debut}`, {
		method: "get"
	}).then((response) => {
		if(response.status != 200){
			alert(res.statusText);
			return
		}
		response.json().then((data) => {
			if(data.raw_data.length == 0) {
				alert("absence de données");
				document.getElementById("loadingIcon").style.display = "none";

				return;
			}
			document.getElementById("loadingIcon").style.display = "none";
			google.charts.load('current', {
				packages: ['corechart']
			});
			google.charts.setOnLoadCallback(drawChart);

			function drawChart() {
				//update data 
				const AUX3 = new google.visualization.DataTable();
				let test1 = [...data.raw_data.map((e) => {
					let nonNull = Object.values(e).map((el) => {
						return el ?? 0;
					})
					return nonNull;
				})];
				test1 = test1.map((e) => {
					return e.reverse();
				})
				AUX3.addColumn('string', 'Date');
				AUX3.addColumn('number', 'rh');
				AUX3.addColumn('number', 'pm25');
				AUX3.addColumn('number', 'pm10');
				AUX3.addColumn('number', 'o3');
				AUX3.addColumn('number', 'no2');
				AUX3.addColumn('number', 'lon');
				AUX3.addColumn('number', 'lat');
				AUX3.addColumn('number', 'intT');
				AUX3.addColumn('number', 'extT');
				AUX3.addColumn('number', 'co');
				AUX3.addColumn('number', 'AUX3');
				AUX3.addColumn('number', 'AUX2_INPUT');
				AUX3.addColumn('number', 'AUX2');
				AUX3.addColumn('number', 'AUX1_INPUT');
				AUX3.addColumn('number', 'AUX1');
				AUX3.addRows(
						[...test1])
					// Set Options
				const options = {
					hAxis: {
						title: 'Date'
					},
					vAxis: {
						title: 'Valeur'
					},
					legend: 'true',
				};
				// Draw Chart
				const chart = new google.visualization.LineChart(document.getElementById('myChartGoogle'));
				chart.draw(AUX3, options);
			}
		});
	})
}