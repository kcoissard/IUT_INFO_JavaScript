

function surligne(champ, erreur)
{
   if(erreur){

      champ.style.backgroundColor = "#fba"; //si le champs est faux, il y a erreur= true et la coleur est rouge
   }
   else{

      champ.style.backgroundColor = "green";
   }
}


function verifPrenom(prenom){
   if(prenom.value.length < 4 || prenom.value.length > 25)
   {
      surligne(prenom, true);
      return false;
   }
   else
   {
      surligne(prenom, false);
      return true;
   } 
}


function verifNom(nom){
    if(nom.value.length < 4 || nom.value.length > 25)
   {
      surligne(nom, true);
      return false;
   }
   else
   {
      surligne(nom, false);
      return true;
   }
}

function verifAge(age){ // ceci est inutile car maxlength le fait
    if(age.value < 18 )
   {
      surligne(nom, true);
      return false;
   }
   else
   {
      surligne(nom, false);
      return true;
   }
}

function verifIdentifiant(identifiant){
    if(identifiant.value.length <= 12 && 
      /[a-zA-Z]/.test(identifiant.value) && // pour verifier que la chaine est composée uniquement de letres
       identifiant.value.length !== 0)
   {
      surligne(identifiant, false);
      return true;
   }
   else
   {
      surligne(identifiant, true);
      return false;
   }
}


function mdpEgaux(){
  document.getElementById('mdp1');
  document.getElementById('mdp2');

  if (mdp1.value == '' || mdp2.value == '') {
    surligne(mdp1, true);
    surligne(mdp2, true);
    return false;
    }
  else if (mdp1.value != mdp2.value) {
    surligne(mdp1, true);
    surligne(mdp2, true);
    return false;
    }
  else if (mdp1.value == mdp2.value) {
    surligne(mdp1, false);
    surligne(mdp2, false);
    return true;
    }
  else {
    surligne(mdp1, true);
    surligne(mdp2, true);
    return false;
    }
  /*
    mdp1=document.getElementById('mdp1');
    mdp2=document.getElementById('mdp2');

   if(mdp1===mdp2){
    surligne(mdp1, false);
    surligne(mdp2, false);
      return true;
   }
   else if(mdp1!==mdp2)
   {
    surligne(mdp1, true);
    surligne(mdp2, true);
      return false;
   }*/
}



//    document.getElementById('cgu').disabled=false;

//document.getElementById("txt").innertHTML="texte"
//<div id="txt"> de cette façon on peut changer le contenu ici </div>