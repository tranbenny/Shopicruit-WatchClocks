var calculator = require('./calculationTotal');
var listCalculator = require('./calculationList');

// value = 2290.74
var value = calculator(['Watch', 'Clock'], 1, 5).then((x) => {
	return x;
});

var prices = listCalculator(['Watch', 'Clock'], 1, 5).then((x) => {
	return x;
});




