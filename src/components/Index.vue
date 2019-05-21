<template>
  <div class="box">
    <!-- 搜索框 -->
    <div class="seek">
      <van-search background="#000" placeholder="请输入搜索关键词"/>
    </div>
    <!-- 轮播图 -->
    <div class="slideshow">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img class="auto-img" :src="image.url">
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- //影院热映 -->
    <div class="hotShowing">
      <div class="hot">
        <div>影院热映</div>
        <div @click="go({name:'Gd',params: {pid:'in_theaters'}})">更多</div>
      </div>
      <div class="showing">
        <nav>
          <div class="s" v-for="(item,index) in rl.slice(0, 6)" :key="index" @click="xianq({name:'Xq',params: {pid:item.id}})">
            <div class="img">
              <img class="auto-img1" :src="'https://images.weserv.nl/?url='+item.images.small">
            </div>
            <p class="z">{{item.title}}</p>
            <div class="pf">{{item.rating.average}}</div>
            <div class="lei">
              <span class="s">{{item.genres[0]}}</span>
              <span class="ss">{{item.genres[1]}}</span>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <!-- 即将上映 -->
    <div class="hotShowing">
      <div class="hot">
        <div>即将上映</div>
        <div @click="go({name:'Gd' ,params: {pid:'coming_soon'}})">更多</div>
      </div>
      <div class="showing">
        <nav>
          <div class="s" v-for="(item,index) in jl.slice(0, 6)" :key="index"  @click="xianq({name:'Xq',params: {active,pid:item.id}})">
            <div class="img">
              <img class="auto-img" :src="'https://images.weserv.nl/?url='+item.images.small">
            </div>
            <div class="z">{{item.title}}</div>
            <div class="pf">{{item.rating.average}}</div>
            <div class="lei">
              <span class="s">{{item.genres[0]}}</span>
              <span class="ss">{{item.genres[1]}}</span>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>
<script>
import { Search, Swipe, SwipeItem } from "vant";
import $ from "jquery";
import qs from "qs";
export default {
  name: "Index",
  data() {
    return {
      active:0,
      rl:null,//热映本地
      jl:null,//即将本地
      rys: [], //热映20个
      jjs: [], //即将上映
      value:'',
      j:[],
      images: [
        {
          url:
            "https://wx3.sinaimg.cn/large/007bEUxMly1g220l0h1edj30nw0a0dzc.jpg"
        },
        {
          url:
            "http://img3.imgtn.bdimg.com/it/u=2911915373,992953900&fm=11&gp=0.jpg"
        }
      ]
    };
  },
  created() {
    console.log('sss')
    //激活状态
    this.active = this.$route.params.active;
//检测有没本地储存    r热映
	var rel = localStorage.getItem('rl');
			this.rl = rel == undefined ? [] : JSON.parse(rel);
      // --跨域请求
    this.$http.get("/api/movie/in_theaters").then(res => {
      this.rys = res.data.subjects;
      console.log('ss',this.rys);
         var rel = JSON.stringify(this.rys);
    localStorage.setItem('rl', rel);
    });

 //检测有没本地储存    r上映
var jil = localStorage.getItem('jl');
			this.jl = jil == undefined ? [] : JSON.parse(jil);
      // --
    this.$http.get("/api/movie/coming_soon").then(res => {
      this.jjs = res.data.subjects;
      console.log('this.jjs',this.jjs)
      // console.log('jj',this.jjs);
     var jil = JSON.stringify(this.jjs);
    localStorage.setItem('jl', jil);

    });
        // console.log('jjk',this.ji)
  },
  components: {
    [Search.name]: Search,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  methods: {
    go(path) {
      this.$router.push(path);
    },
    xianq(path){
       this.$router.push(path);
    }
  }
};
</script>
<style lang="less" scoped>
.seek {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
}
.auto-img {
  display: block;
  width: 100%;
  height: 5rem;
}
.auto-img1 {
  display: block;
  width: 100%;
  height: 4.7rem;
}

.hot div:first-child {
  float: left;
  font-size: 0.64rem;
}
.hot {
  margin-top:0.3666rem; 
  overflow: hidden;
  padding: 0 0.2666rem;
  width: calc(100%-0.5333rem);
  height: 1.3rem;
  line-height: 1.3rem;
  text-align: center;
}
.hot div:last-child {
  color:yellowgreen;
  float: right;
  font-size: 0.4rem;
}
.showing {
  width: 100%;
  overflow: hidden;
}
.showing nav {
  display: -webkit-box;
  overflow: auto;
  padding-bottom: 0.3rem;
}
.showing .s {
  position: relative;
  text-align: center;
  width: 3.470rem;
}
.img {
  margin-top: 0.2133rem;
  margin-left: 0.08rem;
  width: 3.3rem;
}
.z {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.4rem;
  margin-top: 0.08rem;
  margin-bottom: 0.08rem;
}
.pf {
  color: #000;
  position: absolute;
  padding: 0.05rem;
  top: 0.294rem;
  right: 0.294rem;
  font-size: 0.19rem;
  background: yellow;
  border-radius: 50%;
}
.lei {
  span {
    display: line-block;
    background: #cecaca;
    margin-right: 0.3333rem;
    border-radius: 0.1066rem;
  }
  .ss {
    margin-left: 0.08rem;
  }
}
</style>
