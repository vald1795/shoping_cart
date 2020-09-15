<template>
	<div class="v-header">
		<div class="slider">
			<p>Shop The Sill x The Met</p>
		</div>
		<nav>
			<div class="desktop-logo">
				<div class="underline">
					<h2>The Sill</h2>
				</div>
			</div>
			<div class="desktop-menu">
				<ul class="menu">
					<li class="menu-link">Shop</li>
					<li class="menu-link">Best Sellers</li>
					<li class="menu-link">New Arrivals</li>
					<li class="menu-link">Online Workshops</li>
				</ul>
			</div>
			<div class="desktop-side-menu">
				<ul class="menu-card">
					<li class="menu-link">Seach</li>
					<li class="menu-link">Log In</li>
					<li @click="activateCart" class="menu-link">Cart({{CART.length}})</li>
				</ul>
			</div>
		</nav>

	</div>

</template>

<script>
	import { mapGetters } from 'vuex';
	export default {
		name: 'v-header',
		components: {},
		props: {},
		data() {
			return {};
		},
		computed: {
			...mapGetters(['CART']),
		},
		methods: {
			activateCart() {
				document.getElementById('v-cart').classList.add('active');
			},
		},
		watch: {},
		mounted() {},
	};
</script>

<style>
	.v-header {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
		width: 100%;
	}
	.slider {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0.625rem 0.875rem;
		width: 100%;
		height: 2rem;
		text-align: center;
		background-color: #00ab84;
	}
	.slider p {
		margin: 0;
		font-family: Arial, Helvetica, sans-serif;
		font-size: 20px;
		font-weight: medium;
		color: #fff;
	}
	nav {
		display: flex;
		width: 100%;
		height: 4rem;
		background-color: transparent;
	}
	nav .desktop-logo {
		display: flex;
		align-items: center;
		margin: 0;
		padding: 1rem;
		width: 20%;
	}
	nav .desktop-logo h2 {
		margin: 0;
	}

	nav .desktop-menu {
		flex: 0 0 auto;
		margin: 0;
		padding: 1rem 0;
		width: 50%;
	}
	nav .desktop-side-menu {
		flex: 0 0 auto;
		margin: 0;
		margin-left: 1rem;
		margin-right: 1rem;
		padding: 1rem 0;
		width: 30%;
	}
	nav .desktop-side-menu ul {
		display: flex;
		justify-content: flex-end;
		flex-wrap: wrap;
		position: relative;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.underline {
		margin-left: 1rem;
		margin-top: 0.1875rem;
		border-bottom: 1px solid #2d2a24;
	}
	.menu {
		display: flex;
		flex-wrap: wrap;
		position: relative;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.menu-link {
		cursor: pointer;
	}
	.menu li {
		display: inline-block;
		position: relative;
		margin: 0.5rem 1rem 0.75rem;
		padding: 0 !important;
		padding-bottom: 0.3125rem !important;
		font-size: 19px;
		line-height: 1;
		text-decoration: none;
	}
	.menu-card li {
		display: inline-block;
		position: relative;
		margin: 0.5rem 1rem 0.75rem;
		padding: 0 !important;
		padding-bottom: 0.3125rem !important;
		font-size: 19px;
		line-height: 1;
		text-decoration: none;
	}

	@media screen and (max-width: 1000px) {
		.menu li:nth-last-of-type(1) {
			display: none;
		}
	}
	@media screen and (max-width: 824px) {
		.desktop-menu {
			display: none;
		}
		nav .desktop-side-menu {
			width: 50%;
		}
		nav .desktop-logo {
			width: 50%;
		}
	}
	@media screen and (max-width: 494px) {
		.desktop-menu {
			display: none;
		}
		nav .desktop-side-menu {
			width: 65%;
		}
		nav .desktop-logo {
			width: 35%;
		}
	}
	@media screen and (max-width: 455px) {
		.desktop-menu {
			display: none;
		}
		nav .desktop-side-menu {
			display: none;
		}
		nav .desktop-logo {
			display: flex;
			justify-content: center;
			width: 100%;
		}
	}
</style>