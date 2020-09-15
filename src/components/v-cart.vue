<template>
	<div id="v-cart" class="v-cart">
		<button @click="deActivateCart" class="close-cart-button">X</button>
		<h1>Cart({{CART.length}})</h1>
		<v-cart-item v-for="(item, index) in cart_data" :key="item.type" :cart_item_data="item" :pricecheck="priceCheck" @deletefromcart="deletefromcart(index)" @increase="increase(index)" @decrease="decrease(index)" @changecourse="changecourse()" />
		<div class="v-cart-total">
			<p class="total-name">Total: </p>
			<p v-if="priceCheck" @click="changecourse">{{cartTotalCost}} €</p>
			<p v-else @click="changecourse">{{cartTotalCost}} $</p>
		</div>
	</div>
</template>

<script>
	import vCartItem from './v-cart-item.vue';
	import { mapActions } from 'vuex';
	import { mapGetters } from 'vuex';

	export default {
		name: 'v-cart',
		components: {
			vCartItem,
		},
		props: {
			cart_data: {
				type: Array,
				default() {
					return [];
				},
			},
		},
		data() {
			return {
				title: 'Main wrapper',
				priceCheck: false,
				course: 0,
			};
		},
		computed: {
			...mapGetters(['CART']),
			cartTotalCost() {
				let result = [];
				if (this.cart_data.length) {
					for (let item of this.cart_data) {
						result.push(item.prise * item.quantity);
					}

					result = result.reduce(function (sum, el) {
						return sum + el;
					});
					return result;
				} else {
					return 0;
				}
			},
		},
		methods: {
			...mapActions([
				'DELETE_FROM_CART',
				'INCREASE_QUANTITY',
				'DECREASE_QUANTITY',
			]),
			deletefromcart(index) {
				this.DELETE_FROM_CART(index);
			},
			increase(index) {
				this.INCREASE_QUANTITY(index);
			},
			decrease(index) {
				this.DECREASE_QUANTITY(index);
			},
			changecourse() {
				fetch('https://api.exchangeratesapi.io/latest')
					.then((response) => {
						return response.json();
					})
					.then((data) => {
						return data.rates['USD'];
					})
					.then((course) => {
						this.course = course;
						if (!this.priceCheck) {
							if (this.cart_data.length) {
								this.priceCheck = true;
								for (let item of this.cart_data) {
									item.prise = Math.round(parseFloat(item.prise / course), 2);
								}
							}
						} else if (this.priceCheck) {
							if (this.cart_data.length) {
								this.priceCheck = false;
								for (let item of this.cart_data) {
									item.prise = Math.round(parseFloat(item.prise * course), 2);
								}
							}
						}
						this.$emit('changecourse', this.priceCheck, this.course);
					});
			},
			deActivateCart() {
				document.getElementById('v-cart').classList.remove('active');
			},
		},
		watch: {},
	};
</script>

<style>
	.v-cart {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding-top: 4rem;
		padding-left: 2rem;
		padding-right: 2rem;
		width: 50%;
		height: 100vh;
		text-align: center;
		position: fixed;
		top: 0;
		right: 0;
		transform: translateX(100%);
		background: #fff;
		box-shadow: 0 0 10px rgba(45, 42, 36, 0.7);
		transition: 0.5s ease-out 0s;
	}
	.v-cart.active {
		transition: 0.5s ease-out 0.2s;
		transform: translateX(0%);
		overflow: auto;
	}
	.v-cart h1 {
		margin: 0;
		margin-bottom: 3rem;
		font-family: system-ui;
		color: grey;
	}
	.v-cart-total {
		padding: 2rem 0;
		display: flex;
		order: 1;
		justify-content: space-around;
		width: 100%;
		font-size: 2rem;
		font-weight: 600;
		color: #00ab84;
		cursor: pointer;
		outline: none;
	}
	.total-name {
		margin-right: 1.5rem;
	}
	.close-cart-button {
		position: absolute;
		right: 3rem;
		top: 1rem;
		font-family: system-ui;
		font-size: 1.7rem;
		font-weight: 600;
		color: grey;
		background: none;
		border: none;
		cursor: pointer;
		outline: none;
	}
	@media screen and (max-width: 1020px) {
		.v-cart {
			width: 87%;
		}
	}
</style>