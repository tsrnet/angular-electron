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
    this.core.ipcRenderer.send('login-success')
  }

}
