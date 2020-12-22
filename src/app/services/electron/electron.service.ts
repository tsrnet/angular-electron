import { Injectable } from '@angular/core';
import { ipcRenderer, webFrame, remote } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import { AuthService } from '../auth/auth.service';
import { AppConfig } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ElectronService {
	ipcRenderer: typeof ipcRenderer;
	webFrame: typeof webFrame;
	remote: typeof remote;
	childProcess: typeof childProcess;
	fs: typeof fs;
	screen: any;
	authService: AuthService;
	appConfig: typeof AppConfig;

	viewReady: boolean = false;

	get isElectron(): boolean {
		return !!(window && window.process && window.process.type);
	}

	get currentWindow(): Electron.BrowserWindow {
		return (this.isElectron) ? this.remote.getCurrentWindow() : null;
	}

	constructor(authService: AuthService) {
		this.authService = authService;
		this.appConfig = AppConfig;

		if (this.isElectron) {
			this.ipcRenderer = window.require('electron').ipcRenderer;
			this.webFrame = window.require('electron').webFrame;
			this.screen = window.screen;
			this.remote = window.require('electron').remote;
			this.childProcess = window.require('child_process');
			this.fs = window.require('fs');
		}
	}
}
