const inputName = document.querySelector('[data-input="name"]')

inputName.addEventListener('input', (event) => {
  const regex = /(?:^|\s)(?!de|da|do|dos)\S/g
  const input = event.currentTarget

  input.value = input.value
    .toLowerCase()
    .replace(regex, (match) => match.toUpperCase())
})
