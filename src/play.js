var WebTorrent = require('webtorrent-hybrid')
var torrentId = sessionStorage.getItem("magnetlink")
//var torrentId = 'https://webtorrent.io/torrents/sintel.torrent'
console.log(torrentId);
var client = new WebTorrent()

// HTML elements
var $body = document.body
var $fname = document.getElementById("#filename")
var $progressBar = document.querySelector('#progressBar')
var $numPeers = document.querySelector('#numPeers')
var $downloaded = document.querySelector('#downloaded')
var $total = document.querySelector('#total')
var $remaining = document.querySelector('#remaining')
var $uploadSpeed = document.querySelector('#uploadSpeed')
var $downloadSpeed = document.querySelector('#downloadSpeed')
// Download the torrent
client.add(torrentId, function (torrent) {
// Torrents can contain many files. Let's use the .mp4 file
var file = torrent.files.find(function (file) {
    return file.name.endsWith('.mp4')
})
// Stream the file in the browser
file.appendTo('#output')

// Trigger statistics refresh
torrent.on('done', onDone)
setInterval(onProgress, 500)
onProgress()

// Statistics
function onProgress () {

}
function onDone () {
    $body.className += ' is-seed'
    onProgress()
}
})
