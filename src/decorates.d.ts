type cardType = 'heart' | 'diamond' | 'spade' | 'club'
type cardTypeCard = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K'


interface Icard {
    type: cardType
    red: boolean
    typeCard: cardTypeCard
    show: boolean
    // sign: '♥️' | '♦️' | '♠️' | '♣️'
    sign: string
    checked: boolean
}