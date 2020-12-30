var torrentStream = require('torrent-stream');
console.log('play2')
var torrentId = sessionStorage.getItem("magnetlink")
console.log('play2')
var engine = torrentStream(torrentId);
console.log('play2')

engine.on('ready', function() {
    engine.files.forEach(function(file) {
        console.log('filename:', file.name);
        var stream = file.createReadStream();
        // stream is readable stream to containing the file content
    });
});
