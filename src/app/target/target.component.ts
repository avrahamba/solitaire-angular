import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.scss']
})
export class TargetComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  @Input() targetLists!: {
    heart: Icard[]
    diamond: Icard[]
    spade: Icard[]
    club: Icard[]
  }

}
