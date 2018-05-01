function calculate() {
	var lines = document.getElementById("dataArea").value.split("\n");
	var empty = -1;
	var xData = [];
	var yData = [];
	var xyProduct = [];
	var xSquared = [];

	for (var i = 0; i < lines.length; i++) {
		var pair = lines[i].split(",");
		xData.push(parseInt(pair[0]));
		yData.push(parseInt(pair[1]));
		xyProduct.push(parseInt(pair[0])*parseInt(pair[1]));
		xSquared.push(parseInt(pair[0])*parseInt(pair[0]));
		empty++;
	}

	var top = lines.length*sigma_sum(xyProduct) - sigma_sum(xData)*sigma_sum(yData);
	var bottom = lines.length*sigma_sum(xSquared) - sigma_sum(xData)*sigma_sum(xData);
	var beta1 = top/bottom;

	top = sigma_sum(yData) - beta1*sigma_sum(xData);
	bottom = lines.length;
	var beta0 = top/bottom;

	beta0 = precisionRound(beta0,4);
	beta1 = precisionRound(beta1,4);

	if (empty === 0) {
		document.getElementById("answer").innerHTML = "There is no data set.";
	} else if (isNaN(beta1) || isNaN(beta0)) {
		document.getElementById("answer").innerHTML = "Syntax error.";
	}
	else {
		var intercept;		//string version of beta0
		var slope;			//string version of beta1

		if (beta1 < 0) {
			beta1 = negate(beta1);
			if (beta1 != 1)
				slope = "- " + beta1 + "x";
			else
				slope = "- " + "x"; 
		} else if (beta1 == 0) {
			slope = "";
		} else {
			if (beta0 != 0)
				slope = "+ " + beta1 + "x";
			else {
				if (beta1 != 1)
					slope = beta1 + "x";
				else 
					slope = "x";
			}
		}

		if (beta0 == 0) {
			intercept = "";
		} else {
			intercept = beta0 + " ";
		}
		document.getElementById("answer").innerHTML = "The line of best fit is y = " + intercept + slope;
	}
	if (!pointChecker(lines))
		document.getElementById("answer").innerHTML = "Data set suggests infinite possible lines; please add another distinct data pair."
	if (lines.length > 50)
		document.getElementById("answer").innerHTML = "Max data pairs is 50.";
}

function sigma_sum(nums) {
	var sum = 0;
	for (var i = 0; i < nums.length; i++) {
		sum = sum + parseInt(nums[i]);
	}
	return sum;
}

function negate(n) {
	return -n;
}

	//detects if the entire data set all refer to the same point
	//such scenario suggests infinite possible lines
function pointChecker(nums) {
	var points = [];
	points.push(nums[0]);
	for (var i = 1; i < nums.length; i++) {
		if (!points.includes(nums[i])) {
			points.push(nums[i])
			break;
		}
	}
	if (points.length > 1) return true;
	else return false;
}

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}