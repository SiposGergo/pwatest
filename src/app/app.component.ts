import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './services/api.service';
import { UpdateService } from './services/update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  data$: Observable<string[]>;

  constructor(private _apiService: ApiService, private _update: UpdateService) {
    this.data$ = _apiService.fetch();
  }
}
