import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface IoutputCard {
  card: Icard
  cb?: Function
}

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {
  cardsCopyNoShow: Icard[] = []
  cardsCopyShow: Icard[] = []
  onCheck(card: Icard) {
    const checked = !card.checked
    this.clearChecked.emit()
    card.checked = checked
    checked && this.check.emit({ card, cb: this.clearCard })
  }
  clearCheck = () => {
    this.cardsCopyShow.forEach(card => card.checked = false)
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
    this.cardsCopyNoShow.push(...this.cards.map(card => ({ ...card, show: true })))
    this.clearCheckedUpDoun.emit(this.clearCheck)
  }

  @Output() check = new EventEmitter<IoutputCard>();
  @Output() clearCheckedUpDoun = new EventEmitter<Function>();
  @Output() clearChecked = new EventEmitter()
  @Input() cards!: Icard[]
}
