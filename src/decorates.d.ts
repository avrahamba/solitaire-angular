type cardType = 'heart' | 'tile' | 'clover' | 'pike'
type cardTypeCard = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K'


interface Icard {
    type: cardType
    red: boolean
    typeCard: cardTypeCard
    show: boolean
    possible: boolean
    checked: boolean
}