var d1 = document.getElementById("d1");
var a = document.getElementById("ans1");
var b = document.getElementById("ans2");
var c = document.getElementById("ans3");
var h = document.getElementById("header");
var reveal = document.getElementById("reveal");
var revealText = document.getElementById("reveal-text");
var revealHeader = document.getElementById("reveal-header");
var wrong = document.getElementById("wrong");
var answerJs = document.getElementById("answerJs");
var spin = document.getElementById("spin_the_wheel");
var entrSpin = true;
var right = document.getElementById("rightAnswers");
var num = 0;
var num3;
var num4 = 0;
var num5;
var rgtAns;
var ansIns;

var hplayer = document.getElementById("hplayer");
var player = document.getElementById("player");

var reveal = document.getElementById("reveal");
var revealHeader = document.getElementById("reveal-header");
var text = document.getElementById("wrong");

var countP = document.getElementById("countP");


var played = 0;
var playedRight = 0;

var lclRight = 0;
var lclPlayed = 0;

var guessRight = false;

var spaceLock = false;






function checkPlayer(){

played = localStorage.getItem("played");
playedRight = localStorage.getItem("playedRight");


if (played == null){
  localStorage.setItem("played", "0");
}

if (playedRight == null){
  localStorage.setItem("playedRight", "0");
}

else {
  return;
}

}





document.addEventListener("DOMContentLoaded", function(){
  checkPlayer();
  stats();
});




const sectors = [
    { color: "#6C2273", text: "#f1f1f1", label: "1"},
    { color: "#B8B2FF", text: "#333333", label: "2" },
    { color: "#6C2273", text: "#f1f1f1", label: "3" },
    { color: "#B8B2FF", text: "#333333", label: "4" },
    { color: "#6C2273", text: "#f1f1f1", label: "5" },
    { color: "#B8B2FF", text: "#333333", label: "6" },
    { color: "#6C2273", text: "#f1f1f1", label: "7" },
    { color: "#B8B2FF", text: "#333333", label: "8" },
    { color: "#6C2273", text: "#f1f1f1", label: "9" },
    { color: "#B8B2FF", text: "#333333", label: "10" },
    { color: "#6C2273", text: "#f1f1f1", label: "11" },
    { color: "#B8B2FF", text: "#333333", label: "12" },
    { color: "#6C2273", text: "#f1f1f1", label: "13" },
    { color: "#B8B2FF", text: "#333333", label: "14" },
    { color: "#6C2273", text: "#f1f1f1", label: "15" },
    { color: "#B8B2FF", text: "#333333", label: "16" },
    { color: "#6C2273", text: "#f1f1f1", label: "17" },
    { color: "#B8B2FF", text: "#333333", label: "18" },
  ];
  
  
  const events = {
    listeners: {},
    addListener: function (eventName, fn) {
      this.listeners[eventName] = this.listeners[eventName] || [];
      this.listeners[eventName].push(fn);
    },
    fire: function (eventName, ...args) {
      if (this.listeners[eventName]) {
        for (let fn of this.listeners[eventName]) {
          fn(...args);
        }
      }
    },
  }

  
  const rand = (m, M) => Math.random() * (M - m) + m;
  const tot = sectors.length;
  const spinEl = document.querySelector("#spin");
  const ctx = document.querySelector("#wheel").getContext("2d");
  const dia = ctx.canvas.width;
  const rad = dia / 2;
  const PI = Math.PI;
  const TAU = 2 * PI;
  const arc = TAU / sectors.length;

  
  const friction = Math.random() * (0.997 - 0.99) + 0.99;
  let angVel = 0;
  let ang = -1.25;

  
  let spinButtonClicked = false;
  
  const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot;
  
  function drawSector(sector, i) {

    var icn = document.getElementById(`icon${sector.label}`);
    
    const ang = arc * i;
    ctx.save();
  
    ctx.beginPath();
    ctx.fillStyle = sector.color;
    ctx.moveTo(rad, rad);
    ctx.arc(rad, rad, rad, ang, ang + arc);
    ctx.lineTo(rad, rad);
    ctx.fill();
  
    ctx.translate(rad, rad);
    ctx.rotate(ang + arc / 2);
    //ctx.textAlign = "right";
    //ctx.fillStyle = sector.text;
    //ctx.font = "bold 30px 'Lato', sans-serif";
    ctx.drawImage(icn, rad - 80, -33);
    // ctx.fillText(sector.label, rad - 25, 10);
    
    ctx.restore();
  }


  
  function rotate() {
    const sector = sectors[getIndex()];
    ctx.canvas.style.transform = `rotate(${(ang - PI / 2)-1.5708}rad)`;

    spinEl.innerHTML = '<i class="fa-solid fa-arrows-spin"></i>';
    spinEl.style.background = '#6C2273';
    spinEl.style.color = '#ffffff';
    
  }
  
  function frame() {
    if (!angVel && spinButtonClicked) {
      const finalSector = sectors[getIndex()];
      events.fire("spinEnd", finalSector);
      spinButtonClicked = false; 
      return;
    }
  
    angVel *= friction;
    if (angVel < 0.002) angVel = 0;
    ang += angVel; 
    ang %= TAU; 
    rotate();
  }
  
  function engine() {
    frame();
    requestAnimationFrame(engine);
  }
  
  function init() {
    sectors.forEach(drawSector);
    rotate(); 
    engine(); 
    spinEl.addEventListener("click", () => {
      if (!angVel) angVel = rand(0.25, 0.45);
      spinButtonClicked = true;
    });
  }
  
  init();


  events.addListener("spinEnd", (sector) => {
    setTimeout(() => {    
    showQuestion(sector.label);
  }, 750);
  });


  

  document.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && entrSpin === true) {
      spinEl.click();
    }
    else if(event.key === '$' && event.ctrlKey === true){

            
      if(confirm("Möchten Sie alle Spieldaten löschen?")){
        localStorage.clear();
    }
  }
  });





