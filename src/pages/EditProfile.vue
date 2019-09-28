<template>
  <div>
    <!-- 头部 -->
    <HeaderNormal title="编辑资料" />

    <!-- 头像 -->
    <div class="head">
      <img :src="profile.head_img" />
      <van-uploader :after-read="afterRead" class="uploader" />
    </div>

    <!-- 调用条形组件 -->
    <CellBar label="昵称" :text="profile.nickname" @click="nicknameShow=!nicknameShow" />
    <!-- 昵称编辑输入框 -->
    <van-dialog 
    v-model="nicknameShow" title="编辑昵称" 
    show-cancel-button
    @confirm="affirm"
    >
      <van-cell-group>
        <van-field v-model="nicknameValue" placeholder="请输入昵称" />
      </van-cell-group>
    </van-dialog>

    <CellBar label="密码" :text="profile.password" type="password" />

    <CellBar label="性别" :text="profile.gender===1? '男':'女' " />
  </div>
</template>
<script>
// 导入头部
import HeaderNormal from "@/components/HeaderNormal";
import CellBar from "@/components/CellBar";
export default {
  components: {
    HeaderNormal,
    CellBar
  },
  props: ["src", "text"],
  data() {
    return {
      profile: {},
      nicknameShow: false,
      nicknameValue:''
    };
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      const formdata = new FormData();
      formdata.append("file", file.file);
      this.$axios({
        url: "/upload",
        method: "post",
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data: formdata
      }).then(res => {
        const { data } = res.data;
        this.profile.head_img = this.$axios.defaults.baseURL + data.url;
        this.$axios({
          url: "/user_update/" + localStorage.getItem("user_id"),
          method: "post",
          data: {
            head_img: data.url
          },
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }).then(res => {
          this.$toast.success(res.data.message);
        });
      });
    },
    affirm(){
      console.log(this.nicknameValue)
    }
  },
  mounted() {
    this.$axios({
      url: "/user/" + localStorage.getItem("user_id"),
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      const { data } = res.data;
      this.profile = data;
      if (data) {
        if (data.head_img) {
          this.profile.head_img =
            this.$axios.defaults.baseURL + this.profile.head_img;
        } else {
          this.profile.head_img = "./static/default.jpg";
        }
      }
    });
  }
};
</script>

<style scoped lang="less" >
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
  img {
    display: block;
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
    border-radius: 50%;
  }
  .uploader {
    position: absolute;
    opacity: 0;
  }
}
/deep/.van-uploader__upload {
  border-radius: 50%;
  width: 100 / 360 * 100vw;
  height: 100 / 360 * 100vw;
}
</style>
