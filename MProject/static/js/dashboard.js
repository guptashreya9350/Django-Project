const html = document.documentElement;
const body = document.body;
const menuLinks = document.querySelectorAll(".admin-menu a");
const collapseBtn = document.querySelector(".admin-menu .collapse-btn");
const toggleMobileMenu = document.querySelector(".toggle-mob-menu");
const switchInput = document.querySelector(".switch input");
const switchLabel = document.querySelector(".switch label");
const switchLabelText = switchLabel.querySelector("span:last-child");
const collapsedClass = "collapsed";
const lightModeClass = "light-mode";

/* go to the priveous page */
function goBack() {
  window.location.href = "http://127.0.0.1:8000/dashboard#account";
}

/*TOGGLE HEADER STATE*/
collapseBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default form submission behavior
  body.classList.toggle(collapsedClass);
  this.getAttribute("aria-expanded") == "true" ?
    this.setAttribute("aria-expanded", "false") :
    this.setAttribute("aria-expanded", "true");
  this.getAttribute("aria-label") == "collapse menu" ?
    this.setAttribute("aria-label", "expand menu") :
    this.setAttribute("aria-label", "collapse menu");
});

/*TOGGLE MOBILE MENU*/
toggleMobileMenu.addEventListener("click", function () {
  body.classList.toggle("mob-menu-opened");
  this.getAttribute("aria-expanded") == "true" ?
    this.setAttribute("aria-expanded", "false") :
    this.setAttribute("aria-expanded", "true");
  this.getAttribute("aria-label") == "open menu" ?
    this.setAttribute("aria-label", "close menu") :
    this.setAttribute("aria-label", "open menu");
});

/*SHOW TOOLTIP ON MENU LINK HOVER*/
for (const link of menuLinks) {
  link.addEventListener("mouseenter", function () {
    if (
      body.classList.contains(collapsedClass) &&
      window.matchMedia("(min-width: 768px)").matches
    ) {
      const tooltip = this.querySelector("span").textContent;
      this.setAttribute("title", tooltip);
    } else {
      this.removeAttribute("title");
    }
  });
}

/*TOGGLE LIGHT/DARK MODE*/
if (localStorage.getItem("dark-mode") === "false") {
  html.classList.add(lightModeClass);
  switchInput.checked = false;
  switchLabelText.textContent = "Light";
}

switchInput.addEventListener("input", function () {
  html.classList.toggle(lightModeClass);
  if (html.classList.contains(lightModeClass)) {
    switchLabelText.textContent = "Light";
    localStorage.setItem("dark-mode", "false");
  } else {
    switchLabelText.textContent = "Dark";
    localStorage.setItem("dark-mode", "true");
  }
});

/* DASHBOARD CARD SWITCHING */

