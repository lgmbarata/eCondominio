import { Popover, Modal, ViewController, NavController, NavParams } from 'ionic-angular';
import { Component, OnInit, Input } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { AuthPage } from '../auth/home/home';

// Main bulletin board controller.
@Component({
	templateUrl: 'build/pages/bulletin-board/bulletin-board.html',
})
export class BulletinBoardPage implements OnInit {
	allMessages: FirebaseListObservable<any[]>;
	condoMessages: FirebaseListObservable<any[]>;
	authInfo: any;

	constructor(private nav: NavController, private af: AngularFire) {

	}

	ngOnInit() {
		this.allMessages = this.af.database.list('/messages');
		this.condoMessages = this.af.database.list('/messages', {
			query: {
				orderByChild: '-dateAdded'
			}
		});

		this.af.auth.subscribe(data => {
			if (data) {
				this.authInfo = data;
			} else {
				this.authInfo = null;
				this.showLoginModal();
			}
		});
	}

	logout() {
		if (this.authInfo) {
			this.af.auth.logout();
			return;
		}
	}

	showLoginModal() {
		let loginPage = Modal.create(AuthPage);
		this.nav.present(loginPage);
	}

	newMessage() {
		let popover = Popover.create(NewMessagePage, {
			messages: this.allMessages
		});

		this.nav.present(popover);
	}

}

// Popover controller that creates new bulletin board message.
@Component({
	templateUrl: 'build/pages/bulletin-board/new-message.html',
})
class NewMessagePage {
	messages: FirebaseListObservable<any>;
	@Input()
	messageText: string;

	constructor(private navParams: NavParams, private viewController: ViewController) {

	}

	ngOnInit() {
		if (this.navParams.data) {
			this.messages = this.navParams.data.messages;
		}
	}

	sendMessage() {
		this.messages.push({
			dateAdded: new Date().getTime(),
			dateUpdated: new Date().getTime(),
			from: 'Luiz Barata',
			text: this.messageText
		})
		this.viewController.dismiss();
	}

}
