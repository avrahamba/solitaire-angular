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
  cards: Icard[] = []


  lists: Icard[][] = []
  constructor() {
    this.init()
  }
  init() {
    const card = (['heart', 'diamond', 'spade', 'club'] as cardType[]).reduce((acc: Icard[], type: cardType, i) => {
      acc.push(...typesCard.map(typeCard => ({
        typeCard,
        type,
        red: i < 2,
        show: false,
        sign: ['♥️', '♦️', '♠️', '♣️'][i],
        checked: false,
      })))
      return acc
    }, [])
    this.cards = shuffle(card)
    this.lists = [[], [], [], [], [], [], []]
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

    this.targetLists = { heart: [], diamond: [], spade: [], club: [], }
    this.onRestartUpDounUpDoun && this.onRestartUpDounUpDoun()
  }

  targetLists: {
    heart: Icard[]
    diamond: Icard[]
    spade: Icard[]
    club: Icard[]
  } = { heart: [], diamond: [], spade: [], club: [], }

  sendCardToTarget(card: Icard) {
    const stack = this.targetLists[card.type]
    if (stack.length) {
      const lastCard = stack[stack.length - 1]
      if (typesCard.indexOf(lastCard.typeCard) + 1 === typesCard.indexOf(card.typeCard)) {
        stack.push({ ...card, checked: false })
        return true
      }
    } else {
      if (card.typeCard === 'A') {
        stack.push({ ...card, checked: false })
        return true
      }
    }
    return false
  }

  cbClear: Function | null = null
  checkedCard: Icard | null = null
  checkCard({ card, cb }: { card: Icard, cb?: Function }) {
    this.cbClear = cb || null
    this.checkedCard = card
  }

  clearChecked() {
    this.lists.forEach(list => {
      list.forEach(card => {
        card.checked = false
      })
    })
    this.onClearCheckedUpDoun && this.onClearCheckedUpDoun()
  }
  onClearCheckedUpDoun: Function | null = null
  clearCheckedUpDoun = (ev: Function) => {
    this.onClearCheckedUpDoun = ev
  }
  onRestartUpDounUpDoun: Function | null = null
  restartUpDoun = (ev: Function) => {
    this.onRestartUpDounUpDoun = ev
  }

  restart() {
    this.init()
  }

  setCard(location: string) {
    if (!this.checkedCard) return
    const srcList = this.lists.find(list => list.find(card => card.type + card.typeCard === '' + this.checkedCard?.type + this.checkedCard?.typeCard))
    const srcIndex = srcList?.findIndex(card => card.type + card.typeCard === '' + this.checkedCard?.type + this.checkedCard?.typeCard)
    const closeFn = () => {
      this.cbClear && this.cbClear()
      this.clearChecked()
      srcList?.splice(srcIndex || 0)
      if (srcList?.length && !srcList[srcList?.length - 1].show) srcList[srcList?.length - 1].show = true

    }
    if (location === 'target') {
      const scss = this.sendCardToTarget(this.checkedCard)
      if (!scss) return
      closeFn()
    } else {
      location = location.slice(-1)
      const list: Icard[] = this.lists[+location]
      if (srcList === list) {
        this.clearChecked()
        return
      }
      if (!list.length || list[list.length - 1].red !== this.checkedCard.red && typesCard.indexOf(list[list.length - 1].typeCard) === typesCard.indexOf(this.checkedCard.typeCard) + 1) {
        if (!srcList || srcIndex === srcList.length - 1) {
          list.push(this.checkedCard)
        } else {
          const cards = srcList.slice(srcIndex)
          list.push(...cards)

        }
        closeFn()
        return
      }
    }
  }



  ngOnInit(): void {
  }

}
