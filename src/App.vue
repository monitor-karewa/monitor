<template>
  <div id="app">
    <!--<div id="nav">-->
      <!--<router-link to="/">Home</router-link> |-->
      <!--<router-link to="/about">About</router-link>-->
    <!--</div>-->
    <router-view name="header"/>
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
              let fullName = this.$session.get('userFullName');
              let profilePicture = this.$session.get('userPicture');
              this.$store.commit('CURRENT_USER', {fullName, profilePicture});

              let _id = this.$session.get('currentOrganizationId');
              axios.defaults.headers.common['X-CURRENT-ORGANIZATION-ID'] = _id;

              let name = this.$session.get('currentOrganizationName');
              let shortName = this.$session.get('currentOrganizationShortName');
              let color = this.$session.get('currentOrganizationColor');
              let theme = this.$session.get('currentOrganizationTheme') || 'default';

              let cover = this.$session.get('currentOrganizationCover');
              let title = this.$session.get('currentOrganizationTitle');
              let description = this.$session.get('currentOrganizationDescription');
//              let contactLocation = this.$session.get('currentOrganizationContactLocation');
//              let contactEmail = this.$session.get('currentOrganizationContactEmail');
              let welcomeTitle = this.$session.get('currentOrganizationWelcomeTitle');
              let showBackgroundText = this.$session.get('currentOrganizationShowBackgroundText');
              let round = this.$session.get('currentOrganizationRound');
              this.$store.commit('CURRENT_ORGANIZATION', {_id, name, shortName, color, theme, cover, title, description/*, contactLocation, contactEmail*/,welcomeTitle, showBackgroundText, round}, {root: true});

              let body = document.getElementById('body');
              body.className = `theme-body ${theme}`;
          }
          
      }
  }
</script>
