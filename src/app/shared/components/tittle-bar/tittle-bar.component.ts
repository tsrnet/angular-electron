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
  
  constructor(private electron: ElectronService) {
    this.window = this.electron.remote.getCurrentWindow();
  }

  ngOnInit(): void {
  }

  click() {
    this.child.nativeElement.classList.remove('dark');
  }

  public minimize() {
		this.window.minimize();
	}

	public maximize() {
		if (this.window.isMaximized()) this.window.unmaximize();
		else this.window.maximize();
	}

	public close() {
		this.window.close();
	}

}
