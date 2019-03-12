import Vue from 'vue';
import Router from 'vue-router';


//Note: @ is aliased in webpack.config to './src'

//User
import UserIndex from '@/components/pages/user/Index';
import UserHeader from '@/components/pages/user/Header';
import UserFooter from '@/components/pages/user/Footer';
import UserHome from '@/components/pages/user/home/Home';

import Proveedores from '@/components/pages/user/proveedores/Proveedores';
import Contratos from '@/components/pages/user/contratos/Contratos';
import Comparar from '@/components/pages/user/comparar/Comparar';
import Calculos from '@/components/pages/user/calculos/Calculos';
import Recursos from '@/components/pages/user/recursos/Recursos';

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
import AdminProveedores from '@/components/pages/admin/proveedores/Proveedores';

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
                    path: 'proveedores',
                    name: 'Proveedores',
                    component: Proveedores
                },
                {
                    path: 'contratos',
                    name: 'Contratos',
                    component: Contratos
                },
                {
                    path: 'comparar',
                    name: 'Comparar',
                    component: Comparar
                },
                {
                    path: 'calculos',
                    name: 'Cálculos',
                    component: Calculos
                },
                {
                    path: 'recursos',
                    name: 'Recursos',
                    component: Recursos
                }
            ]
        },
        {
            //
            // /admin => AdminHome
            // /admin/proveedores => AdminProveedores
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
                    path: 'proveedores',
                    name: 'AdminProveedores',
                    component: AdminProveedores
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