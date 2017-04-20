// SOLUTION ALTERNATIVE HORLOGE 
/*
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
*/




//VARIABLES GLOBALES
var d = document; 
var maintenant = new Date();
var heure_act = d.getElementById("heure_actuelle");
var choixSon = d.getElementsByClassName("alarm_sound");
var checkboxes = d.getElementsByClassName("checkbox_alarm");
var add = d.getElementById("ajouter_alarm");
var deleteButton = d.getElementsByClassName("delete");
var backup = d.getElementById("0").cloneNode(true); // aidé par Martin
var previousId; // aidé par Martin
var checkNeeded=[]; // aidé par Martin


afficherDate();
setInterval(afficherDate, 1000);


for(var i = 0; i < deleteButton.length; i++){ // ajout événement click sur les boutons "-" deja presents
  deleteButton[i].addEventListener("click",supprimerLigne);
}

for(var i = 0; i < checkboxes.length; i++){ // ajout événement au changement sur checkboxes déjà présentes
  checkboxes[i].addEventListener("change",addToCheck);
}


for(var i = 0; i < choixSon.length; i++){ // ajout événement au changement de sonnerie
  choixSon[i].addEventListener("change",changeRing);
}

// ajout événement click sur les boutons "+"
add.addEventListener("click",function(){
  var clone;
  var objectToClone = d.getElementsByClassName("alarm"); 
  var target  = d.getElementById("alarm");
 
 
 
  for(var i = 0; i < objectToClone.length; i++){  // id du dernier élément trouvé
    if(i === objectToClone.length-1){
      previousId = parseInt(objectToClone[i].getAttribute("id"));
    }
  }

  clone = backup.cloneNode(true);
  // on incrémente l'idmax puis on le met sur le clone
  clone.setAttribute("id",++previousId);
  // on ajoute le clone à la suite
  target.appendChild(clone);


  var newDelete = clone.getElementsByClassName("delete");
  var newCheck = clone.getElementsByClassName("checkbox_alarm");
  var newchoixSon = clone.getElementsByClassName("alarm_sound");

 
  for(var i = 0; i < newDelete.length; i++){  // ajout fonction de suppression
    newDelete[i].addEventListener("click",supprimerLigne);
  }
 
  for(var i = 0; i < newCheck.length; i++){  // ajout fonction d'ajout
    newCheck[i].addEventListener("change",addToCheck);
  }
  
  for(var i = 0; i < newchoixSon.length; i++){ // ajout fonction de changement d'alarme
    newchoixSon[i].addEventListener("change",changeRing);
  }
});



function afficherDate(){
  var maintenant = new Date();
  var heure_actuelle = d.getElementById("heure_actuelle");
  var minute_actuelle = d.getElementById("minute_actuelle");
  var seconde_actuelle = d.getElementById("seconde_actuelle");

  heure_act.innerHTML = maintenant.getHours() + " : ";
  minute_actuelle.innerHTML = maintenant.getMinutes() + " : ";
  seconde_actuelle.innerHTML = maintenant.getSeconds();

  // si jamais le tableau contient au moins un élément à tester
  // on lance le test de l'heure
  if(checkNeeded.length > 0){
    verifAlarms();
  }
}


function supprimerLigne(event){
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


function verifAlarms(){
  for(var i = 0; i < checkNeeded.length; i++){
    var sonne = false; 
    var toCheck = d.getElementById(checkNeeded[i]);
    var hours = toCheck.getElementsByClassName("heures"); 
    var minutes = toCheck.getElementsByClassName("minutes"); 
    
    // on teste si la valeur de son heure correspond à l'heure affichée en html
    for(var j = 0; j < hours.length; j++){
      if(hours[j].value == parseInt(d.getElementById("heure_actuelle").innerHTML)){
        sonne = true;
      }else{ sonne = false; }
    }

    // on teste si la valeur de ses minutes correspond à la minute affichée en html
    for(var j = 0; j < minutes.length; j++){
      if(minutes[j].value == parseInt(d.getElementById("minute_actuelle").innerHTML)){
        sonne = true;
      }else{ sonne = false; }
    }

    // si l'élément doit sonner, le faire sonner (on a son id)
    if(sonne){
      playSound(toCheck);
    }else{
      stopSound(toCheck);
    }

  }
}

function addToCheck(event){
  var source = event.target; 
  var parent = source.parentNode; 
  var id = parseInt(parent.getAttribute("id"));t
  var audio = parent.getElementsByTagName("audio"); 
  var getActive = false;  // ne doit pas s'activer de base

 
  if(source.checked){  // si case cochée lors de l'événement
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

function changeRing(event){
  var el = event.target.parentNode;
  var audio = el.getElementsByTagName("audio");

  for(var i = 0; i < audio.length; i++){
    audio[i].src = "audio" + event.target.value + ".mp3";
  }

}


function playSound(el){
  var selectedAlarm = el.getElementsByClassName("alarm_sound");
  var source,alarm_ring;

  
  if(el.className.indexOf("playing") === -1){ // si la classe de l'élément ne contient pas "playing"
    // on ajout " playing" a la classe de l'élément
    el.className += " playing";

    if(el.getElementsByTagName("audio").length > 0){ // si la balise audio existe deja on la récupere
      source = el.getElementsByTagName("source")[0];
      alarm_ring = el.getElementsByTagName("audio")[0];
   
    }else{
      source = d.createElement("source");  // sinon on la crée
      alarm_ring = d.createElement("audio");
      alarm_ring.appendChild(source);
      el.appendChild(alarm_ring);
    }

    for(var i = 0; i < selectedAlarm.length; i++){ // dans tous les cas on met a jour les valeurs des balises audio et source
      source.setAttribute("src","audio"+selectedAlarm[i].value+".mp3");
      source.setAttribute("type","audio/mp3");
      alarm_ring.setAttribute("autoplay","true");
      alarm_ring.setAttribute("loop","true");
      alarm_ring.muted = false;
    }
  }
}


function stopSound(el){
 
  if(el.className.indexOf("playing") !== -1){  // si la classe de l'élément contient la chaine "playing" on recupere la classe sans "playing"
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