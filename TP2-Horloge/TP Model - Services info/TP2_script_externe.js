 

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


window.addEventListener("load", function(){ setTimeout(temps_qui_passe, 1000) } );



