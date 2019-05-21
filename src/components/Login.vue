<template>
  <div class="Reg">
    <div class="nav">
         <span class="w" @click="tz({name:'Wd',params:{active:2}})">我的</span>
      <span @click="tz({name:'Register'})">注册</span>
    </div>
    <div class="img">
      <img class="img-auto" src="http://img1.imgtn.bdimg.com/it/u=2731752510,4113809927&fm=200&gp=0.jpg">
    </div>
    <div class="box">
      <van-cell-group>
        <van-field label="手机号" v-model="use.name"  placeholder="输入手机号"/>
        <van-field type="password"  v-model="use.paw" label="密码" placeholder="密码(8-16位)"/>  
      </van-cell-group>
      <van-button class="btn" size="large" type="info" @click="dl">登录</van-button>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import {Field,Button,CellGroup,Dialog} from "vant";
export default {
    name:'Login',
    data(){
   
        return{
          active:'',
                 users:[],
            use:{
                name:'',
                paw:''

            }
        }
    },
    methods: {
        tz(path){
            this.$router.push(path)
            console.log('ss')
        },
        dl(){
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
      }else{
          	var u = localStorage.getItem('users');
         if(u){
             this.users = JSON.parse(u);
             for(var i=0;i<this.users.length;i++){
                    if(this.users[i].name==this.use.name){
                          if(this.users[i].paw==this.use.paw){

          localStorage.setItem('userLogin', JSON.stringify({userId: this.use.name, loginStatus: true}));
                     return   this.$router.push({name:'Index'})
                          }else{
                  return     Dialog.alert({
                 message: "密码或用户不正确"
                  }).then(() => {
                   this.use.paw = "";
               });
                    }
                    }
             }
                Dialog.alert({
                 message: "用户不存在"
                  }).then(() => {
                   this.use.paw = "";
               }); 
         }
      }
        }

    },
    components:{
[Field.name]:Field,
[Button.name]:Button,
[CellGroup.name]:CellGroup,
[Dialog.name]:Dialog
    },
    created() {
        this.active = this.$route.params.active;
    },
}
</script>
<style  lang="less" scoped>
    body {
  padding: 0;
  margin: 0;
}
.Reg {
  width: 100%;
}

.nav {
  width: 100%;
  height: 1.0666rem;
  background: red;
  overflow:hidden;
  .w{
    margin-left:0.266666rem;
    float:left;
  }
  span {
     margin-right:0.266666rem;
    float:right;
    font-size:  0.4266666rem;
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