import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage/storage.service';

@Component({ template: '' })
export class CheckAuthComponent implements OnInit {
  public logged_user = StorageService.getUsuario();

  constructor(private router: Router) {}
  ngOnInit() {
    if (this.logged_user) this.router.navigate(['/painel']);
    else this.router.navigate(['signin']);
  }
}
