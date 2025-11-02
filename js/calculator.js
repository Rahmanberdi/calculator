
    let input_1 = "";
    let input_2 = "";
    let history = "";
    let ops="";
    let last_num = 0;
    let math_ops = ['+','-','×','÷','%'];
    let calc_ops = ['C','backspace','=','+/-'];

    function updateDisplay(value,display){
        if (display === 1){
            document.querySelector('div.display-main').innerText = value;
        }else{
            document.querySelector('div.display-secondary').innerText = value;
        }
    }
    function handleInputKey(key) {
            if (!isNaN(key) || (key === "." && !input_1.includes('.'))) {
                input_1 += key;
                updateDisplay(input_1,1);
            }else if (math_ops.includes(key)) {
                if (input_2==="" && input_1!==""){
                    input_2 = input_1;
                    history += Number(input_2)+key;
                    updateDisplay(history,2);
                    input_1 = "";
                    ops = key;
                }else if (input_2!=="" && input_1!==""){
                    input_2 = calculate(input_2,input_1,ops);
                    if (isNaN(history[history.length-1])){
                        history+=Number(input_1);
                    }else{
                        history+=ops+Number(input_1);
                    }
                    updateDisplay(input_2,1);
                    updateDisplay(history,2);
                    history = ""+Number(input_1);
                    ops = key;
                    input_1 = "";
                }else if (input_2!=="" && input_1===""){
                    ops = key;
                }
            }else if (calc_ops.includes(key)){
                if (input_1!=="" && input_2!=="" && key==='='){
                    result = calculate(input_2,input_1,ops);
                    last_num = input_1;
                    input_2 = result;

                    if (isNaN(history[history.length-1])){
                        history+=Number(input_1);
                    }else{
                        history+=ops+Number(input_1);
                    }
                    updateDisplay(result,1);
                    updateDisplay(history,2);
                    input_1 = "";
                    history = ""+Number(input_2);

                }else if (input_1==="" && input_2!=="" && key==='='){
                    result = calculate(input_2,last_num,ops);
                    input_2 = result;
                    history = '';
                    updateDisplay(result,1);
                    updateDisplay(history,2);
                    history = ""+Number(input_2);
                }
                else{
                    if (key==='backspace'){
                        input_1 = input_1.substring(0,input_1.length-1);
                    }else if(key==='C'){
                        input_1 = '';
                        input_2 = '';
                        ops = '';
                        history = '';
                        updateDisplay(history,2);
                    }else if(key==='+/-'){
                        input_1 = input_1*(-1);
                    }
                    updateDisplay(input_1,1);
                }

            } else updateDisplay(input_1,1);
    }


    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            let value = btn.textContent.trim();

            // Map your display symbols to actual operators

            if (btn.id === "backspace") value = "backspace";

            handleInputKey(value);
        });
    });
    document.addEventListener("keydown", (e) => {
        let key = e.key;

        if (key === "Enter") key = '=';
        else if (key === "Backspace") key = 'backspace';
        else if (key === "Delete") key = 'C';
        if (math_ops.includes(key) || calc_ops.includes(key) || key === "." || !isNaN(Number(key))){
            handleInputKey(key);
        }

    })
function calculate(a,b,action){
            let result;
            a=Number(a);
            b=Number(b);
            if (action ==="+") {
                result = a+b;
            }else if(action==="-") {
                result = a-b;
            }else if(action==="×") {
                result = a*b;
            }else if(action==="÷") {
                result = a/b;
            }else if (action==='%'){
                result = a*b/100;
            }
            return result;
}