const chartheading = document.querySelector(".heading");
var stateinput= document.querySelector(".stateinput");
var stats = document.querySelector(".stats");
var stat0 = document.querySelector(".stat0");
var stat1 = document.querySelector(".stat1");
var stat2 = document.querySelector(".stat2");
var stat3 = document.querySelector(".stat3");
var stat4 = document.querySelector(".stat4");
var stat5 = document.querySelector(".stat5");
var stat6 = document.querySelector(".stat6");
var state = "";
var a;
var ctx = document.getElementById("chart");
var statearray=[];
var totalcases=[];

function returnText() {
  state = document.getElementById("userInput").value;
  statewise();
}

function statewise() {
    stateinput.style.display="block";
    stats.style.display="block";
  fetch("https://data.covid19india.org/v4/min/data.min.json")
    .then((res) => res.json())
    .then((statedata) => {
      a = statedata[`${state}`];
      console.log(a);
      stat0.textContent = `Last Updated: ${a.meta.last_updated}`;
      stat1.textContent = `Confirmed Cases: ${a.total.confirmed}`;
      stat2.textContent = `Deceased: ${a.total.deceased}`;
      stat3.textContent = `Recovered: ${a.total.recovered}`;
      stat4.textContent = `Tested: ${a.total.tested}`;
      stat5.textContent = `Dose1: ${a.total.vaccinated1}`;
      stat6.textContent = `Dose2: ${a.total.vaccinated2}`;
      getstatechart();
    });
}

function getstatechart() {
    chartheading.textContent=`Stats of ${state}`;
  var statechart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "Confirmed",
        "Deceased",
        "Recovered",
        "Tested",
        "Vaccination1",
        "Vaccination2",
      ],
      datasets: [
        {
          label: "Number of people",
          data: [
            a.total.confirmed,
            a.total.deceased,
            a.total.recovered,
            a.total.tested,
            a.total.vaccinated1,
            a.total.vaccinated2,
          ],
          backgroundColor: [
            "rgba(255, 99, 132)",
            "rgba(54, 162, 235)",
            "rgba(255, 206, 86)",
            "rgba(75, 192, 192)",
            "rgba(153, 102, 255)",
            "rgba(255, 159, 64)",
          ],

          borderColor: [
            "rgba(255,99,132,1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

function indiatotal() {
    stateinput.style.display="none";
    stats.style.display="block";
  fetch("https://data.covid19india.org/v4/min/data.min.json")
    .then((res) => res.json())
    .then((data) => {
        a=data.TT;
        stat0.textContent = `Last Updated: ${a.meta.last_updated}`;
      stat1.textContent = `Total Confirmed Cases: ${a.total.confirmed}`;
      stat2.textContent = `Total Deceased: ${a.total.deceased}`;
      stat3.textContent = `Total Recovered: ${a.total.recovered}`;
      stat4.textContent = `Total Tested: ${a.total.tested}`;
      stat5.textContent = `Total Dose1: ${a.total.vaccinated1}`;
      stat6.textContent = `Total Dose2: ${a.total.vaccinated2}`;
       
      statearray = [
        "AN","AP","AR","AS","BR","CH","CT","DL","DN","GA","GJ","HP","HR","JH","JK","KA","KL","LA","LD","MH",
        "ML","MN","MP","MZ","NL","OR","PB","PY","RJ","SK","TG","TN","TR","UP","UT","WB"];
      for (let i = 0; i < statearray.length; i++) {
        a= data[`${statearray[i]}`]
        totalcases[i]=a.total.confirmed;
      }
      getpiechart();
    });
}

function color(){
    return ('#' + Math.random().toString(16).slice(2,8));
}

function getpiechart(){
    chartheading.textContent="Distribution of cases in Indian states"
    var statepiechart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: statearray.map(state=>{return state;}),
          datasets: [
            {
              label: "Number of cases",
              data: totalcases.map(cases=>{return cases;}),
              backgroundColor: statearray.map(state=> color()),
              borderWidth: 0.5,
            },
          ],
        },
        options: {
          responsive: false,
          legend: {
            position: 'right',
          },
        },
      });
}

function starthide(){
    stateinput.style.display="none";
    stats.style.display="none";
}