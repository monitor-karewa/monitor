import Vue from 'vue';
import suppliersApi from '@/api/suppliers.api';

const state = {
    docs: [],
    total: 0,
    pagination: {
        total: 0,
        page: 1,
        pages: 1
    },
    
    docName: '',
    
    loading: null,
    errorLoading: null
};

// getters
const getters = {
    // cartProducts: (state, getters, rootState) => {
    //     return state.items.map(({ id, quantity }) => {
    //         const product = rootState.products.all.find(product => product.id === id)
    //         return {
    //             title: product.title,
    //             price: product.price,
    //             quantity
    //         }
    //     })
    // },
    //
    // cartTotalPrice: (state, getters) => {
    //     return getters.cartProducts.reduce((total, product) => {
    //         return total + product.price * product.quantity
    //     }, 0)
    // }
};

// actions
const actions = {
    // checkout ({ commit, state }, products) {
    //     const savedCartItems = [...state.items]
    //     commit('setCheckoutStatus', null)
    //     // empty cart
    //     commit('setCartItems', { items: [] })
    //     shop.buyProducts(
    //         products,
    //         () => commit('setCheckoutStatus', 'successful'),
    //         () => {
    //             commit('setCheckoutStatus', 'failed')
    //             // rollback to the cart saved before sending the request
    //             commit('setCartItems', { items: savedCartItems })
    //         }
    //     )
    // },
    //
    // addProductToCart ({ state, commit }, product) {
    //     commit('setCheckoutStatus', null)
    //     if (product.inventory > 0) {
    //         const cartItem = state.items.find(item => item.id === product.id)
    //         if (!cartItem) {
    //             commit('pushProductToCart', { id: product.id })
    //         } else {
    //             commit('incrementItemQuantity', cartItem)
    //         }
    //         // remove 1 item from stock
    //         commit('products/decrementProductInventory', { id: product.id }, { root: true })
    //     }
    // },
    
    list ({commit}, pagination = {}) {
        // console.log('Calling action suppliers/list');
        Vue.$log.info('Calling action suppliers/list');
        let query = '?';
        if (pagination.page) {
            if (query.length > 1) {
                query += '&';
            }
            query += `page=${pagination.page}`
        }
        //TODO: Add other pagination options and centralize all options
        suppliersApi.list(
            {}, 
            (result) => {
                // console.log('result', result);
                Vue.$log.info('Response', result);
                //result.data.data.docs
                // commit('updateDocs', {
                //     docs: result.data.data.docs
                // });
                commit('updateDocs', result.data.data);
            },
            (error) => {
                // console.log('error', error);
                Vue.$log.error('Response error', error);
            }
        )
    },
    
    changePage ({commit}, page = 1) {
        // console.log('Calling action suppliers/changePage');
        Vue.$log.info('Calling action suppliers/changePage');
        let query = '?';
        if (query.length > 1) {
            query += '&';
        }
        query += `page=${page}`;
        //TODO: Add other pagination options and centralize all options
        suppliersApi.list(
            {query: query},
            (result) => {
                Vue.$log.info('Response', result);
                //result.data.data.docs
                // commit('updateDocs', {
                //     docs: result.data.data.docs
                // });
                commit('updateDocs', result.data.data);
            },
            (error) => {
                Vue.$log.error('Response error', error);
                // console.log('error', error);
            }
        )
    }
};

// mutations
const mutations = {
    // pushProductToCart (state, { id }) {
    //     state.items.push({
    //         id,
    //         quantity: 1
    //     })
    // },
    //
    // incrementItemQuantity (state, { id }) {
    //     const cartItem = state.items.find(item => item.id === id)
    //     cartItem.quantity++
    // },
    //
    // setCartItems (state, { items }) {
    //     state.items = items
    // },
    //
    // setCheckoutStatus (state, status) {
    //     state.checkoutStatus = status
    // }
    updateDocs (state, {docs, total, page, pages}) {
        state.docs = docs;
        state.total = total;
        state.pagination.total = total;
        state.pagination.page = page;
        state.pagination.pages = pages;
    },
    setDocName (state, {docName}) {
        state.docName = docName;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}