document.addEventListener('alpine:init', () => {
  //

  // Alpine.store()

  Alpine.data('greet', function () {
    return {
      username: '',
      message: '',
      open: false,
      greetData: [],
      apiBaseUrl: 'https://flask-server-api.herokuapp.com',

      init() {
        this.fetchUsers()
      },

      greet() {
        const formData = new FormData()
        formData.append('username', this.username)
        formData.append('timestamp', new Date())

        // http://127.0.0.1:8000 for working locally
        axios
          .post(`${this.apiBaseUrl}/api/greet`, formData)
          .then(greetResults => {
            this.fetchUsers();
            this.message = greetResults.data.greet_message;
            this.open = true;

            setTimeout(() => {
              this.open = false
            }, 1000)
          })
      },

      fetchUsers() {
        axios.get(`${this.apiBaseUrl}/api/users`).then(users => {
          this.greetData = users.data.users
        })
      }
    }
  })
})
