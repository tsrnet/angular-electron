import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../../core/services';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private core: ElectronService) { }

  ngOnInit(): void {
  }

  login() {


    this.core.authService.signIn('antoniodavidorado@gmail.com', '$%p21012864D').then(
    (res: boolean) => {
      console.log(res);
    }, (err: any) => {
      console.warn(err);
    })
    //this.core.ipcRenderer.send('login-success')

  }

  logout() {


    this.core.authService.signOut().then(
    (res: boolean) => {
      console.log(res);
    }, (err: any) => {
      console.warn(err);
    })
    //this.core.ipcRenderer.send('login-success')

  }

  status() {

    this.core.authService.signedIn.subscribe((state) => {
      console.log(state);
    })

    //this.core.ipcRenderer.send('login-success')

  }

}
