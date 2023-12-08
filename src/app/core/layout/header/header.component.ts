import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppService } from '../../services/layout/app.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mlocks-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toogleSidebarEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private appService: AppService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public triggerToggleSidebar(): void {
    this.toogleSidebarEvent.emit();
    this.appService.triggerResizeEvent();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}
