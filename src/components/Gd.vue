<template>
  <div>
    <!-- 头部 -->
    <div class="g-nav">
      <van-icon class="font" @click="dian()" name="arrow-left"/>
      <h2 class="t">{{rys.title}}</h2>
    </div>
    <!-- 内容 -->
    <div class="box1">
     <div class="s1" v-for="(item,index) in rys.subjects" :key="index"  >
            <div class="img1" @click="xianq({name:'Xq',params: {pid:item.id}})">
              <img class="auto-img1" :src="'https://images.weserv.nl/?url='+item.images.small">
            </div>
            <div class="z1">{{item.title}}</div>
            <div class="pf1">{{item.rating.average}}</div>
            <div class="lei1">
              <span>{{item.genres[0]}}</span>
              <span class="ss1">{{item.genres[1]}}</span>
            </div>
          </div>
 
    </div>
  </div>
</template>
<script>
import { Icon } from "vant";
import $ from "jquery";
import qs from "qs";
export default {
  name: "Gd",
  data(){
    return{
      rys:[]
    }
  },
  components: {
    [Icon.name]: Icon
  },
  methods: {
    dian() {
       this.$router.go(-1)
    },
      xianq(path){
       this.$router.push(path);
    }
  },
  //初始化请求数据
   created() {
     console.log(this.$route.params.pid)
    this.$http.get('/api/movie/'+this.$route.params.pid).then(res => {
      this.rys = res.data;//subjects
      console.log(this.rys.subjects);
    });
  },
};
</script>
<style lang="less" scoped>
.g-nav {
  z-index: 100;
  overflow: hidden;
  position: sticky;
  top: 0;
  width: 100%;
  height: 1.3333rem;
  line-height: 1.3333rem;
  background: #000;
  .font {
    float: left;
    line-height: 1.3333rem;
    color: #fff;
    font-size: 0.8rem;
  }
  .t {
    padding: 0;
    float: left;
    margin: 0 0 0 2.1333rem;
    color: #fff;
  }
}
.box1{
  padding: 0.5333rem 0.2133rem;
  width: calc(100%-0.2133rem);
  overflow: hidden;
}
.box1>.s1{
    float: left;
}
.auto-img1 {
  display: block;
  width: 100%;
}
.s1 {
  padding-bottom: 0.4rem;
  margin:0 0.24rem;
  position: relative;
  text-align: center;
  width: 2.7rem;
  text-align: center;
}
.img1 {
  height: 3.9666rem;
  width: 2.7rem;
}
.z1 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.4rem;
  margin-top: 0.08rem;
  margin-bottom: 0.08rem;
}
.pf1 {
  color: #000;
  position: absolute;
  padding: 0.08rem;
  top: 0.2033rem;
  right: 0.2733rem;
  font-size: 0.32rem;
  background: yellow;
  border-radius: 50%;
}
.lei1 {
  span {
    display: line-block;
    background: #cecaca;
    margin-right: 0.1333rem;
    border-radius: 0.1066rem;
  }
  .ss1 {
    margin-left: 0.08rem;
  }
}
</style>