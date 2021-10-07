import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'platforme-app';
  loggedUser = "";
  authenticated: boolean = true;
  userId = "";

  constructor(private router: Router, private authService: AuthService) { }

  async ngOnInit() {
    this.loggedUser = localStorage.getItem("user") || "";
    this.userId = localStorage.getItem("userId") || "";
    if (this.loggedUser.length>0) {
      this.authenticated = true;
      this.router.navigate(['home']);
    } else {
      this.authenticated = false
      this.router.navigate(['login']);
      this.authService.currentLoggedUser.subscribe(
        newLoggedUser => this.loggedUser = newLoggedUser
      );
    }
  }
  
  newUser(event: Event) {
    console.log(event)
    this.authenticated = true;
  }


  signOut() {
    this.authService.logOutUser();
    this.loggedUser = "";
    this.authenticated = false;
    this.router.navigate(['login']);
  }
}
