const chartheading = document.querySelector(".heading");
var stateinput = document.querySelector(".stateinput");
var stats = document.querySelector(".stats");
var stat0 = document.querySelector(".stat0");
var stat1 = document.querySelector(".stat1");
var stat2 = document.querySelector(".stat2");
var stat3 = document.querySelector(".stat3");
var stat4 = document.querySelector(".stat4");
var stat5 = document.querySelector(".stat5");
var stat6 = document.querySelector(".stat6");
var chartstat= document.querySelector(".statchart");
var state = "";
var a;
var ctx1 = document.getElementById("chart");
var statearray = [];
var totalcases = [];
var myCanvas = document.getElementById("myCanvas");
myCanvas.width = 500;
myCanvas.height = 300;
var ctx = myCanvas.getContext("2d");
var traverse=0;

function drawLine(ctx, startX, startY, endX, endY, color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.restore();
}

function drawBar(
  ctx,
  upperLeftCornerX,
  upperLeftCornerY,
  width,
  height,
  color
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
  ctx.restore();
}

var statedata = {};

var Barchart = function (options) {
  this.options = options;
  this.canvas = options.canvas;
  this.ctx = this.canvas.getContext("2d");
  this.colors = options.colors;
  this.options.data={
    Confirmed: `${a.total.confirmed}`,
    Deceased: `${a.total.deceased}`,
    Recovered: `${a.total.recovered}`,
    Tested: `${a.total.tested}`,
    Dose1: `${a.total.vaccinated1}`,
    Dose2: `${a.total.vaccinated2}`,
  };
  var maxValue = 0;
    for (var categ in this.options.data) {
      maxValue = Math.max(maxValue, this.options.data[categ]);
    }
    this.options.data={
      Confirmed: `${a.total.confirmed}`/maxValue,
      Deceased: `${a.total.deceased}`/maxValue,
      Recovered: `${a.total.recovered}`/maxValue,
      Tested: `${a.total.tested}`/maxValue,
      Dose1: `${a.total.vaccinated1}`/maxValue,
      Dose2: `${a.total.vaccinated2}`/maxValue,
    };

  this.draw = function () {
    var maxValue = 0;
    for (var categ in this.options.data) {
      maxValue = Math.max(maxValue, this.options.data[categ]);
    }
    var canvasActualHeight = this.canvas.height - this.options.padding * 2;
    var canvasActualWidth = this.canvas.width - this.options.padding * 2;

    //drawing the grid lines
    var gridValue = 0;
    while (gridValue <= maxValue) {
      var gridY =
        canvasActualHeight * (1 - gridValue / maxValue) + this.options.padding;
      drawLine(
        this.ctx,
        0,
        gridY,
        this.canvas.width,
        gridY,
        this.options.gridColor
      );

      //writing grid markers
      this.ctx.save();
      this.ctx.fillStyle = this.options.gridColor;
      this.ctx.textBaseline = "bottom";
      this.ctx.font = "bold 10px Arial";
      this.ctx.fillText(gridValue, 10, gridY - 2);
      this.ctx.restore();

      gridValue += this.options.gridScale;
    }

    //drawing the bars
    var barIndex = 0;
    var numberOfBars = 6;
    var barSize = (canvasActualWidth)/numberOfBars;

    for (categ in this.options.data) {
      var val = this.options.data[categ];
      var barHeight = Math.round((canvasActualHeight * val) / maxValue);
      drawBar(
        this.ctx,
        this.options.padding + barIndex * barSize,
        this.canvas.height - barHeight - this.options.padding,
        barSize,
        barHeight,
        this.colors[barIndex % this.colors.length]
      );

      barIndex++;
    }

    //drawing series name
    this.ctx.save();
    this.ctx.textBaseline = "bottom";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "#000000";
    this.ctx.font = "bold 14px Arial";
    this.ctx.fillText(
      this.options.seriesName,
      this.canvas.width / 2,
      this.canvas.height
    );
    this.ctx.restore();

       //draw legend
   if(traverse==0){
   barIndex = 0;
   var legend = document.querySelector("legend[for='myCanvas']");
   var ul = document.createElement("ul");
   legend.append(ul);
   for (categ in this.options.data) {
     var li = document.createElement("li");
     li.style.listStyle = "none";
     li.style.borderLeft =
       "20px solid " + this.colors[barIndex % this.colors.length];
     li.style.padding = "5px";
     li.textContent = categ;
     ul.append(li);
     barIndex++;
     traverse++;
   }};
  };
};

