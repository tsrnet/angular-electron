import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ElectronService } from '../../services';

@Component({
  selector: 'app-tittle-bar',
  templateUrl: './tittle-bar.component.html',
  styleUrls: ['./tittle-bar.component.scss']
})
export class TittleBarComponent implements OnInit {

  @ViewChild("tittlebar", {static:true}) child: ElementRef;
  
  constructor(public electron: ElectronService) {}

  public get canMaximize(): boolean {
    return (this.electron.isElectron) ? this.electron.currentWindow.resizable : true;
  }

  ngOnInit(): void {
  }
  
  click() {
    // this.child.nativeElement.classList.remove('dark');
  }
  
  public minimize() {
    this.electron.currentWindow.minimize();
    // this.electron.ipcRenderer.send('login-success');
	}

	public maximize() {
		if (this.electron.currentWindow.isMaximized()) this.electron.currentWindow.unmaximize();
		else this.electron.currentWindow.maximize();
	}

	public close() {
		this.electron.currentWindow.close();
  }

}
