function expression(str){
	let stack = new Array();	
	let signs = str.split(' ')
	let out = '';
	let priority= new Object();
	priority['('] = 0; priority[')'] = 0;
	priority['+'] = 1; priority['-'] = 1;
	priority['/'] = 2; priority['*'] = 2;
	priority['^'] = 3;
	for(let i = 0; i < signs.length; i++){
		if (!isNaN(signs[i])){
			out += signs[i];
			continue;
		}
		switch (signs[i]){
			case '^' :
				stack.push(signs[i]);
				break;
			case '(' :
				stack.push(signs[i]);
				break;
			case ')' :
				while(stack.at(-1) != '(')
				out += stack.pop();
				stack.pop();
				break;
			default :
				let one = stack.at(-1);
				if (stack.length == 0) 
					stack.push(signs[i]);
				else {
					if (priority[signs[i]] > priority[one]) 
						stack.push(signs[i]);
					if (priority[signs[i]] == priority[one]){
						out += one;
						stack.pop();
						stack.push(signs[i]);
					}
					if (priority[signs[i]] < priority[one]) {
						while (priority[signs[i]] <= priority[stack.at(-1)])
							out += stack.pop();
						stack.push(signs[i]);
					}
				}
				break;
			}
		}
	while(stack.length !== 0)
		out += stack.pop();
	return out;
}

function reverses(s) {
	let stack = new Array();
    let signs = s.split("");
    if(signs == '')
        return 0;
    for(i = 0; i < signs.length; i++) {
        if(!isNaN(signs[i])){
            stack.push(signs[i]);
			continue;
		}
		let n1 = parseInt(stack.pop());
        let n2 = parseInt(stack.pop());
		let result;
		switch (signs[i]){
			case '-' : 
			 result = n2 - n1;
			 break;
			case '+' :
			 result = n1 + n2;
			 break;
			case '/' :
			 result = n2 / n1;
			 break;
			case '*' :
			 result = n1 * n2;
			 break;
			case '^' :
			 result = Math.pow(n2, n1);
			}
			stack.push(result);
    }
    return stack[0];
}
let str = '( 2 + 2 * ( 6 / 2 ) ^ 2 ^ 3 + 9 - 3 ) / 2';
let s = expression(str);
console.log(s);
let degree = str.replaceAll("^", "**");
let res = reverses(s);
if (eval(degree) == res)
    console.log("Result:");
else {
	console.log("Error");
}
console.log(res);