function showQuestion(sector){

   
  d1.style.display = 'flex';

  entrSpin = false;

   
   var questions = ["Welches dieser Passwörter ist am sichersten?", 
   "Wie viele Hackingangriffe auf Schweizer Unternehmen finden pro Woche statt?", 
   "Wofür steht das «s» in https://?", "Welche dieser Aspekte kommen oft bei Phishing-Mails vor?", 
   "Wann wurde die erste E-Mail versendet?", "Was bedeutet der Begriff Encryption?",
    "Welche Beschreibung trifft auf Deepfakes zu?", 
    "Wie viele Angriffe auf Passwörter finden weltweit pro Minute statt?", 
    "Was ist typisch für Spear-Phishing-Angriffe?", "Wie viel Prozent der über 40-jährigen<br>haben Geld an Cyberkriminelle bezahlt?", 
    "Wann wurde der erste Computervirus programmiert?", 
    "Was stellt für Unternehmen das grösste Sicherheitsrisiko dar?",
    "Welche Aussage trifft am meisten zu?", "Welches WLAN ist am sichersten, um sich zu verbinden?", 
    "Welche Technologie für die Erstellung von Deepfakes verwendet?", "Was bedeutet «Clean Desk Policy»?", "Für was steht IP?", "Was versteht man unter Zero-Day?"];

   const options = [
    {A: "Passwort1234!", B:"59drachen24", C: "Ighgs%u5UnH!"},
    {A: "825", B: "412", C: "1203"},
    {A: "Keine Bedeutung", B: "static/stable", C: "safe/secure"},
    {A: "Lange Texte, englische Sprache", B: "Drängende Formulierung", C: "Fehlende Signatur"},
    {A: "1971", B: "1965", C: "1998"},
    {A: "Schadsoftware", B: "Die Verschlüsselung von Klartext in kryptographische Zeichenfolgen", C: "Schreiben eines Datensatzes"},
    {A: "Fälschung von Gesicht und Stimme", B: "Fake News", C: "Form der Satire"},
    {A: "14.256", B: "34.740", C: "42.117"},
    {A: "Opfer wird gezielt festgelegt", B: "Angriff auf grosse Gruppe von Menschen", C: "Erpressung"},
    {A: "3%", B: "12%", C: "8%"},
    {A: "1989", B: "2001", C: "1982"},
    {A: "Mitarbeitende", B: "Software & Firewall", C: "Ehemalige Mitarbeitende"},
    {A: "Alle Mitarbeitenden sollten Anzeichen eines Cyberangriffs erkennen können", B: "Bestimmmte Mitarbeitende (z.B. IT-Spezialisten) sollten Anzeichen eines Cyberangriffes erkennen können", C: "Niemand der Mitarbeitenden muss die Anzeichen eines Cyberangriffs erkennen können"},
    {A: "Kostenpflichtiges WLAN", B: "Öffentliches WLAN", C: "WLAN bei einem Freund"},
    {A: "Blockchain", B: "Quantencomputer", C: "Künstliche neuronale Netze"},
    {A: "Keine Flecken zu hinterlassen", B: "Keine Dokumente und entsperrte Geräte zu hinterlassen", C: "Sitzen zu können, wo man will"},
    {A: "Internal Pointer", B: "Internet Protocol", C: "Intranet Pattern"},
    {A: "Nicht erkennbare Schadsoftware", B: "Nicht behobene Sicherheitslücke", C: "Netzwerkschwachstelle"}
];


var frage = questions[sector-1];

var optionen = options[sector-1];

a.innerHTML = optionen.A;
b.innerHTML = optionen.B;
c.innerHTML = optionen.C;
h.innerHTML = frage;

setTimeout(() => {
  checkAnswer(sector, options, optionen);
}, 500);



}



