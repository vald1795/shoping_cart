import {
  createStore
} from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const state = {
  product: {
    name: 'Marble Queen Pothos',
    description: 'Give your home office an upgrade! The Pothos Marble and its quick growing vines full of variegated green and white leaves will make any space look more lush. It is a great low maintenance choice for beginners.',
    note: 'Arrives in a nursery grow pot nestled inside our ceramic planter.',
    styles: {
      balboa: {
        image: 'image1.jpg',
        price: 56
      },
      dolores: {
        image: 'image2.jpg',
        price: 52
      },
      grant: {
        image: 'image3.jpg',
        price: 51
      },
      hyde: {
        image: 'image4.jpg',
        price: 54
      },
    },
  },
  cart: []
}
const mutations = {
  SET_CART: (state, product) => {
    if (state.cart.length) {
      let isProductExists = false;
      state.cart.map(function (item) {
        if (item.type === product.type) {
          isProductExists = true;
          item.quantity++
        }
      })
      if (!isProductExists) {
        state.cart.push(product)
      }
    } else {
      state.cart.push(product)
    }
  },
  REMOVE_FROM_CART: (state, index) => {
    state.cart.splice(index, 1)
  },
  INCRESE_PRODUCT_QUANTITY: (state, index) => {
    state.cart[index].quantity++
  },
  DECRESE_PRODUCT_QUANTITY: (state, index) => {
    if (state.cart[index].quantity === 1) {
      return false
    }
    state.cart[index].quantity--
  }
}
const actions = {
  ADD_TO_CART({
    commit
  }, product) {
    commit('SET_CART', product);
  },
  DELETE_FROM_CART({
    commit
  }, index) {
    commit('REMOVE_FROM_CART', index)
  },
  INCREASE_QUANTITY({
    commit
  }, index) {
    commit('INCRESE_PRODUCT_QUANTITY', index)
  },
  DECREASE_QUANTITY({
    commit
  }, index) {
    commit('DECRESE_PRODUCT_QUANTITY', index)
  }

}
const getters = {
  CART(state) {
    return state.cart;
  }
}
const plugins = [
  createPersistedState()
]


export default createStore({
  state,
  mutations,
  actions,
  getters,
  plugins
})