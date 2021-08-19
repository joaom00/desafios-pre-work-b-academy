const formCars = document.querySelector('[data-form="cars"]')
const tableBody = document.querySelector('[data-table="body"]')

formCars.addEventListener('submit', (event) => {
  event.preventDefault()
  const { imageUrl, marca, ano, placa, cor } = event.target.elements
  const tr = document.createElement('tr')

  const carData = {
    imageUrl: imageUrl.value,
    marca: marca.value,
    ano: ano.value,
    placa: placa.value,
    cor: cor.value
  }

  tableBody.appendChild(tr)
  for (const value of Object.values(carData)) {
    const td = document.createElement('td')
    td.textContent = value
    tr.appendChild(td)
  }

  imageUrl.value = ''
  marca.value = ''
  ano.value = ''
  placa.value = ''
  cor.value = ''

  imageUrl.focus()
})
