import { Component } from '@angular/core';
import { DataService } from './services/data/data.service';
import { Router, NavigationEnd} from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private data: DataService, public router: Router, private auth: AuthService, private menu: MenuController) {}
  userData: any[] = [];
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.handleMenu();
        this.userData = this.data.getUserData();
      }
    });
  }

  private handleMenu() {
    if (this.data.isLogged() && this.data.getUserType()) {
      this.menu.enable(true, 'main-menu2');
      this.menu.enable(false, 'main-menu');
      this.menu.enable(false, 'main-menu3');
    } else if (this.data.isLogged() && !this.data.getUserType()){
      this.menu.enable(true, 'main-menu3');
      this.menu.enable(false, 'main-menu');
      this.menu.enable(false, 'main-menu2');
    } else {
      this.menu.enable(true, 'main-menu');
      this.menu.enable(false, 'main-menu2');
      this.menu.enable(false, 'main-menu3');
    }
  }
  


  Logout(){
    this.data.deleteUserData();
    console.log(this.data.isLogged());
    this.data.deleteToken();
    this.data.Logout();
    console.log(this.data.isLogged());
    this.auth.presentToast('Cierre de sesión exitoso!');
    this.router.navigate(['/home']);
    this.handleMenu();
  }

 
}
