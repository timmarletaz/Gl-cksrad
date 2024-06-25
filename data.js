for (let i = 1; i <= 18; i++){
  var wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  wrapper.id = `wrapper${i}`;
  document.querySelector("form").appendChild(wrapper);

  var question = document.createElement("input");
  question.setAttribute("placeholder", `${i}. Frage`);
  question.type = 'text';
  question.classList.add("question");
  question.required = true;
  wrapper.appendChild(question);

  for (let y = 1; y <= 3; y++){
  var option = document.createElement("input");
  option.setAttribute("placeholder", `${y}. Option`);
  option.type = 'text';
  if (y == 1){
      option.classList.add("option1"); 
  }
  else if (y == 2){
    option.classList.add("option2"); 
  }
  else if (y == 3){
    option.classList.add("option3");
  }

  wrapper.appendChild(option);
  option.required = true;
  } 

  var num = document.createElement("input");
  num.type = 'number';
  num.classList.add("number");
  num.setAttribute("max", "3");
  num.setAttribute("min", "1");
  num.required = true;
  num.value = '1';
  wrapper.append(num);
}

  var submit = document.createElement("button");
  submit.type = 'submit';
  submit.innerHTML = 'Speichern';
  document.querySelector("form").appendChild(submit);


  let arr = [];
  var optionsTemp = [];
  var answersTemp = [];


document.querySelector("form").addEventListener("submit", function(event){
  event.preventDefault();
  
  for (let i = 1; i <= 18; i++){
      

    var currQuestion = document.querySelector("#wrapper" + i + " .question").value;
    arr.push(currQuestion);

      var a = document.querySelector("#wrapper" + i + " .option1").value;
      var b = document.querySelector("#wrapper" + i + " .option2").value;
      var c = document.querySelector("#wrapper" + i + " .option3").value;

      optionsTemp.push({
        A: a,
        B: b,
        C: c
      });

      var right = document.querySelector("#wrapper" + i + " .number").value;

      switch(right){
        case '1':
                answersTemp.push(a);
                break;
        case '2': 
                answersTemp.push(b);
                break;
        case '3': 
                answersTemp.push(c);
                break;
      }

    }    


    localStorage.setItem("arr", JSON.stringify(arr));
    localStorage.setItem("options", JSON.stringify(optionsTemp));
    localStorage.setItem("answers", JSON.stringify(answersTemp));
});



var questions = JSON.parse(localStorage.getItem("arr"));
var options = JSON.parse(localStorage.getItem("arr"));
var answers = JSON.parse(localStorage.getItem("answers"));
