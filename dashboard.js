// Declare variables that will be modified
var x_accel = [];
var y_accel = [];
var z_accel = [];
var chart;
var x_axis = 0;
var dataLength = 30;
var totals = [0, 0, 0];

function getStream() {
  // Get elements for mean updating
  var xmean = document.getElementById("meanx");
  var ymean = document.getElementById("meany");
  var zmean = document.getElementById("meanz");

  // pull in id and token from input elements
  var device_id = document.getElementById("deviceid").value;
  var access_token = document.getElementById("accesstoken").value;
  var accel_url = "https://api.particle.io/v1/devices/" + device_id + "/events?access_token=" + access_token;

  // Create EventSource at Photon endpoint
  var accel_source = new EventSource("https://api.particle.io/v1/devices/" + device_id + "/events?access_token=" + access_token);

  // Listen for accel event in order to update chart and means
  accel_source.addEventListener("accel", function(resp) {
    // Parse data, and add it to each array
    var accel_list = (JSON.parse(resp.data).data).split(" ");
    x_accel.push({
      x: x_axis,
      y: parseInt(accel_list[0])
    });
    y_accel.push({
      x: x_axis,
      y: parseInt(accel_list[1])
    });
    z_accel.push({
      x: x_axis,
      y: parseInt(accel_list[2])
    });
    // Making sure that the chart shifts when values go past
    if (x_accel.length > dataLength) {
      x_accel.shift();
    }
    // increment the x axis and add values to each total for mean calculation
    ++x_axis;
    totals[0] += parseInt(accel_list[0]);
    totals[1] += parseInt(accel_list[1]);
    totals[2] += parseInt(accel_list[2]);

    // Update each mean element with the average
    xmean.innerHTML = (totals[0] / x_accel.length).toFixed(2);
    ymean.innerHTML  = (totals[1] / y_accel.length).toFixed(2);
    zmean.innerHTML  = (totals[2] / z_accel.length).toFixed(2);

    // Re-render the chart to live-update
    chart.render();
  }, false);
}

window.onload = function () {
  // Create CanvasJS chart with basic styling
  chart = new CanvasJS.Chart("chartContainer",{
    title :{
      text: "Photon Accelerometer"
    },
    legend:{
		  verticalAlign: "center",
			horizontalAlign: "right"
		},
    data: [{
      type: "line",
      showInLegend: true,
      name: "X Accel",
      dataPoints: x_accel
    },
    {
      type: "line",
      showInLegend: true,
      name: "Y Accel",
      dataPoints: y_accel
    },
    {
      type: "line",
      showInLegend: true,
      name: "Z Accel",
      dataPoints: z_accel
    }]
  });

  // Add event listener to home page button to set off chart creation
  document.getElementById("photon").addEventListener("click", getStream);
};
