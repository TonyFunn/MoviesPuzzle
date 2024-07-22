<template>
  <h2 class="bun-comeback" @click="$router.push('/')">Вернуться назад</h2>
  <div class="details">
    <img class="details__img" :src="state.movie.img" alt="">
    <div>
      <h2 class="details__name">Название фильма: {{ state.movie.name }}</h2>
      <p class="details__year"> Год выпуска: {{ state.movie.year }}</p>
      <p class="details__genre">
        Жанры:
        <dev style="display: flex; margin-left: 30px;" v-for="item of state.movie.genre" :key="item">
          <span>{{item}}</span>
        </dev>
      </p>
      <p class="details__description"> Описание фильма: {{ state.movie.description }}</p>
      <p class="details__rating"> Рейтинг: {{ state.movie.rating }} / 10</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import store from '@/store'

const route = useRoute()

const state = reactive({
  movie: {},
  enterGener: null
})

onMounted(() => {
  state.movie = store.state.movieList[store.state.movieList.findIndex((el: {id: number} ) => el.id === Number(route.params.id))]
})
</script>

<style lang="scss"  scoped>
.details {
  display: flex;
  justify-content: space-evenly;
  margin-top: 50px;
  padding: 20px;
  border-radius: 20px;
  background: #96acc6;
  color: #5d3232;

  @media screen and (max-width: 750px) {
    display: block;
    margin-top: 50px;
    padding: 20px;
    border-radius: 20px;
    background: #96acc6;
    color: #5d3232;
  }

  &__img {
    width: 100%;
    max-width: 250px;
    min-width: 250px;
    border-radius: 3%;
    object-fit: cover;
    margin-bottom: 40px;
    margin-right: 20px;
  }
  &__name {
    margin-bottom: 20px;
    color: #414141;
    padding: 5px;
    background: #e2e2e2;
    border-radius: 8px;
  }
  &__year {
    margin-bottom: 20px;
  }
  &__genre {
    margin-bottom: 20px;
  }
  &__description {
    margin-bottom: 20px;
  }
  & p {
    font-size: 20px;
    padding: 5px;
    background: #e2e2e2;
    border-radius: 8px;
  }
}
</style>
