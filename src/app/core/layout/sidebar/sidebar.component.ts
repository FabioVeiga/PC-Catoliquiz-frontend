import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mlocks-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public menus = [
    {
      name: 'Usuários',
      url: 'usuarios',
    },
    {
      name: 'Categorias',
      url: 'categorias',
    },
    {
      name: 'Perguntas',
      url: 'perguntas',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
