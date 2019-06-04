<template>
    <!-- HEADER SECTION -->
    <header id="header" class="header clearfix">
        <div class="left col-md-3 col-4">
            <button id="showMenu" class="side-menu" type="button">
                <svg id="hamburguer-icon" class="" width="30" height="30" viewBox="0 0 30 30">
                    <path class="line line-top" d="M0,9h30"/>
                    <path class="line line-center" d="M0,15h30"/>
                    <path class="line line-bottom" d="M0,21h30"/>
                </svg>
            </button>
        </div>
        <div class="right col-md-9 col-8">
            <div class="links">
                <router-link to="/admin/data-load" v-show="hasAccessToDataLoad" class="btn-raised xs button-accent">
                    <i class="zmdi zmdi-plus"></i> Cargar datos
                </router-link>
                <div class="dropdown notifications-btn show" :class="{active:currentGeneralInfoInfo.newNotifications}">
                    <button class="btn-circle-icon  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="readNotifications">
                        <i class="zmdi zmdi-notifications"></i>
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <h6 class="dropdown-header">Notificaciones</h6>
                        <div class="dropdown-item" v-for="(notification, index) in currentGeneralInfoInfo.notifications">
                            <div class="user-img">
                                <div class="image">
                                    <img v-if="currentUser.userPicture" class="img-fluid" :src="profilePictureUrl" alt="User"/>
                                    <img v-else src="@/assets/images/Demo/default.svg" alt="">
                                </div>
                                <div :class="'status ' + notification.status">

                                </div>
                            </div>
                            <div class="info-container">
                                <h3 class="info">{{notification.message}}</h3>
                                <div class="date">{{formatDate(notification.createdAt)}}</div>
                            </div>
                        </div>
                        <div class="dropdown-item empty-state" v-if="currentGeneralInfoInfo.notifications.length === 0">
                            <div class="empty-image">
                                <img src="@/assets/images/Emptystates/empty-state-box.svg" alt="">
                            </div>
                            <br>
                            <div class="text">
                                No tienes notificaciones
                            </div>
                        </div>
                    </div>
                </div>
                <router-link to="/admin/settings" class="btn-circle-icon hideresp"><i class="zmdi zmdi-settings"></i></router-link>
                <div class="topMenuDropdown dropdown m-l-15">
                    <button class="dropdown-toggle" type="button" id="dropdownUserMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <div>
                                <label>{{currentUser.fullName}}</label>
                                <span>Admin</span>
                            </div>
                            <img v-if="currentUser.userPicture" class="img-fluid" :src="profilePictureUrl" alt="User"/>
                            <img v-else src="@/assets/images/Demo/default.svg" alt="">
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownUserMenu">
                        <form>
                            <router-link to="/admin/select-organization" class="dropdown-item c-pointer">Seleccionar Organización</router-link>
                            <router-link to="/admin/profile" class="dropdown-item c-pointer">Editar Perfil</router-link>
                            <a @click="logout" class="dropdown-item c-pointer">Cerrar sesión</a>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <!-- END HEADER SECTION -->
</template>

<style>
</style>

<script>
    import catalog from '@/mixins/catalog.mixin';
    import {mapState} from 'vuex';
    import baseApi from '@/api/base.api';

    export default {
        data () {
            return {
                isShowing:false
            }
        },
        computed: {
            ...mapState({
                currentUser: state => state.currentUser,
                profilePictureUrl : function(){
                    return `${baseApi.baseUrl}/public-api/files/image/${this.currentUser.userPicture}`;
                },
                currentGeneralInfoInfo: state => state.adminHomeStore,
            }),
            permissions () {
                return this.$session.get('permissions') || [];
            },
            hasAccessToDataLoad() {
                return this.permissions && this.permissions.includes('CONTRACTS');
            }
        },
        components: {
        },
        mounted() {
            window.$('#showMenu').on('click', function() {
                $('.sidebar').addClass('small-sidebar');
                $('.backdrop').addClass('active');
            });
            this.$store.dispatch('adminHomeStore/RELOAD_NOTIFICATIONS');
        },
        sockets: {
            connect: function () {
            },
            reloadNotification: function (data) {
                this.$store.dispatch('adminHomeStore/RELOAD_NOTIFICATIONS');
            }
        },
        methods: {
            logout () {
                let _session = this.$session;
                this.$store.dispatch('accounts/LOGOUT', {_session});
            },
            formatDate(date){
                const monthNames = [
                    "Ene", "Feb", "Mar",
                    "Abr", "May", "Jun", "Jul",
                    "Aug", "Sep", "Oct",
                    "Nov", "Dec"
                ];
                if(typeof date === "string"){
                    date = new Date(date);
                }

                var day = date.getDate();
                if(day < 10){
                    day = "0"+ day;
                }
                var monthIndex = date.getMonth();
                var year = date.getFullYear();

                return day + '/' + monthNames[monthIndex] + '/' + year;
            },
            readNotifications () {
                this.isShowing = !this.isShowing;
                if(this.currentGeneralInfoInfo.newNotifications){
                    this.$store.dispatch('adminHomeStore/READ_NOTIFICATIONS');
                }

            }
        }
    }
</script>
