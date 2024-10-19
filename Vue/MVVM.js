; (function () {
  // view
  document.body.insertAdjacentHTML(
    'afterbegin',
    `
      <div id="app">
        <div>
          <span>{{ val }}rmb</span>
        </div>
        <div>
          <button @click="sub()">-</button>
          <button @click="add()">+</button>
        </div>
      </div>
    `
  )

  // model
  const data = {
    val: 0
  }

  // viewModel 
  new Vue({
    el: '#app',
    data() {
      return data
    },
    methods: {
      add(v = 1) {
        this.val += v
      },
      sub(v = 1) {
        this.val -= v
      }
    },

  })

})()