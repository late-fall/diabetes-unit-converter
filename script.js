let unitType = document.getElementById("change");
let glc = document.getElementById("glucose");
let output = document.querySelector(".output");
let lang = document.querySelector('input[name="lang"]:checked').value;

function changeLang() {
    lang = document.querySelector('input[name="lang"]:checked').value;
    if (lang == "eng"){
        document.querySelector('title').innerHTML = "Glucose Unit Converter";
        document.querySelector('h1').innerHTML = "Glucose Unit Converter";
        document.querySelector('.firstbox').innerHTML = "Fasting Sugar";
        document.querySelector('.secondbox').innerHTML = "2h post 75g sugar";
        document.querySelector('#glucose').placeholder = "Enter mg/dL";
    }
    else{
        document.querySelector('title').innerHTML = "당뇨 혈당 수치 변환기";
        document.querySelector('h1').innerHTML = "당뇨 혈당 수치 변환기";
        document.querySelector('.firstbox').innerHTML = "공복";
        document.querySelector('.secondbox').innerHTML = "당75g 후 2시간";
        document.querySelector('#glucose').placeholder = "mg/dL 입력";
    }
}

function calc() {
    
    let mmol, result = 0;
    let before, after, dx = "";

    if (unitType.checked){
        result = (glc.value * 18.018).toFixed(2);
        before = " mmol/L";
        after = " mg/dL";
        mmol = glc.value;
    }
    else {
        result = (glc.value * 0.0555).toFixed(2);
        before = " mg/dL";
        after = " mmol/L";
        mmol = result;
    }

    output.style.display = 'initial';

    if (glc.value == ''){
        output.style.display = 'none';
    }

    if (document.querySelector('input[name="lang"]:checked').value == "kor"){
        document.getElementById("final").innerHTML = 
        glc.value + before + "는 " + result + after + "입니다.";
    }
    else{
        document.getElementById("final").innerHTML = 
        glc.value + before + " is " + result + after;
    }

    if (document.querySelector('input[name="glc"]:checked').value=='0'){
        if (mmol >= 7.0){
            if (document.querySelector('input[name="lang"]:checked').value == "kor"){
                dx = "<span class='emphasis'>당뇨</span>입니다.";
            }
            else{
                dx = "you may have <span class='emphasis'>Diabetes</span>"
            }
        }
        else if (mmol >= 6.1){
            if (document.querySelector('input[name="lang"]:checked').value == "kor"){
                dx = "<span class='emphasis'>예비당뇨</span>입니다.";
            }
            else{
                dx = "you may have <span class='emphasis'>Prediabetes</span>"
            }
        }
        else {
            if (document.querySelector('input[name="lang"]:checked').value == "kor"){
                dx = "<span class='emphasis'>당뇨가 아닙니다.</span>";
            }
            else{
                dx = "<span class='emphasis'>your result shows you don't have diabetes.</span>"
            }
        }
    }
    else {
        if (mmol >= 11.1){
            if (document.querySelector('input[name="lang"]:checked').value == "kor"){
                dx = "<span class='emphasis'>당뇨</span>입니다.";
            }
            else{
                dx = "you may have <span class='emphasis'>Diabetes</span>"
            }
        }
        else if (mmol >= 7.8){
            if (document.querySelector('input[name="lang"]:checked').value == "kor"){
                dx = "<span class='emphasis'>예비당뇨</span>입니다.";
            }
            else{
                dx = "you may have <span class='emphasis'>Prediabetes</span>"
            }
        }
        else {
            if (document.querySelector('input[name="lang"]:checked').value == "kor"){
                dx = "<span class='emphasis'>당뇨가 아닙니다.</span>";
            }
            else{
                dx = "<span class='emphasis'>your result shows you don't have diabetes.</span>"
            }
        }
    }
    if (document.querySelector('input[name="lang"]:checked').value == "kor"){
        document.getElementById("interpret").innerHTML =
        "캐나다 당뇨협회 기준으로 " + dx;
    }
    else{
        document.getElementById("interpret").innerHTML =
        "According to Canadian Diabetes guidelines, " + dx;
    }

}

//calculate and show results when user input data.
glc.addEventListener('input', calc);

//change placeholder depending on the unit. Recalculate results and show
unitType.addEventListener('change', function(){
    if (document.querySelector('input[name="lang"]:checked').value == "kor"){
        if (this.checked)glc.placeholder = "mmol/L 입력";
        else glc.placeholder = "mg/dL 입력";
    }
    else {
        if (this.checked)glc.placeholder = "Enter mmol/L";
        else glc.placeholder = "Enter mg/dL";        
    }
    calc();
});

document.querySelectorAll('input[name="lang"]').forEach((elem)=>{
    elem.addEventListener('change',function(){
        calc();
        changeLang();
    });
});

//event lisnter for glucose measure timing
document.querySelectorAll('input[name="glc"]').forEach((elem)=>{
    elem.addEventListener('change',function(){
        calc();
    });
})


//disable right click
window.addEventListener('contextmenu', function (e) { 
    e.preventDefault(); 
  }, false);