import './style.css'

const tableBody = document.querySelector('[data-table="body"]')

const apiUrl = 'http://localhost:3333/cars'

fetch(apiUrl)
  .then((res) => res.json())
  .then((cars) => (cars.length ? renderCars(cars) : noCarFound()))

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
  const tr = document.createElement('tr')
  tableBody.appendChild(tr)

  cars.forEach((car) => {
    for (const [key, value] of Object.entries(car)) {
      const td = document.createElement('td')
      key === 'image'
        ? (td.innerHTML = `<img style="display: block; width: 80px;" src="${value}" />`)
        : (td.textContent = value)

      tr.appendChild(td)
    }
  })
}
