new Vue({
	el: "#app",
	data: {
		total: 0,
		products: [],
		cart: [],
		search: "",
		lastSearch: "",
		loading: false,
	},
	created() {
		this.search = "dog";
		this.onSubmit();
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
		onSubmit: function() {
			this.products = [];
			this.loading = true;
			const path = `/search?q=${this.search}`;
			this.$http.get(path).then(res => {
				this.loading = false;
				this.products = res.body;
				this.lastSearch = this.search;
			});
		},
	},
	filters: {
		currency: function(price) {
			return `$ ${price.toFixed(2)}`;
		},
	},
});
