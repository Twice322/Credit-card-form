export default function flipped() {

    
    const cardWrapper = document.querySelector('.card_wrapper')
    const cardFrontView = document.querySelector('.card_block_front')
    const cardBackView = document.querySelector('.card_block_back')
    const cardCVV = document.querySelector('.card_cvv')


    cardFrontView.addEventListener('click', () => {
        cardWrapper.classList.add('flipped')
    })
    cardBackView.addEventListener('click', () => {
        cardWrapper.classList.remove('flipped')
    })
    cardCVV.addEventListener('focus', () => {
        cardWrapper.classList.add('flipped')
    })
    cardCVV.addEventListener('blur', () => {
        cardWrapper.classList.remove('flipped')
    })
}