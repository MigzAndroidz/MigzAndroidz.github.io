function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark");
    const h1 = document.querySelector("h1");
    h1.classList.toggle("dark");
    const count = document.querySelector("#count");
    count.classList.toggle("dark");
  }

  setInterval(() => {
    const date = new Date(new Date().getFullYear(), 4, 25);
    const age = date.getFullYear() - 2006;
    var bSec = Math.floor((date.getTime() - new Date())/1000);
    var bMin = Math.floor(bSec/60);
    var bHour = Math.floor(bMin/60);
    var bDay = Math.floor(bHour/24);
    bHour = bHour-(bDay*24);
    bMin = bMin-(bDay*24*60)-(bHour*60);
    bSec = bSec-(bDay*24*60*60)-(bHour*60*60)-(bMin*60);
    document.getElementById("count").innerHTML = `${bDay}d, ${bHour}h, ${bMin}m, ${bSec}s`;
  }, 1000)
