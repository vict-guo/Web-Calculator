//'use strict'

var ans = "0";
var header = true;

function toggle(){
	var list = document.querySelectorAll(".adv");
	for(var i = 0; i < list.length; i++){
		if(list[i].style.display == 'inline')
          list[i].style.display = 'none';
       	else
          list[i].style.display = 'inline';
	}
	
	if(header){
		document.getElementById("head").innerHTML = "Advanced Calculator";
		header = false;
	}
	else{
		document.getElementById("head").innerHTML = "Basic Calculator";
		header = true;
	}
}

function button(value){
	//console.log(value);
	document.getElementById("display").value += value;
	
}

function clearDisplay(){
	document.getElementById("display").value = "";
}

function back(){
	document.getElementById("display").value = document.getElementById("display").value.substring(0,document.getElementById("display").value.length-1);
}

function prevAns(){
	document.getElementById("display").value += ans;
}

function equals(){
	var exp = document.getElementById("display").value;
	if(possible(format(exp.trim()))){
		var disp = evalFunction(format(exp.trim()));
		console.log(format(exp).toString());
		if(disp != "NaN" && disp != "Syntax Error"){
			ans = disp;
		}
		var view = disp.toString().substring(0,Math.min(ans.toString().length,25));
		

		document.getElementById("display").value = view;
	}
	else{
		document.getElementById("display").value = "Syntax Error";
	}
}

function append(value){
	document.getElementById("display").value += value;
}

var possible = function(value){
	var sum = 0;
	for(var i = 0; i < value.length; i++){
		if(value[i] == '(')
			sum++;
		else if(value[i] == ')')
			sum--;

		if(sum < 0){
			return false;
		}
	}
	return true;
}

var evalEvery = function(value){
	if(value.indexOf("^") != -1){
		r = value.indexOf("^");

	}
	else{
		return evalFunction(value);
	}
}

var evalFunction = function(value){
	var func = ["arcsin","arccos","sin","cos","tan","log"];
	for(var j = 0; j < 6; j++){
		if(value.indexOf(func[j]) != -1){
			var l = value.indexOf(func[j]);
			var r = value.length;
			var sum = 1;
			for(var i = l+4; i < value.length; i++){
				if(value[i] == '(')
					sum++;
				else if(value[i] == ')')
					sum--;
	
				if(sum == 0){
					r = i+1;
					break;
				}
			}
			if(j == 0)
				return evalFunction(value.substring(0,l) + Math.asin(evalBrackets(value.substring(l+6,r))).toString() + value.substring(r,value.length));
			else if(j == 1)
				return evalFunction(value.substring(0,l) + Math.acos(evalBrackets(value.substring(l+6,r))).toString() + value.substring(r,value.length));
			else if(j == 2)
				return evalFunction(value.substring(0,l) + Math.sin(evalBrackets(value.substring(l+3,r))).toString() + value.substring(r,value.length));
			else if(j == 3)
				return evalFunction(value.substring(0,l) + Math.cos(evalBrackets(value.substring(l+3,r))).toString() + value.substring(r,value.length));
			else if(j == 4)
				return evalFunction(value.substring(0,l) + Math.tan(evalBrackets(value.substring(l+3,r))).toString() + value.substring(r,value.length));
			else if(j == 5)
				return evalFunction(value.substring(0,l) + Math.log(evalBrackets(value.substring(l+3,r))).toString() + value.substring(r,value.length));
		}
	}
	return evalBrackets(value);
}
	


var evalBrackets = function(value){
	if(value.indexOf("(") == -1){
		console.log(value);
		return eval(value);
	}
	else{
		var l,r;
		if(value.indexOf(")") != -1){
			r = value.indexOf(")");
			for(var i = value.indexOf(")") - 1; i >= 0; i--){
				if(value[i] == '('){
					l = i;
					break;
				}
			}

			return evalBrackets(value.substring(0,l) + eval(value.substring(l+1,r)).toString() + value.substring(r+1,value.length));
		}
	}
}

var format = function(value){
	var str = "";
	var str1 = "";
	var check = false;
	for(var i = 0; i < value.length-1; i++){
		if(value[i] == ')' && value[i+1] == '('){
			str+=value[i] + "*"; 
		}
		else if(value[i] == 'P' && value[i+1] == 'I'){
			str+= Math.PI.toString();
			i++;
		}
		else if(value[i] == 'e'){
			str+= Math.E.toString();
		}
		else{
			str+=value[i];
		}
	}
	if(value[value.length-1] == 'e'){
		str += Math.E.toString();
	}
	else if(value[value.length-1] != 'I')
		str += value[value.length-1];

	for(var i = 0; i < str.length; i++){
		if(str[i] == '-' && i == 0){
			str1+="+-";
		}
		else if(str[i] == '-'){
			if(str[i-1] != '*' && str[i-1] != '/')
				str1+="+-";
			else
				str1+="-";
		}
		else{
			str1+=str[i];
		}
			
	}

	return str1;
		
}

var eval = function(value){
	if(value.indexOf("--") != -1){
		return eval(value.substring(0,value.indexOf("--"))+"+"+value.substring(value.indexOf("--")+2,value.length))
	}
	else if(value.indexOf("++") != -1){
		return eval(value.substring(0,value.indexOf("++"))+"+"+value.substring(value.indexOf("++")+2,value.length))
	}
	else if(value.indexOf("+") != -1){
		if(value.indexOf("+") != 0){
			return eval(value.substring(0,value.indexOf("+"))) + eval(value.substring(value.indexOf("+")+1,value.length));
		}
		else{
			return eval(value.substring(value.indexOf("+")+1,value.length))
		}
	}
	else if(value.indexOf("/") != -1){
		return eval(value.substring(0,value.indexOf("/"))) / eval(value.substring(value.indexOf("/")+1,value.length));
	}
	else if(value.indexOf("*") != -1){
		return eval(value.substring(0,value.indexOf("*"))) * eval(value.substring(value.indexOf("*")+1,value.length));
	}
	else if(value.indexOf("^") != -1){
		return Math.pow(eval(value.substring(0,value.indexOf("^"))),eval(value.substring(value.indexOf("^")+1,value.length)));
	}
	else{
		return parseFloat(value);
	}
}

var replace = function(val,vari,str){
	var tmp = "";
	for(var i = 0; i < str.length; i++){
		if(str[i] == vari){
			tmp+=val.toString();
		}
		else{
			tmp+=str[i];
		}
	}
	return tmp;
}

var graphFunction = function(){
	var c = document.getElementById("myCanvas");
	var ctx =  c.getContext("2d");
	ctx.clearRect(0,0,300,300);
	var exp = document.getElementById("texts").value;
	var min1 = -50.0;
	var max1 = 50.0;
	var inc = (max1-min1)/6000;
	for(var i = 0; i < 6000; i++){
		var str1 = replace(min1+inc*i,'x',exp);
		var disp = evalFunction(format(str1.trim()));
		
		ctx.fillRect(i/20,(150-disp*3)/2,0.5,0.5);
	}
	ctx.moveTo(0,150);
	ctx.lineTo(300,150);
	ctx.moveTo(150,0);
	ctx.lineTo(150,300);

}