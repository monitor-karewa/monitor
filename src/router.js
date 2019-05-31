import Vue from 'vue';
import Router from 'vue-router';

//Note: @ is aliased in webpack.config to './src'

//User
import UserIndex from '@/pages/user/Index';
import UserHeader from '@/pages/user/Header';
import UserFooter from '@/pages/user/Footer';
import UserHome from '@/pages/user/home/Home';
import UserCover from '@/pages/user/home/Cover';
import UserSelectOrganization from '@/pages/user/home/SelectOrganization';

import Suppliers from '@/pages/user/suppliers/Suppliers';
import SupplierDetail from '@/pages/user/suppliers/SupplierDetail';
import Contracts from '@/pages/user/contracts/Contracts';
import ContractDetail from '@/pages/user/contracts/ContractDetail';
import Comparations from '@/pages/user/comparations/Comparations';
import DetailComparations from '@/pages/user/comparations/DetailComparations';
// import Calculations from '@/pages/user/calculations/Calculations';
import CorruptionIndex from '@/pages/user/calculations/CorruptionIndex';
import Resources from '@/pages/user/resources/Resources';
import Privacy from '@/pages/user/Privacy';
import TheAbout from '@/pages/TheAbout';
import Contact from '@/pages/Contact';

import StyleIndex from '@/pages/style/Index';
import Style from '@/pages/style/Style';
import ClientStyle from '@/pages/style/Client';
import ErrorsStyle from '@/pages/style/Errors';
import LoginStyle from '@/pages/style/Login';

//Admin
import AdminIndex from '@/pages/admin/Index';
import AdminHeader from '@/pages/admin/Header';
import AdminSidebar from '@/pages/admin/Sidebar';
import AdminFooter from '@/pages/admin/Footer';
import DataLoad from '@/pages/admin/dataLoad/DataLoad';
import DataLoadCurrent from '@/pages/admin/dataLoad/DataLoadCurrent';
import DataLoadIndex from '@/pages/admin/dataLoad/DataLoadIndex';
import AdminSettings from '@/pages/admin/settings/Settings';
import SelectOrganization from '@/pages/admin/settings/SelectOrganization';
import ProfileUsers from '@/pages/admin/users/ProfileUsers';

//Admin-Catalogs
import AdminHome from '@/pages/admin/home/Home';
import AdminSuppliers from '@/pages/admin/suppliers/CatalogSuppliers';
import AdminResources from '@/pages/admin/resources/CatalogResources';
import AdminCalculations from '@/pages/admin/calculations/CatalogCalculations';
import AdminContracts from '@/pages/admin/contracts/CatalogContracts';
import AdminUsers from '@/pages/admin/users/CatalogUsers';
import AdminAdministrativeUnits from '@/pages/admin/administrativeUnits/CatalogAdministrativeUnits';
import AdminOrganizations from '@/pages/admin/organizations/CatalogOrganizations';

import Login from '@/pages/admin/Login';

import ForgotPassword from '@/pages/admin/ForgotPassword';
import NewPassword from '@/pages/admin/NewPassword';

import AccessDenied from '@/pages/errors/AccessDenied';
// Fallback page
import NotFound from '@/pages/errors/NotFound';

import routeLogsApi from '@/api/routeLogs.api';

Vue.use(Router);

let router = new Router({
    mode : 'history',
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            //When handling a back button click, go to the previous scrolled position
            return savedPosition
        } else {
            //Scroll to top
            return { x: 0, y: 0 }
        }
    },
    routes: [
        {
            path: '/select-organization',
            name: 'SelectOrganization',
            components: {
                header: UserHeader,
                default: UserSelectOrganization,
            }
        },
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
                    path: 'suppliers/:id',
                    name: 'SupplierDetail',
                    component: SupplierDetail
                },
                {
                    path: 'contracts/:id',
                    name: 'ContractDetail',
                    component: ContractDetail
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
                    path: 'comparations/:id',
                    name: 'detailComparations',
                    component: DetailComparations
                },
                // {
                //     path: 'calculations',
                //     name: 'Cálculos',
                //     component: Calculations
                // },
                {
                    path: 'calculations/corruption-index',
                    name: 'CorruptionIndex',
                    component: CorruptionIndex
                },
                {
                    path: 'resources',
                    name: 'Resources',
                    component: Resources
                },
                {
                    path: 'privacy',
                    name: 'Privacy',
                    component: Privacy
                },
                {
                    path: 'about',
                    name: 'About',
                    component: TheAbout
                },
                {
                    path: 'contact',
                    name: 'Contact',
                    component: Contact
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
                    path: 'select-organization',
                    name: 'AdminSelectOrganization',
                    component: SelectOrganization
                },
                {
                    path: '',
                    name: 'AdminHome',
                    component: AdminHome
                },
                {
                    path: 'suppliers',
                    name: 'AdminSuppliers',
                    component: AdminSuppliers

                },
                {
                    path: 'resources',
                    name: 'AdminResources',
                    component: AdminResources
                },
                {
                    path: 'calculations',
                    name: 'AdminCalculations',
                    component: AdminCalculations
                },
                {
                    path: 'contracts',
                    name: 'AdminContracts',
                    component: AdminContracts
                },
                {
                    path: 'users',
                    name: 'AdminUsers',
                    component: AdminUsers
                },
                {
                    path: 'profile',
                    name: 'ProfileUsers',
                    component: ProfileUsers
                },

                {
                    path: 'administrative-units',
                    name: 'AdminAdministrativeUnits',
                    component: AdminAdministrativeUnits
                },
                {
                    path: 'organizations',
                    name: 'Organizations',
                    component: AdminOrganizations
                },
                // {
                //     path: 'data-load',
                //     name: 'DataLoad',
                //     component: DataLoad
                // },
                {
                    path: 'data-load',
                    // name: 'DataLoad',
                    component: DataLoadIndex,
                    children: [
                        {
                            path: '',
                            name: 'DataLoad',
                            component: DataLoad
                        },
                        {
                            path: 'current',
                            name: 'DataLoadCurrent',
                            component: DataLoadCurrent
                        }
                    ]
                },
                {
                    path: 'settings',
                    name: 'AdminSettings',
                    component: AdminSettings
                }
            ]
        },
        {
            path: '/login/',
            name: 'Login',
            // component: Login
            components: {
                default: Login,
                header: null,
                sidebar: null,
                footer: null
            },
        },
        {
            path: '/forgot-password',
            name: 'ForgotPassword',
            components: {
                default: ForgotPassword,
            }
        },
        {
            path: '/new-password/:token',
            name: 'NewPassword',
            components: {
                default: NewPassword,
            }
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
            path: '/access-denied',
            name: 'AccessDenied',
            component: AccessDenied
        },
        {
            path: '**',
            name: 'NotFound',
            component: NotFound
        }
    ]
});

router.afterEach((to, from) => {
    //After every route is loaded, register a new RouteLog in the database, as long as it does not include the word 'admin'
    if (!to.path.includes('/admin/')) {
        routeLogsApi.register({path: to.path}, {}, () => {
        }, () => {
        })
    }
});

export default router;
