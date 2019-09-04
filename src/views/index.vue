<template>
  <div class="app-container container">
    <head-menu/>
    <div class="StandardData-container">
      <div class="left-menu">
        <el-menu
          router
          :default-active="$route.path"
          class="el-menu-vertical-list"
          background-color="#e1edff"
          text-color="#414243"
          active-text-color="#3888fa"
        >
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="/order">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="/order">麦优单订单</el-menu-item>
          </el-submenu>
          <el-submenu index="/userlist">
          <template slot="title">
						<i class="el-icon-s-custom"></i>
            <span>角色管理</span>
          </template>
          <el-menu-item index="/userlist">
            <span slot="title">用户管理</span>
          </el-menu-item>
					<el-menu-item index="/merchant">
            <span slot="title">商户管理</span>
          </el-menu-item>
					<el-menu-item index="/distributor">
            <span slot="title">分销人员管理</span>
          </el-menu-item>
        </el-submenu>
          <el-menu-item index="/goods">
            <i class="el-icon-goods"></i>
            <span slot="title">商品管理</span>
          </el-menu-item>
					<el-menu-item index="/activity">
            <i class="el-icon-present"></i>
            <span slot="title">活动管理</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="main-container">
        <div class="main-content">
          <!-- <back-button></back-button> -->
          <transition name="fade" mode="out-in">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.main-container {
  width: 100%;
  color: #000;
  padding-top: 60px;
  background-color: #f0f0f0;
}
.left-menu {
  width: 201px;
  height: 100%;
  position: fixed;
  left: 0;
  top: 60px;
}
.el-menu {
  min-height: 100%;
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.main-content {
  padding-left: 210px;
  padding-right: 20px;
  padding-bottom: 20px;
}
</style>

<script>
import headMenu from "../components/headMenu";
export default {
  components: {
    headMenu
  },
  name: "Index",
  data() {
    return {};
  }
};
</script>