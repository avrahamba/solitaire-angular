import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { BoardGameComponent } from './board-game/board-game.component';
import { ListComponent } from './list/list.component';
import { BankComponent } from './bank/bank.component';
import { TargetComponent } from './target/target.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    BoardGameComponent,
    ListComponent,
    BankComponent,
    TargetComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
