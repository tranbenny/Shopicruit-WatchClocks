'use strict';

/*
	- calculates sum of products from different pages in Shopicruit store
	- used for testing purposes
*/

var http = require('http');

function calculateCategoryProducts(tags, start, end) {
	
	const HOST = 'shopicruit.myshopify.com';
	const PATH = '/products.json?page=';

	var capacity = end - start + 1;
	var pages = new Array(capacity).fill(0);

	function calculate(item, page) {
		return new Promise(function(resolve, reject) {
			http.get({
				'host': HOST,
				'path': PATH + (page + 1)
			}, function(response) {
				var body = '';
				var total = 0;

				response.on('data', function(d) {
					body += d;
				});

				response.on('end', function() {
					var parsed = JSON.parse(body);
					if (parsed['products'].length == 0) {
						reject('no products listed');
					} else {
						var prices = [];
						parsed['products'].forEach((x) => {
							if (x['product_type'] == 'Watch' || x['product_type'] == 'Clock') {
								let variants = x['variants'];
								variants.forEach((type) => {
									var nextPrice = Number(type['price']);
									total += nextPrice;
								});
							}
						});
						resolve(total);
					}
				});
			});
		});
	}

	return Promise.all(
		pages.map(calculate)
	).then(values => {
		return values;
	});

}



module.exports = calculateCategoryProducts;