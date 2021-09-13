const MEMOTEST = document.querySelector('.C-memotest');
const TIME = document.querySelector('.time h2 span');
const SCORE = document.querySelector('.score h2 span');

let itemsCards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E'];
let flipCounter = 0;
let firstFlipToCompare, secondFlipToCompare; 



for (let i = itemsCards.length - 1; i > 0; i--) { // Mezclo todos los elementos del memotest
    const j = Math.floor(Math.random() * (i + 1));
    [itemsCards[i], itemsCards[j]] = [itemsCards[j], itemsCards[i]];
}
itemsCards.forEach((item) => { // Los cargo en el dom
    MEMOTEST.innerHTML += `
    <div class="card" style='transform: rotateY(180deg)'>
        <div class="front"></div>
        <div class="back">${item}</div>
    </div>`;
})



const CARDS = document.querySelectorAll('.card'); // Selecciono todos los elementos que cargue en el DOM
let cardsCopy = Array.from(CARDS); // Convierto una NodeList en un Array



setTimeout(() => CARDS.forEach((c) => c.style.transform = 'rotateY(0deg)'),750); // Muestro las cartas para que las vea antes de empezar



MEMOTEST.addEventListener('click', (e) => { // Cuando hacen click en una
    e.preventDefault();
    if (e.target.parentNode.style.transform == 'rotateY(0deg)' && flipCounter < 2 && e.target.parentNode.className == 'card') { // Si esta boca abajo y no hay ninguna o una sola dada vuelta
        e.target.parentNode.style.transform = 'rotateY(180deg)'; // La doy vuelta
        firstFlipToCompare == undefined ? firstFlipToCompare = e.target.textContent : secondFlipToCompare = e.target.textContent; // Aca lo que hago es en la primer variable asignarle el item que se mostro al darse vuelta, si esta undefined lo define de lo contrario si ya esta definido se le asigna a la segunda variable el item para comparar luego
        flipCounter++; // Aumento el flip counter y al ser igual a 2 el bucle if no se ejecuta
    } 
    if (firstFlipToCompare && secondFlipToCompare) { // Si estan definidas ambas variables
        cardsCopy.forEach((card) => { // Por cada card
            if (card.style.transform == 'rotateY(180deg)' && card.children[1].textContent == firstFlipToCompare && card.children[1].textContent ==  secondFlipToCompare) { // En el caso de que este volteada y su item sea igual a los asignados para comparar anteriormente entonces
                cardsCopy = cardsCopy.filter(element => element !== card) // Devuelve el array con los elementos distintos a la card
                SCORE.textContent++;
            } else if (cardsCopy.includes(card)){
                setTimeout(() => card.style.transform = 'rotateY(0deg)', 750); // En el caso que no se cumpla la condicion de arriba lo da vuelta luego de 1 segundo para que se pueda visualizar bien
            }
        })
        firstFlipToCompare = undefined; // Las declaro undefined para que empiece el bucle nuevamente
        secondFlipToCompare = undefined; 
        flipCounter = 0; // reseteo flip counter para reiniciar el bucle
    }
})