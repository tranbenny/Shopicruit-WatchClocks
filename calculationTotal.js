'use strict'; 

var http = require('http');

/**
 * calculates the total price of all products in certain categories from Shopicruit store
 * @param {Array} tags - list of categories
 * @param {number} start - start page
 * @param {number} end - end page
 * @return	{Promise} - returns the total sum of prices when promise finishes 
 */
function calculateCategoryProducts(tags, start, end) {

	const HOST = 'shopicruit.myshopify.com';
	const PATH = '/products.json?page=';

	function calculate(item, page) {
		return new Promise((resolve, reject) => {
			http.get({
				'host' : HOST,
				'path' : PATH + (page + start) 
			}, function(response) {
				
				var body = '';
				var total = 0;

				response.on('data', function(d) {
					body += d;
				});

				response.on('end', function() {
					var parsed = JSON.parse(body);
					if (parsed['products'].length == 0) {
						// last page
						resolve(0);
					} else {
						var prices = [];
						parsed['products'].forEach((x) => {
							if (x['product_type'] == 'Watch' || x['product_type'] == 'Clock') {
								let variants = x['variants'];
								variants.forEach((type) => {
									var nextPrice = Number(type['price']);
									total += nextPrice;
									// round to 2 decimal places 
									total = Number(Math.round(total + 'e' + 2) + 'e-' + 2);
								});
							}
						});
						resolve(total);
					}
				});

			});

		});
	}

	var capacity = end - start + 1; 
	var pages = new Array(capacity).fill(0);

	return Promise.all(
		pages.map(calculate)
	).then(values => {
		var sum = values.reduce((a, b) => {
			var total = a + b;
			return Number(Math.round(total + 'e' + 2) + 'e-' + 2);
		}, 0);
		return sum;
	});
	
}

module.exports = calculateCategoryProducts;