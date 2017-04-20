var url = "chapitre1.json";
var req = new XMLHttpRequest();

req.open("GET", url);

req.onerror = function() {console.log("Échec de chargement "+url);};

req.onload = function() {
    if (req.status === 200) {
      var data = JSON.parse(req.responseText);	
	  
		document.getElementById("chapitre").innerHTML = data.txt;

		affiche_lien(data);

		
    } else {
      console.log("Erreur " + req.status);
    }
};
req.send();

window.addEventListener("hashchange", function(){
	var nouvelleURL = "chapitre"+window.location.hash.substr(1)+".json";
	url = nouvelleURL;
	changeURL(url);
});

function affiche_lien(data){
	var list="";
	
	for(var i=0; i<data.links.length; i++){
		list += '<a href="'+data.links[i].link+'">'+data.links[i].txt+'</a></br>';
	}
	document.getElementById("zone").innerHTML = list;
}

// on peut enlever le dernier et créer une fonction qui englobe tout
function changeURL(url){
	req.open("GET", url);
	
		req.onload = function() {
		if (req.status === 200) {
		  var data = JSON.parse(req.responseText);	
		  
			document.getElementById("chapitre").innerHTML = data.txt;

			affiche_lien(data);

			
		} else {
		  console.log("Erreur " + req.status);
		}
	};
	req.send();
}