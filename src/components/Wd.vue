<template>
<div class="wd">
    <!-- 1 -->
    <div class="nav">
        <span  @click="go1({name:'Login',params:{active:2}})">登录</span>
    </div>
    <!-- 2 -->
    <div class="tx">
        <div class="t">
            <div class="img" ><img class="auto-img" src="http://img1.imgtn.bdimg.com/it/u=2731752510,4113809927&fm=200&gp=0.jpg"></div>
            <div class="yh"><h3>用户名</h3><span v-if="wen" >未登录</span><span v-if="!wen">{{sj.userId}}</span></div>
        </div>
    </div>
    <!-- 3 -->
    <div class="tiao">
        <span>设置</span>
    </div>
    <div class="tiao">
        <span @click="go2({name:'Li'})">历史纪录</span>
    </div>
     <div class="tiao">
        <span @click="go2({name:'Sc'})">收藏</span>
    </div>
     <div class="tiao">
        <span @click="go2({name:'Xg'})">密码修改</span>
    </div>
     <div class="tiao">
        <span @click="tc">退出</span>
    </div>
</div>
</template>
<script>
import { Dialog } from 'vant';
export default {
    name:'Wd',
    data(){
        return{
            wen:true,
            sj:[],
            active:''
        }
    },
    components:{
        [Dialog.name]:Dialog
    },
    methods: {
        go1(path){
            if(this.sj.loginStatus==undefined){
             this.$router.push(path)
            }else{
                          Dialog.alert({
  message: '请退出登录'
}).then(() => {
  // on close
});
            }
           
        },
      go2(path){
                if(this.sj.loginStatus==undefined){
               Dialog.alert({
  message: '请登录账号'
}).then(() => {
  // on close
});
            }else{
                this.$router.push(path)
                        
            }
        },
        tc(){
 if(this.sj.loginStatus){
 Dialog.confirm({
       title: '确认退出',
}).then(() => {
    console.log('pp')
    //  this.$router.push(path)
 localStorage.removeItem('userLogin')
 this.sj=[]
      this.wen=true;
}).catch(() => {
  // on cancel
});  
        }else if(this.sj.loginStatus==undefined){
               Dialog.alert({
  message: '没有登录'
}).then(() => {
  // on close
});
        }
   
        }
    },
    created() {
         this.active = this.$route.params.active;
             var userLogin = localStorage.getItem('userLogin');
             if(userLogin){
                 userLogin = JSON.parse(userLogin);
                 this.sj = userLogin;
                 this.wen=false;
             }
    },
}
</script>
<style lang="less" scoped>
h3{
    margin: 0;
}
.wd{
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #F7F7F7;
}
.nav{
    width: 100%;
        height: 1.3333rem;
    background: #000;
    span{
        float:right;
        margin-right:0.5rem;
        color:#fff;
        line-height:1.3333rem;
    }
}
.tx{
    margin-bottom: 1.3333333rem;
    position:relative;
    width:100%;
    height: 200px;
    background: #86D3F7;
    .t{
        width:8rem;
        height: 2.666666rem;
        position: absolute;
        top:0;
        bottom: 0;
        margin: auto ;
        margin-left: 0.8rem;
        overflow:hidden;
        .yh{
            font-size: 0.453333rem;
            margin-left:0.266666rem; 
            float: left;
            span{
                display: block;
                margin-top:0.266666rem; 
            }
        }
    .img{
        float: left;
        overflow: hidden;
        border-radius: 50%;
        width: 1.866666rem;
        height: 1.866666rem;
        .auto-img{
            width: 100%;
            display: block;
        }
    }
    }
}
.tiao{
    font-size:0.45333rem;
    line-height: 1.33333rem;
    margin-top:0.133333rem;
    width:100%;
    height: 1.33333rem;
    background: #fff;
    span{
        padding-left:0.53333rem; 
    }
}
</style>