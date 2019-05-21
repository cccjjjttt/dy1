<template>
  <div class="Reg">
    <div class="nav">
      <span class="w" @click="tz({name:'Wd',params:{active:2}})">我的</span>
    </div>
    <div class="img">
      <img
        class="img-auto"
        src="http://img1.imgtn.bdimg.com/it/u=2731752510,4113809927&fm=200&gp=0.jpg"
      >
    </div>
    <div class="box">
      <van-cell-group>
        <van-field label="手机号" v-model="sj.userId" placeholder="输入手机号" disabled/>
        <van-field type="password" label="密码" v-model="use.paw" placeholder="密码(8-16位)"/>
        <van-field type="password" label="新密码" v-model="use.repaw" placeholder="确认密码"/>
        <van-field type="password" label="确认密码" v-model="use.repaws" placeholder="确认密码"/>
      </van-cell-group>
      <van-button class="btn" size="large" type="info" @click="zc()">提交</van-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { CellGroup, Field, Button, Dialog } from "vant";
export default {
  name: "Xg",
  data() {
    return {
      zh: [],
      sj: [],
      active: "",
      users: null,
      use: {
        name: "",
        paw: "",
        repaw: "",
        repaws: ""
      }
    };
  },
  components: {
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button,
    [Dialog.name]: Dialog
  },
  created() {
    this.active = this.$route.params.active;
  },
  methods: {
    tz(path) {
      console.log("ss");
      this.$router.push(path);
    },
    //注册按钮
    zc(path) {
      if (!/^[\d a-zA-Z]{8,16}$/.test(this.use.paw)) {
        Dialog.alert({
          message: "请输入正确密码"
        }).then(() => {
          this.use.paw = "";
        });
      } else if (!/^[\d a-zA-Z]{8,16}$/.test(this.use.repaw)) {
        Dialog.alert({
          message: "请输入8-16位字母数字"
        }).then(() => {
          this.use.repaws = "";
        });
      } else if (!Object.is(this.use.repaw, this.use.repaws)) {
        Dialog.alert({
          message: "验证码不一致"
        }).then(() => {
          this.use.code = "";
        });
      } else {
        for (var i = 0; i < this.zh.length; i++) {
          if (this.zh[i].name == this.sj.userId) {
            if (this.zh[i].paw == this.use.paw) {
              console.log(this.zh[i].paw);
              console.log(this.use.repaw);
              this.zh[i].paw = this.use.repaw;
              console.log(this.zh[i].paw);
            } else {
              Dialog.alert({
                message: "原密码不正确"
              }).then(() => {
                this.use.paw = "";
              });
              return;
            }
          }
        }
        var u = JSON.stringify(this.zh);
        localStorage.setItem("users", u);
        this.$router.push({ name: "Wd" });
      }
    }
  },
  created() {
    //获取当前账号
    var userLogin = localStorage.getItem("userLogin");
    userLogin = JSON.parse(userLogin);
    this.sj = userLogin;
    console.log(this.sj);
    //获取全部账号与密码
    var useData = localStorage.getItem("users");
    useData = JSON.parse(useData);
    this.zh = useData;
    console.log(this.zh);
  }
};
</script>
<style lang="less" scoped>
.Reg {
  width: 100%;
}
.nav {
  width: 100%;
  height: 1.0666rem;
  background: red;
  overflow: hidden;
  .w {
    margin-left: 0.133333rem;
    float: left;
  }
  span {
    margin-right: 0.266666rem;
    float: right;
    font-size: 0.4266666rem;
    color: #fff;
    line-height: 1.0666rem; 
    }}
.img {
  overflow: hidden;
  border-radius: 50%;
  width: 4rem;
  margin: 1rem auto 0;
  .img-auto {
    display: block;
    width: 100%;
  }
}
.box {
  width: 80%;
  margin: 0 auto;
}
.btn {
  margin-top: 1.33rem;
}
</style>