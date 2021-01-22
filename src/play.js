// console.log(document.URL)
if(document.URL.search("watch") !== -1){

    

    var moment = require('moment')
    var prettyBytes = require('pretty-bytes')
    window.$ = window.jQuery = require('jquery')
    var WebTorrent = require('webtorrent-hybrid')
    var torrentId = sessionStorage.getItem("magnet")
    console.log("received " + torrentId);
    var client = new WebTorrent()

    $(document).ready(function () {
        setTimeout(function(){
            console.log("Having problem in viewing video?")
            $('#imdbp').fadeIn(500);
        }, 10000);
    });


    var announceList = [
    ['udp://tracker.openbittorrent.com:80'],
    ['udp://tracker.internetwarriors.net:1337'],
    ['udp://tracker.leechers-paradise.org:6969'],
    ['udp://tracker.coppersurfer.tk:6969'],
    ['udp://exodus.desync.com:6969'],
    ['wss://tracker.webtorrent.io'],
    ['wss://tracker.btorrent.xyz'],
    ['wss://tracker.openwebtorrent.com'],
    ['wss://tracker.fastcast.nz']
    ]

    //global.WEBTORRENT_ANNOUNCE = announceList
    // .map(function (arr) {
    //     return arr[0]
    // })
    // .filter(function (url) {
    //     return url.indexOf('wss://') === 0 || url.indexOf('ws://') === 0
    // })
    // Download the torrent
    client.add(torrentId, function (torrent) {
    // Torrents can contain many files. Let's use the .mp4 file
        var file
        torrent.files.find(function () {
            var largestFile = torrent.files[0]
            for (var i = 1; i < torrent.files.length; i++) {
                if (torrent.files[i].length > largestFile.length){
                    largestFile = torrent.files[i]
                }
            }
            file = largestFile
        })
        var newTitle = "Watch : " + file.name
        if (document.title != newTitle) {
            document.title = newTitle;
        }
        // $('meta[name="description"]').attr("content", newDescription);

        var x = document.getElementById("Downloadfiles");
        x.style.display = "none";
        // Stream the file in the browser
        console.log(torrent.announce)
        console.log(torrent.files)
        file.renderTo('#players')
        console.log(file.name)
        $('#streamedFileName').text(file.name);
        
        // Trigger statistics refresh
        torrent.on('done', onDone)
        setInterval(onProgress, 500)
        onProgress()
        

        // Statistics
        function onProgress () {   
            // Peers
            $('#numPeers').html(torrent.numPeers + (torrent.numPeers === 1 ? ' peer' : ' peers'))
            // Progress
            var percent = Math.round(torrent.progress * 100 * 100) / 100
            
            $('#progressBar').width(percent + '%')
            $('#downloaded').html(prettyBytes(torrent.downloaded))
            $('#total').html(prettyBytes(torrent.length))

            // Remaining time
            var remaining
            if (torrent.done) {
                remaining = 'Done'
            } else {
                remaining = moment.duration(torrent.timeRemaining / 1000, 'seconds').humanize()
                remaining = remaining[0].toUpperCase() + remaining.substring(1) + ' remaining'
            }
            $('#remaining').html(remaining)

            // Speed rates
            $('#downloadSpeed').html(prettyBytes(torrent.downloadSpeed) + '/s')
            $('#uploadSpeed').html(prettyBytes(torrent.uploadSpeed) + '/s')
        }
        torrent.on('infoHash',function(){
            console.log('gota info')
        })

        function onDone () {
            onProgress()
            console.log('Torrent fininshed Donwloading')
            document.getElementById("Downloadfiles").style.display = "block"
            document.getElementById("dd").style.display = "block"
            document.getElementById("pp").style.display = "none"
            torrent.files.forEach(function(file){
                file.getBlobURL(function (err, url) {
                    if (err) throw err
                    var a = document.createElement('a')
                    a.download = file.name
                    a.href = url
                    a.textContent = file.name
                    var x = document.getElementById("Downloadfiles")
                    x.appendChild(a)
                })
            })
        }
        
    })
    
}
