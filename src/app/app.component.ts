import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  authState = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.authState
      .subscribe(state => {
        this.authState = state;
      });
  }

  ngOnDestroy(): void {
  }
}
