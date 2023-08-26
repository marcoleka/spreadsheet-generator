const addColumnButton = document.getElementById('add-column');
const columnsContainer = document.getElementById('columns-container');

addColumnButton.addEventListener('click', () => {
  const template = document.querySelector('.column-template');
  console.log(template);
  const newColumnInput = template.cloneNode(true);
  newColumnInput.querySelector('.remove-column').addEventListener('click', () => {
    newColumnInput.remove();
  });
  columnsContainer.appendChild(newColumnInput);
});