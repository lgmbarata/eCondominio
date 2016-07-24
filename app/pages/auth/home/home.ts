import { NavController } from 'ionic-angular';
import { OnInit, Component } from '@angular/core';
import { LoginEmailPage } from '../login-email/login-email';
import { SignUpPage } from '../sign-up/sign-up';
import { TermsOfServicePage } from '../../terms-of-service/terms-of-service';
import { AuthProvider } from '../../../providers/auth/auth';
import { BulletinBoardPage } from '../../bulletin-board/bulletin-board';

@Component({
  templateUrl: 'build/pages/auth/home/home.html'
})

export class AuthPage {
  error: any;

  constructor(private nav: NavController, private auth: AuthProvider) {
    
  }

  ngOnInit() {

  }

  openSignUpPage() {
    this.nav.push(SignUpPage);
  }

  openLoginPage() {
    this.nav.push(LoginEmailPage);
  }

  openTermsOfService() {
    this.nav.push(TermsOfServicePage);
  }

  registerUserWithFacebook() {
    this.auth.loginWithFacebook().subscribe(data => {
      this.nav.setRoot(BulletinBoardPage);
    }, err => {
      this.error = err;
    });
  }

  registerUserWithGoogle() {
    this.auth.loginWithGoogle().subscribe(data => {
      this.nav.setRoot(BulletinBoardPage);
    }, err => {
      this.error = err;
    });
  }
}
