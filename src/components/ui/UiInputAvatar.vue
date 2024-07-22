<template>
  <div class="form-input">
    <input
      class="none"
      type="file"
      accept="imege/*"
      ref="fileInput"
      @change="onInputFileChange"
    />
    <img
      class="form-input__img"
      style="max-width: 250px; min-width: 250px;"
      :src="state.imgSrc"
      @click="$refs.fileInput.click()"
      alt="AvatarMovie"
    >
    <button class="form-input__but" @click.prevent.stop="deleteMovie">Удалить</button>
  </div>
</template>
<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import store from '@/store/index'

const route = useRoute()

const emit = defineEmits(['update:value'])

const props = defineProps({
  value: [File, String]
})

const state = reactive({
  imgSrc: props.value
})

const onInputFileChange = (v: any) => {
  const file = v.target.files[0]
  state.imgSrc = URL.createObjectURL(file)
  updateFile(file)
}

const deleteMovie = () => {
  state.imgSrc = require('../../assets/card/no-image-placeholder.jpg')
  updateFile(state.imgSrc)
}

const updateFile = (v: any) => {
  emit('update:value', v)
}

onMounted(() => {
  if (route.params.id !== 'create') {
    state.imgSrc = store.state.movieList[store.state.movieList.findIndex((el) => el.id === Number(route.params.id))].img
  } else {
    state.imgSrc = require('../../assets/card/no-image-placeholder.jpg')
  }
})

</script>
<style lang="scss" scoped>
.none {
    display: none;
}

.form-input {
  display: flex;
  position: relative;
  cursor: pointer;
  margin-bottom: 10px;

  &__img {
    max-width: 250px;
    min-width: 250px;
    border-radius: 3%;
    object-fit: cover;
  }
  &__but {
    padding: 4px 8px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    background: #70c05b;
    border-radius: 4px;
    font-weight: 400;
    font-size: 16px;
    color: #fff;
  }
}
</style>