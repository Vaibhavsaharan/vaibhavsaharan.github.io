window.$ = window.jQuery = require('jquery')
if(document.URL.search("public") === -1){
  
  window.onload = function start() {
      navbar.classList.remove("showit");
      navbar.classList.add("normal");
      window.scroll(0,0);
      console.log("started 1.7");

  }
  window.onscroll = function() {myFunction()};
  function openWin1() {
    window.open("https://github.com/Vaibhavsaharan/RTOMS");
  }
  function openWin2() {
    window.open("https://github.com/Vaibhavsaharan/Unified-Interface-for-CFD-Softwares");
  }


  function myFunction() {
      console.log(window.pageYOffset);
    if (window.pageYOffset < 30) {
      navbar.classList.remove("showit");
      navbar.classList.add("normal");
      
    } else if(window.pageYOffset >= 30) {
      navbar.classList.add("showit")
      navbar.classList.remove("normal")
    }
  } 
}