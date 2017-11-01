RSAKey.prototype.toJSON = function() {
    return JSON.stringify({
      type: 'RSAKey',
      coeff: this.coeff.toString(16),
      d: this.d.toString(16),
      dmp1: this.dmp1.toString(16),
      dmq1: this.dmq1.toString(16),
      e: this.e.toString(16),
      n: this.n.toString(16),
      p: this.p.toString(16),
      q: this.q.toString(16)
    })
}

function print(string) {
            document.write(string + "\n\n");
}

var random_numbers = [];
var size_rand = 100;
var array_ptr = 0;
var url = "https://www.random.org/integers/?num=100&min=1&max=10000&col=1&base=10&format=plain&rnd=new"; 
var started = 0;

fetch(url, {
	method: 'get'
})
  .then(function(response) {
    // Here you get the data to modify as you please
    return response.text();
    })
  .then(function(number) {
    res = number.replace(/\s+/," ").split(" ");
    for (i=0;i<99;i++) {
    res = res[1].replace(/\s+/," ").split(" ");
    number.split("\r");
	random_numbers.push(res[0]);
    }
    start_page();
    started = 1;
    })
  .catch(function(error) {
    // If there is any error you will catch them here
    if (!started) {
    console.log("Could not get numbers from Random.org");
    for (i=0;i<100;i++) {
    var min = 1;
    var max = 10000;
    var num = Math.floor(Math.random() * (max - min)) + min;
	random_numbers.push(num);
    start_page();
    }
    started = 1;
    }
  });         


function start_page() {
    function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  var ans = Math.floor(Math.floor(random_numbers[array_ptr++%size_rand])/10000 * (max - min + 1) + min);
  return ans; //The maximum is inclusive and the minimum is inclusive 

}
    
// for the image
print("<canvas id='myCanvas'></canvas>");
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
var imgData=ctx.createImageData(128,128);
for (var i=0;i<imgData.data.length;i+=4)
  {
  imgData.data[i+0]=getRandomIntInclusive(0,255);
  imgData.data[i+1]=getRandomIntInclusive(0,255);
  imgData.data[i+2]=getRandomIntInclusive(0,255);
  imgData.data[i+3]=255;
  }
ctx.putImageData(imgData,10,10);
document.getElementById("myCanvas").href = document.getElementById("myCanvas").toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
  
    

//Audio generator

var audioContext = new AudioContext();
var bufferSize = 4096;
var whiteNoise = audioContext.createScriptProcessor(bufferSize, 1, 1);
whiteNoise.onaudioprocess = function(e) {
    var output = e.outputBuffer.getChannelData(0);
    for (var i = 0; i < bufferSize; i++) {
        output[i] = (getRandomIntInclusive(1,999)/1000) * 2 - 1;
    }
}
whiteNoise.connect(audioContext.destination);
var rec = new Recorder(whiteNoise);
    rec.record();
      function stopplayer() {
          rec.stop()
          whiteNoise.disconnect();
          rec.exportWAV(function(blob) {
      var url = URL.createObjectURL(blob);
      var li = document.createElement('li');
      var au = document.createElement('audio');
      var hf = document.createElement('a');
      
      au.controls = true;
      au.src = url;
      hf.href = url;
      hf.download = new Date().toISOString() + '.wav';
      hf.innerHTML = hf.download;
      li.appendChild(au);
      li.appendChild(hf);
      print("<ul id='recordingslist'></ul>");
      recordingslist.appendChild(li);
});

          
    }
setTimeout(stopplayer, 3200);
      

// The passphrase used to repeatably generate this RSA key.
var PassPhrase = "";
for(i=0;i<100;i++)
    PassPhrase +=String.fromCharCode(getRandomIntInclusive(48,122));

// The length of the RSA key, in bits.
var Bits = 1024; 

var RSAkey = cryptico.generateRSAKey(PassPhrase, Bits);
var PublicKeyString = cryptico.publicKeyString(RSAkey);
      
      print("<div id = 'key'>Matt's public key string:");
        print(PublicKeyString );
      print ("Private Key:");
      var privatekeystring = JSON.stringify(RSAkey.toJSON());
      print (privatekeystring );
      
      print ("Passphrase:");
      print (PassPhrase);      
      print( "</div>");
}