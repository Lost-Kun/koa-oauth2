<template>
    <transition name="fade">
        <div class="popup_hover_c" v-show="show">
            <div class="popup_container_c" :style="{height:height+'px',width:width+'px'}">
                <div class="popup_head_c">
                    <div class="popup_head_span" :title="title">
                        {{title}}
                    </div>
                    <div class="popup_head_close">
                        <i class="el-icon-close popup_head_close_icon" @click="close"></i>
                    </div>
                </div>
                <div class="popup_body_c">
                    <slot></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '提示'
    },
    width: {
      type: Number,
      default: 350
    },
    height: {
      type: Number,
      default: 150
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.popup_hover_c{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 500;
    background-color: rgba(0,0,0,.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.fade-enter-active{
    transition: opacity .5s;
}

.fade-leave-active {
    transition: opacity .3s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}

.popup_container_c{
    position: relative;
    z-index: 501;
    border-radius: 5px;
    background-color: #ffffff;
}

.popup_head_c{
    position: relative;
    height: 40px;
    line-height: 40px;
}

.popup_head_span{
    position: absolute;
    top: 0;
    left: 15px;
    bottom: 0;
    right: 50px;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
}

.popup_head_close{
    position: absolute;
    top: 0;
    right: 15px;
    width: 20px;
    bottom: 0;
}

.popup_head_close_icon{
    font-size: 22px;
    cursor: pointer;
}

.popup_head_close_icon:hover{
    color: #409EFF;
}

.popup_body_c{
    position: absolute;
    top: 40px;
    left: 15px;
    right: 15px;
    bottom: 15px;
}
</style>

