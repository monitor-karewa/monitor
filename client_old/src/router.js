import Vue from 'vue';
import Router from 'vue-router';


//Note: @ is aliased in webpack.config to './src'

//User
import UserIndex from '@/components/pages/user/Index';
import UserHeader from '@/components/pages/user/Header';
import UserFooter from '@/components/pages/user/Footer';
import UserHome from '@/components/pages/user/home/Home';

import Suppliers from '@/components/pages/user/suppliers/Suppliers';
import Contracts from '@/components/pages/user/contracts/Contracts';
import Comparations from '@/components/pages/user/comparations/Comparations';
import Calculations from '@/components/pages/user/calculations/Calculations';
import Resources from '@/components/pages/user/resources/Resources';

import StyleIndex from '@/components/pages/style/Index';
import Style from '@/components/pages/style/Style';
import ClientStyle from '@/components/pages/style/Client';
import ErrorsStyle from '@/components/pages/style/Errors';
import LoginStyle from '@/components/pages/style/Login';

//Admin
import AdminIndex from '@/components/pages/admin/Index';
import AdminHeader from '@/components/pages/admin/Header';
import AdminSidebar from '@/components/pages/admin/Sidebar';
import AdminFooter from '@/components/pages/admin/Footer';

import AdminHome from '@/components/pages/admin/home/Home';
import AdminSuppliers from '@/components/pages/admin/suppliers/Suppliers';

import Login from '@/components/pages/admin/Login';

// Fallback page
import NotFound from '@/components/pages/errors/NotFound';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            // name: 'UserIndex',
            components: {
                default: UserIndex,
                header: UserHeader,
                footer: UserFooter
            },
            children: [
                {
                    path: '',
                    name: 'UserHome',
                    component: UserHome
                },
                {
                    path: 'suppliers',
                    name: 'Suppliers',
                    component: Suppliers
                },
                {
                    path: 'contracts',
                    name: 'Contracts',
                    component: Contracts
                },
                {
                    path: 'comparations',
                    name: 'Comparations',
                    component: Comparations
                },
                {
                    path: 'calculations',
                    name: 'Cálculos',
                    component: Calculations
                },
                {
                    path: 'resources',
                    name: 'Resources',
                    component: Resources
                }
            ]
        },
        {
            //
            // /admin => AdminHome
            // /admin/suppliers => AdminSuppliers
            path: '/admin',
            // name: 'AdminHome',
            components: {
                default: AdminIndex,
                header: AdminHeader,
                sidebar: AdminSidebar,
                footer: AdminFooter
            },
            children: [
                {
                    path: '',
                    name: 'AdminHome',
                    component: AdminHome
                },
                {
                    path: 'suppliers',
                    name: 'AdminSuppliers',
                    component: AdminSuppliers
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/style',
            // name: 'StyleIndex',
            component: StyleIndex,
            children: [
                {
                    path: '',
                    name: 'Style',
                    component: Style
                },
                {
                    path: 'client',
                    name: 'ClientStyle',
                    component: ClientStyle
                },
                {
                    path: 'errors',
                    name: 'ErrorsStyle',
                    component: ErrorsStyle
                },
                {
                    path: 'login',
                    name: 'LoginStyle',
                    component: LoginStyle
                }
            ]
        },
        {
            path: '**',
            name: 'NotFound',
            component: NotFound
        }
    ]
});