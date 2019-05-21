<template>
<div class="sc">
    <div class="nav">
        <span  @click="go1({name:'Wd',params:{active:2}})">返回</span>
    </div>
    <div   v-for="(item,index) in this.sc" :key="index">
        <div class="x"  v-if="item.hh">
          <div class="x1">{{item.ee}}</div>
          <div  class="x2" @click="ss(index)">取消</div>
        </div>
          
    </div>
</div>
</template>
<script>
export default {
    name:'Sc',
    data(){
        return{
            hh:false,
            u:[],
            sc:[],
            sj:[]
        }
    },
    methods: {
        go1(path){
             this.$router.push(path)
        },
        ss(index){
            this.sc[index].hh=false;
             for(var i=0;i<this.u.length;i++){
                 if(this.u[i].a4==this.sj&&this.u[i].a1==this.sc[index].ee){
                     this.u[i].a3=false
                 }
             }
             //重新读入收藏状态
         var u = JSON.stringify(this.u);
        localStorage.setItem("uss", u);
            
        }
        
    },
    created(){
        //当前登录状态
          var userLogin = localStorage.getItem("userLogin");
      userLogin = JSON.parse(userLogin);
      this.sj = userLogin.userId;
        //收藏数据
           var u = localStorage.getItem("uss");
           this.u = JSON.parse(u);
        for(var i=0;i<this.u.length;i++){
        if(this.u[i].a4== this.sj && this.u[i].a3==true){
            var e = this.u[i].a4;
            var ee = this.u[i].a1;
            var hh=this.u[i].a3;
            var ss = {
                e,
                ee,
                hh
            };
            this.sc.push(ss)
            console.log(this.sc)
        }
        }
      
    }
}
</script>
<style lang="less" scoped>
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
.x{
    overflow: hidden;
    margin-bottom: 0.1rem;
    height: 1rem;
    line-height: 1rem;
    width:100%;
    font-size:0.5rem;
    background: rgba(0,0,0,.3);
    .x1{
        float: left;
    }
    .x2{
        float:right;
    }
}
</style>