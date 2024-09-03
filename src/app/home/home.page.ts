import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  data: any;

  constructor(
    private alertController: AlertController,
    private activeroute: ActivatedRoute,
    private router: Router
  ) {
    this.activeroute.queryParams.subscribe(() => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras.state) {
        this.data = navigation.extras.state;
      }
    });
  }
  profileForm = new FormGroup({
    name: new FormControl(''),
    lastname: new FormControl(''),
    niveleducacion: new FormControl(''),
    fechanacimiento: new FormControl(''),
  });

  limpiar() {
    this.profileForm.reset();
  }

  async mostrar() {
    const name = this.profileForm.get('name')?.value;
    const lastname = this.profileForm.get('lastname')?.value;

    const alert = await this.alertController.create({
      header: 'Usuario',
      message: `Su nombre es: ${name} ${lastname}`,
      buttons: ['Yes'],
    });

    await alert.present();
  }
  ngOnInit() {}
}
