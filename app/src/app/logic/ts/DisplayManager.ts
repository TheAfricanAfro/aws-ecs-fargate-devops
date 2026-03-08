import { BitUtils,BitState } from "./BitUtils";


export class DisplayManager {
    //Display Buffer 64x32 pixels (2048 bits)
    private DB : ArrayBuffer[] = [
        new ArrayBuffer(8),
        new ArrayBuffer(8),
        new ArrayBuffer(8),
        new ArrayBuffer(8),
        new ArrayBuffer(8),
        new ArrayBuffer(8),
        new ArrayBuffer(8),
        new ArrayBuffer(8),
        new ArrayBuffer(8),
        new ArrayBuffer(8),
        new ArrayBuffer(8),
        new ArrayBuffer(8),
        new ArrayBuffer(8),
        new ArrayBuffer(8),
        new ArrayBuffer(8),
        new ArrayBuffer(8),
        new ArrayBuffer(8),
        new ArrayBuffer(8),
        new ArrayBuffer(8),
        new ArrayBuffer(8),
        new ArrayBuffer(8),
        new ArrayBuffer(8),
        new ArrayBuffer(8),
        new ArrayBuffer(8),
        new ArrayBuffer(8),
        new ArrayBuffer(8),
        new ArrayBuffer(8),
        new ArrayBuffer(8),
        new ArrayBuffer(8),
        new ArrayBuffer(8),
        new ArrayBuffer(8),
        new ArrayBuffer(8),
    ] 

    public constructor() {}

    //Sets pixel in Chip8 DisplayBuffer, Origin (0,0) at bottom left of matrix
    public setPixel(x:number, y:number, pixelState:BitState) {
        
        let row = this.DB[Math.abs(y - 31)];
        BitUtils.setBit(pixelState,x,row);
    }

    public getPixel(x:number , y:number) : BitState {
        //Out of bounds
        if (x > 64) {
            throw new Error(`X-value:${x} out of bounds`)
        }               
        if (Math.abs(y - 31) > 31) {
            throw new Error(`Y-value:${y} out of bounds`)
        }
        
        let row = this.DB[Math.abs(y - 31)];
        return BitUtils.readBit(x,row);
    }

    // sets all pixels off 
    public clear() : void {
        this.DB.forEach((row)=>{
            let bytes : Uint8Array = new Uint8Array(row);
            for (let i = 0 ; i < bytes.length ; i++) { bytes[i] = 0x00; }
        })
    }

    /**
     * draws sprite in display buffer
     * @param x x coordinate
     * @param y y coordinate
     * @param sprite sprite data
     * @returns 0 if no pixel collision , else 1.
     */
    public drawSprite(x: number, y:number , sprite: ArrayBuffer) : number {
        let collision = 0;
        let readableBuffer = new Uint8Array(sprite);
        x+=7;
        readableBuffer.forEach((spriteRow) => {
            let rowToModify : BigUint64Array = new BigUint64Array(this.DB[y++]);
        
            let previousState : BigInt = rowToModify[0];
            let bitshift : number = x-7;
            rowToModify[0] = rowToModify[0] ^ ((BigInt(((this.reverseBitsInByte(spriteRow)))) << BigInt((bitshift))));

            
            
            
            // check for collision. not very efficient. maybe their is some bit hacks that'll do this?
            for (let i = 0; i < 64 && collision != 1 ; i++) { //if we already detected collision no reason to continue checking
                
                let bitPervious = BitUtils.readBit(i,new BigUint64Array([previousState.valueOf()]).buffer);
                let bitCurrent = BitUtils.readBit(i,new BigUint64Array([rowToModify[0]]).buffer);
                if (bitPervious == BitState.ON && bitCurrent == BitState.OFF) {
                    collision = 1;
                    break;
                }
            }
        })
        return collision;
    
    }

    private getIndexOfMostSignificantBitInByte(byte:ArrayBuffer) : number {
        
        for (let i = 7 ; i >= 0 ; i --) {
            if (BitUtils.readBit(i,byte) == BitState.ON) { return i; } 
        }
        return 0;
    }

    public getBuffer() : ArrayBuffer[] { return this.DB; }

    public reverseBitsInByte(n:number) {
    let clone = n;
    // Ensure the input is treated as an 8-bit unsigned integer (0-255)
    clone = clone & 0xFF; 
    let reversedN = 0;

    for (let i = 0; i < 8; i++) {
    // Left shift the reversed result to make room for the next bit
    reversedN <<= 1; 
    
    // Check the rightmost bit of the original number (n & 1)
    // and set the new rightmost bit of the result using bitwise OR (|)
    if (clone & 1) {
      reversedN |= 1; 
    }
    
    // Right shift the original number to process the next bit
    clone >>= 1; 
  }
  
  // Return the reversed number (ensure it remains an 8-bit representation)
  return reversedN & 0xFF;
}
}