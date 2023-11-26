import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  gradeTitle = environment.gradeTitle;
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
      requiresLogin : false,
    },
    {
      title: 'Chapter',
      url: '/chapter',
      icon: 'chapter',
      requiresLogin : true,
    },
    {
      title: 'Quiz',
      url: '/quiz-list',
      icon: 'medal',
      requiresLogin : true,
    },
  ];
  constructor(
    private authService: AuthService,
    private router: Router,
    private menuCtrl: MenuController
  ) {}

  private isAuthSubs: Subscription | null = null;
  bLoggedIn = false;
  ngOnInit() {
    // this.isAuth = this.authService.isAuthenticated();
    // const path = window.location.pathname.split('folder/')[1];
    // if (path !== undefined) {
    //   this.selectedIndex = this.appPages.findIndex(
    //     (page) => page.title.toLowerCase() === path.toLowerCase()
    //   );
    // }
    this.authService.isAuthenticatedSubs().subscribe({
      next: (isAuth) => {
        this.bLoggedIn = isAuth;
      },
      error: (err) => {
        console.error('Err: ', err);
        this.bLoggedIn = false;
      },
    });

    var color = localStorage.getItem('theme-color');
    this.setTheme(color);
  }

  login() {
    this.router.navigate(['/', 'login']);
    this.menuCtrl.close('m1');
  }

  logout() {
    this.authService
      .logout()
      .then(() => {
        this.router.navigate(['/']);
        this.menuCtrl.close('m1');

        console.log('success');
      })
      .catch((err) => console.log('Failed: ', err));
  }

  private setTheme(color: string = '#5260ff') {
    if (color == '' || color == null) {
      color = '#5260ff';
    }
    var root: any = document.querySelector(':root');
    root.style.setProperty('--ion-color-tertiary', color);
    root.style.setProperty(
      '--var-color-boxshadow',
      'var(--ion-color-tertiary)'
    );
  }
}