function returnText() {
  state = document.getElementById("userInput").value;
  statewise();
}

function statewise() {
  ctx1.style.display="none";
  stateinput.style.display = "block";
  stats.style.display = "block";
  chartstat.style.display="block";
  fetch("https://data.covid19india.org/v4/min/data.min.json")
    .then((res) => res.json())
    .then((statedata) => {
      a = statedata[`${state}`];
      console.log(a);
      stat0.textContent = `${a.meta.last_updated}`;
      stat1.textContent = `${a.total.confirmed}`;
      stat2.textContent = `${a.total.deceased}`;
      stat3.textContent = `${a.total.recovered}`;
      stat4.textContent = `${a.total.tested}`;
      stat5.textContent = `${a.total.vaccinated1}`;
      stat6.textContent = `${a.total.vaccinated2}`;

      var myBarchart = new Barchart({
        canvas: myCanvas,
        seriesName: "NO OF PEOPLE",
        padding: 20,
        gridScale: 7,
        gridColor: "#eeeeee",
        data: statedata,
        colors: ["#a55ca5", "#67b6c7", "#bccd7a", "#eb9743", "#e83845", "#746ab0"],
      });
      
      myBarchart.draw();
    });
}

function indiatotal() {
  stateinput.style.display = "none";
  stats.style.display = "block";
  chartstat.style.display="block";
  fetch("https://data.covid19india.org/v4/min/data.min.json")
    .then((res) => res.json())
    .then((data) => {
      a = data.TT;
      stat0.textContent = `${a.meta.last_updated}`;
      stat1.textContent = `${a.total.confirmed}`;
      stat2.textContent = `${a.total.deceased}`;
      stat3.textContent = `${a.total.recovered}`;
      stat4.textContent = `${a.total.tested}`;
      stat5.textContent = `${a.total.vaccinated1}`;
      stat6.textContent = `${a.total.vaccinated2}`;

      statearray = [
        "AN",
        "AP",
        "AR",
        "AS",
        "BR",
        "CH",
        "CT",
        "DL",
        "DN",
        "GA",
        "GJ",
        "HP",
        "HR",
        "JH",
        "JK",
        "KA",
        "KL",
        "LA",
        "LD",
        "MH",
        "ML",
        "MN",
        "MP",
        "MZ",
        "NL",
        "OR",
        "PB",
        "PY",
        "RJ",
        "SK",
        "TG",
        "TN",
        "TR",
        "UP",
        "UT",
        "WB",
      ];
      for (let i = 0; i < statearray.length; i++) {
        a = data[`${statearray[i]}`];
        totalcases[i] = a.total.confirmed;
      }
      getpiechart();
    });
}

function color() {
  return "#" + Math.random().toString(16).slice(2, 8);
}

function getpiechart() {
  ctx1.style.display="block";
  chartheading.textContent = "Distribution of cases in Indian states";
  var statepiechart = new Chart(ctx1, {
    type: "pie",
    data: {
      labels: statearray.map((state) => {
        return state;
      }),
      datasets: [
        {
          label: "Number of cases",
          data: totalcases.map((cases) => {
            return cases;
          }),
          backgroundColor: statearray.map((state) => color()),
          borderWidth: 0.5,
        },
      ],
    },
    options: {
      responsive: false,
      legend: {
        position: "right",
      },
    },
  });
}

function starthide() {
  stateinput.style.display = "none";
  stats.style.display = "none";
  chartstat.style.display="none";
}
