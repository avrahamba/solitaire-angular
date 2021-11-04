import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface IoutputCard {
  card: Icard
  cb?: Function
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  setCard(card: Icard, event: any) {
    if (!card.show) return
    event.stopPropagation();
    const checked = !card.checked
    this.clearChecked.emit()
    card.checked = checked
    checked && this.check.emit({ card })

  }
  @Output() clearChecked = new EventEmitter()
  @Output() check = new EventEmitter<IoutputCard>();

  @Input() cards!: Icard[]

}
