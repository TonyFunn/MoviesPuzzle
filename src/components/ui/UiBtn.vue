<template>
  <button
    :class="['btn', {'btn_success': success},{'btn_danger': danger}]"
    @click="clickOnButton"
  >
    <span>{{label}}</span>
  </button>
</template>

<script setup lang="ts" >
const props = defineProps<{
  label: {
    type: String,
    default: 'Button'
  },
  danger: {
    type: Boolean,
    required: false
  },
  success: {
    type: boolean,
    required: false
  }
}>()

const emit = defineEmits(['click'])

const clickOnButton = () => {
  emit('click')
}
</script>


<style lang="scss" scoped>
.btn {
  width: 100%;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 0 20px;
  height: 40px;
  color: #fff;
  background:  #394c608d;
  border-radius: 7px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  transition: .2s;
  &:hover {
    background: #405b75;
    box-shadow: 0 5px 15px 0 rgba(0,0,0,0.2);
    transition: .2s;
  }
  &:active {
    background: #394c608d;
    color: #2c3e50;
    box-shadow: 10px 10px 10px 2px rgba(34, 60, 80, 0.2) inset;
    transition: 0.5s;
  }

  &_success {
    background: #394c608d;
    border: 1px solid #93aac7;
    &:enabled:hover {
      background: #4bc081;
    }
  }
  &_danger {
    background: #394c608d;
    border: 1px solid #93aac7;
    &:enabled:hover {
      background: rgb(211, 2, 2);
    }
  }
  &:disabled {
    opacity: .6;
    cursor: default;
  }
}
</style>