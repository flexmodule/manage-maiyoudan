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
          active-text-color="#000"
        >
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="/order">选项1</el-menu-item>
              <el-menu-item index="/login">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="/order">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="/order">选项1</el-menu-item>
            <el-menu-item index="/login">选项2</el-menu-item>
          </el-submenu>
          <el-submenu index="90">
          <template slot="title">
            <span>用户管理</span>
          </template>
          <el-menu-item index="order">
            <span slot="title">1</span>
          </el-menu-item>
        </el-submenu>
          <el-menu-item index="/goods">
            <i class="el-icon-menu"></i>
            <span slot="title">商品管理</span>
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
  padding-left: 221px;
  padding-top: 20px;
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