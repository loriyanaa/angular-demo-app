import {
    Directive,
    ElementRef,
    Input,
    OnInit,
    Renderer2
    } from '@angular/core';

@Directive({
    selector: '[umsBackgroundImage]'
})
export class BackgroundImageDirective implements OnInit {

    @Input('umsBackgroundImage') backgroundImage: string;
  
    constructor(
        private elementRef: ElementRef, 
        private renderer: Renderer2
    ) { }
  
    public ngOnInit(): void {
        this.renderer.setStyle(
            this.elementRef.nativeElement, 
            'background-image', `url("${this.backgroundImage}")`);
    }
}
