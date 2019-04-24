
<!--Aqui e definido o escopo da aplicacao e o que vai ter na mesma-->

<template>
  <v-app>

    <!--Adiciona componentes na telas-->

    <core-filter v-if="$route.name !== 'Login'"/>

    <core-toolbar v-if="$route.name !== 'Login'"/>

    <core-drawer v-if="$route.name !== 'Login'"/>

    <core-view />
    
    
    <core-footer v-if="$route.name !== 'Login'" />

  </v-app>
</template>


<!-- Importado o CSS da pasta Stiles -->
<style lang="scss">
@import '@/styles/index.scss';

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>
