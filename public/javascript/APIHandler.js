class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:8000",
    });
  }

  getFullList() {
    // Get all characters info
    return this.api.get(`/characters`)
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  }

  getOneRegister(id) {
    // Get a single character info
    return this.api.get(`/characters/${id}`)
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  }

  createOneRegister(characterData) {
    // Create a single character
    return this.api.post(`/characters`, characterData)
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  }

  deleteOneRegister(id) {
    // Delete a single character
    return this.api.delete(`/characters/${id}`)
      .then(() => console.log("Character has been successfully deleted"))
      .catch(error => console.error(error));
  }

  updateOneRegister(id, characterData) {
    // Edit a single character
    return this.api.patch(`/characters/${id}`, characterData)
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  }
}
