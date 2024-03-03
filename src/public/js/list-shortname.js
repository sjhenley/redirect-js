/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const successAlert = document.getElementById('del-shortname-success');
const errorAlert = document.getElementById('del-shortname-error');

/**
 * API call to delete shortname
 * @param {*} shortname shortname to delete
 */
function deleteShortname(shortname) {
  successAlert.classList.add('d-none');
  errorAlert.classList.add('d-none');

  fetch(`/api/shortname/${shortname}`, {
    method: 'DELETE',
  })
    .then(() => {
      successAlert.classList.remove('d-none');
      const tableRow = document.getElementById(`table-row-${shortname}`);
      tableRow.remove();
    })
    .catch((error) => {
      console.error(error);
      errorAlert.innerHTML = `Failed to delete shortname: ${error.message}`;
      errorAlert.classList.remove('d-none');
    });
}

/**
 * Creates HTML element for deleting specified shortname
 * @param {*} shortname shortname to delete
 * @return {HTMLButtonElement} HTML button element
 */
function buildDeleteButton(shortname) {
  const deleteIcon = document.createElement('i');
  deleteIcon.classList.add('material-icons');
  deleteIcon.appendChild(document.createTextNode('delete'));

  const deleteButton = document.createElement('button');
  deleteButton.role = 'button';
  deleteButton.classList.add('del-btn');
  deleteButton.appendChild(deleteIcon);

  deleteButton.addEventListener('click', (e) => {
    e.preventDefault();
    deleteShortname(shortname);
  });

  return deleteButton;
}

/**
 * Fetches shortname data and populates the UI with it.
 */
function loadShortnameData() {
  fetch('/api/shortname')
    .then((response) => response.json())
    .then((data) => {
      const shortnameList = document.getElementById('shortname-list');
      data.forEach((shortnameItem) => {
        console.log(shortnameItem);
        const tableRow = document.createElement('tr');
        tableRow.setAttribute('id', `table-row-${shortnameItem.shortname}`);
        tableRow.appendChild(document.createElement('td')).appendChild(buildDeleteButton(shortnameItem.shortname));
        tableRow.appendChild(document.createElement('td')).appendChild(document.createTextNode(shortnameItem.shortname));
        tableRow.appendChild(document.createElement('td')).appendChild(document.createTextNode(shortnameItem.destination));
        tableRow.appendChild(document.createElement('td')).appendChild(document.createTextNode(shortnameItem.created));
        shortnameList.appendChild(tableRow);
      });
    });
}
