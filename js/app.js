const bellIcon = document.querySelector("#bell");
const alertCanvas = document.querySelector("#alert");
const alertNotification2 = document.querySelector("#alert2");
const alertNotification3 = document.querySelector("#alert3");
const badgeAlert = document.querySelector(".badge");
const trafficCanvas = document.querySelector("#traffic-chart");
const dailyCanvas = document.querySelector("#daily-chart");
const mobileCanvas = document.querySelector("#mobile-chart");
const hourly = document.querySelector("#hourly");
const daily = document.querySelector("#daily");
const weekly = document.querySelector("#weekly");
const monthly = document.querySelector("#monthly");
const messageField = document.querySelector("#messageField");
const userField = document.querySelector("#userField");
const timezone = document.querySelector("#timezone");
const sendButton = document.querySelector("#send");
const emailCheckbox = document.querySelector("#email-checkbox");
const publicCheckbox = document.querySelector("#public-checkbox");
let checkboxes = document.querySelectorAll("input[type='checkbox']");
const saveButton = document.querySelector("#save");
const cancelButton = document.querySelector("#cancel");

// USING LOCAL STORAGE

// save cehckbox
function save() {
  localStorage.setItem("email-checkbox", emailCheckbox.checked);
  localStorage.setItem("public-checkbox", publicCheckbox.checked);
}

// loading
const checked1 = JSON.parse(localStorage.getItem("email-checkbox"));
const checked2 = JSON.parse(localStorage.getItem("public-checkbox"));
emailCheckbox.checked = checked1;
publicCheckbox.checked = checked2;

saveButton.addEventListener("click", (e) => {
  timezone.onchange = function () {
    lastSelected = timezone.options[timezone.selectedIndex].value;
    console.log(lastSelected);
    localStorage.setItem("timezone", lastSelected);
  };
});

// timezone localstorage
const timezoneOption = timezone.options[timezone.selectedIndex];
let lastSelected = localStorage.getItem("timezone");
if (lastSelected) {
  timezone.value = lastSelected;
}

// save timezone localstorage
timezone.onchange = function () {
  lastSelected = timezone.options[timezone.selectedIndex].value;
  console.log(lastSelected);
  saveButton.addEventListener("click", (e) => {
    localStorage.setItem("timezone", lastSelected);
  });
};

// remove localstorage
cancelButton.addEventListener("click", (e) => {
  localStorage.removeItem("timezone");
  localStorage.removeItem("email-checkbox");
  localStorage.removeItem("public-checkbox");
});

const userNames = ["Victoria Chambers", "Dale Byrd", "Dawn Wood", "Dan Oliver"];

hourly.addEventListener("click", (e) => {
  const element = e.target;
  if (element.classList.contains("traffic-nav-link")) {
    hourly.classList.add("active");
    daily.classList.remove("active");
    weekly.classList.remove("active");
    monthly.classList.remove("active");
  }
});

weekly.addEventListener("click", (e) => {
  const element = e.target;
  if (element.classList.contains("traffic-nav-link")) {
    weekly.classList.add("active");
    daily.classList.remove("active");
    hourly.classList.remove("active");
    monthly.classList.remove("active");
  }
});

daily.addEventListener("click", (e) => {
  const element = e.target;
  if (element.classList.contains("traffic-nav-link")) {
    daily.classList.add("active");
    weekly.classList.remove("active");
    hourly.classList.remove("active");
    monthly.classList.remove("active");
  }
});

monthly.addEventListener("click", (e) => {
  const element = e.target;
  if (element.classList.contains("traffic-nav-link")) {
    monthly.classList.add("active");
    daily.classList.remove("active");
    hourly.classList.remove("active");
    weekly.classList.remove("active");
  }
});

function closeAlert(e) {
  const element = e.target;
  if (element.classList.contains("alert-banner-close")) {
    alertCanvas.style.display = "none";
  }
}
function closeAlert2(e) {
  const element = e.target;
  if (element.classList.contains("alert-banner-close")) {
    alertNotification2.style.display = "none";
  }
}
function closeAlert3(e) {
  const element = e.target;
  if (element.classList.contains("alert-banner-close")) {
    alertNotification3.style.display = "none";
  }
}

alertCanvas.addEventListener("click", closeAlert);
alertNotification2.addEventListener("click", closeAlert2);
alertNotification3.addEventListener("click", closeAlert3);

alertCanvas.innerHTML = `
<div class="alert-banner">
    <p class="beware"><strong>Alert:</strong> You have <strong>6</strong> overdue tasks to complete</p>
    <p class="alert-banner-close">x</p>
</div>
`;

bellIcon.addEventListener("click", () => {
  badgeAlert.style.display = "none";
  alertNotification2.innerHTML = `
  <div class="alert-banner">
      <p><strong>Zowie Erickson</strong> has sent you a friend request.</p>
      <p class="alert-banner-close">x</p>
  </div>
  `;

  alertNotification3.innerHTML = `
  <div class="alert-banner">
      <p><strong>History 101</strong> exam results have been released.</p>
      <p class="alert-banner-close">x</p>
  </div>
  `;
});

sendButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (messageField.value == "") {
    alert("Message cannot be empty. 💬\nPlease add a message.");
  } else if (userField.value == "") {
    alert("User field cannot be empty. 👤\nFind a user.");
  } else if (
    userField.value.toUpperCase() !== "DAWN WOOD" &&
    userField.value.toUpperCase() !== "DAN OLIVER" &&
    userField.value.toUpperCase() != "DALE BYRD" &&
    userField.value.toUpperCase() != "VICTORIA CHAMBERS"
  ) {
    alert("Cannot find that user.\nPlease try again.");
  } else {
    userField.value = "";
    messageField.value = "";
    alert("Message has been sent. ✅");
  }
});

// GRAPHS

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
  // animation: {
  //   duration: 0,
  // },
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

function updateChartHourly() {
  trafficChart.data.datasets[0].data = [5, 10, 14, 4, 5, 2, 0, 12, 4, 10, 19];
  trafficChart.update();
}

function updateChartDaily() {
  trafficChart.data.datasets[0].data = [
    100,
    50,
    70,
    120,
    85,
    65,
    70,
    35,
    80,
    110,
    90,
  ];
  trafficChart.update();
}

function updateChartWeekly() {
  trafficChart.data.datasets[0].data = [
    300,
    220,
    130,
    200,
    150,
    250,
    375,
    297,
    255,
    370,
    400,
  ];
  trafficChart.update();
}

function updateChartMonthly() {
  trafficChart.data.datasets[0].data = [
    750,
    1250,
    1000,
    2000,
    1500,
    1750,
    1250,
    1850,
    2250,
    1500,
    2500,
  ];
  trafficChart.update();
}

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

// DOUGHNUT CHART --------------------------------------------

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

// AUTOCOMPLETE FORM
/// CITATION: https://www.w3schools.com/howto/howto_js_autocomplete.asp

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  let currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    let a,
      b,
      i,
      val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    let x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    const x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

autocomplete(document.getElementById("userField"), userNames);
