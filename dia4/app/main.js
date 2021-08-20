import { notificationSuccess, notificationError } from './notification'

import './style.css'

const formCars = document.querySelector('[data-form="cars"]')
const tableBody = document.querySelector('[data-table="body"]')

const apiUrl = 'http://localhost:3333/cars'

async function getCars() {
  const response = await fetch(apiUrl)
  const cars = await response.json()
  cars.length ? renderCars(cars) : noCarFound()
}

async function createCar(car) {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(car)
  })

  const { error, message } = await response.json()

  return { error, message }
}

formCars.addEventListener('submit', async (event) => {
  event.preventDefault()
  const { imageUrl, model, year, licensePlate, color } = event.target.elements

  const car = {
    image: imageUrl.value,
    brandModel: model.value,
    year: year.value,
    plate: licensePlate.value,
    color: color.value
  }

  const { error, message } = await createCar(car)

  if (!error) {
    const tr = document.createElement('tr')
    tableBody.appendChild(tr)

    for (const [key, value] of Object.entries(car)) {
      const td = document.createElement('td')

      key === 'image'
        ? (td.innerHTML = `<img style="display: block; width: 80px;" src="${value}" />`)
        : (td.textContent = value)

      tr.appendChild(td)
    }

    event.target.reset()
    imageUrl.focus()
    notificationSuccess(message)
    return
  }
  notificationError(message)
})

function noCarFound() {
  const tr = document.createElement('tr')
  tableBody.appendChild(tr)
  const td = document.createElement('td')
  td.setAttribute('colspan', '5')
  td.textContent = 'Nenhum carro encontrado'
  td.style.textAlign = 'center'
  tr.appendChild(td)
}

function renderCars(cars) {
  cars.forEach((car) => {
    const tr = document.createElement('tr')
    tableBody.appendChild(tr)
    for (const [key, value] of Object.entries(car)) {
      const td = document.createElement('td')
      key === 'image'
        ? (td.innerHTML = `<img style="display: block; width: 80px;" src="${value}" />`)
        : (td.textContent = value)

      tr.appendChild(td)
    }
  })
}

getCars()
