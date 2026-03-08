import { Component,Input, SimpleChange , Inject, DOCUMENT, Output, EventEmitter } from '@angular/core';
import { CanvasRenderService } from '../../logic/ts/CanvasRenderService';

@Component({
  selector: 'app-emulator-display',
  imports: [],
  templateUrl: './emulator-display.html',
  styleUrl: './emulator-display.css',
})
export class EmulatorDisplay {
  @Input() displayBuffer! : ArrayBuffer[]; 
  @Output() synchronizationEvent = new EventEmitter<string>()
  
  private canvas! : HTMLCanvasElement;
  private canvasRenderer! : CanvasRenderService;
  private timeId : any = null;
  
  public constructor (@Inject(DOCUMENT) private document: Document) {}
  
  ngAfterViewInit () {
    let canvas = this.document.getElementById("display") as HTMLCanvasElement;
    this.canvasRenderer = new CanvasRenderService(canvas);
  }

  ngOnChanges(changes : SimpleChange<this>) {
    for (const propname in changes) {
      if (propname == 'displayBuffer') {
        if (this.canvasRenderer != null) {
          this.canvasRenderer.updateCanvas(this.displayBuffer!);
          this.synchronizationEvent.emit("RENDER_COMPLETE");
        }
      }
    }
  }
}
