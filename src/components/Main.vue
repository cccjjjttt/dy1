<template>
 <div class="main">
   <div class="bu-nav">
    <van-tabbar v-model="active" class="nav">
		  <van-tabbar-item  :icon="item.icon" @click="go(item.path)"  v-for="(item, index) in tabs" :key="index" >{{item.title}}</van-tabbar-item>
		</van-tabbar>
     <div><router-view></router-view></div>
   </div>
  
</div>

</template>

<script>

import { Tabbar, TabbarItem } from 'vant';
export default {
  name: 'Main',
  	data() {
			return {
				active: 0,
				tabs: [
					{title: '首页', icon: 'home-o' ,path:({name:'Index',params:{active:0}})},
					{title: '发现', icon: 'coupon-o',path:({name:'Fx',params:{active:1}}) },
					{title: '我的', icon: 'manager-o',path:({name:'Wd',params:{active:2}}) }
				]
			}
		},
components:{
  [Tabbar.name]:Tabbar,
  [TabbarItem.name]:TabbarItem
},
methods: {
   go(path){
     console.log('ss')
         this.$router.push(path)
   }
},  
created() {
  this.active = this.$route.params.active;
}
}

</script>

<style lang="less" scoped>
.main{
  margin: 0;
  padding-bottom: 1.3333rem;
}
   .nav{
     background:rgba(0,0,0,1);
   }
</style>