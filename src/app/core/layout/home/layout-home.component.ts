import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './layout-home.component.html',
  styleUrls: ['./layout-home.component.scss'],
})
export class AppHomeComponent {
  public sidebarOpened: boolean = true;
  constructor(private breakpointObserver: BreakpointObserver) {}

  public sidebarToggle(): void {
    this.sidebarOpened = !this.sidebarOpened;
  }

}
