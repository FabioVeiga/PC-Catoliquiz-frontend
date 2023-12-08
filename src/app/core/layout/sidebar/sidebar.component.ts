import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mlocks-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public menus = [
    {
      name: 'Dashboard',
      url: '',
    },
    {
      name: 'Usuários',
      url: 'usuarios',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
