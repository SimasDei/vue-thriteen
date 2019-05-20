new Vue({
	el: "#app",
	data: {
		total: 0,
		products: [
			{
				title: "Product 1",
			},
			{
				title: "Product 2",
			},
			{
				title: "Product 3",
			},
			{
				title: "Product 4",
			},
		],
	},
	methods: {
		addToCart: function() {
			this.total += 9.99;
		},
	},
});
