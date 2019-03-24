console.log('Client side java script loaded!!!')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherform.addEventListener('submit',(e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading.....'
    
    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = data.location
            messageTwo.textContent = data.error
            console.log(data.error)
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        console.log(data.location)
        console.log(data.forecast)
    }
    })
})
})
