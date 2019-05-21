<template>
<div class="li">
    <div class="nav">
        <span  @click="go1({name:'Wd',params:{active:2}})">返回</span>
    </div>
    <div class="qk">清空所有</div>
</div>
</template>
<script>
export default {
    name:'Li',
    methods:{
         go1(path){
             this.$router.push(path)
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
</style>