function openLinks(evt, menuname) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("page-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(menuname).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();


/* When the user clicks on the button, 
    toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

/*----------------------------------- pie chart console --------------------------------*/


// Fetch chart data via AJAX
fetch('/get-chart-data/')
.then(response => response.json())
.then(data => {
    var chart = am4core.create("chartdiv", am4charts.PieChart);
    chart.data = data;

    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "qty";
    pieSeries.dataFields.category = "iname";
    pieSeries.labels.template.disabled = true;

    chart.radius = am4core.percent(95);

    // Create custom legend
    chart.events.on("ready", function (event) {
        // populate our custom legend when chart renders
        chart.customLegend = document.getElementById('legend');
        pieSeries.dataItems.each(function (row, i) {
            var color = chart.colors.getIndex(i);
            var percent = Math.round(row.values.value.percent * 100) / 100;
            var value = row.value;
            legend.innerHTML += '<div class="legend-item" id="legend-item-' + i + '" onclick="toggleSlice(' + i + ');" onmouseover="hoverSlice(' + i + ');" onmouseout="blurSlice(' + i + ');" style="color: ' + color + ';"><div class="legend-marker" style="background: ' + color + '"></div>' + row.category + '<div class="legend-value">' + value + ' | ' + percent + '%</div></div>';
        });
    });
})
.catch(error => console.error('Error fetching chart data:', error));


/*--------------------------------- gann wheel calculation --------------------------------*/

function calculate() {

  var inputltp = document.getElementById("gann-wheel-calculate").value;
  document.getElementById("ltp").textContent = (inputltp);

  /* BUY AT */

  var c = Math.sqrt((parseFloat(inputltp))) + (0.125); c = c * c; c = Math.round(c * 100.0) / 100.0;
  var buyat = c.toFixed(2).toString();
  document.getElementById("buy-at").textContent = buyat;

  /* ---------------------------------------------------------- */

  /* BUY TARGET 1 */

  var c = Math.sqrt((parseFloat(inputltp))) + (0.25); c = c * c; c = Math.round(c * 100.0) / 100.0;
  var b1 = c.toFixed(2).toString();
  document.getElementById("buy-Target-1").textContent = b1;
  document.getElementById('bt1').innerHTML = b1;

  /* ---------------------------------------------------------- */

  /* BUY TARGET 2 */

  var c = Math.sqrt((parseFloat(inputltp))) + (0.375); c = c * c; c = Math.round(c * 100.0) / 100.0;
  var b2 = c.toFixed(2).toString();
  document.getElementById("buy-Target-2").textContent = b2;
  document.getElementById('bt2').innerHTML = b2;

  /* ---------------------------------------------------------- */

  /* BUY TARGET 3 */

  var c = Math.sqrt((parseFloat(inputltp))) + (0.50); c = c * c; c = Math.round(c * 100.0) / 100.0;
  var b3 = c.toFixed(2).toString();
  document.getElementById("buy-Target-3").textContent = b3
  document.getElementById('bt3').innerHTML = b3;

  /* ---------------------------------------------------------- */

  /* SELL AT */

  var c = Math.sqrt((parseFloat(inputltp))) - (0.125); c = c * c; c = Math.round(c * 100.0) / 100.0;
  var sellat = c.toFixed(2).toString();
  document.getElementById("sell-at").textContent = sellat;

  /* ---------------------------------------------------------- */

  /* SELL TARGET 1 */

  var c = Math.sqrt((parseFloat(inputltp))) - (0.25); c = c * c; c = Math.round(c * 100.0) / 100.0;
  var s1 = c.toFixed(2).toString();
  document.getElementById("sell-Target-1").textContent = s1;
  document.getElementById('st1').innerHTML = s1;

  /* ---------------------------------------------------------- */

  /* SELL TARGET 2 */

  var c = Math.sqrt((parseFloat(inputltp))) - (0.375); c = c * c; c = Math.round(c * 100.0) / 100.0;
  var s2 = c.toFixed(2).toString();
  document.getElementById("sell-Target-2").textContent = s2;
  document.getElementById('st2').innerHTML = s2;

  /* ---------------------------------------------------------- */

  /* SELL TARGET 3 */

  var c = Math.sqrt((parseFloat(inputltp))) - (0.50); c = c * c; c = Math.round(c * 100.0) / 100.0;
  var s3 = c.toFixed(2).toString();
  document.getElementById("sell-Target-3").textContent = s3
  document.getElementById('st3').innerHTML = s3;

  /* ---------------------------------------------------------- */
}


/*--------------------------------- gann SQUARE calculation --------------------------------*/

function calculateS() {

  var inputlow = document.getElementById("low-number").value;
  var inputhigh = document.getElementById("high-number").value;

  document.getElementById("resistance-4").textContent = (inputhigh);
  document.getElementById("support-4").textContent = (inputlow);

  var l = parseFloat(inputlow);
  var h = parseFloat(inputhigh);
  var r50 = (l + h) / 2;

  /* ---------------------------------------------------------- */

  /* RESISTANCE */

  var r75 = (h + r50) / 2;
  var r62 = (r50 + r75) / 2;
  var r87 = (r75 + h) / 2;
  var r125 = (2 * h) - r75;
  var r112 = (h + r125) / 2;

  var r1 = r62.toFixed(3).toString();
  var r2 = r75.toFixed(3).toString();
  var r3 = r87.toFixed(3).toString();
  var r5 = r112.toFixed(3).toString();
  var r6 = r125.toFixed(3).toString();

  document.getElementById("resistance-1").textContent = (r1);
  document.getElementById("resistance-2").textContent = (r2);
  document.getElementById("resistance-3").textContent = (r3);
  document.getElementById("resistance-5").textContent = (r5);
  document.getElementById("resistance-6").textContent = (r6);


  /* ---------------------------------------------------------- */

  /* SUPPORT */

  var s25 = (l + r50) / 2;
  var s37 = (s25 + r50) / 2;
  var s12 = (l + s25) / 2;
  /*
  var s5_1 = l- (s12 - l);
  var s6_1 = l - 2 * (s12 -l); */

  var s5_1 = l - (l * 0.125);
  var s6_1 = l - (l * 0.25);


  var s1 = s37.toFixed(3).toString();
  var s2 = s25.toFixed(3).toString();
  var s3 = s12.toFixed(3).toString();
  var s5 = s5_1.toFixed(3).toString();
  var s6 = s6_1.toFixed(3).toString();

  document.getElementById("support-1").textContent = (s1);
  document.getElementById("support-2").textContent = (s2);
  document.getElementById("support-3").textContent = (s3);
  document.getElementById("support-5").textContent = (s5);
  document.getElementById("support-6").textContent = (s6);

}

/* ---------------------------------------------------------- */
