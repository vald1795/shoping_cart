<template>
	<div class="v-main-wrapper">
		<v-header></v-header>
		<v-product :pricecheck='priceCheck' :currentcourse='currentCourse' @addtocart="addToCart"></v-product>
		<v-cart :cart_data="CART" @changecourse="changecourse"></v-cart>
	</div>
</template>

<script>
	import vHeader from './v-header';
	import vProduct from './v-product';
	import vCart from './v-cart';
	import { mapActions } from 'vuex';
	import { mapGetters } from 'vuex';

	export default {
		name: 'v-main-wrapper',
		components: {
			vHeader,
			vProduct,
			vCart,
		},
		props: {},
		data() {
			return {
				priceCheck: false,
				currentCourse: 0,
			};
		},
		computed: {
			...mapGetters(['CART']),
		},
		methods: {
			...mapActions(['ADD_TO_CART']),
			addToCart: function (data) {
				this.ADD_TO_CART(data);
			},
			changecourse: function (data, course) {
				this.priceCheck = data;
				this.currentCourse = course;
			},
		},
		watch: {},
		mounted() {},
	};
</script>

<style>
	.v-main-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		max-width: 90rem;
		margin: 0 auto;
	}
	@media screen and (max-width: 1000px) {
		.photo img {
			max-width: 413px;
			max-height: 462px;
			padding-left: 1.5rem;
		}
	}
</style>