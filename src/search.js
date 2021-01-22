var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);
defer()
function defer() {
  if (window.jQuery) {
    $("#mwrapper").hide()
  } else {
      setTimeout(function() { defer() }, 50);
  }
}

  function search(){  
    
    var movie_name = document.getElementById('movie_input').value
    if(movie_name.length === 0)
    return;
    var load = document.getElementById('idloader')
    load.style.display = "flex";
    var request = new XMLHttpRequest()
    var site = 'https://api.sumanjay.cf/torrent/?query='
    site = site.concat(movie_name)
    console.log(site)
    request.open('GET',site,true)

    request.onload = function () {
        // Begin accessing JSON data here
        var s = document.getElementById('typ')
        var opt = s.selectedOptions[0].label;
        console.log("selected " + opt)
        if(window.innerWidth < 767){
          var styleElem = document.head.appendChild(document.createElement("style"));
          styleElem.innerHTML = ".table-wrapper:before {display: block;}";
        }
        
        if(this.response!=="Error"){
          var data = JSON.parse(this.response)
          console.log(data)
        }
        
        movinfo(movie_name)
        load.style.display = "none";
        
      
        if (request.status >= 200 && request.status < 400 && data) {
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
          name.innerHTML = "Name";
          size.innerHTML = "Size";
          seed.innerHTML = "Seeds";
          peer.innerHTML = "Peers";
          play.innerHTML = "Action";
          var i = 1
          var j = 1
          for(i=0;i<data.length;i++) {
            var result = data[i]
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
            playbtn.innerHTML = "<input type='button' value='Play' id='\j\' class='btnEdits'/>"
            playbtn.addEventListener('click',function(){  
              gein($(this)[0].parentNode.children[6].textContent)
            });
            j = j+1;
          }
          if(opt == "Movie"){
            if(j>0){
              movinfo(movie_name)
            }
          }
        } else {
          console.log('error')
        }
    }
    request.send()
}

function movinfo(e){
  console.log(e);
  var link = "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/" + e;
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": link,
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "35ac43d71fmshdeeabd475c0998ep1f618ajsn62338c98a6d1",
      "x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com"
    }
  };
  //AIzaSyCr0bGNaWWJS-KfYD-g2RKAVOXgt8s_jyM
  //AIzaSyANKbVm22o7LacmOvUfJTDTCBiXaK9g_kI
  $.ajax(settings).done(function (response) {
    console.log(response);
    $("#mwrapper").show()
    $("#iwrapper")[0].style.background = "#333030";
    document.getElementById('got_movie_poster').src =  response.poster
    document.getElementById('got_movie_name').innerHTML = response.title
    document.getElementById('got_movie_plot').innerText = response.plot
    document.getElementById('got_year').innerText = response.year
    sessionStorage.setItem("imdb",response.id);
    getVideo()
    function getVideo() {
      $.ajax({
        type: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            key: 'AIzaSyANKbVm22o7LacmOvUfJTDTCBiXaK9g_kI',
            q: e+' trailer',
            part: 'snippet',
            maxResults: 1,
            type: 'video',
            videoEmbeddable: true,
        },
        success: function(data){
            console.log(data)
            document.getElementById('got_trailer').src = 'https://www.youtube.com/embed/' + data.items[0].id.videoId
        },
        error: function(response){
            console.log("Request Failed");
        }
      });
    }
  });
}

function gein(m){
  sessionStorage.setItem("magnet",m);
  window.location.href="./watchmovie.html";
}

function imdbplay(){
  var e = sessionStorage.getItem("imdb")
  console.log(e)
  var link = "https://databasegdriveplayer.co/player.php?imdb=" + e
  window.open(link)
}
