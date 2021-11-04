import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  @Input() card!: Icard
  makeChanges() {
    console.log('1 :>> ', 1);
    //   this.card.set('name',' a new name'); // This will create a new model => new reference => change detection on

  }

}
