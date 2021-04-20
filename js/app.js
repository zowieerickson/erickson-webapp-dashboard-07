const alert = document.querySelector("#alert");
const trafficCanvas = document.querySelector("#traffic-chart");
const dailyCanvas = document.querySelector("#daily-chart");
const mobileCanvas = document.querySelector("#mobile-chart");

alert.innerHTML = `
<div class="alert-banner">
    <p><strong>Alert:</strong> You have <strong>6</strong> overdue tasks to complete</p>
    <p class="alert-banner-close">x</p>
</div>
`;

alert.addEventListener("click", (e) => {
  const element = e.target;
  if (element.classList.contains("alert-banner-close")) {
    alert.style.display = "none";
  }
});

// LINE CHART ------------------------------------------

let trafficData = {
  labels: [
    "16-22",
    "23-29",
    "30-5",
    "6-12",
    "13-19",
    "20-26",
    "27-3",
    "4-10",
    "11-17",
    "18-24",
    "25-31",
  ],
  datasets: [
    {
      data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],

      hoverOffset: 4,
      borderWidth: 4,
      borderColor: "rgba(112, 104, 201, .5)",
    },
  ],
};

let trafficOptions = {
  backgroundColor: "rgba(112, 104, 201, .3)",
  tension: 0.3,
  padding: 5000,
  fill: true,
  aspectRatio: 2.5,
  animation: {
    duration: 0,
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

let trafficChart = new Chart(trafficCanvas, {
  type: "line",
  data: trafficData,
  options: trafficOptions,
});

// BAR CHART --------------------------------------------

let dailyData = {
  labels: ["S", "M", "T", "W", "T", "F", "S"],
  datasets: [
    {
      data: [75, 110, 170, 120, 230, 200, 100],
    },
  ],
};

let dailyOptions = {
  backgroundColor: "rgba(112, 104, 201, 1)",
  tension: 0.3,
  fill: true,
  aspectRatio: 2.5,
  animation: {
    duration: 0,
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

let dailyChart = new Chart(dailyCanvas, {
  type: "bar",
  data: dailyData,
  options: dailyOptions,
});

// PIE CHART --------------------------------------------

let mobileData = {
  labels: ["Desktop", "Tablet", "Phones"],
  datasets: [
    {
      data: [65, 20, 15],
    },
  ],
};

let mobileOptions = {
  backgroundColor: [
    "rgba(112, 104, 201, 1)",
    "rgb(114, 197, 114)",
    "rgba(44, 144, 221, .8)",
  ],
  hoverOffset: 4,
  borderWidth: 0,
  aspectRatio: 2.5,
  animation: {
    duration: 0,
  },
  plugins: {
    legend: {
      display: true,
      align: "center",
      position: "right",
    },
  },
};

let mobileChart = new Chart(mobileCanvas, {
  type: "doughnut",
  data: mobileData,
  options: mobileOptions,
});
