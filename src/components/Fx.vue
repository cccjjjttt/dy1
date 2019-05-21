<template>
<div>
<div>
<van-tabs background="#2E2E2E" title-active-color="#fff" v-model="active" sticky>
  <van-tab title="花絮">
      <div class="yugao">
      <div class="yg" >
          <div  v-for="(item,index) in fl" :key="index">
          <div  class="pian" v-if="item.trailers.length!=0" >
              <div class="img"  @click="xianq({name:'Gk' ,params: {active,pid:item.id}})"><img class="auto-img" :src="item.trailers[0].small">
              <div class="ico"><van-icon color="#fff" size="30px" name="play-circle-o" /></div>
              </div>
              <div class="jq">{{item.title}}</div>
              <div class="pm">{{item.trailers[0].title}}</div>
          </div>
          </div>
      </div>
      </div>
  </van-tab>
  <!-- <van-tab title="剧照">内容 2</van-tab> -->
</van-tabs>
</div>
</div>
</template>
<script>
import { Tab, Tabs,Icon } from 'vant';
export default {
    name:'Fx',
    data(){
        return{
            fl:null,
            dys:[],
            dy:{},
            rys:[],
        active: 1
        }
    },
    components:{
       [Tab.name]:Tab,
       [Tabs.name]:Tabs,
       [Icon.name]:Icon
    },
    methods: {
         xianq(path){
       this.$router.push(path);
    }
    },
       created() {
           //激活状态
           this.active = this.$route.params.active;
//检测有没本地储存    发现
	var fal = localStorage.getItem('fl');
            this.fl = fal == undefined ? [] : JSON.parse(fal);
            console.log('s',this.fl)
//    if(this.fl = fal == undefined){
        //获取电影i
            console.log('sj')
this.$http.get('/api/movie/in_theaters').then(res => {
      this.rys = res.data.subjects
              console.log('ry',this.rys)

       for(var i=0;i<this.rys.length;i++){
        //获取电影详情
             this.$http.get('/api/movie/subject/'+this.rys[i].id).then(res => {
      this.dy = res.data;
      this.dys.push(this.dy);
    //   console.log('电影',this.dys)
       var fal = JSON.stringify(this.dys);
    localStorage.setItem('fl', fal);
              })
      }
       });
        
       }
   
//   }
}
</script>
<style lang="less" scoped>
.nav{
    width: 100%;
      height: 1.3333rem;
    background: #000;
}
.auto-img{
    width:100%;
    display: block;
}
.yugao{
    .yg{
        width: 100%;
        overflow: hidden;
        .pian{
            margin: 0.1333333rem 0 0 0.5333333rem;
            margin-bottom: 0.2666666rem;
            float: left;
            width:4.266666rem;
            .img{
                position: relative;
                overflow: hidden;
                width:4.266666rem;
                border-radius: 0.3733333rem;
                .ico{
                    width:0.8rem;
                    height:0.8rem;
                    position: absolute;
                    top:0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    margin:auto;
                }
            }
            .jq{
                font-size: 0.3733333rem;
                
            }
            .pm{
                color:#aaa;
                font-size:0.32rem;
            }
        }
    }
}
</style>