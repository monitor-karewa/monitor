import proveedoresApi from '@/api/proveedores';

// initial state
// shape: [{ id, quantity }]
const state = {
    docs: [],
    total: 0,
    // currentPage: 1,
    // pages: 0,
    pagination: {
        total: 0,
        page: 1,
        pages: 1
    },
    
    
    
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
    
    list ({commit, state}, pagination = {}) {
        console.log('Calling action proveedores/list');
        let query = '?';
        if (pagination.page) {
            if (query.length > 1) {
                query += '&';
            }
            query += `page=${pagination.page}`
        }
        //TODO: Add other pagination options and centralize all options
        proveedoresApi.list(
            {}, 
            (result) => {
                console.log('result', result);
                //result.data.data.docs
                // commit('updateDocs', {
                //     docs: result.data.data.docs
                // });
                commit('updateDocs', result.data.data);
            },
            (error) => {
                console.log('error', error);
            }
        )
    },
    
    changePage ({commit, state}, page = 1) {
        console.log('Calling action proveedores/changePage');
        let query = '?';
        if (query.length > 1) {
            query += '&';
        }
        query += `page=${page}`;
        //TODO: Add other pagination options and centralize all options
        proveedoresApi.list(
            {query: query},
            (result) => {
                console.log('result', result);
                //result.data.data.docs
                // commit('updateDocs', {
                //     docs: result.data.data.docs
                // });
                commit('updateDocs', result.data.data);
            },
            (error) => {
                console.log('error', error);
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
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}