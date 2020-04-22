<template>
  <div class="breadcrumb-section" v-if="breadcrumbValue.length">
    <el-breadcrumb class="breadcrumb-list" v-if="breadcrumbValue.length">
      <template v-for="item in breadcrumbValue">
        <el-breadcrumb-item
          class="breadcrumb-item"
          v-if="item.to"
          :replace="true"
          :key="item.name"
          :to="item.to"
          >{{ item.name }}</el-breadcrumb-item
        >
        <el-breadcrumb-item v-else :key="item.name" class="breadcrumb-item">{{
          item.name
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script>
/*
 * @params breadcrumb
 * @params breadcrumb.name
 * @params breadcrumb.to
 */
export default {
  props: {
    breadcrumb: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    breadcrumbValue() {
      const { breadcrumb } = this;
      if (breadcrumb.length) {
        return breadcrumb;
      }
      return this.$route.matched
        .filter(data => data.meta && data.meta.breadcrumb)
        .map(data => ({
          name: data.meta.breadcrumb.title,
          to: data.meta.breadcrumb.replace ? { name: data.name } : undefined
        }));
    }
  }
};
</script>

<style lang="less" scoped>
.breadcrumb-section {
  background-color: #fff;
  padding: 16px;
  padding-bottom: 0;
  overflow: hidden;
  flex: none;
  .breadcrumb-list,
  .breadcrumb-title,
  .breadcrumb-description {
    margin-bottom: 16px;
  }
  .breadcrumb-item {
    font-size: 20px;
    font-weight: 500;
  }
}
/deep/.el-breadcrumb__inner {
  color: #18263c !important;
}
</style>
