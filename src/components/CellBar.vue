<template>
  <div class="cellbar" @click="$emit('click')">
    <div class="left">{{label}}</div>
    <div class="right">
      {{text}}
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["label", "text"],
  
};
</script>

<style scoped lang="less">
.cellbar {
  height: 48 / 360 * 100vw;
  line-height: 48 / 360 * 100vw;
  border-bottom: 1px solid rgba(228, 228, 228, 1);
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: #999;
  margin-left: 20px;    
}
</style>