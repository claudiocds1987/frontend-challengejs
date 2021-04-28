import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  // para ocultar/mostrar el menu
  hide: boolean = false;
  show: boolean = false;

  username:false;
  constructor( public router: Router) { }

  ngOnInit(): void {
  }

  hideMenu(name: string) {
    console.log(name);
    switch (name) {
      // cuando es click en el toogle
      case 'menu-bar':
        if (this.show === false) {
          // se muestra el menu
          this.hide = false;
          this.show = true;
        } else {
          // se oculta el menu
          this.hide = true;
          this.show = false;
        }
        break;
      // cuando hay click en item del menu
      case 'home':
        this.hide = true;
        this.show = false;
        this.router.navigate(['/home']);
        break;
      case 'create-operation':
        this.hide = true;
        this.show = false;
        this.router.navigate(['/addOperation']);
        break;
      case 'list-operations':
        this.hide = true;
        this.show = false;
        this.router.navigate(['/home']);
        break;
      case 'login':
        this.hide = true;
        this.show = false;
        this.router.navigate(['/login']);
        break;
      default:
    }
  }

}
