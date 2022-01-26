import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent {
  public now: Observable<number>;

  constructor(private dateService:DateService) {
    this.now = this.dateService.getNow();
   }
}
