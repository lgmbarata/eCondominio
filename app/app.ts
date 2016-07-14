import { Component, ViewChild } from '@angular/core';
import { App, ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { FIREBASE_PROVIDERS, defaultFirebase, AngularFire, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';

import { LoginPage } from './pages/login/login'
import { BulletinBoardPage } from './pages/bulletin-board/bulletin-board';
import { PeoplePage } from './pages/people/people';

@Component({
  templateUrl: 'build/app.html',
  providers: [
  FIREBASE_PROVIDERS,
    defaultFirebase({
      apiKey: "AIzaSyBsao7DWfZw9arqVjDZx3JHswsDJItV6Dw",
      authDomain: "econdominio-aac01.firebaseapp.com",
      databaseURL: "https://econdominio-aac01.firebaseio.com/",
      storageBucket: "gs://econdominio-aac01.appspot.com",
    }),
    firebaseAuthConfig({
      provider: AuthProviders.Password,
      method: AuthMethods.Password,
    })
  ]
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>

  constructor(private platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
    { title: 'Quadro de Avisos', component: BulletinBoardPage },
    { title: 'Moradores', component: PeoplePage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
