import { Component, OnInit, Input } from '@angular/core';
import { Popover, ViewController, NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

// Main bulletin board controller.
@Component({
	templateUrl: 'build/pages/bulletin-board/bulletin-board.html',
})
export class BulletinBoardPage implements OnInit {
	messages: FirebaseListObservable<any>;
	validMessages: FirebaseListObservable<any>;

	constructor(private nav: NavController, private af: AngularFire) {

	}

	ngOnInit() {
		this.af.auth.login({ email: 'luiz.barata@gmail.com', password: '123456' });
		this.messages = this.af.database.list('/messages');
		this.validMessages = this.af.database.list('/messages', {
			query: {
				orderByChild: '-dateAdded'
			}
		});

	}

	newMessage() {
		let popover = Popover.create(NewMessagePage, {
			messages: this.messages
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
