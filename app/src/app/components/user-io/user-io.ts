import { Component,ChangeDetectorRef } from '@angular/core';
import { EmulatorDisplay } from '../emulator-display/emulator-display';
import { EmulatorControls } from '../emulator-controls/emulator-controls';

@Component({
  selector: 'app-user-io',
  imports: [
    EmulatorDisplay,
    EmulatorControls
  ],
  templateUrl: './user-io.html',
  styleUrl: './user-io.css',
})
export class UserIO {
  private worker : Worker | null = null;
  dBuffer : ArrayBuffer[] = [];
  
  public constructor (private cdr: ChangeDetectorRef) {}
  
  public async newFileEventHandler(file : File) { 
    if (typeof Worker !== 'undefined') {
      // Create a new if no worker created
      if (this.worker == null) {
        this.worker = new Worker(new URL('./user-io.worker', import.meta.url));
        this.worker.onmessage = ({data}) => { 
          switch(data.type) {
            case "CANVAS_UPDATE":
              this.dBuffer = data.data;
              this.cdr.detectChanges();
          } 
        };
      }
      this.worker.postMessage({type:"NEW_FILE", data: await file.arrayBuffer()});

    } else {
    // Web workers are not supported in this environment.
    // You should add a fallback so that your program still executes correctly.
    }
   
    
  }

  public synchronizationEventHandler(message : string) {
    if (this.worker != null) {
      this.worker.postMessage({type:message})
    }
    
  }
}

export enum ExecutionState {
  ON,
  PAUSED
}
