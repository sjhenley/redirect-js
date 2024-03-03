const form = document.getElementById('add-shortname-form');
const successAlert = document.getElementById('add-shortname-success');
const errorAlert = document.getElementById('add-shortname-error');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  successAlert.classList.add('d-none');
  errorAlert.classList.add('d-none');

  const formData = new FormData(form);
  const requestBody = {
    shortname: formData.get('shortname') || undefined,
    destination: formData.get('destination')
  };

  fetch('/api/shortname', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to add shortname');
      }
    })
    .then((data) => {
      console.log(data);
      form.reset();
      successAlert.classList.remove('d-none');
    })
    .catch((error) => {
      console.error(error);
      errorAlert.innerHTML = `Failed to add shortname: ${error.message}`;
      errorAlert.classList.remove('d-none');
    });
});
