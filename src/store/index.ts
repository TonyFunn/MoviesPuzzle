import { createStore } from 'vuex'

export default createStore({
  state: {
    movieList: [
      {
        name: 'Михаил Очиститель картофиля',
        img: require('@/assets/card/patsan-min.jpg'),
        id: 1,
        description: 'Михаил любил картошку сильнее чем остальные и чистил её только один!!!',
        rating: 8,
        genre: ['триллер', 'комедия', 'хентай'],
        year: 2014
      },
      {
        name: 'До встречи с тобой Гриша',
        img: require('@/assets/card/no-image-placeholder.jpg'),
        id: 2,
        description: 'Гриша любил Ольгу Натальевну, у них был замечательный коньяк ',
        rating: 5,
        genre: ['комедия', 'роман'],
        year: 2000
      },
      {
        name: 'Бегущий за пивом 2',
        img: require('@/assets/card/no-image-placeholder.jpg'),
        id: 3,
        description: 'Он бежал но было уже 21:59',
        rating: 7,
        genre: ['комедия', 'триллер'],
        year: 2018
      }
    ]
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
