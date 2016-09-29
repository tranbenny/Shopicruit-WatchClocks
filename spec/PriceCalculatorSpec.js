describe('Watch/Clock Price Calculation Suite', function() {
	
	// main functions
	var calculator = require('../calculationTotal');
	var calculatorList = require('../calculationList');

	// calculated price for all watches and clocks 
	var value;

	beforeEach(function(done) {
		calculator(['Watch', 'Clock'], 1, 5).then(function(totalPrice) {
			value = totalPrice;
			done();
		});
	});

	it('should have loaded module', function() {
		expect(calculator).toBeDefined();
	});

	it('should calculate to two decimal places', function() {
		expect(value).toBeDefined();
		expect(value.toFixed(2)).toBe(String(value));
	});

	it('should calculate 0 for pages with no products', function(done) {
		calculator(['Watch', 'Clock'], 6, 10).then(function(price) {
			expect(price).toBe(0);
			done();
		});
	});


	describe('Second Calculation Method', function() {

		var pagePrices; 

		beforeEach(function(done) {
			calculatorList(['Watch', 'Clock'], 1, 5).then(function(prices) {
				pagePrices = prices;
				done();
			});
		});

		it('should calculate the same price when the answer is rounded at end', function() {
			var sum = pagePrices.reduce((a, b) => {
				return a + b
			}, 0);
			var roundedSum = Number(Math.round(sum + 'e' + 2) + 'e-' + 2);
			expect(value).toBe(roundedSum);

		});


	});	

});