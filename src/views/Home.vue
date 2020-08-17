<template>
  <div class="home">
    <van-popup v-model="show" :style="{background:'rgba(0,0,0,0)'}"><popup></popup></van-popup>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Popup from '@/components/Popup.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Popup
  },
  data(){
    return {
      show:true
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
