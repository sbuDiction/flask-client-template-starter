document.addEventListener('alpine:init', () => {
  //

  // Alpine.store()

  Alpine.data('greet', function () {
    return {
      username: '',
      message: '',
      firstInterval: 0,
      secondInterval: 0,
      thirdInterval: 0,
      radiationLevel: 0,

      greet () {
        const formData = new FormData()
        formData.append('username', this.username)

        axios
          .post('https://greet-me-api.herokuapp.com/api/greet', formData)
          .then(greetResults => {
            console.log(greetResults)
            this.message = greetResults.data.greet_message
          })
      },

      predict () {
        const radiationFormData = new FormData()
        radiationFormData.append('first_interval', this.firstInterval)
        radiationFormData.append('sec_interval', this.secondInterval)
        radiationFormData.append('third_interval', this.thirdInterval)

        axios
          .post('https://greet-me-api.herokuapp.com/api/model/radiation', radiationFormData)
          .then(radiationResults => {
            console.log(radiationResults)
            this.radiationLevel = radiationResults.data.prediction[0]
          })
      }
    }
  })
})
