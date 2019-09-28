<template>
  <div class="button" @click="handleClick">{{text}}</div>
</template>

<script>
import Axios from "axios";
export default {
  props: ["text"],
  methods: {
    handleClick() {
      this.$emit('click',event)
    }
  }
};
</script>

<style scoped lang="less">
.button {
  width: 100%;
  height: 48 / 360 * 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d81e06;
  color: #fff;
  border-radius: 50px;
  font-style: 20px;
}
</style>