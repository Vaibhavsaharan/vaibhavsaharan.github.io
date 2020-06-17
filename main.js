window.onload = function start() {
    navbar.classList.remove("showit");
    navbar.classList.add("normal");
    window.scroll(0,0);
    console.log("started");

}
window.onscroll = function() {myFunction()};

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