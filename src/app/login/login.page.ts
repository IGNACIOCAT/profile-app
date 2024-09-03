import { Component, OnInit, ViewChild } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage implements OnInit {
  inputModel = '';
  userForm: FormGroup;
  private registeredUser = { username: 'ignacio1', password: '1234' };
  constructor(private router: Router) {
    // Inicializar el FormGroup con los FormControl
    this.userForm = new FormGroup({
      username: new FormControl('', [
        Validators.minLength(3),
        Validators.maxLength(8),
        Validators.pattern(/^[a-zA-Z0-9]+$/),
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.minLength(4),
        Validators.required,
      ]),
    });
  }
  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;

  onInput(ev: any) {
    const value = ev.target!.value;
    const filteredValue = value.replace(/[^a-zA-Z0-9]+/g, '');
    this.ionInputEl.value = this.inputModel = filteredValue;
    this.userForm.get('username')?.setValue(filteredValue); // Actualizar el FormControl
  }

  onSubmit() {
    if (this.userForm.valid) {
      const username = this.userForm.get('username')?.value;
      const password = this.userForm.get('password')?.value;

      if (
        username === this.registeredUser.username &&
        password === this.registeredUser.password
      ) {
        // Configurar NavigationExtras con los datos a pasar
        const navigationExtras: NavigationExtras = {
          state: {
            user: username,
          },
        };

        // Navegar a la página home pasando los datos
        this.router.navigate(['/home'], navigationExtras);
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    } else {
      console.log('Formulario no es válido');
    }
  }
  ngOnInit() {}
}
