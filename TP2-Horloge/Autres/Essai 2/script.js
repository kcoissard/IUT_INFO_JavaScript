
//PARTIE 1 HORLOGE

// FONCTION AVEC TEMPS ACTUALISE TOUTES LES SECONDES
function temps_qui_passe()
{
     

    var temps_actuel = new Date();

    document.getElementById('heure_actuelle').childNodes[0].innerHTML=temps_actuel.getHours();
    //console.log("bwaaaaaaaaaaaaaaaaaaaaaaah"); POUR VERIFIER EN CONSOLE QUE CA VA JUSQU'ICI
    document.getElementById('minute_actuelle').childNodes[0].innerHTML=temps_actuel.getMinutes();
    document.getElementById('seconde_actuelle').childNodes[0].innerHTML=temps_actuel.getSeconds();
 	setTimeout(temps_qui_passe, 1000);       
}
// ça déclenche la fonction toutes les 1000ms 
window.addEventListener("load", function(){setTimeout(temps_qui_passe, 1000);} );


//PARTIE 2 REVEIL


var d = document; // on crée un raccourci vers le document
var deleteButton = d.getElementsByClassName("button_less");
var checkNeeded = []; // tableau dans lequel on stockera les id à faire sonner
var newDelete = clone.getElementsByClassName("delete");
var clone;  // le clone

//SUPPRESSION
// on ajoute un événement au click sur les boutons "delete" deja present
for(var i = 0; i < deleteButton.length; i++){
  deleteButton[i].addEventListener("click",removeParent);
}

// on boucle et ajoute la fonction de suppression
for(var i = 0; i < newDelete.length; i++){
  newDelete[i].addEventListener("click",removeParent);
}

// fonction pour supprimer element parent
function removeParent(event){
  var el = event.target;
  var parent = el.parentNode;
  var grandParent = parent.parentNode;
  var id = parseInt(parent.getAttribute("id"));

  grandParent.removeChild(parent);
  for(var i = 0; i < checkNeeded.length; i++){
    if(checkNeeded[i] === id){
      checkNeeded.splice(i,1);
    }
  }
}




//AJOUT ALARME 
var add = d.getElementsByClassName("button_plus");
var backup = d.getElementById("0").cloneNode(true); // au cas où
var previousId = -1;  // on initialise l'id a -1 au cas ou

// pour chaque boutton "add", on écoute le click
var checkboxes = d.getElementsByClassName("checkbox_alarme");
var selectRing = d.getElementsByClassName("list_sons");

add.addEventListener("click",function(){
  var objectToClone = d.getElementsByClassName("reveil");  // divs de reveils
  var target  = d.getElementById("reveil");  // cible ou coller le nouvel élément
  var previousId = -1;  // on initialise l'id a -1 au cas ou
 
  // on récupere l'id du dernier élément trouvé parmi les objets a cloner
  for(var i = 0; i < objectToClone.length; i++){
    if(i === objectToClone.length-1){
      previousId = parseInt(objectToClone[i].getAttribute("id"));
    }
  }

    // on ajoute un écouteur sur la checkbox créée
  var newCheck = clone.getElementsByClassName("checkbox_alarme");
  // on ajoute un écouteur sur le select créée
  var newSelectRing = clone.getElementsByClassName("alarm_sound");

  // ici on répète l'action du début
    // on ajoute un écouteur sur le boutton "button_less" créé
  var newDelete = clone.getElementsByClassName("button_less");

  
// on clone notre backup
  clone = backup.cloneNode(true);

  // on incrémente l'idmax puis on le met sur le clone
  clone.setAttribute("id",++previousId);
  // on ajoute le clone à la suite
  target.appendChild(clone);

});



   