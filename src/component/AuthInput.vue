<template>
  <input
    class="input"
    :value="value"
    @input="handleinput"
    :class="{
      success:status==='success',
      error:status==='error'
      }"
    @change="handlechange"
  />
</template>

<script>
export default {
  data() {
    return {
      status:''
    };
  },
  props: ["placeholder","value","name","rule",'err_message'],
  methods:{
      handleinput(event){
          const {value} = event.target
          this.$emit('input',value)
          if(this.rule){
            if(this.rule.test(value)){
              this.status='success'
            } else{
              this.status='error'
            }
          }
      },
      handlechange(){
        if(this.err_message&&this.status==='error'){
          this.$toast.fail(this.err_message)
        }
      }
  }
};
</script>

<style scoped lang="less">
.input {
  width: 100%;
  height: 38 / 360 * 100vw;
  padding: 20px 0;
  box-sizing: border-box;
  background: #fff;
  border: none;
  border-bottom: 1px rgba(117, 117, 117, 1) solid;
  outline: none;
  font-size: 18px;
}

.success {
  border-bottom-color: blue;
}
.error {
  border-bottom-color: red;
}
</style>