
function search(){
    var movie_name = document.getElementById('movie_input').value
    console.log(movie_name)
    var request = new XMLHttpRequest()
    var site = 'https://api.sumanjay.cf/torrent/?query='
    site = site.concat(movie_name)
    console.log(site)
    request.open('GET',site,true)

    request.onload = function () {
        // Begin accessing JSON data here
        var opt = $('#typ').find(":selected").text();
        console.log("selected " + opt)
        var table = document.getElementById("movietable");
        table.innerHTML = "";
        var row = table.insertRow(0)
        var srno = row.insertCell(0);
        var name = row.insertCell(1);
        var size = row.insertCell(2);
        var seed = row.insertCell(3);
        var peer = row.insertCell(4);
        var play = row.insertCell(5);
        srno.innerHTML = "SR No";
        name.innerHTML = "Movie Name";
        size.innerHTML = "Size";
        seed.innerHTML = "Seeds";
        peer.innerHTML = "Peers";
        play.innerHTML = "Play";
        var data = JSON.parse(this.response)
        // var xy = data[0]
        // console.log(xy)
        // console.log(xy.type)
        console.log(data)
        
      
        if (request.status >= 200 && request.status < 400) {
          var i = 1
          var j = 1
          for(i=0;i<data.length;i++) {
            var result = data[i]
            console.log(result.name + result.type.search(opt))
            if(opt === "Movie"){
              if(result.nsfw === true){
                continue;
              }
              if(result.type.search(opt) === -1){
                
                continue;
              }
            }
            if(opt == "TV Series"){
              if(result.type.search("TV") === -1){
                continue;
              }
            }
            if(opt === "Music"){
              if(result.type.search(opt) === -1){
                continue;
              }
            }
            if(opt === "NSFW"){
              if(result.nsfw === false){
                continue;
              }
            }
            var table = document.getElementById("movietable");
            var row = table.insertRow(j);
            var srno = row.insertCell(0);
            var name = row.insertCell(1);
            var size = row.insertCell(2);
            var seed = row.insertCell(3);
            var peer = row.insertCell(4);
            var playbtn = row.insertCell(5);
            var mag = row.insertCell(6);
            row.setAttribute("id",j);
            srno.innerHTML = j;
            name.innerHTML = result.name;
            size.innerHTML = result.size;
            seed.innerHTML = result.seeder;
            peer.innerHTML = result.leecher;
            mag.innerHTML = result.magnet;
            mag.style.display = "none";
            playbtn.innerHTML = "<input type='button' value='play/' id='\j\' class='btnEdits'/>"
            console.log(playbtn)
            playbtn.addEventListener('click',function(){  
              gein($(this)[0].parentNode.children[6].textContent)
            });
            j = j+1;
          }
        } else {
          console.log('error')
        }
    }
    request.send()
}
function gein(m){
  sessionStorage.setItem("magnet",m);
  window.location.href="./watchmovie.html";
}
