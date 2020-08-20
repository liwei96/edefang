<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    resetrem();
    //切换屏幕 （横屏竖屏）
    window.addEventListener("orientationchange", resetrem);
    //resize：屏幕的大小发生改变就触发监听事件resetrem
    window.addEventListener("resize", resetrem);

    function resetrem() {
      var html = document.querySelector("html"); //获取到html元素
      var width = html.getBoundingClientRect().width; //获取屏幕的宽度
      html.style.fontSize = width / 23.5 + "px";
    }
    // var _hmt = _hmt || [];
    // (function () {
    //   var hm = document.createElement("script");
    //   hm.src = "https://hm.baidu.com/hm.js?1c9aa262da40a79323320ad1cd0b1ae8";
    //   var s = document.getElementsByTagName("script")[0];
    //   s.parentNode.insertBefore(hm, s);
    // })();
  },
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
html {
  max-width: 540px;
}

@keyframes big-in {
  0% {
    transform: translate3d(-50%, -50%, 0);
    transform: scale(0.2);
  }
  100% {
    position: fixed;
    transform: translate3d(-50%, -50%, 0);
    transform: scale(1);
    top: 50%;
    left: 50%;
  }
}
@keyframes big-out {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.5);
  }
}

.change-enter,
.change-leave-active {
  opacity: 0;
  scale: 0.5;
}
.change-enter-active {
  position: fixed;
  top: 50%;
  left: 50%;
  transition: opacity 5s;
  animation: big-in 5s;
}
.change-leave-active {
  transition: opacity 0.5s;
  // animation: big-out 0.5s;
}
</style>
