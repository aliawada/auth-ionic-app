import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
   errorMsg: {
    'email': '',
    'password': ''
   };

   constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) {}

  ngOnInit() {}

  // Dismiss Login Modal
  dismissLogin() {
    this.modalController.dismiss();
  }

  login(form: NgForm) {
    this.authService.login(form.value.email, form.value.password).subscribe(
      data => {
        this.alertService.presentToast('Logged In');
      },
      error => {
        this.errorMsg = error.error.errors;
      },
      () => {
        this.dismissLogin();
        this.navCtrl.navigateRoot('/dashboard');
      }
    );
  }
}
