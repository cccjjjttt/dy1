<template>
  <div v-if="rys">
    <!-- 头部 -->
    <div class="nav">
      <van-icon class="font" @click="fh({name:'Index'})" name="arrow-left"/>
      <h2 class="t">电影详情</h2>
    </div>
    <!-- 内容 -->
    <div class="box">
      <!-- 1 -->
      <p class="p">{{rys.title}}</p>
      <!-- 2 -->
      <div class="tz">
        <div class="t-right">
          <img class="auto" :src="'https://images.weserv.nl/?url='+rys.images.small">
        </div>
        <div class="t-left">
          <div class="left-f">
            <div class="x">
              <van-rate v-model="value" :size="14" allow-half void-icon="star" void-color="#eee"/>
            </div>
            <strong class="p1"></strong>
            <span class="p2">{{rys.comments_count}}人评价</span>
          </div>
          <div class="left-l">
            <p>{{rys.durations[0]}} / {{rys.genres[0]}} / {{rys.genres[1]}} / {{rys.directors[0].name}}（导演）/ {{rys.casts[0].name}} / {{rys.casts[1].name}} / {{rys.casts[2].name}} / {{rys.pubdates}} 上映</p>
          </div>
        </div>
      </div>
      <!-- 3 -->
      <div class="zhon">
        <span @click="xianq({name:'Gk',params: {i:i,pid:rys.id,id:id }})">预告</span>
        <span :class="{ac:s}" @click="sc">收藏</span>
      </div>
      <!-- 频道 -->
      <section class="d">
        <div class="pd">所属频道</div>
        <div class="ul">
          <span v-for="(item,index) in rys.tags" :key="index">{{item}}</span>
        </div>
      </section>
      <!-- 简介 -->
      <section class="jianjie">
        <div class="jj">{{rys.title}}的剧情简介</div>
        <p class="jjp">{{rys.summary}}</p>
      </section>
      <!-- 影人 -->
      <section class="yingren">
        <div class="yr">影人</div>
        <nav>
          <div class="y">
            <div class="img">
              <img
                class="auto-img"
                :src="'https://images.weserv.nl/?url='+rys.directors[0].avatars.small"
              >
            </div>
            <p>{{rys.directors[0].name}}</p>
            <p>导演</p>
          </div>

          <div class="y" v-for="(item,index) in rys.casts" :key="index">
            <div class="img">
              <img class="auto-img" :src="'https://images.weserv.nl/?url='+item.avatars.small">
            </div>
            <p>{{item.name}}</p>
            <p>演员</p>
          </div>
        </nav>
      </section>
      <!-- 短评 -->
      <section class="duanpin">
        <div class="dp">{{rys.title}}的短评</div>
        <div class="kon" v-if=" rys.popular_comments.length==0 ">空空如也</div>
        <div class="pl" v-for="(item,index) in rys.popular_comments" :key="index">
          <div class="pl-t">
            <div class="pl-img">
              <img class="auto-img" :src="'https://images.weserv.nl/?url='+item.author.avatar">
            </div>
            <div>
              <div class="plt">
                <strong class="ss">{{item.author.name}}</strong>
                <van-rate
                  class="s"
                  v-model="value1"
                  :size="7"
                  allow-half
                  void-icon="star"
                  void-color="#eee"
                />
              </div>
              <br>
              <span class="time">{{item.created_at}}</span>
            </div>
          </div>
          <div class="pl-box">
            <p class="nr">{{item.content}}</p>
            <span class="ico">{{item.useful_count}}</span>
          </div>
        </div>

        <div class="ck">查看全部短评</div>
      </section>
      <!-- 影评 -->
      <section class="yingpin">
        <div class="yp">{{rys.title}}的影评</div>
        <div class="yp-box" v-for="(item,index) in rys.popular_reviews.slice(0,4)" :key="index">
          <div class="yp-title">{{item.title}}</div>
          <div class="yp-t">
            <span class="yp-p">{{item.author.name}}</span>
            <van-rate
              class="s1"
              v-model="value2"
              :size="7"
              allow-half
              void-icon="star"
              void-color="#eee"
            />
          </div>
          <br>
          <div class="yp-nr">{{item.summary}}</div>
        </div>
        <div class="ck">查看全部影评</div>
      </section>
    </div>
  </div>
