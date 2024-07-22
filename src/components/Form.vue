<template>
  <form class="form" @submit.prevent="submitForm">
    <div class="form__content">
      <div class="form__content-left">
          <UiInput
              label="Название фильма"
              name="name"
              placeholder="Введите название"
              v-model:value="v.name.$model"
              :error="v.name.$errors"
          />
          <UiInput
            label="Жанры фильма"
            name="genre"
            placeholder="Введите жанры"
            v-model:value="genre"
            :disabled="true"
          />
          <select class="input-select" style="width: 300px;" v-model="genre" multiple>
            <option>Триллер</option>
            <option>Комедия</option>
            <option>Хентай</option>
            <option>Ужасы</option>
            <option>Драма</option>
          </select>
          <UiInput
              label="Описание фильма"
              name="description"
              placeholder="Опишите фильм"
              v-model:value="v.description.$model"
              :error="v.description.$errors"
          />
          <UiInput
              label="Рейтинг"
              name="rating"
              placeholder="Введите рейтинг"
              v-model:value="v.rating.$model"
              :error="v.rating.$errors"
              :max="10"
              type="number"
          />
          <UiInput
              label="Год выпуска"
              name="year"
              placeholder="Введите год выпуска"
              v-model:value="v.year.$model"
              :error="v.year.$errors"
              :max="new Date().getFullYear()"
              type="number"
          />
      </div>
      <div class="form__content-right">
        <UiInputAvatar v-model:value="img" />
      </div>
    </div>
    <Btn type="submit" :label=" route.params.id === 'create' ? 'Создать' : 'Редактировать'" />
  </form>
</template>

<script setup>
import Btn from './ui/UiBtn.vue'
import UiInput from './ui/UiInput.vue'
import UiInputAvatar from './ui/UiInputAvatar.vue'

import { ref, computed, onMounted, reactive, watch } from 'vue'
import useVuelidate from '@vuelidate/core'
import { helpers, minLength, maxLength, numeric, required } from '@vuelidate/validators'
import { useRouter, useRoute } from 'vue-router'
import store from '../store/index'

const router = useRouter()
const route = useRoute()

const name = ref('')
const img = ref('')
const description = ref('')
const genre = ref([])
const rating = ref(null)
const year = ref(null)

const rules = computed(() => ({
  name: {
    minLength: helpers.withMessage(`Минимальная длина: 3 символа`, minLength(3)),
    required: helpers.withMessage(`Обязательное поле`, required)
  },
  description: {
    minLength: helpers.withMessage(`Минимальная длина: 3 символа`, minLength(3))
  },
  year: {
    minLength: helpers.withMessage(`Максимальная длина: 4 символа`, maxLength(4)),
    required: helpers.withMessage(`Обязательное поле`, required)
  },
  rating: {
    maxLength: helpers.withMessage(`Максимальная длина: 2`, maxLength(2)),
    numeric: helpers.withMessage('Вы можете ввести только цифры', numeric),
    required: helpers.withMessage(`Обязательное поле`, required)
  }
}))

const v = useVuelidate(rules, {name, genre, img, description, rating, year})

const submitForm = () => {
  v.value.$touch()
  if (v.value.$error) return
  if (route.params.id === 'create') {
    const createMovie = computed(() => {
      return {
        id: Date.now(),
        name: name.value,
        img: typeof img.value === 'string'? img.value : URL.createObjectURL(img.value),
        description: description.value,
        genre: genre.value,
        rating: rating.value,
        year: year.value
      }
    })
    store.state.movieList.push(createMovie.value)
  } else {
      const movie = store.state.movieList[store.state.movieList.findIndex((el) => el.id == route.params.id)]
      movie.name = name.value
      movie.img = typeof img.value === 'string'? img.value : URL.createObjectURL(img.value)
      movie.description = description.value
      movie.genre = genre.value
      movie.rating = rating.value
      movie.year = year.value
  }
  router.push('/')
}

onMounted(() => {
  if (route.params.id !== 'create') {
    const listMmovie = store.state.movieList.find((el) => el.id == route.params.id)
    name.value = listMmovie.name
    img.value = listMmovie.img
    description.value = listMmovie.description
    genre.value = listMmovie.genre
    rating.value = listMmovie.rating
    year.value = listMmovie.year
  }
})
</script>

<style lang="scss" scoped>
.form {
  margin-top: 50px;
  padding: 20px;
  border-radius: 20px;
  background: #96acc6;
}
.form__content {
  display: flex;
  justify-content: space-evenly;
  padding: 0;

  @media screen and (max-width: 959px) {
    display: contents;
  }
  &-left {
    padding: 20px 0;
  }
}

.input-select {
  padding: 10px;
  border: 1px solid #fff;
  border-radius: 8px;
  margin-bottom: 70px;
}
</style>