import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoginModel } from '../models/login-model';
// import { LoginModel } from 'app/models/auth-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private validationMessages: { [key: string]: { [key: string]: string } };
  public form: FormGroup;
  private userLogin: LoginModel = new LoginModel();

  constructor(private authservice: AuthService,
              private router: Router,
              private toastr: ToastrService,
              private formBuilder: FormBuilder,
              ) 
    {
      this.validationMessages = {
        email: {
          required: 'Please enter User Name.',
          // email: 'Please enter valid email address.'
        },
        password: {
          required: 'Please enter Password.'
        }
      };
    }

  ngOnInit() {
    if (this.authservice.isLoggedIn()) {
      this.router.navigate(['/admin/home']);
    }

    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      email:  [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  public onSave() {
    
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(field => {
        this.form.controls[field].markAsDirty();
        this.form.controls[field].markAsTouched();
      });
    } else {
      let session:any = {
        session:this.prepareToSend()
      }

      // let s = { session: { login: "scrum-admin", password: "josh123", device_id: 123456 } }
      
      this.authservice.login(session).subscribe(response => {
        console.log(response,'response');
        
        if (response.authenticated) {
          console.log(response.data.user.api_key,'api_key');
          console.log(response.data.user.auth_token,'auth_token');
          this.authservice.isLoggedIn()
          localStorage.setItem('api_key', response.data.user.api_key);
          localStorage.setItem('auth_token', response.data.user.auth_token);
          this.router.navigate(['/admin/home']);
          this.toastr.success(response.message);
        }
         else {
          this.toastr.error('Invalid username or password');
        }
      }, error => {
        console.log(error);
        
        this.toastr.error("Network Error");
      });
    }
  }

  private prepareToSend(): LoginModel {
    const formData = this.form.value;
    this.userLogin.login = formData.email;
    this.userLogin.password = formData.password;
    return this.userLogin;
  }

  public displayValidationMessages(control: string): string[] {
    const messages = [];
    Object.keys(this.validationMessages[control]).forEach(validator => {
      if ((this.form.get(control).touched || this.form.get(control).dirty) && this.form.get(control).errors) {
        if (this.form.get(control).errors[validator]) {
          messages.push(this.validationMessages[control][validator]);
        }
      }
    });
    return messages;
  }


}