function checkAnswer(sector, options, optionen){

    var guess = false;

    let answers = ["Ighgs%u5UnH!", "825", "safe/secure", "Drängende Formulierung", "1971", 
    "Die Verschlüsselung von Klartext in kryptographische Zeichenfolgen", "Fälschung von Gesicht und Stimme", 
    "34.740", "Opfer wird gezielt festgelegt", "8%", "1982", "Mitarbeitende", 
    "Alle Mitarbeitenden sollten Anzeichen eines Cyberangriffs erkennen können", "WLAN bei einem Freund", "Künstliche neuronale Netze", 
    "Keine Dokumente und entsperrte Geräte zu hinterlassen", "Internet Protocol", "Nicht behobene Sicherheitslücke"];

    
    document.addEventListener("keydown", function(event){
    
      const key = event.key;


      if (guess == false){
       
      if (key == 'a' && answers[sector-1] == optionen.A || key == 'b' && answers[sector-1] == optionen.B || key == 'c' && answers[sector-1] == optionen.C || key == '1' && answers[sector-1] == optionen.A || key == '2' && answers[sector-1] == optionen.B || key == '3' && answers[sector-1] == optionen.C){
        /*reveal.style.display = 'flex';
        revealHeader.innerHTML = 'Glückwunsch!<br>Du hast die richtige Antwort gewählt';*/

        if (key == 'a' || key == '1'){
          a.style.color = '#00ad25';

        }
        else if (key == 'b' || key == '2'){
          b.style.color = '#00ad25';

        }
        else if (key == 'c' || key == '3'){
          c.style.color = '#00ad25';

        }
        guess = true;
        num = num + 1;
        guessRight = true;
      }
      
      else{

        var markedFalse = false;

        if (key == 'a' || key == '1'){
          a.style.color = '#D9304C';
          markedFalse = true;
        }
        else if (key == 'b' || key == '2'){
          b.style.color = '#D9304C';
          markedFalse = true;
        }
        else if (key == 'c' || key == '3'){
          c.style.color = '#D9304C';
          markedFalse = true;
        }

        
    if (markedFalse == true){
        if(answers[sector-1] == optionen.A){
          a.style.color = '#00ad25';
          a.style.transition = 'ease-in-out 0.5s';

        }
        else if(answers[sector-1] == optionen.B){
          b.style.color = '#00ad25';
          b.style.transition = 'ease-in-out 0.5s';

        }
        else if(answers[sector-1] == optionen.C){
          c.style.color = '#00ad25';
          b.style.transition = 'ease-in-out 0.5s';

        }
      }
        guess = true;

      }
      
      num4 = num4 + 1;
      stats();
      playerStats();
    }
      
if (guess == true && spaceLock == false){

  document.addEventListener("keydown", function(event){

    if(event.keyCode === 32){
        restart();
    }

  })

  setTimeout(() => {
    restart();
  }, 10000);

  spaceLock = true;  

  }
    

    })}

    


