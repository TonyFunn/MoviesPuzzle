<template>
  <div class="movies">
    <div class="movies__title">
      <h2>Мои фильмы</h2>
      <Btn label="Добавить фильм" @click="$router.push(`/movieEditView/${'create'}`)" />
    </div>
    <div class="movies__cards">
      <div class="card" v-for="(item, index) of $store.state.movieList" :key="index">
        <div class="card__top" @click="$router.push(`/moviedetails/${item.id}`)">
          <div class="card__image">
            <img
              :src="typeof item.img === 'string' ? item.img : item.img"
              alt="Картинка фильма"
            />
          </div>
          <div class="card__label">{{ item.rating }}</div>
        </div>
        <div class="card__bottom">
          <h3 class="card__title" @click="$router.push(`/moviedetails/${item.id}`)">
            {{ item.name }}
          </h3>
          <p>Год выпуска: {{ item.year }}</p>
          <div class="card__add">
            <Btn label="Редактировать" @click="editMovie(item.id)" />
            <Btn :danger="true" label="Удалить" @click="removeMovie(item.id)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Btn from '@/components/ui/UiBtn.vue'
import store from '@/store/index'

const router = useRouter()

const editMovie = (id: number) => {
  router.push(`/movieEditView/${id}`)
}

const removeMovie = (id: number) => {
  store.state.movieList = store.state.movieList.filter((m: any) => m.id !== id)
}
</script>

<style lang="scss">
.movies {
  margin-top: 20px;

  &__title {
    margin-bottom: 30px;
  }
  &__title h2 {
    font-size: 44px;
    margin-bottom: 20px;
    text-align: center;
  }
}

.movies__cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;

  
  @media screen and (max-width: 959px) {
    grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  }

}

.card {
  width: 225px;
  min-height: 350px;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  transition: 0.2s;
  position: relative;
  background: #96acc6;

  &:hover {
    box-shadow: 4px 8px 16px rgba(0, 0, 0, 0.1);
    transform: scale(1.1);
  }
}

.card__top {
  flex: 0 0 220px;
  position: relative;
  overflow: hidden;
}

.card__image {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50px;
  cursor: pointer;

  &:hover > img {
    transform: scale(1.1);
  }
}

.card__image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: 0.2s;
}

.card__label {
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

.card__bottom {
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  padding: 10px;
}

.card__bottom p {
  margin-bottom: 10px;
}


.card__prices {
  display: flex;
  margin-bottom: 10px;
  flex: 0 0 50%;
}

.card__title {
  display: block;
  margin-bottom: 10px;
  font-weight: 400;
  font-size: 17px;
  line-height: 150%;
  cursor: pointer;
  color: #414141;

  &:hover {
    color: #dee426;
  }
}

.card__add {
  display: block;
  border-radius: 4px;
  transition: 0.2s;
  margin-top: auto;
}
</style>
