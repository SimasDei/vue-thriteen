const LOAD_NUM = 4;
let watcher;
new Vue({
	el: "#app",
	data: {
		total: 0,
		products: [],
		cart: [],
		search: "",
		lastSearch: "",
		loading: false,
		results: [],
	},
	created() {
		this.search = "dog";
		this.onSubmit();
	},
	beforeUpdate() {
		if (watcher) {
			watcher.destroy();
			wather = null;
		}
	},
	updated() {
		const sensor = document.querySelector("#product-list-bottom");
		watcher = scrollMonitor.create(sensor);

		watcher.enterViewport(this.appendResults);
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
			this.results = [];
			this.loading = true;
			const path = `/search?q=${this.search}`;
			this.$http.get(path).then(res => {
				this.loading = false;
				this.results = res.body;
				this.lastSearch = this.search;
				this.appendResults();
			});
		},
		appendResults() {
			if (this.products.length < this.results.length) {
				const toAppend = this.results.slice(this.products.length, LOAD_NUM + this.products.length);
				this.products = this.products.concat(toAppend);
			}
		},
	},
	filters: {
		currency: function(price) {
			return `$ ${price.toFixed(2)}`;
		},
	},
});
