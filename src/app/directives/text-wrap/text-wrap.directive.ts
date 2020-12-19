import { Directive, ElementRef, Input } from '@angular/core';
import { ElectronService } from '../../services';

@Directive({
	selector: '[appTextWrap]'
})
export class TextWrapDirective {

	@Input() maxWidth: string;
	@Input() maxChars: string;
	private textLengthInChars: number;
	private textLengthInPixels: number;

	constructor(el: ElementRef, electron: ElectronService) {
		let id = setInterval(() => {
			if (el.nativeElement.childNodes[0] !== undefined) {
				this.textLengthInPixels = el.nativeElement.offsetWidth;
				this.textLengthInChars = el.nativeElement.innerText.length;
				clearInterval(id);
			}
		}, 100)
	}

}
