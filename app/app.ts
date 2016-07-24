import { Component, ViewChild } from '@angular/core';
import { App, ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';
import { AuthProvider } from "./providers/auth/auth";
import { AuthPage } from "./pages/auth/home/home";
import { BulletinBoardPage } from './pages/bulletin-board/bulletin-board';
import { PeoplePage } from './pages/people/people';

@Component({
  templateUrl: 'build/app.html',
  providers: [
    AuthProvider,
    FIREBASE_PROVIDERS,
    defaultFirebase({
      apiKey: "AIzaSyBsao7DWfZw9arqVjDZx3JHswsDJItV6Dw",
      authDomain: "econdominio-aac01.firebaseapp.com",
      databaseURL: "https://econdominio-aac01.firebaseio.com/",
      storageBucket: "gs://econdominio-aac01.appspot.com",
    })
  ]
})
class MyApp {
  @ViewChild(Nav) nav: Nav;   
  rootPage: any; 
  pages: Array<{title: string, component: any}>;
  isAppInitialized: boolean;

  constructor(private platform: Platform, protected auth: AuthProvider) {
    this.pages = [
    { title: 'Avisos', component: BulletinBoardPage },
    { title: 'Moradores', component: PeoplePage }
    ];
    this.isAppInitialized = false;
  }

  ngOnInit() {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();

      this.auth.getUserData().subscribe(data => {
        if (!this.isAppInitialized) {
          console.log(data);
          this.nav.setRoot(BulletinBoardPage);
          this.isAppInitialized = true;
        }
      }, err => {
        this.nav.setRoot(AuthPage);
      });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
