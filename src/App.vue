<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@media (max-width: 750px) {
	.el-carousel__container {
      height: 4rem !important;
    }
}
@media (min-width: 750px) { 
	.el-carousel__container {
      height: 300px !important;
    }
}
</style>
