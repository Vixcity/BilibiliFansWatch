<template>
  <div class="greetings">
    <div class="flex pdlr1 pdt05">
      <div :class="[{ drag: !isLock }, { noDrag: isLock }]"></div>
      <div class="pdlr05" v-if="isLock">
        <i style="cursor: pointer;" @click="changeLock" class="blue iconfont icon-lock"></i>
      </div>
      <div class="pdlr05" v-else>
        <i style="cursor: pointer;" @click="changeLock" class="iconfont icon-unlock"></i>
      </div>
      <div class="pdlr05" v-if="isBig">
        <i style="cursor: pointer;" @click="changeBig" class="iconfont icon-zhankaishangxia"></i>
      </div>
      <div class="pdlr05" v-else>
        <i style="cursor: pointer;" @click="changeBig" class="blue iconfont icon-shouhuishangxia"></i>
      </div>
      <div class="pdlr05">
        <i style="cursor: pointer;" @click="changeToTop" :class="{blue:isTop}" class="iconfont icon-zhiding"></i>
      </div>
      <div class="pdlr05">
        <i style="cursor: pointer;" @click="close" class="iconfont icon-guanbi"></i>
      </div>
    </div>
    <h1 class="green">{{ msg }}</h1>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
export default {
  name: "helloWorld",
  data: function () {
    return {
      isLock: false,
      isBig:true,
      isTop:false,
      changeLock: () => {
        this.isLock = !this.isLock
      },
      changeBig: () => {
        this.isBig = !this.isBig
      },
      changeToTop: () => {
        this.isTop = !this.isTop
        ipcRenderer.invoke("isTop",this.isTop);
      },
      close: () => {
        ipcRenderer.invoke('close')
      }
    }
  }
}
</script>

<style scoped>
.flex{
  display: flex;
}

.pdlr1{
  padding:0 10px;
}

.pdt05{
  padding-top:5px;
}

.pdlr05{
  padding:0 5px;
}

.drag {
  -webkit-app-region: drag;
  height: 20px;
  width: 100%;
}

.noDrag {
  -webkit-app-region: no-drag;
  height: 20px;
  width: 100%;
}

.blue {
 color:#51c4d3
}

.iconfont {
  font-size: 20px;
}
</style>