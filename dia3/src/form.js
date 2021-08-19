const form = document.querySelector('[data-form="name-colors"]')
const inputName = document.querySelector('[data-input="name"]')
const colorsWrapper = document.createElement('div')
const colorSelectElement = createColorSelectElement()

form.insertAdjacentElement('afterend', colorsWrapper)
colorsWrapper.classList.add('colors-wrapper')

function createSquare(color) {
  let square = document.querySelector(`[data-color="${color}"]`)
  if (!square) {
    square = document.createElement('div')
    square.style.width = '100px'
    square.style.height = '100px'
    square.style.background = color
    square.dataset.color = color
    colorsWrapper.appendChild(square)
  }
}

function deleteSquare(color) {
  const square = document.querySelector(`[data-color="${color}"]`)
  if (square) {
    square.parentNode.removeChild(square)
  }
}

function renderSquare(colors) {
  colors.forEach(({ selected, value }) => {
    selected ? createSquare(value) : deleteSquare(value)
  })
}

colorSelectElement.addEventListener('change', (event) => {
  const colors = [...event.target.options].map((color) => ({
    value: color.value,
    selected: color.selected
  }))
  renderSquare(colors)
})

inputName.addEventListener('input', (event) => {
  const regex = /(?:^|\s)(?!de|da|do|dos)\S/g
  const input = event.currentTarget

  input.value = input.value
    .toLowerCase()
    .replace(regex, (match) => match.toUpperCase())
})

function createColorSelectElement() {
  const colorSelectElement = document.createElement('select')
  colorSelectElement.setAttribute('multiple', '')

  const colorsOption = ['Red', 'Green', 'Blue', 'Purple', 'Pink']

  colorsOption.forEach((color) => {
    const colorOption = document.createElement('option')
    colorOption.value = color.toLowerCase()
    colorOption.textContent = color
    colorSelectElement.appendChild(colorOption)
  })

  form.appendChild(colorSelectElement)

  return colorSelectElement
}
