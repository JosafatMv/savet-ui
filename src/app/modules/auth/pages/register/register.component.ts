import { Component } from '@angular/core';
import { UserRegister } from '../../types/user';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls:['./register.component.css'],
})
export class RegisterComponent{
  user: UserRegister = {
    name: '',
    lastname:'',
    password: '',
    confirmPassword: '',
    email: '',
  }

  logoPath: string = '../../../../../assets/imgs/petmania-logo.svg';

  get isLoading() {
		return this.authService.isLoading;
	}

  constructor(
    private authService: AuthService,
		private router: Router,
		private generalService: GeneralService) {
      if (!!localStorage.getItem('token')) {
        // this.router.navigate(['']);
        console.log(localStorage.getItem('token'));
      }
    }
    
    signin(){
      this.authService.register(this.user);
    }
}
