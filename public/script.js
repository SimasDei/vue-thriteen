new Vue({
	el: "#app",
	data: {
		total: 0,
		products: [
			{
				title: "Product 1",
				id: "1",
				price: 9.99,
			},
			{
				title: "Product 2",
				id: "2",
				price: 9.99,
			},
			{
				title: "Product 3",
				id: "3",
				price: 9.99,
			},
			{
				title: "Product 4",
				id: "4",
				price: 9.99,
			},
		],
		cart: [],
	},
	methods: {
		addToCart: function(product) {
			this.total += product.price;
			let found = false;

			for (let i = 0; i < this.cart.length; i++) {
				if (this.cart[i].id === product.id) {
					this.cart[i].quantity++;
					found = true;
				}
			}
			if (!found) {
				this.cart.push({
					id: product.id,
					title: product.title,
					price: product.price,
					quantity: 1,
				});
			}
		},
		increment: function(item) {
			item.quantity++;
			this.total += item.price;
		},
		decrement: function(item) {
			if (item.quantity <= 1) {
				let i = this.cart.indexOf(item);
				this.cart.splice(i, 1);
			}
			item.quantity--;
			this.total -= item.price;
		},
	},
	filters: {
		currency: function(price) {
			return `$ ${price.toFixed(2)}`;
		},
	},
});