function restart(){
  entrSpin = true;
  d1.style.display = 'none';
  window.location.reload();
}




function stats(){

  ansIns = localStorage.getItem("ansIns");
  rgtAns = localStorage.getItem("rgtAns");

  var ansIns2 = parseInt(ansIns);
  var rgtAns2 = parseInt(rgtAns);
  //console.log("type", typeof(rgtAns));


  if (rgtAns2 === null || !rgtAns2 || isNaN(rgtAns2)) {
    localStorage.setItem("rgtAns", "0");
    rgtAns = localStorage.getItem("rgtAns");
    var rgtAns2 = parseInt(rgtAns);
  }
  
  if(ansIns2 === null || !ansIns2 || isNaN(ansIns2)){
    localStorage.setItem("ansIns", "0");
    ansIns = localStorage.getItem("ansIns");
    var ansIns2 = parseInt(ansIns);
  }


  
 // console.log("Parse rgt", rgtAns2);

  //console.log("Parse ans", ansIns2);


  num5 = num4 + ansIns2;
 // console.log("NUM5", num5);
  
  num3 = num + rgtAns2;
 // console.log("NUM3", num3);

  percent = ((num3/num5)*100);
  percent = percent.toFixed(2);
  percent = parseInt(percent);

  num3 = num3.toString();
  num5 = num5.toString();
  localStorage.setItem("ansIns", num5);
  localStorage.setItem("rgtAns", num3);

 // console.log("toString", typeof(num3), typeof(num5));
  
  right.innerHTML = `Richtige Antworten:<br>${percent}%`;
  
  if (isNaN(percent)){
    right.innerHTML = `Richtige Antworten:<br>0%`;
  }

}


var temp3;

function playerStats(){

//var temp = localStorage.getItem("played");
var temp2 = localStorage.getItem("playedRight");
/*
temp3 = parseInt(temp) + 1;
//temp3 = temp3.toString();
*/

var temp4 = parseInt(temp2);

if (guessRight == true){
  temp4 = temp4 + 1;
  temp4 = temp4.toString();
} else{
  console.log("else", temp4);
  temp4.toString();
}


localStorage.setItem("playedRight", temp4);


console.log("temp4", temp4);
console.log("ansIns", parseInt(num5));

if (parseInt(num5) % 3 == 0 && temp4 == '1' || parseInt(num5)% 3 == 0 && temp4 == '0'){
  revealHeader.innerHTML = 'Fast da!';
  text.innerHTML = 'Beim nächsten Mal bist du besser :)';
  reveal.style.left = '-160px';
  funNext();
}
else if (parseInt(num5) % 3 == 0 && temp4 == '2'){
  revealHeader.innerHTML = 'Sehr gut!';
  text.innerHTML = 'Du hast 2 von 3 Fragen richtig beantwortet';
  text.style.color = '#6C2273';
  revealHeader.style.color = '#6C2273';
  reveal.style.left = '-160px';
  funNext();
}
else if (parseInt(num5) % 3 == 0 && temp4 == '3'){
  revealHeader.innerHTML = 'Glückwunsch!';
  text.innerHTML = 'Du hast alle Fragen richtig beantwortet - nicht schlecht!';
  text.style.color = '#6C2273';
  revealHeader.style.color = '#6C2273';
  reveal.style.left = '-160px';
  funNext();
}
else if (parseInt(num5) > 3 && temp4 > 3){
  revealHeader.innerHTML = 'UPS!';
  text.innerHTML = 'Es ist etwas schiefgelaufen - Wir entschuldigen uns';
  text.style.color = '#6C2273';
  revealHeader.style.color = '#6C2273';
  reveal.style.left = '-160px';
  funNext();
}


}


function showNext(){
player.style.display = 'flex';
countP.innerHTML = `Du bist der/die ${((parseInt(num5)/ 3)+1)} Spieler/in`;
setTimeout(() => {
restart();
}, 4000);
}




function funNext(){

  localStorage.removeItem("playedRight");

  setTimeout(() => {
    showNext();
  }, 4500);

}



let percent;


