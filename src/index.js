document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("table-body");
    const form = document.getElementById("dog-form");
    let dogs = [];
  
    // Fetch the list of dogs from the server and render them in a table
    fetch("http://localhost:3000/dogs")
      .then(response => response.json())
      .then(data => {
        dogs = data;
        renderTable();
      })
      .catch(error => console.error(error));
  
    function renderTable() {
      // Clear the existing table
      table.innerHTML = "";
  
      // Render each dog as a row in the table
      dogs.forEach(dog => {
        const row = document.createElement("tr");
  
        const nameCell = document.createElement("td");
        nameCell.textContent = dog.name;
        row.appendChild(nameCell);
  
        const breedCell = document.createElement("td");
        breedCell.textContent = dog.breed;
        row.appendChild(breedCell);
  
        const sexCell = document.createElement("td");
        sexCell.textContent = dog.sex;
        row.appendChild(sexCell);
  
        const editCell = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
          populateForm(dog);
        });
        editCell.appendChild(editButton);
        row.appendChild(editCell);
  
        table.appendChild(row);
      });
    }
  
    function populateForm(dog) {
      form.name.value = dog.name;
      form.breed.value = dog.breed;
      form.sex.value = dog.sex;
      form.addEventListener("submit", event => {
        event.preventDefault();
  
        // Send a PATCH request to update the dog's information
        fetch(`http://localhost:3000/dogs/${dog.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name.value,
            breed: form.breed.value,
            sex: form.sex.value,
          }),
        })
          .then(response => response.json())
          .then(updatedDog => {
            // Update the dogs array with the updated information
            const index = dogs.findIndex(d => d.id === updatedDog.id);
            dogs[index] = updatedDog;
  
            // Re-render the table with the updated information
            renderTable();
          })
          .catch(error => console.error(error));
      });
    }
  });
  