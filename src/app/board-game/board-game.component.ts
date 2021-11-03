import { Component, OnInit } from '@angular/core';

function shuffle(array: any[]) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const typesCard: cardTypeCard[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

@Component({
  selector: 'app-board-game',
  templateUrl: './board-game.component.html',
  styleUrls: ['./board-game.component.scss']
})

export class BoardGameComponent implements OnInit {
  cards: Icard[] = (['heart', 'tile', 'clover', 'pike'] as cardType[]).reduce((acc: Icard[], type: cardType, i) => {
    acc.push(...typesCard.map(typeCard => ({
      typeCard,
      type,
      red: i < 2,
      show: false,
      possible: false,
      checked: false,
    })))
    return acc
  }, [])

  lists: Icard[][] = [[], [], [], [], [], [], []]
  constructor() {
    this.cards = shuffle(this.cards)
    this.lists.forEach((list, index) => {
      for (let i = 0; i < index; i++) {
        const card = this.cards.pop()
        card && list.push(card)
      }
      const cardShow = this.cards.pop()
      if (cardShow) {
        cardShow.show = true
        list.push(cardShow)
      }
    })
  }

  targetLists: {
    heart: Icard[]
    tile: Icard[]
    clover: Icard[]
    pike: Icard[]
  } = {
      heart: [],
      tile: [],
      clover: [],
      pike: [],
    }

  sendCardToTarget(card: Icard) {
    const stack = this.targetLists[card.type]
    if (stack.length) {
      const lastCard = stack[stack.length - 1]
      if (typesCard.indexOf(lastCard.typeCard) + 1 === typesCard.indexOf(card.typeCard)) {
        stack.push(card)
        return true
      }
    } else {
      if (card.typeCard === 'A') {
        stack.push(card)
        return true
      }
    }
    return false
  }

  cbClear: Function | null = null
  checkedCard: Icard | null = null
  checkCard({ card, cb }: { card: Icard, cb: Function }) {
    this.cbClear = cb
    this.checkedCard = card
  }

  setCard(location: string) {
    if (!this.checkedCard) return
    if (location === 'target') {
      const scss = this.sendCardToTarget(this.checkedCard)
      if (!scss) return
      this.cbClear && this.cbClear()
      this.checkedCard.checked = false
    }
  }



  ngOnInit(): void {
  }

}
