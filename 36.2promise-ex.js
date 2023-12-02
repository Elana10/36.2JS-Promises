
// PART ONE

let favNum = 4;
let baseURL = 'http://numbersapi.com/'
// 'year?json

// 1) Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API.?

axios.get(`${baseURL}${favNum}?json`)
    .then(res => {
        console.log(res.data.text)
    })
    .catch(err => {
        console.log(err)
    })

// 2) Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

let numbers = [2,4,13]

axios.get(`${baseURL}${numbers}`)
    .then(res => {
        console.log(res)
    })
    .catch(err => console.log(err))

// 3) Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

let fourFacts = [];

for(let i = 1; i <5; i++){
    fourFacts.push(
        axios.get(`${baseURL}${favNum}?json`)
    )
}

Promise.all(fourFacts)
    .then(res => {
        res.forEach(data => {
            console.log(data.data.text)
        })
    })
    .catch(err => console.log(err))


// PART TWO

// 1) Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

let cardURL = 'https://deckofcardsapi.com/api/deck/'
// <<deck_id>>/draw/?count=2

axios.get(`${cardURL}new/draw/?count=1`)
    .then(res => {
        console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
    })
    .catch(err => console.log(err))

// 2) Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the **same** deck.
// Once you have both cards, ***console.log*** the values and suits of both cards.

let cardOne;

axios.get(`${cardURL}new/draw/?count=1`)
.then( res => {
    cardOne = `${res.data.cards[0].value} of ${res.data.cards[0].suit}`
    return (axios.get(`${cardURL}${res.data.deck_id}/draw/?count=1`))
})
.then(res => {
    let cardTwo = `${res.data.cards[0].value} of ${res.data.cards[0].suit}`
    Promise.all(cardTwo)
        .then(()=>{
            [cardOne, cardTwo].forEach(card => console.log(card))
        })
})
.catch(err => console.log(err))

// 3) Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

document.addEventListener("DOMContentLoaded", function(event){ 
    const cardArea = document.querySelector("#card_area")
    const button = document.querySelector("#next_card")
    let deck_id = null;

    axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(res => {
            deck_id = res.data.deck_id
        })
        .catch(err => console.log(err))

    button.addEventListener('click', function() {
        axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
            .then(res => {
                const card = document.createElement('img')
                card.setAttribute('src',res.data.cards[0].image)
                card.style.transform = `translate(${Math.random()* 40-20}px, ${Math.random()*40-20}px) rotate(${Math.random()* 90 -45}deg)`
                cardArea.append(card)

                if(res.data.remaining === 0){
                    button.textContent = 'All Done!';
                    button.removeEventListener()
                }
            })
            .catch(err => console.log(err))

    } )





})