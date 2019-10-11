import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage {
  errorMsg: {
    'firstname': '',
    'lastname': '',
    'email': '',
    'password': ''
  }

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) {}

  // Dismiss Register Modal
  dismissRegister() {
    this.modalController.dismiss();
  }

  register(form: NgForm) {
    this.authService
      .register(
        form.value.firstname,
        form.value.lastname,
        form.value.email,
        form.value.password
      )
      .subscribe(
        data => {
          this.authService.login(form.value.email, form.value.password).subscribe(
            data => {},
            error => {
              this.errorMsg = error.error.errors;
              console.log(error);
            },
            () => {
              this.dismissRegister();
              this.navCtrl.navigateRoot('/dashboard');
            }
          );
          this.alertService.presentToast(data['message']);
        },
        error => {
          this.errorMsg = error.error.errors;
          console.log(error);
        },
        () => {}
      );
  }
}
