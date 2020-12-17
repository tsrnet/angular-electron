import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../../services';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private core: ElectronService) {
    let window = this.core.remote.getCurrentWindow();
    window.setSize(this.core.screen.width/2.5, this.core.screen.height/1.875);
    window.setResizable(true);
  }

  ngOnInit(): void {
  }

}
