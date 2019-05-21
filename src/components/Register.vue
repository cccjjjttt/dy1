<template>
  <div class="Reg">
    <div class="nav">
      <span class="w" @click="tz({name:'Wd',params:{active:2}})">我的</span>
      <span @click="tz({name:'Login'})">登录</span>
    </div>
    <div class="img">
      <img class="img-auto" src="http://img1.imgtn.bdimg.com/it/u=2731752510,4113809927&fm=200&gp=0.jpg">
    </div>
    <div class="box">
      <van-cell-group>
        <van-field label="手机号" v-model="use.name" placeholder="输入手机号"/>
        <van-field type="password" label="密码" v-model="use.paw" placeholder="密码(8-16位)"/>
        <van-field type="password" label="确认密码" v-model="use.repaw" placeholder="确认密码"/>
        <van-field label="短信验证码" v-model="use.code">
          <van-button slot="button" size="small" type="primary" @click="fs" :disabled="is">{{t}}</van-button>
        </van-field>
      </van-cell-group>
      <van-button class="btn" size="large" type="info" @click="zc()">注册</van-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { CellGroup, Field, Button, Dialog } from "vant";
export default {
  name: "Register",
  data() {
    return {
      active:'',
      //验证吗
      t: "发送验证码",
      yz: "",
      is: false,
      users: null,
      use: {
        name: "",
        paw: "",
        repaw: "",
        code: "",
      
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
    //跳转
    tz(path) {
      console.log('ss')
      this.$router.push(path);
    },
    //注册按钮
    zc(path) {
      if (!/^1[13456789]\d{9}$/.test(this.use.name)) {
        Dialog.alert({
          message: "请输入正确手机号"
        }).then(() => {
          this.use.name = "";
        });
      } else if (!/^[\d a-zA-Z]{8,16}$/.test(this.use.paw)) {
        Dialog.alert({
          message: "请输入8-16位字母数字"
        }).then(() => {
          this.use.paw = "";
        });
      } else if (!Object.is(this.use.paw, this.use.repaw)) {
        Dialog.alert({
          message: "用户名或密码不正确"
        }).then(() => {
          this.use.repaw = "";
        });
      } else if (!Object.is(this.yz, this.use.code)) {
        Dialog.alert({
          message: "验证码不一致"
        }).then(() => {
          this.use.code = "";
        });
      }else{
//存储之前需要验是否存在该用户
					for (var i = 0; i < this.users.length; i++) {

						if (this.users[i].name == this.use.name) {
							console.log('该手机号已被注册');
							return;
						}

					}
//不存在时
        var time = new Date();
					var uid = 'vue' + time.getTime();
					var name = this.use.name;
          var paw = this.use.paw;
          		var user = {
						uid,
						name,
						paw
				
          };
          	this.users.push(user);
					//转为json字符串
					var usersData = JSON.stringify(this.users);

					//写入本地存储users
					localStorage.setItem('users', usersData);

         this.$router.push({name:'Login'});
      }
    },
    //发送按钮事件
    fs() {
      if (!/^1[13456789]\d{9}$/.test(this.use.name)) {
        Dialog.alert({
          message: "请输入正确手机号"
        }).then(() => {
          this.use.name = "";
        });
      } else {
        var s = new Date()
          .getTime()
          .toString()
          .substr(-3, 3);
        var r = Math.random()
          .toString()
          .substr(-3, 3);
        this.yz = s + r;
        this.is = true;
        console.log(this.yz);
        var time = 30;
        var tt = setInterval(() => {
          this.t = time--;
          if (time <= 0) {
            this.is = false;
            this.t = "发送验证码";
            //清除定时器
            clearInterval(tt);
            time = null;
          } else {
            this.t = --time + "s后重新发送";
          }
        }, 1000);
      }
    }
  },
  //在模板渲染成html或者模板编译进路由前调用created()
  	created() {
           //获取
			var userData = localStorage.getItem('users');

			this.users = userData == undefined ? [] : JSON.parse(userData);

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
  overflow:hidden;
  .w{
    margin-left:0.133333rem;
    float:left;
  }
  span {
     margin-right:0.266666rem;
    float:right;
    font-size: 0.4266666rem;
    color: #fff;
    line-height: 1.0666rem;
    // margin-left: 9rem;
  }
}
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