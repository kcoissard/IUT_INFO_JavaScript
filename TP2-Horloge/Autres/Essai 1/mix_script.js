
// FONCTION AVEC TEMPS ACTUALISE TOUTES LES SECONDES
var compteur_ligne=0;
function temps_qui_passe()
{
     
   // date = new Date( hour[, minutes[, seconds[]]]);
    var temps_actuel = new Date();
    
    document.getElementById('heure_actuelle').childNodes[0].innerHTML=temps_actuel.getHours();
    //console.log("bwaaaaaaaaaaaaaaaaaaaaaaah"); POUR VERIFIER EN CONSOLE QUE CA VA JUSQU'A LA
    document.getElementById('minute_actuelle').childNodes[0].innerHTML=temps_actuel.getMinutes();
    document.getElementById('seconde_actuelle').childNodes[0].innerHTML=temps_actuel.getSeconds();
 	setTimeout(temps_qui_passe, 1000);       
}


window.addEventListener("load", function(){

    setTimeout(temps_qui_passe, 1000);
    document.getElementById("button_less").addEventListener("click", function(){
        supprimer();
     });
    document.getElementById("button_plus").addEventListener("click", function(){
        ajout_Zone();
    });
});



// FONCTION SUPPR ALARM
function supprimer()
{
 //console.log("bwaaaaaaaaaaaaaaaaaaaaaaah"); //POUR VERIFIER EN CONSOLE QUE CA VA JUSQU'A LA   
 
//var ligne = document.getElementById("clock");
//clock.parentNode.removeChild(clock);
var ligne = document.getElementById("clock");
    clock.removeChild(clock.lastChild);
    compteur_ligne--;

}


// FONCTION AJOUTER UNE ALARM
function ajout_Zone(){
    var original = document.getElementById("clock");
    var clone = original.cloneNode(true);

    document.getElementById("zone").appendChild(clone);
    compteur_ligne++;
 }

