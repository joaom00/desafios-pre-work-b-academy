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

function noCarFound() {
  tableBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center">Nenhum carro encontrado</td>
      </tr>
    `
}

function renderCars(cars) {
  cars.forEach((car) => {
    tableBody.innerHTML = renderTable(car)
  })
}

function renderTable(car) {
  return `
    <tr>
      <td><img style="display: block; width: 80px;" src="${car.image}" /></td>
      <td>${car.brandModel}</td>
      <td>${car.year}</td>
      <td>${car.plate}</td>
      <td>${car.color}</td>
      <td><button class="delete-car-btn">Excluir</button></td>
    </tr>
    `
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
    tableBody.innerHTML = ''
    tableBody.innerHTML = renderTable(car)

    event.target.reset()
    imageUrl.focus()

    notificationSuccess(message)
    return
  }

  notificationError(message)
})

tableBody.addEventListener('click', async (event) => {
  if (event.target.tagName.toLowerCase() === 'button') {
    const tableRow = event.target.parentElement.parentElement
    const plate = tableRow.childNodes[7].textContent

    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        plate
      })
    })

    const { message } = await response.json()
    notificationSuccess(message)
    tableRow.outerHTML = ''
  }
})

getCars()
getCars()
