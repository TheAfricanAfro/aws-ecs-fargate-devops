import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserIO } from '../user-io/user-io';
import { ExecutionData } from '../execution-data/execution-data';
import { Chip8 } from '../../logic/ts/Chip8'

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    UserIO,
    ExecutionData
  ],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('chip8_emulator');
  
}
