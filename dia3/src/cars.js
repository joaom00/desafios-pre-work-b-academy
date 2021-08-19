const formCars = document.querySelector('[data-form="cars"]')
const tableBody = document.querySelector('[data-table="body"]')

formCars.addEventListener('submit', (event) => {
  event.preventDefault()
  const { imageUrl, model, year, licensePlate, color } = event.target.elements
  const tr = document.createElement('tr')

  const carData = {
    imageUrl: imageUrl.value,
    model: model.value,
    year: year.value,
    licensePlate: licensePlate.value,
    color: color.value
  }

  tableBody.appendChild(tr)
  for (const [key, value] of Object.entries(carData)) {
    const td = document.createElement('td')

    key === 'imageUrl'
      ? (td.innerHTML = `<img style="display: block; width: 80px;" src="${value}" />`)
      : (td.textContent = value)

    tr.appendChild(td)
  }

  imageUrl.value = ''
  model.value = ''
  year.value = ''
  licensePlate.value = ''
  color.value = ''

  imageUrl.focus()
})
