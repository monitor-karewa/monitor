<template>
  <div id="app">
    <!--<div id="nav">-->
      <!--<router-link to="/">Home</router-link> |-->
      <!--<router-link to="/about">About</router-link>-->
    <!--</div>-->
    <router-view name="header"/>
    <router-view name="header2"/>
    <router-view name="sidebar"/>
    <router-view/>
    <router-view name="footer"/>
  </div>
</template>

<style lang="scss">
/*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
/*}*/
/*#nav {*/
  /*padding: 30px;*/
  /*a {*/
    /*font-weight: bold;*/
    /*color: #2c3e50;*/
    /*&.router-link-exact-active {*/
      /*color: #42b983;*/
    /*}*/
  /*}*/
/*}*/
@import "@/assets/stylesheets/sass/main.scss";
</style>

<script>
  import "@/assets/javascripts/vendors.js";
  
  import axios from 'axios';

  export default {
      data () {
          return {}
      },
      components: {},
      mounted () {
          $(document).ready(function () {
              $('.selectpicker').selectpicker();
          });
      },
      created (){
          let sessionExists = this.$session.exists();
          if (sessionExists) {
              let token = this.$session.get('jwt');
              axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

              let currentOrganizationId = this.$session.get('currentOrganizationId');
              axios.defaults.headers.common['X-CURRENT-ORGANIZATION-ID'] = currentOrganizationId;

              let currentOrganizationName = this.$session.get('currentOrganizationName');
              let currentOrganizationShortName = this.$session.get('currentOrganizationShortName');
              
              this.$store.commit('currentOrganizationName', currentOrganizationName);
              this.$store.commit('currentOrganizationShortName', currentOrganizationShortName);
          }
          
      }
  }
</script>
