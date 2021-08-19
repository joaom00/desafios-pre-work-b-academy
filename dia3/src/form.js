const form = document.querySelector('form')
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
  colors.forEach((color) => {
    if (color.selected) {
      createSquare(color.value)
    } else {
      deleteSquare(color.value)
    }
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

  const redOption = document.createElement('option')
  redOption.value = 'red'
  redOption.textContent = 'Red'

  const greenOption = document.createElement('option')
  greenOption.value = 'green'
  greenOption.textContent = 'Green'

  const blueOption = document.createElement('option')
  blueOption.value = 'blue'
  blueOption.textContent = 'Blue'

  const purpleOption = document.createElement('option')
  purpleOption.value = 'purple'
  purpleOption.textContent = 'Purple'

  const pinkOption = document.createElement('option')
  pinkOption.value = 'pink'
  pinkOption.textContent = 'Rosa'

  colorSelectElement.setAttribute('multiple', '')
  colorSelectElement.append(
    redOption,
    greenOption,
    blueOption,
    purpleOption,
    pinkOption
  )
  form.appendChild(colorSelectElement)

  return colorSelectElement
}
