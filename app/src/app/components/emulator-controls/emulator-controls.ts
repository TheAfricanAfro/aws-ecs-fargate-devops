import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-emulator-controls',
  imports: [],
  templateUrl: './emulator-controls.html',
  styleUrl: './emulator-controls.css',
})
export class EmulatorControls {
  
  @Output() newFileEvent = new EventEmitter<File>()
  
  public fileInputHandler(event :Event) {
    let target = event.target as HTMLInputElement;
    if (target.files != null && target.files.item(0) != null) {
      let file = target.files.item(0)!
      this.newFileEvent.emit(file);
    }
  }
}
