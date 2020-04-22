<template>
  <div class="page-wrapper">
    <Sider class="page-sider" />
    <div class="page-mainer">
      <Header class="page-header" />
      <div class="page-body">
        <router-view></router-view>
      </div>
      <Footer class="page-footer" v-if="false" />
    </div>
  </div>
</template>

<script>
import Header from "./BasicLayoutHeader.vue";
import Footer from "./BasicLayoutFooter.vue";
import Sider from "./BasicLayoutSider.vue";

export default {
  data() {
    return {};
  },
  components: {
    Header,
    Footer,
    Sider
  }
};
</script>

<style type="text/css" lang="less">
.page-wrapper {
  height: 100vh;
  background-color: #fff;
  display: flex;
}

.page-mainer {
  flex: 1;
  display: flex;
  flex-direction: column;
  .page-header {
    flex: none;
  }
  .page-body {
    flex: 1;
    padding: 18px;
    display: flex;
    background-color: #fbfbfd;
    .page-content {
      flex: 1;
      padding: 24px 44px 16px;
      background-color: #fff;
      box-shadow: rgba(26, 20, 61, 0.1) 0px 0px 6px 0px;
      border-radius: 6px;
    }
  }
}
</style>
