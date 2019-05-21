<template>

<div class="gk">
   
    <!-- 1 -->
            <div class="nav">
              <van-icon class="font" @click="fh()"  name="arrow-left"/>
              <h2 class="t">{{rys.title}}</h2>
         </div>
         <!-- 2 -->
         <div class="bf" v-if="rys">
                 <video :src="url[0].s" controls="controls" width="100%" height="180rem"></video>
         </div>
         <div>
               <div class="yg">{{rys.title}}  预告</div>
                <div class="l">
                  类型：
                    <span class="ll" v-for="(item,index) in rys.genres" :key="index">{{item}}</span>
            
                </div>
         </div>
         <!-- 3 -->
        <div>
          <div class="p"  @click="go(index)"  v-for="(item,index) in rys.trailers" :key="index"> {{item.title}}</div>
        </div>
        <!-- 剧照 -->
        <div class="jz1" v-if="jz">
              <div class="to">{{rys.title}}剧照</div>
              <div class="jz-img" v-for="(item,index) in jz.photos.slice(0,7)" :key="index"><img class="auto-img" :src="item.image">
              拍摄时间：{{item.created_at}}</div>
            
        </div>
</div>
</template>
<script>
import { Icon  } from "vant";
export default {
    name:'Gk',
    data(){
      return{
        i:0,
        rys:"",
        url:[{
          s:"",}],
           jz:"",
         active:0,
         id:""
      }
     
    },
    created() {
      //激活

      this.id=this.$route.params.id;
      console.log('s',this.$route.params.id)
          this.i = this.$route.params.i;
          console.log('ii',this.i)
          console.log(this.i==0)
      this.active = this.$route.params.active;
     console.log('id',this.$route.params.pid)
     //电影预告
    this.$http.get('/api/movie/subject/'+this.$route.params.pid).then(res => {
      this.rys = res.data;
      console.log('j',this.rys);
          this.url[0].s=this.rys.trailers[0].resource_url;
    });
    //电影剧照
    this.$http.get('/api/movie/subject/'+this.$route.params.pid).then(res => {
      this.jz = res.data;
      console.log('ss',this.jz);
    });
  },
  components:{
  [Icon.name]:Icon
  },
   methods: {
      fh(){
        if(this.i==0){
          this.$router.push({name:'Xq',params:{pid:this.id }})
        }else{
          this.$router.push({name:'Fx',params:{active:1}})
        }
       
          // this.$router.push(path)
      },
      go(index){
        this.url[0].s=this.rys.trailers[index].resource_url;
      }
  }
}
  
</script>
<style lang="less" scoped>
.nav{
    position:sticky;
    top:0;
    z-index: 100;
    height: 1.3333rem;
    width: 100%;
    background: #000;
       overflow: hidden;
    .font{
        float:left;
        color: #fff;
        font-size: 30px;
        line-height: 1.3333rem;
    }
    .t{
        margin: 0;
        padding: 0;
        float: left;
        color:#fff;
        line-height: 1.3333rem;
     margin-left:3rem;
    }
}
.p{
  font-size: 15px;
  // padding-left:10px;
  margin-top:2px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: rgba(0,0,0,.3)
}
.jz1{
  width:100%;

  .to{
    padding:0.53333rem 0;
    font-size: 0.66666rem;
  }
  .jz-img{
    padding-bottom: 0.53333rem;
    color:#aaa;
    width:80%;
    margin: auto;
    .auto-img{
      width:100%;
      display: block;
    }
  }
}
.yg{
  padding: 0.346666rem 0;
  font-size:0.53333rem;
}
.l{
  width:100%;
  height: 1.066666rem;
  line-height: 1.066666rem;
 span{
   margin-left: 0.26666rem;
   padding:0.133333rem 0.26666;
   border:0.0266666rem solid red;
   background: yellow;
  }
}
</style>
