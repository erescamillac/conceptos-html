/*-- Creado por Erick Escamilla Charco --*/
/* 
    Inspirado en el Tutorial:
        https://www.youtube.com/watch?v=CI2GwL--ll8
*/

/* Modfied by Erick Escamilla C. */

function getHistory(){
    return document.getElementById("history-value").innerText;
}

// mathExpression: <string>
// mathExpression example: "9*9+15"
function printHistory(mathExpression){
    document.getElementById("history-value").innerText = mathExpression;
}

function getOutput(){
    return document.getElementById("output-value").innerText;
}

// ideal (num) as <string> || <Number>
function printOutput(num){
    // document.getElementById("output-value").innerText = num;
    if( num == "" ){
        document.getElementById("output-value").innerText = num;
    }else if( esNumero(num) ){
        document.getElementById("output-value").innerText = num.toLocaleString();
    }else{
        document.getElementById("output-value").innerText = getFormattedNumber(num);
    }
}

function getFormattedNumber(num){
    if( num == "-" ){
        return "";
    }

    if( !num.includes('\xB0') && !num.includes("F") ){
        let n = Number(num)
        let value = n.toLocaleString( );
        // value : <string>, cadena formateada según la información de locale especificada como ARG en el método .toLocaleString()
        // si se omite ARG al llamar a .toLocaleString() se emplea el [locale] el [runtime] de JS utilizado (Browser / Navegador)
        return value;
    }else{
        return num;
    }

}

// <num> : <string>
/* -- Toma [num] como String y lo convierte en un objeto de Clase Number equivalente --*/
function reverseNumberFormat(num){
    return Number( num.replace(/,/g,'') );
}
// alert(getHistory);

// agegrar Listener o todos los Botones de Operación 

var operatorButtons = document.getElementsByClassName("operator");

for(var i = 0; i < operatorButtons.length; i++){
    operatorButtons[i].addEventListener('click', function(){
        // <button class="operator" id="+">+</button>
        // La REF <this> 'apunta' hacia el <button> [DOM] al cual el 'EventListener' está Asociado
        // ,es decir, <this> 'apunta' hacia el <button> [DOM] SOBRE EL CUAL SE HIZÓ Clic
        // this.ID accede al valor del Att [id] del Elemento <button>
        // alert( "The operator clicked: " + this.id );
        // alert( "The operator clicked: " + this.id );
        // console.log( "The operator clicked: " + this.id );

    });
}

var numberKeys = document.getElementsByClassName("number");
// var numberKeys = document.querySelector( ".number" );

console.log( numberKeys );

console.log( "--INI: Asociacion de EventListener to numberKeys..." );
console.log( "numberKeys.length : {" + numberKeys.length + "}" );

for(var i = 0; i < numberKeys.length; i++){
    console.log( "valor de i: " + i);
    console.log( numberKeys[i] );
    numberKeys[i].addEventListener("click", function(){
        console.log( "Se hizo clic en un número..." );
        // alert( "The number clicked: " + this.id );
        var output = reverseNumberFormat( getOutput() );
        // [output] : <Number> Almacena el 'valor Actual' de salida en el 'Display' de la calculadora
        if( output != NaN ){ // Si [output] es un Número
            // Concatenar el [id] del Número presionado por el usuario
            output = output + this.id;
            printOutput( output );
        }
    });
}

console.log( "++FIN: Asociación de EventListener to numberKeys..." );

function operatorHandler( strOperator ){
    console.log( "operatorHandler; operador [" + strOperator + "]" );
    if(strOperator == "clear"){
        printHistory("");
        printOutput("");
    } else if(strOperator == "backspace"){
        var output = reverseNumberFormat(getOutput()).toString();
        if(output){ // Si [output] TIENE UN VALOR
            output = output.substring(0, output.length-1);
            printOutput( output );
        }
    }else{
        var output = getOutput();
        var history = getHistory();
        console.log( "Current HISTORY :: { " + history + " }!!!!");
        if(output=="" && history!=""){
            if( !history.includes("(") && !history.includes(")") ){
                if(isNaN(history[history.length-1])){
                    history= history.substring(0,history.length-1);
                }
            }
        }
        if(output!="" || history!=""){
            output= output=="" ? output : reverseNumberFormat(output);

            if( !history.includes("sin") && !history.includes("cos") && !history.includes("tan") ){
                history = history + output;
            }
            
            if(strOperator == "="){
                console.log( "Se presiono el Simbolo de ['='] se procede a EVALUAR la Expresion {" + history + "}" );
                var result = evaluarExpresion(history);
                printOutput(result);
                printHistory("");
            }
            else{
                console.log( "Se presiono OTRO OPERADOR (que NO es el de IGUAL)" );
                console.log( "Se presiono el OPERADOR << " + strOperator + " >>" );
                if( strOperator != "f-to-c" && strOperator != "c-to-f" ){
                    // -- Operadores 'NORMALES' (que NO tienen que ver con la conversión de grados)
                    // al [history] Actual SOLO se le concatena el Operador presionado...
                    history = history + strOperator;
                    
                }else if( strOperator == "f-to-c"){
                    // Obtener salida similar a 'f-to-c(145)'
                    history = "f-to-c(" + history + ")";
                    
                }else if( strOperator == "c-to-f"){
                    // Obtener salida similar a 'c-to-f(67)'
                    history = "c-to-f(" + history + ")";
                }

                console.log( "Printing HISTORY :: { " + history + " }..." );

                printHistory( history );
                printOutput("");
                
            }
        }
    } // -- FIN : else resto de los operadores

}

