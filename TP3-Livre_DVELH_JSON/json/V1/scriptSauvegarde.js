

function ch1() {
	//document.getElementById("toto").style.color = "red"; CA C'EST COOL POUR TESTER

  var req = new XMLHttpRequest();
  req.open("GET", "chapitre1.json");
  req.onerror = function() {
      console.log("Échec de chargement "+"chapitre1.json");
  };
  req.onload = function() {
      if (req.status === 200) {
        var data = JSON.parse(req.responseText);
        var texte = document.getElementById("txt");
        var lien = document.getElementById("link");
        lien.href=data.links[0].link;
        lien.innerHTML=data.links[0].txt;
        texte.innerHTML=data.txt;
        //console.log("bwaaaaaaaaah");
        // do what you have to do with 'data'
      } else {
        console.log("Erreur " + req.status);
      }
  };
  req.send();
}

window.addEventListener('load', function () {
ch1(); });



