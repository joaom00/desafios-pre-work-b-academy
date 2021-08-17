import './style.css'

const app = document.querySelector('[data-js="app"]')
const link = document.querySelector('[data-js="link"]')

app.innerHTML = `
  <h1>B. Academy</h1>
  <p>Boas vindas à semana de pré-work para o Bootcamp em React.js 😁</p>
`

link.addEventListener('click', (event) => {
  event.preventDefault()
  const isHidden = app.style.visibility === 'hidden'

  if (isHidden) {
    app.style.visibility = 'visible'
    link.textContent = 'Esconder'
  } else {
    app.style.visibility = 'hidden'
    link.textContent = 'Mostrar'
  }
})
