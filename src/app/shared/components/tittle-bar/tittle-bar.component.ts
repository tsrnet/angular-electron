import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ElectronService } from '../../../core/services';

@Component({
  selector: 'app-tittle-bar',
  templateUrl: './tittle-bar.component.html',
  styleUrls: ['./tittle-bar.component.scss']
})
export class TittleBarComponent implements OnInit {

  private window: Electron.BrowserWindow;
  @ViewChild("tittlebar", {static:true}) child: ElementRef;
  resizable: boolean = true;
  
  constructor(private electron: ElectronService) {
    if (this.electron.isElectron) {
      this.window = this.electron.remote.getCurrentWindow();
      this.resizable = this.window.resizable;
    } 
    // this.window.setSize(380, 480);
  }

  ngOnInit(): void {
  }
  
  click() {
    // this.child.nativeElement.classList.remove('dark');
  }
  
  public minimize() {
    this.window.minimize();
    // this.electron.ipcRenderer.send('login-success');
	}

	public maximize() {
		if (this.window.isMaximized()) this.window.unmaximize();
		else this.window.maximize();
	}

	public close() {
		this.window.close();
	}

}