function evaluarExpresion( strMathExpression ){
    let radians;
    console.log( "EVALUATE (eec) :: [[ " + strMathExpression + " ]]" );
    if( !strMathExpression.includes("sin") && !strMathExpression.includes("cos") && !strMathExpression.includes("tan") 
        && !strMathExpression.includes("f-to-c") && !strMathExpression.includes("c-to-f") 
        && !strMathExpression.includes("^") 
        && !strMathExpression.includes("sin")
        && !strMathExpression.includes("cos")
        && !strMathExpression.includes("tan") ){
        // La función eval() evalúa un código JavaScript representado como una cadena de caracteres (string)
        // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/eval
        return eval( strMathExpression );
    }else if( strMathExpression.includes("f-to-c") ){
        console.log( "Se trata de conversión de Farenheit a Celsius" );
        strMathExpression = strMathExpression.replace( "f-to-c", "" );
        strMathExpression = strMathExpression.replace( "(", "" );
        strMathExpression = strMathExpression.replace( ")", "" );
        console.log( "Clean Farenheit number (as a String) : [" + strMathExpression + "]" );
        // Convert strMathExpression to Number
        let f = Number( strMathExpression );
        /*
            Farenheit to Celsius

            c = (f - 32) * (5/9);
            "" + '\xB0C'
        */
       var c = (f - 32) * (5/9);
       // return c;
       return c.toFixed(3) + '\xB0C';
    }else if( strMathExpression.includes("c-to-f") ){
        console.log( "Se trata de conversión de Celsius a Farenheit" );
        strMathExpression = strMathExpression.replace( "c-to-f", "" );
        strMathExpression = strMathExpression.replace( "(", "" );
        strMathExpression = strMathExpression.replace( ")", "");
        console.log( "Clean Celsius number (as a String) : [" + strMathExpression + "]" );
        /*
            Celsius to Fahrenheit

            f = (c * (9/5)) + 32;
            "" + " F";
        */
        let c = Number( strMathExpression );
        var f = ( c * (9/5) ) + 32;
        return f.toFixed(3) + " F";
    }else if( strMathExpression.includes("^") ){
        console.log( "Se trata de Elevar a una POTENCIA [ " + strMathExpression + " ]" );
        // str.split()
        let operandosPotencia = strMathExpression.split("^");
        console.log( "operandosPotencia :: { " + operandosPotencia + "}");

        if( operandosPotencia.length >= 2 ){
            if( esNumero(operandosPotencia[0]) && esNumero(operandosPotencia[1]) ){
                // base y exp. son NÚMEROS, se puede proceder a calcular...
                let base = Number(operandosPotencia[0]);
                let expo = Number(operandosPotencia[1]);
                return Math.pow(base, expo).toFixed(2);
            }else{
                let errMsg = "";
                if( !esNumero(operandosPotencia[0]) ){
                    errMsg = errMsg + "El arg 1 [" + operandosPotencia[0] + "] NO es numérico.";
                }

                if( !esNumero(operandosPotencia[1]) ){
                    errMsg = errMsg + " El arg 2 [" + operandosPotencia[1] + " NO es numérico.";
                }
                return errMsg;
            }
        }else{
            return "Se necesitan 2 args. p. Eval. POTENCIA (" + operandosPotencia.length + ")";
        }

    }else if( strMathExpression.includes("sin") ){
        strMathExpression = strMathExpression.replaceAll( "sin", "" );
        strMathExpression = strMathExpression.replaceAll( "(", "" );
        strMathExpression = strMathExpression.replaceAll( ")", "" );
        console.log( "Valor Original del Ángulo en GRADOS : [ " + strMathExpression + " ]" );
        // grados a RAD :: degreesToRad()
        radians = degreesToRad( strMathExpression );
        // Calcular SIN
        console.log( "SIN-rad(" + radians + ") == [" + Math.sin(radians) + "]" );
        return Math.sin( radians );
    }else if( strMathExpression.includes("cos") ){
        strMathExpression = strMathExpression.replaceAll( "cos", "" );
        strMathExpression = strMathExpression.replaceAll( "(", "" );
        strMathExpression = strMathExpression.replaceAll( ")", "" );
        console.log( "Valor Original del Ángulo en GRADOS : [ " + strMathExpression + " ]" );
        radians = degreesToRad( strMathExpression );
        // Calcular COS
        console.log( "COS-rad(" + radians + ") == [" + Math.cos(radians) + "]" );
        return Math.cos( radians );
    }else if( strMathExpression.includes("tan") ){
        strMathExpression = strMathExpression.replaceAll( "tan", "" );
        strMathExpression = strMathExpression.replaceAll( "(", "" );
        strMathExpression = strMathExpression.replaceAll( ")", "" );
        console.log( "Valor original del Ángulo en GRADOS : [ " + strMathExpression + " ]" );
        radians = degreesToRad( strMathExpression );
        // Calcular TAN
        console.log( "TAN-rad(" + radians + ") == [" + Math.tan(radians) + "]" );
        return Math.tan(radians);
    }else{
        return "-NO es posible Evaluar la Expr {" + strMathExpression + "}-";
    }
}

