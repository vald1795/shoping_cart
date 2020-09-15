<template>
	<div class="v-cart-item">
		<img class="v-cart-item_image" :src="require('../assets/images/' + cart_item_data.image)" alt="img">
		<div class="v-cart-item_info">
			<h2>{{cart_item_data.name}}</h2>
			<p>{{cart_item_data.type}}</p>
			<p class="v-price-button" v-if="pricecheck" @click="changecourse">{{cart_item_data.prise}} €</p>
			<p class="v-price-button" v-else @click="changecourse">{{cart_item_data.prise}} $</p>
			<div class="v-cart-item_quantity">
				<div class="v-cart-item_quantity_buttons">
					<button @click="increase">+</button>
					{{product.quantity}}
					<button @click="decrease">-</button>
				</div>
			</div>
		</div>
		<button class="remove-button" @click="deletefromcart">Remove</button>

	</div>
</template>

<script>
	export default {
		name: 'v-cart-item',
		components: {},
		props: {
			cart_item_data: {
				type: Object,
				default() {
					return {};
				},
			},
			pricecheck: {
				type: Boolean,
			},
		},
		data() {
			return {
				product: this.cart_item_data,
			};
		},
		computed: {},
		methods: {
			deletefromcart() {
				this.$emit('deletefromcart');
			},
			increase() {
				this.$emit('increase');
			},
			decrease() {
				this.$emit('decrease');
			},
			changecourse() {
				this.$emit('changecourse');
			},
		},
		watch: {},
		mounted() {},
	};
</script>

<style>
	.v-cart-item {
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-around;
		align-items: flex-start;
		padding: 1.5rem 0;
		width: 100%;
		text-align: center;
		border-top: 1px solid #d7d2cb;
		border-bottom: 1px solid #d7d2cb;
	}
	.v-cart-item h1 {
		margin: 0;
		font-family: system-ui;
		color: grey;
	}
	.v-cart-item_image {
		align-self: center;
		max-width: 140px;
	}
	.v-cart-item_info {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		font-family: system-ui;
		font-size: 1rem;
		color: grey;
	}
	.v-cart-item_info h2 {
		margin: 0;
	}
	.v-cart-item_info p {
		margin: 0;
		margin-bottom: 1rem;
	}
	.v-cart-item_quantity {
		display: flex;
		flex-direction: column;
		width: 90px;
		height: 40px;
	}
	.v-cart-item_quantity_buttons {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-family: system-ui;
		font-size: 1rem;
		border: 1px solid #d7d2cb;
	}
	.v-cart-item_quantity_buttons button {
		font-family: system-ui;
		font-size: 1rem;
		font-weight: 600;
		color: grey;
		background: none;
		border: none;
		cursor: pointer;
		outline: none;
	}
	.v-cart-item_quantity_buttons button:nth-of-type(2) {
		margin: 0;
	}
	.remove-button {
		padding-right: 2rem;
		align-self: center;
		font-family: system-ui;
		font-size: 1.2rem;
		font-weight: 600;
		color: #00ab84;
		background: none;
		border: none;
		cursor: pointer;
		outline: none;
	}
	.v-price-button {
		cursor: pointer;
	}

	@media screen and (max-width: 584px) {
		.v-cart-item {
			flex-direction: column;
			align-items: center;
		}
		.v-cart-item_info {
			align-items: center;
		}
		.remove-button {
			margin-top: 1rem;
			padding-right: 0;
		}
	}
</style>