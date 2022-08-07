const upButton = document.getElementById("cntUp");
const downButton = document.getElementById("cntDown");
const resetButton = document.getElementById("reset");
const currentCnt = document.getElementById("currentCnt");
const currentProb = document.getElementById("prob");
const currentScore = document.getElementById("sco");
const currentRand = document.getElementById("rand");

let omote = 0;
let ura = 0;
let Prob = 0;
var score = [];
let dif = 0;


upButton.addEventListener("click", () => {
  omoteevent();
  calrandomrate();
  updateChart()
});

downButton.addEventListener("click", () => {
  uraevent();
  calrandomrate();
  updateChart()
});

document.addEventListener('keydown', function (e) {
    let output = ``;
  if (e.code == 'ArrowLeft') {
    omoteevent();
    calrandomrate();
    updateChart()
  } 
  else if (e.code == 'ArrowRight') {
    uraevent();
    calrandomrate();
    updateChart()
  }
})

resetButton.addEventListener("click", () => {
  omote = 0;
  ura = 0;
  Prob = 0;
  score = [0];
  dif = 0
  currentCnt.innerHTML = omote + ura ;
  currentProb.innerHTML = Prob;
//      currentScore.innerHTML = score;
  score = [];
  currentRand.innerHTML = 0;
  myLineChart.data.labels = [0];
  myLineChart.data.datasets[0].data = [0];
  myLineChart.data.datasets[1].data = [0];
  updateChart()
});

function omoteevent(){
  if(score.slice(-1)[0] == 0){
    dif++;
  };
  omote++;
  Prob = omote / (omote + ura);
  score.push(1);
  currentCnt.innerHTML = omote+ura;
  currentProb.innerHTML = Math.round(100*Prob);
//      currentScore.innerHTML = score[0];
};

function uraevent(){
  if(score.slice(-1)[0] == 1){
    dif++;
  };
  ura++;
  Prob = omote / (omote + ura);
  score.push(0);
  currentCnt.innerHTML = omote + ura;
  currentProb.innerHTML = Math.round(100*Prob);
//      currentScore.innerHTML = score;
}

function calrandomrate(){
  currentRand.innerHTML = Math.round(100*dif/(omote + ura));
};

  
// chart.js
var ctx = document.getElementById('myChart').getContext('2d');
var myLineChart = new Chart(ctx, {
type: 'line',

  data: {
      labels: [0],
      datasets: [{
          label: "表が出る確率",
          data: [0],
          tension: 0,
          fill: false,
          borderColor: "red",
      },
      {
          label: "人間らしさ",
          data: [0],
          tension: 0,
          fill: false,
          borderColor: "blue",
      },
    ]
  },
  options: {
          title: {
              display: true,
              fontSize: 18,
              text: "経過の様子"
          },
          legend: {
              display: true,
          },
          scales: {
            yAxes:[
              {
                ticks:{
                  min:0,
                  max:1
                }
              }
            ]
          }
      }
});

function updateChart(){
  myLineChart.data.labels.push(omote+ura);
  myLineChart.data.datasets[0].data.push(Prob);
  myLineChart.data.datasets[1].data.push((dif/(omote + ura)));
  myLineChart.update();
}