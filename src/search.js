
function search(){
    console.log("aya")
    var movie_name = document.getElementById('movie_input').value
    console.log(movie_name)
    var request = new XMLHttpRequest()
    var site = 'https://api.sumanjay.cf/torrent/?query='
    site = site.concat(movie_name)
    console.log(site)
    request.open('GET',site,true)

    request.onload = function () {
        // Begin accessing JSON data here
        console.log(this.response)
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
      
        if (request.status >= 200 && request.status < 400) {
            var i = 1
          data.forEach((result) => {
            var table = document.getElementById("movietable");
            var row = table.insertRow(i);
            var srno = row.insertCell(0);
            var name = row.insertCell(1);
            var size = row.insertCell(2);
            var seed = row.insertCell(3);
            var peer = row.insertCell(4);
            var playbtn = row.insertCell(5);
            row.setAttribute("id",i);
            srno.innerHTML = i;
            name.innerHTML = result.name;
            size.innerHTML = result.size;
            seed.innerHTML = result.seeder;
            peer.innerHTML = result.leecher;
            playbtn.innerHTML = "<input type='button' value='play' name='btnEdit' class='btnEdits'/>"
            playbtn.addEventListener('click',function(){
                clickk(result.magnet);
            });
            i = i+1;
          })
        } else {
          console.log('error')
        }
    }
    request.send()
}
function clickk(e){
    console.log(e);
    sessionStorage.setItem("magnetlink",e);
    window.location.href="./watchmovie.html";
}