</template>
<script>
import { Icon, Rate, Dialog } from "vant";
import $ from "jquery";
import qs from "qs";
export default {
  name: "Xq",
  data() {
    return {
        i:0,
      s: "",
      sj:[],
      us: [],
      rys: "",
      value: 2,
      value1: 1,
      value2: 3,
      id:''
    };
  },
  components: {
    [Icon.name]: Icon,
    [Rate.name]: Rate,
    [Dialog.name]: Dialog
  },
  created() {
     console.log('ss',this.i)
    //登录状态
    this.id=this.$route.params.pid;
     var userLogin = localStorage.getItem('userLogin');
     this.active = this.$route.params.active;
             var userLogin = localStorage.getItem('userLogin');
             if(userLogin){
                 userLogin = JSON.parse(userLogin);
                 this.sj = userLogin;
             }
    console.log(this.$route.params.pid);
    this.$http.get("/api/movie/subject/" +this.$route.params.pid )
      .then(res => {
        this.rys = res.data;
        console.log(this.rys);
            //收藏状态
      var userLogin = localStorage.getItem("userLogin");
      userLogin = JSON.parse(userLogin);
      console.log(userLogin)
      // this.sj = userLogin;
        var us1 = localStorage.getItem("uss");
        var us1 = JSON.parse(us1);
      console.log('jj',us1)
       for (var i = 0; i < us1.length; i++) {
           console.log('sas',this.rys.id)
        if (us1[i].a4 == this.sj.userId&&us1[i].a2==this.rys.id) {
            
            this.s=us1[i].a3

         console.log('sssssj',us1[i].a3)
        }
      }
      });
             
  },
  methods: {
    fh(path) {
      this.$router.push(path);
    },
    xianq(path) {
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
    sc() {
      if (this.sj.loginStatus==undefined) {
        Dialog.alert({
          message: "没有登录"
        }).then(() => {});
        return;
      }
      this.s = !this.s;
      var us1 = localStorage.getItem("uss");
      this.us = us1 == undefined ? [] : JSON.parse(us1);
      console.log("us", this.us);
      var a1 = this.rys.title;
      var a2 = this.rys.id;
      var a3 = this.s;
      var a4 = this.sj.userId;
      var u = {
        a1,
        a2,
        a3,
        a4
      };
      console.log('ss',a4)
      console.log('uu',this.sj.userld)
      for (var i = 0; i < this.us.length; i++) {
          console.log('uu',this.sj.userld)
        if (this.us[i].a2 == u.a2&&this.us[i].a4==a4) {
          this.us[i].a3 = u.a3;
          var us1 = JSON.stringify(this.us);
          localStorage.setItem("uss", us1);
          return;
        }
      }
      this.us.push(u);

      var us1 = JSON.stringify(this.us);
      localStorage.setItem("uss", us1);
    }
  }
};
</script>
<style lang="less" scoped>
.ac {
  background: red;
}
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 1.3333rem;
  width: 100%;
  background: #000;
  overflow: hidden;
  .font {
    float: left;
    color: #fff;
    font-size: 0.8rem;
    line-height: 1.3333rem;
  }
  .t {
    margin: 0;
    padding: 0;
    float: left;
    color: #fff;
    line-height: 1.3333rem;
    margin-left: 3rem;
  }
}
.box {
  width: calc(100%-1.066666rem);
  padding: 0.533333rem 0.533333rem;
  .p {
    margin: 0;
    padding: 0.266666rem 0;
    font-size: 0.72rem;
  }
}
.tz {
  overflow: hidden;
  width: 100%;
  .t-right {
    float: right;
    width: 35%;
    .auto {
      width: 100%;
      display: 100%;
    }
  }
  .t-left {
    width: 65%;
    float: left;
    padding-bottom: 1.33333rem;
    .left-f {
      margin-bottom: 0.533333rem;
      overflow: hidden;
      .x {
        float: left;
        width: 50%;
        margin: 0;
        padding: 0;
      }
      .p1 {
        padding-right: 0.213333rem;
        float: left;
        font-size: 0.4rem;
        font-weight: normal;
        color: #494949;
      }
      .p2 {
        font-size: 0.4rem;
        color: #aaa;
        float: left;
      }
    }
    .left-l {
      p {
        color: #494949;
        font-size: 0.4266666rem;
        padding-right: 0.533333rem;
        line-height: 1.6;
      }
    }
  }
}
.zhon {
  overflow: hidden;
  margin-bottom: 0.8rem;
  span {
    font-size: 0.48rem;
    text-align: center;
    width: 3.733333rem;
    border: 0.0266666rem solid #ffb712;
    padding: 0.133333rem 0;
    color: #ffb712;
  }
  span:first-child {
    float: left;
  }
  span:last-child {
    float: right;
  }
}
.d {
  padding-bottom: 1.066666rem;
}
.pd {
  color: #aaa;
  font-size: 0.4533333rem;
}
.ul {
  overflow: hidden;

  span {
    color: #5fc770;
    font-size: 0.4rem;
    background: #effaf0;
    border-radius: 0.426666rem;
    float: left;
    margin-right: 0.373333rem;
    margin-top: 0.26666rem;
    display: block;
    border: 0.02666rem solid #5fc770;
    padding: 0.186666rem 0.4rem;
  }
}
.jianjie {
  padding-bottom: 0.53333rem;
  .jj {
    color: #aaa;
    font-size: 0.453333rem;
  }
  .jjp {
    font-size: 0.4266666rem;
    line-height: 0.66666rem;
    color: #494949;
  }
}
.yingren {
  padding-bottom: 0.533333rem;
  width: 100%;
  overflow: hidden;
  .yr {
    padding-bottom: 0.26666rem;
    color: #aaa;
    font-size: 0.4533333rem;
  }
  nav {
    display: -webkit-box;
    overflow: auto;
    .y {
      margin-right: 0.10666rem;
      width: 2.66666rem;
      text-align: center;
      p {
        margin: 0;
        padding: 0;
      }
      .img {
        width: 2.66666rem;
        .auto-img {
          display: block;
          width: 100%;
        }
      }
    }
  }
}
.duanpin {
  padding-bottom: 0.266666rem;
  .dp {
    color: #aaa;
    font-size: 0.53333rem;
    padding-bottom: 0.4rem;
  }
  .pl {
    margin-bottom: 0.66666rem;
    overflow: hidden;
    .pl-t {
      .pl-img {
        float: left;
        width: 1.146666rem;
        height: 1.146666rem;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 0.26666rem;
      }
      .plt {
        padding-bottom: 0.08rem;
        overflow: hidden;
        float: left;
        .s {
          float: left;
        }
        .ss {
          font-size: 0.453333rem;
          margin-right: 0.24rem;
          float: left;
        }
      }
      .time {
        margin-top: 0.24rem;
        display: block;
        padding: 0;
        color: #aaa;
      }
    }
    .pl-box {
      margin-left: 1.146666rem;
      .nr {
        padding: 0.26666rem 0;
        margin: 0;
        font-size: 0.45333rem;
      }
      .ico {
        color: #aaa;
      }
      .ico::before {
        background-position: center center;
        background-repeat: no-repeat;
        width: 0.533333rem;
        height: 0.53333rem;
        display: inline-block;
        content: " ";
        background-image: url(https://img3.doubanio.com/f/talion/7a0756b3b6e67b59ea88653bc0cfa14f61ff219d/pics/card/ic_like_gray.svg/talion/7a0756b…/pics/card/ic_like_gray.svg);
      }
    }
  }
  .ck {
    color: #42bd56;
    height: 0.8rem;
    width: 100%;
    line-height: 0.8rem;
    text-align: center;
    font-size: 0.453333rem;
  }
}
.yingpin {
  padding-bottom: 1.333333rem;
  .yp {
    color: #aaa;
    font-size: 0.56666rem;
  }
  .yp-box {
    padding-bottom: 15px;
    .yp-title {
      padding: 10px 0;
      font-size: 20px;
    }
    .yp-t {
      padding: 3px 0;
      .yp-p {
        float: left;
      }
      .s1 {
        float: left;
      }
    }
    .yp-nr {
      color: #aaa;
    }
  }
  .ck {
    color: #42bd56;
    font-size: 0.426666rem;
    width: 100%;
    height: 1.066666rem;
    line-height: 1.06666rem;
    text-align: center;
  }
}
.kon {
  width: 100%;
  height: 2.133333rem;
  line-height: 2.133333rem;
  text-align: center;
  color: #aaa;
  font-size: 0.5066666rem;
}
</style>

