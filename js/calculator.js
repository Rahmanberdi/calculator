
    let input_1 ="";
    let input_2 ="";
    let old_ops="";
    const numbers = document.querySelectorAll('button.number');
    numbers.forEach(number => {
        number.addEventListener("click", () => {
            input_1 = input_1+number.textContent;
            document.querySelector('div.display-main').innerText = input_1;
        })
    })
    const operators  = document.querySelectorAll('button.operator');
    operators.forEach(operator => {
        operator.addEventListener("click", () => {
            if (operator.textContent==='C'){
                input_1='';
                input_2='';
                document.querySelector('div.display-main').innerText = input_1;
                old_ops ='';
            }else if(operator.id==='clear'){
                input_1=input_1.substring(0,input_1.length-1);
                document.querySelector('div.display-main').innerText = input_1;
            }
            else if (input_2 !== "" && operator.textContent!=='+/-') {
                calculator(Number(input_1),Number(input_2),old_ops,operator.textContent);
            }
            else if(operator.textContent==='+/-'){
                input_1=input_1*(-1);
                document.querySelector('div.display-main').innerText = input_1;
            }
            else if(operator.textContent!=='='){
                input_2 = input_1;
                old_ops = operator.textContent;
                input_1 = "";
            }


        })
    })

function calculator(a,b,ops,action){


            if (ops ==="+") {
                input_2 = b+a;
            }else if(ops==="-") {
                input_2 = b-a;
            }else if(ops==="×") {
                input_2 = a*b;
            }else if(ops==="÷") {
                input_2 = b/a;
            }else if (ops==='%'){
                input_2 = b*a/100;
            }
            if (action==='=' && old_ops !== "") {
                document.querySelector('div.display-main').innerText = input_2;
                input_1 = input_2;
                input_2 = "";
                old_ops="";
            }else{
                document.querySelector('div.display-main').innerText = input_2;
                input_1 = "";
                old_ops=action;
            }

}