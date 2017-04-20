
var url="chapitre1.json";
function chargement() {
	//document.getElementById("toto").style.color = "red"; CA C'EST COOL POUR TESTER

  var req = new XMLHttpRequest();
  
    req.open("GET", url);
    req.onerror = function() {
        console.log("Échec de chargement"+url);
    };
    req.onload = function() {
        if (req.status === 200) {
          var data = JSON.parse(req.responseText);
          var texte = document.getElementById("txt");
          var lien = document.getElementById("link");
          lien.href=data.links[0].link;
          lien.innerHTML=data.links[0].txt;
          texte.innerHTML=data.txt;
          
          // do what you have to do with 'data'
        } else {
          console.log("Erreur " + req.status);
        }
    };
    req.send();
}

if(!window.HashChangeEvent)(function(){
console.log("bwaaaaaaaaah");

  var lastURL=document.URL;
  window.addEventListener("hashchange",function(){
    Object.defineProperty(event,"oldURL",{enumerable:true,configurable:true,value:lastURL});
    Object.defineProperty(event,"newURL",{enumerable:true,configurable:true,value:document.URL});
    lastURL=document.URL;
  });
}());

window.addEventListener("load", function () { chargement(); });
window.addEventListener("click", function(){i=; chargement();  });



