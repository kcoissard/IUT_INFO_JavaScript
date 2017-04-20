
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
var add = d.getElementsByTagName("button_plus");  // bouton pour l'ajout de réveil
var deleteButton = d.getElementsByClassName("button_less");  // bouton pour la suppression (presents au chargement)
var checkboxes = d.getElementsByClassName("checkbox_alarme");  // checkboxes (presentes au chargement)
var selectRing = d.getElementsByClassName("list_sons"); // selects (présents au chargement)
var backup = d.getElementsByClassName("alarm"); // backup de l'élément vierge présent au chargement
var previousId;
var checkNeeded=[];


// on ajoute un événement au click sur les boutons "button_less" deja presents
for(var i = 0; i < deleteButton.length; i++){
  deleteButton[i].addEventListener("click",removeParent);
}
// on ajoute un événement au changement (cochage/décochage)
// sur toutes les checkboxes déjà présentes
for(var i = 0; i < checkboxes.length; i++){
  checkboxes[i].addEventListener("change",addToCheck);
}

// on ajoute un evenement au changement de sonnerie
for(var i = 0; i < selectRing.length; i++){
  selectRing[i].addEventListener("change",changeRing);
}

// pour chaque boutton "add", on écoute le click
add.addEventListener("click",function(){
  var objectToClone = d.getElementsByClassName("alarm");  // divs de reveils
  var target  = d.getElementById("alarm");  // cible ou coller le nouvel élément
  var clone;  // le clone
 
  // on récupere l'id du dernier élément trouvé parmi les objets a cloner
  for(var i = 0; i < objectToClone.length; i++){
    if(i === objectToClone.length-1){
      previousId = parseInt(objectToClone[i].getAttribute("id"));
    }
  }

  // on clone notre backup
  clone = backup.cloneNode(true);

  // on incrémente l'idmax puis on le met sur le clone
  clone.setAttribute("id",++previousId);
  // on ajoute le clone à la suite
  target.appendChild(clone);

  // ici on répète l'action du début
  // on ajoute un écouteur sur le boutton "button_less" créé
  var newDelete = clone.getElementsByClassName("button_less");
  // on ajoute un écouteur sur la checkbox créée
  var newCheck = clone.getElementsByClassName("checkbox_alarme");
  // on ajoute un écouteur sur le select créée
  var newSelectRing = clone.getElementsByClassName("list_sons");

  // on boucle et ajoute la fonction de suppression
  for(i = 0; i < newDelete.length; i++){
    newDelete[i].addEventListener("click",removeParent);
  }
  // on boucle et ajoute la fonction d'ajout
  for(i = 0; i < newCheck.length; i++){
    newCheck[i].addEventListener("change",addToCheck);
  }
  // on boucle et ajoute la fonction de changement d'alarme
  for(i = 0; i < newSelectRing.length; i++){
    newSelectRing[i].addEventListener("change",changeRing);
  }
});


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

// teste chaque élément dans le tableau des réveils pour voir s'il doit sonner ou non
function checkAlarms(){
  // pour chaque id à tester stocké dans le tableau
  for(var i = 0; i < checkNeeded.length; i++){

    // on récupere l'élément à checker grace à son id
    var toCheck = d.getElementById(checkNeeded[i]);
    var hours = toCheck.getElementsByClassName("heures"); // ses heures
    var minutes = toCheck.getElementsByClassName("minutes");  // ses minutes
    var mustRing = false; // ne doit pas sonner de base

    // on teste si la valeur de son heure correspond à l'heure affichée en html
    for(var j = 0; j < hours.length; j++){
      if(hours[j].value == parseInt(d.getElementById("current_hour").innerHTML)){
        mustRing = true;
      }else{ mustRing = false; }
    }

    // on teste si la valeur de ses minutes correspond à la minute affichée en html
    for(j = 0; j < minutes.length; j++){
      if(minutes[j].value == parseInt(d.getElementById("current_minutes").innerHTML)){
        mustRing = true;
      }else{ mustRing = false; }
    }

    // si l'élément doit sonner, le faire sonner (on a son id)
    if(mustRing){
      console.log("DRIIIING" + checkNeeded[i]);
      playSound(toCheck);
    }else{
      stopSound(toCheck);
    }

  }
}

// ajouter un id au tableau "a checker"
function addToCheck(event){
  var source = event.target;  // on récupere la cible de l'événement
  var parent = source.parentNode; // son parent
  var id = parseInt(parent.getAttribute("id")); // l'id du parent
  var audio = parent.getElementsByTagName("audio");  // la balise audio du parent
  var getActive = false;  // ne doit pas s'activer de base

  // si la case a été cochée lors de l'événement
  if(source.checked){
    // on ajoute l'id a la liste des reveils qui doivent sonner
    checkNeeded.push(id);
  }else{
    // on retire l'id de la liste des reveils qui doivent sonner
    for(var i = 0; i < checkNeeded.length; i++){
      if(checkNeeded[i] === id){
        checkNeeded.splice(i,1);
      }
    }
    // on stoppe le son
    stopSound(parent);
  }
}

// changer de sonnerie (au select)
function changeRing(event){
  var el = event.target.parentNode;
  var audio = el.getElementsByTagName("audio");

  for(var i = 0; i < audio.length; i++){
    audio[i].src = "audio" + event.target.value + ".mp3";
  }

}

// ajoute une balise audio à l'alarme afin de jouer le son
function playSound(el){
  var selectedAlarm = el.getElementsByClassName("list_sons");
  var source,alarm_ring;

  // si la classe de l'élément ne contient pas "playing"
  if(el.className.indexOf("playing") === -1){
    // on ajout " playing" a la classe de l'élément
    el.className += " playing";

    // si la balise audio existe deja on la récupere
    if(el.getElementsByTagName("audio").length > 0){
      source = el.getElementsByTagName("source")[0];
      alarm_ring = el.getElementsByTagName("audio")[0];
    // sinon on la crée
    }else{
      source = d.createElement("source");
      alarm_ring = d.createElement("audio");
      alarm_ring.appendChild(source);
      el.appendChild(alarm_ring);
    }

    // dans tous les cas on met a jour les valeurs des balises audio et source
    for(var i = 0; i < selectedAlarm.length; i++){
      source.setAttribute("src","alarm_"+selectedAlarm[i].value+".mp3");
      source.setAttribute("type","audio/mp3");
      alarm_ring.setAttribute("autoplay","true");
      alarm_ring.setAttribute("loop","true");
      alarm_ring.muted = false;
    }
  }
}

// stopper le son d'un élément
function stopSound(el){
  // si la classe de l'élément contient la chaine "playing"
  if(el.className.indexOf("playing") !== -1){
    // on recupere la classe sans "playing"
    var oldClass = el.className.substr(0,el.className.indexOf("playing")-1);
    // on met à jour la classe en ayant enlevé "playing"
    el.className = oldClass;

    // on passe l'élément audio en "mute" s'il existe
    var audio = el.getElementsByTagName("audio");
    for(var i = 0; i < audio.length; i++){
      audio[i].muted = true;
    }
  }
}