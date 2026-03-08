import { ExecutionState} from "./user-io"
import { Chip8 } from "../../logic/ts/Chip8";
/// <reference lib="webworker" />

let interpreter: Chip8 = new Chip8();
let state : ExecutionState = ExecutionState.PAUSED;
let OP_MAX = 1_000;

addEventListener('message', ({data}) => {
 switch(data.type) {
  case "NEW_FILE":
    console.log("recieved new file!");
    state = ExecutionState.PAUSED;
    interpreter.loadFile(data.data);
    state = ExecutionState.ON;
    interpreterLoop();
    break;
  case "RENDER_COMPLETE":
    state = ExecutionState.ON;
    interpreterLoop();
    break;
  case "PAUSE":
    state = ExecutionState.PAUSED;
    break;
  case "RESUME":
    state = ExecutionState.ON;
    interpreterLoop();
    break;
  }
});


function interpreterLoop() {
  let opertations = 0;
  while (state == ExecutionState.ON) {
    if(interpreter.step()) {
      // send event to update canvas
      postMessage({type:"CANVAS_UPDATE", data:interpreter.getDisplayBuffer()});
      state = ExecutionState.PAUSED;
      return;
    }
    ++opertations;
    if (opertations > OP_MAX) {
      setTimeout(interpreterLoop,0);
      return;
    }
   } 
  return;
}
