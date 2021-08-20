const notificationWrapper = document.querySelector('[data-js="notification"]')

function notificationSuccess(msg) {
  notificationWrapper.classList.add('success', 'show')
  notificationWrapper.textContent = msg
  closeNotification('success')
}

function notificationError(msg) {
  notificationWrapper.classList.add('error', 'show')
  notificationWrapper.textContent = msg
  closeNotification('error')
}

function closeNotification(type) {
  setTimeout(() => {
    notificationWrapper.classList.remove('show')
    type === 'success'
      ? notificationWrapper.classList.remove('success')
      : notificationWrapper.classList.remove('error')
  }, 5000)
}

export { notificationSuccess, notificationError }
