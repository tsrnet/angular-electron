import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ElectronService } from '../../../core/services';

@Component({
  selector: 'app-tittle-bar',
  templateUrl: './tittle-bar.component.html',
  styleUrls: ['./tittle-bar.component.scss']
})
export class TittleBarComponent implements OnInit {

  @ViewChild("tittlebar", {static:true}) child: ElementRef;
  
  constructor(private core: ElectronService) {}

  public get canMaximize(): boolean {
    return (this.core.isElectron) ? this.core.currentWindow.resizable : true;
  }

  ngOnInit(): void {
  }
  
  click() {
    // this.child.nativeElement.classList.remove('dark');
  }
  
  public minimize() {
    this.core.currentWindow.minimize();
    // this.core.ipcRenderer.send('login-success');
	}

	public maximize() {
		if (this.core.currentWindow.isMaximized()) this.core.currentWindow.unmaximize();
		else this.core.currentWindow.maximize();
	}

	public close() {
		this.core.currentWindow.close();
  }

}
