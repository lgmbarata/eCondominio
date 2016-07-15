import { Component } from '@angular/core';
import { NavController, Alert, Loading } from 'ionic-angular';
import { Facebook } from 'ionic-native';
import { FirebaseAuth, AuthMethods, AuthProviders } from 'angularfire2';
import { BulletinBoardPage } from '../bulletin-board/bulletin-board';

declare let firebase: any;

@Component({
	templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
	private loading: Loading;

	constructor(private nav: NavController, private auth: FirebaseAuth) {
		
	}

	ngOnInit() {
		this.auth.subscribe((data) => {
			console.log("in auth subscribe", data)
			if (data) {
				this.nav.setRoot(BulletinBoardPage);
			} 
		});
	}

	private registerUser(credentials) {
		this.showLoading();

		this.auth.createUser(credentials).then((authData) => {
			this.loading.dismiss();
			let prompt = Alert.create({
				title: 'Sucesso',
				subTitle: 'Sua conta foi criada!',
				buttons: ['OK']
			});
			this.nav.present(prompt);
		}).catch((error) => {
			this.showError(error);
		});
	}

	private facebookLogin() {
		this.showLoading();

/*		Facebook.login(['email']).then((response) => {
			console.log(response);

			let creds = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);

			let providerConfig = {
				provider: AuthProviders.Facebook,
				method: AuthMethods.OAuthToken,
				remember: 'default',
				scope: ['email'],
			};

			this.auth.login(creds, providerConfig).then((success) => {
				console.log("Firebase success: " + JSON.stringify(success));
				alert(JSON.stringify(success))
			}).catch((error) => {
				console.log("Firebase failure: " + JSON.stringify(error));
				alert('erro');
				alert(JSON.stringify(error))
			});

		}).catch((error) => { this.showError(error) })*/
	}

	private login(credentials) {
		this.showLoading()

		this.auth.login(credentials).then((authData) => {
			this.loading.dismiss();
			this.nav.setRoot(BulletinBoardPage);
		}).catch((error) => {
			this.showError(error);
		});
	}

	showLoading() {
		this.loading = Loading.create({
			content: 'Aguarde...'
		});
		this.nav.present(this.loading);
	}

	showError(text) {
		setTimeout(() => {
			this.loading.dismiss();
		});

		let prompt = Alert.create({
			subTitle: text,
			buttons: ['OK']
		});
		this.nav.present(prompt);
	}
}