function degreesToRad(degrees){
    let nDegrees, rad;
    if( esNumero(degrees) ){
        // OK - continuar con conversión a RAD
        nDegrees = Number(degrees);
        rad = nDegrees * ( Math.PI / 180 );
        return rad;
    }else{
        return 0;
    }
}

function esNumero( valor ){
    return !Number.isNaN( valor );
}

function radioBtnHandler(){
    console.log( "radioBtnHandler ..." );
    let output = getOutput();
    let history = getHistory();

    /*--INI: Determinar el RadioButton seleccionado --*/
    var radioButtons = document.getElementsByName( 'grupo-trigo' );
    var valorRadioSelecc;
              
            for(i = 0; i < radioButtons.length; i++) {
                if(radioButtons[i].checked){
                    /*-- --*/
                    valorRadioSelecc = radioButtons[i].value;
                    console.log( "valorRadioSelecc: [ " + valorRadioSelecc + " ]" );
                }
                /*
                    document.getElementById("result").innerHTML
                        = "Gender: "+ele[i].value;
                */
                
            }
    /*++FIN: Determianr el RadioButton seleccionado ++*/

    console.log( "Valor Seleccionado EEC: [[ " + valorRadioSelecc + " ]]" );

    // [history] || [output]
    // [output] Actual ...

    console.log( "output actual: [[ " + output + " ]]" );

    if( output != "" ){
        // cambiar [history] sin(xxx), or cos(xxx), or tan(xxx)
        history =  valorRadioSelecc + "(" +  output + ")";
        printHistory( history );
        // printHistory()
    }

    history = getHistory();

    if( history != "" ){
        if( history.includes("sin") ){
            history = history.replaceAll( "sin", valorRadioSelecc );
        }else if( history.includes("cos") ){
            history = history.replaceAll( "cos", valorRadioSelecc );
        }else if( history.includes("tan") ){
            history = history.replaceAll( "tan", valorRadioSelecc );
        }
        printHistory(history);
    }

}

function numberHandler( numeroPresionado ){
    console.log( "numberHandler" );
    // console.log( "Se hizo clic en un número..." );
    // this.id VS. [(numeroPresionado)]
    console.log( "numberHandler (" +  numeroPresionado + ")" );
    var output = reverseNumberFormat( getOutput() );
    if( output != NaN ){ // SI [output] es un número
        output = output + numeroPresionado;
        printOutput( output );
    }
}

/*
const vals2 = output2.querySelectorAll('div');
vals2.forEach((element)=>{
	element.addEventListener("click", (e)=>{
		console.log(element.className);
	}, true);
})
*/

/*
var botones = document.querySelectorAll('button');
console.log( "botones :: " + botones );
botones.forEach( (el)=>{
    el.addEventListener("click", (e)=>{
        console.log( el.className );
    }, true);
})
*/
