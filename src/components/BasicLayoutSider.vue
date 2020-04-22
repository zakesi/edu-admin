<template>
  <div class="sider-section">
    <div class="sider-menu-header logo-section">
      <img class="logo-img" src="~@/assets/logo.svg" alt="logo" />
    </div>
    <div class="sider-menu-body">
      <el-scrollbar class="scrollbar-section">
        <Menu class="menu-section" />
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import Menu from "./BasicLayoutSiderMenu.vue";

export default {
  components: {
    Menu
  }
};
</script>

<style type="text/css" lang="less">
.sider-section {
  position: relative;
  width: 240px;
  background-color: #fff;
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  flex: none;

  .sider-menu-header {
    flex: none;
    z-index: 1;
  }

  .sider-menu-body {
    flex: 1;
    height: 0;
  }
}

.logo-section {
  position: relative;
  height: 64px;
  background-color: #fff;
  box-shadow: 0 2px 8px #f0f1f2;
  z-index: 1;
  padding-left: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo-img {
    height: 32px;
    margin-right: 8px;
  }
}

.scrollbar-section {
  height: 100%;
  .el-scrollbar__wrap {
    overflow-x: auto;
    min-height: 100%;
  }
  .el-scrollbar__view {
    min-height: 100%;
  }
}
</style>
