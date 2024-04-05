const charactersAPI = new APIHandler('http://localhost:8000');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function () {
    charactersAPI.getFullList().then(response => {
      const charactersContainer = document.querySelector('.characters-container');
      charactersContainer.innerHTML = ''; // Clear existing characters
      response.data.forEach(character => {
        const characterDiv = `
          <div class="character-info">
            <div class="name">Name: ${character.name}</div>
            <div class="occupation">Occupation: ${character.occupation}</div>
            <div class="cartoon">Cartoon: ${character.cartoon}</div>
            <div class="weapon">Weapon: ${character.weapon}</div>
          </div>
        `;
        charactersContainer.innerHTML += characterDiv;
      });
    });
  });

  document.getElementById('fetch-one').addEventListener('click', function () {
    const id = document.querySelector('input[name="character-id"]').value;
    charactersAPI.getOneRegister(id).then(response => {
      const character = response.data;
      const characterInfo = `
        <div class="character-info">
          <div class="name">Name: ${character.name}</div>
          <div class="occupation">Occupation: ${character.occupation}</div>
          <div class="cartoon">Cartoon: ${character.cartoon}</div>
          <div class="weapon">Weapon: ${character.weapon}</div>
        </div>
      `;
      const charactersContainer = document.querySelector('.characters-container');
      charactersContainer.innerHTML = characterInfo; // Display this character
    });
  });

  document.getElementById('delete-one').addEventListener('click', function () {
    const id = document.querySelector('input[name="character-id-delete"]').value;
    charactersAPI.deleteOneRegister(id)
      .then(() => {
        document.getElementById('delete-one').style.backgroundColor = "green";
        // Optionally, refresh the list of characters here
      })
      .catch(() => {
        document.getElementById('delete-one').style.backgroundColor = "red";
      });
  });

 
  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const id = document.querySelector('#edit-character-form input[name="chr-id"]').value;
    // Other form inputs are similar to the create example above
    charactersAPI.updateOneRegister(id, { name, occupation, weapon, cartoon })
      .then(() => {
        document.getElementById('send-data').style.backgroundColor = "green";
        // Optionally, refresh the list of characters here
      })
      .catch(() => {
        document.getElementById('send-data').style.backgroundColor = "red";
      });
  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.querySelector('#new-character-form input[name="name"]').value;
    const occupation = document.querySelector('#new-character-form input[name="occupation"]').value;
    const weapon = document.querySelector('#new-character-form input[name="weapon"]').value;
    const cartoon = document.querySelector('#new-character-form input[name="cartoon"]').checked;
  
    charactersAPI.createOneRegister({ name, occupation, weapon, cartoon })
      .then(() => {
        document.getElementById('send-data').style.backgroundColor = "green";
        // Optionally, refresh the list of characters or clear the form here
      })
      .catch(() => {
        document.getElementById('send-data').style.backgroundColor = "red";
      });
  });
});
