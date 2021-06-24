import "../css/reset.css";
import "../css/style.css";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";
import virtualCard from "./vcard.js";
import flipped from './animation.js';
import validate from './validation'
document.addEventListener("DOMContentLoaded", () => {
  virtualCard();
  flipped();



  const form = document.querySelector('form')
  const formContainer = document.querySelector('.form_container')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const errors = validate()

    if (!errors) {
      const data = new FormData(form)
      const loading = createLoadingTemplate()
      formContainer.insertAdjacentHTML('afterbegin', loading)
      formContainer.classList.add('sending')
      sendForm(data)
    }
  })
  async function sendForm(data) {
    const response = await fetch('123.js', {
      method: 'POST',
      body: data
    })
    if (response.ok) {
      formContainer.classList.remove('sending')
      formContainer.querySelector('div.loader').remove()
      form.reset()
    } else {
      alert('Error')
    }
  }
  function createLoadingTemplate(){
    return `
      <div class='loader'></div>
    `
  }
});


