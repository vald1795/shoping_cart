<template>
	<div class="v-product">

		<div class="photo">
			<img :src="require('../assets/images/' + selectedValue)" alt="img">
		</div>

		<div class="info">
			<div class="v-cart-name">
				<h1>{{product.name}}</h1>
				<h2 @click="togglePrice" v-if="trigger">{{euroPrice}} €</h2>
				<h2 class="price" @click="togglePrice" v-else>{{price}} $</h2>
			</div>
			<p>{{product.description}}</p>
			<p class="v-caption">NOTE</p>
			<p>{{product.note}}</p>
			<p class="v-caption">PLANTER STYLE</p>

			<select @change="selectValue()" id="select">
				<option value="balboa">
					<p>Balboa</p>
				</option>
				<option value="dolores">
					<p>Dolores</p>
				</option>
				<option value="grant">
					<p>Grant</p>
				</option>
				<option value="hyde">
					<p>Hyde</p>
				</option>
			</select>

			<p class="v-caption">SIZE</p>

			<div class="size">
				<button class="size-button">Small</button>
				<button class="size-button">Medium</button>
				<button class="size-guide size-button">Size Guide</button>
			</div>

			<p class="v-caption">PLANTER COLOR</p>

			<div class="color-box">
				<input type="radio" id="blackOption" name="color">
				<label for="blackOption">
					<div class="colors"></div>
					<span>Black</span>
				</label>
				<input type="radio" id="blushOption" name="color">
				<label for="blushOption">
					<div class="colors"></div>
					<span>Blush</span>
				</label>
				<input type="radio" id="creamOption" name="color">
				<label for="creamOption">
					<div class="colors"></div>
					<span>Cream</span>
				</label>
				<input type="radio" id="mintOption" name="color">
				<label for="mintOption">
					<div class="colors"></div>
					<span>Mint</span>
				</label>
				<input type="radio" id="paleOption" name="color">
				<label for="paleOption">
					<div class="colors"></div>
					<span>Pale Grey</span>
				</label>
			</div>

			<button @click="addToCart()" class="sold-out">
				Add to Cart
			</button>

			<p><i>We replace plants that have a tough time in transit, for free.</i></p>
		</div>
	</div>
</template>

<script>
	import store from '../vuex/store';
	export default {
		name: 'v-product',
		components: {},
		props: {
			pricecheck: {
				type: Boolean,
			},
			currentcourse: {
				type: Number,
			},
		},
		data() {
			return {
				store,
				price: 0,
				course: 0,
				product: {},
				trigger: false,
				euroPrice: this.price,
				selectedValue: 'image1.jpg',
			};
		},
		computed: {},
		methods: {

			selectValue: function () {
				let select = document.getElementById('select').value;
				this.selectedValue = this.product.styles[select].image;
			},

			addToCart() {
				let prise;
				let selectedItem = {};
				let type = document.getElementById('select').value;
				if (this.pricecheck) {
					prise = Math.round(
						parseFloat(this.product.styles[type].price / this.currentcourse),
						2,
					);
				} else {
					prise = this.product.styles[type].price;
				}
				selectedItem.name = this.product.name;
				selectedItem.type = document.getElementById('select').value;
				selectedItem.image = this.selectedValue;
				selectedItem.prise = prise;
				selectedItem.quantity = 1;
				this.$emit('addtocart', selectedItem, this.trigger);
				alert("Added")
			},
			
			togglePrice() {
				this.trigger = !this.trigger;
				this.euroPrice = Math.round(parseFloat(this.price / this.course), 2);
			},
		},
		watch: {},

		mounted() {
			this.product = this.$store.state.product;
			let select = document.getElementById('select').value;
			this.price = this.product.styles[select].price;
			this.selectedValue = this.product.styles[select].image;
			fetch('https://api.exchangeratesapi.io/latest')
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					return data.rates['USD'];
				})
				.then((course) => {
					this.course = course;
				});
		},
	};
</script>

<style scoped>
	.v-product {
		display: flex;
		justify-content: space-between;
		margin-top: 2rem;
		padding-bottom: 4rem;
		width: 100%;
		flex-basis: 50%;
		font-family: cursive;
		color: #2d2a24;
	}
	.price {
		cursor: pointer;
		outline: none;
	}
	.photo {
		display: flex;
		justify-content: center;
		width: 50%;
		padding-left: 3.5rem;
	}
	.photo img {
		margin-top: 6rem;
		max-width: 500px;
		max-height: 600px;
	}
	.info {
		display: flex;
		flex-direction: column;
		padding-left: 2.5rem;
		padding-right: 4rem;
		width: 50%;
	}
	.info p {
		margin-bottom: 0;
	}
	select {
		max-width: 40%;
		height: 2.5rem;
		font-family: system-ui;
		font-size: 1rem;
		font-weight: 600;
		color: grey;
		cursor: pointer;
	}
	option {
		display: flex;
		padding: 1rem 0;
		cursor: pointer;
	}
	.size {
		padding: 1rem 0;
		padding-right: 3rem;
	}
	.size-button {
		font-family: system-ui;
		font-size: 1rem;
		font-weight: 600;
		color: grey;
		background: none;
		border: none;
		cursor: pointer;
		outline: none;
	}
	.size-guide {
		float: right;
	}
	button:nth-of-type(2) {
		margin-left: 2rem;
	}
	input {
		display: none;
	}
	.color-box {
		display: flex;
		justify-content: flex-start;
		margin-top: 2rem;
	}
	.colors {
		width: 34px;
		height: 34px;
		border-radius: 50%;
		cursor: pointer;
	}
	label:nth-of-type(1) .colors {
		background: #3e3832;
	}
	label:nth-of-type(2) .colors {
		background: #ffd2b7;
	}
	label:nth-of-type(3) .colors {
		background: #eee7db;
	}
	label:nth-of-type(4) .colors {
		background: #cee0de;
	}
	label:nth-of-type(5) .colors {
		background: #c38364;
	}
	.color-box label {
		margin-left: 1.8rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.color-box label:nth-of-type(1) {
		margin-left: 0;
	}
	.sold-out {
		margin-top: 2rem;
		padding: 0.5rem;
		width: 80%;
		background-color: #00ab84;
		color: #fff;
		border: none;
	}
	.v-caption {
		font-family: system-ui;
		font-weight: 600;
		color: grey;
	}

	@media screen and (max-width: 1006px) {
		.photo img {
			max-width: 413px;
			max-height: 462px;
		}
	}
	@media screen and (max-width: 942px) {
		.v-product {
			flex-direction: column;
			align-items: center;
		}
		.photo {
			width: 80%;
			padding-left: 0;
		}
		.info {
			width: 80%;
			padding-right: 2.5rem;
		}
	}
	@media screen and (max-width: 455px) {
		.v-product {
			flex-direction: column;
			align-items: center;
		}
		.photo {
		}
		.photo img {
			max-width: 302px;
			margin-top: 0;
		}
		.info {
			width: 80%;
			padding-right: 2.5rem;
		}
		.color-box {
			flex-wrap: wrap;
			justify-content: space-between;
		}
		.color-box label {
			margin-left: 1.3rem;
		}
		.sold-out {
			align-self: center;
		}
	}
</style>