import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface IoutputCard {
  card: Icard
  cb: Function
}

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {
  cardsCopyNoShow: Icard[] = []
  cardsCopyShow: Icard[] = []
  @Output() check = new EventEmitter<IoutputCard>();
  onCheck(card: Icard) {
    card.checked = !card.checked
    if (card.checked) {
      this.check.emit({ card, cb: this.clearCard })
    }
  }
  clearCard = () => {
    if (this.cardsCopyShow[this.cardsCopyShow.length - 1].checked) {
      this.cardsCopyShow.pop()
    }
  }
  addCard() {
    if (this.cardsCopyNoShow.length) {
      const card = this.cardsCopyNoShow.pop()
      card && this.cardsCopyShow.push(card)
    } else {
      this.cardsCopyNoShow.push(...this.cardsCopyShow.reverse())
      this.cardsCopyShow.splice(0, this.cardsCopyShow.length)
    }
  }
  constructor() {
  }

  ngOnInit(): void {
    const firstCard = this.cards.pop()
    if (firstCard) {
      firstCard.show = true
      this.cardsCopyShow.push(firstCard)
    }
    this.cardsCopyNoShow.push(...this.cards)
  }
  @Input() cards!: Icard[]
}
