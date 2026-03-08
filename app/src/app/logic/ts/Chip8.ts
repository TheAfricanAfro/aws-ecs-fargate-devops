// import { readFileSync } from "fs";
import { BitState} from "./BitUtils";
import { DisplayManager } from "./DisplayManager";
import { Sprites,Sprite } from "./Sprites";


export class Chip8 {
    
    // General Purpose Registers:
    private V0 : ArrayBuffer = new ArrayBuffer(1); private V8 : ArrayBuffer = new ArrayBuffer(1);
    private V1 : ArrayBuffer = new ArrayBuffer(1); private V9 : ArrayBuffer = new ArrayBuffer(1);
    private V2 : ArrayBuffer = new ArrayBuffer(1); private VA : ArrayBuffer = new ArrayBuffer(1);
    private V3 : ArrayBuffer = new ArrayBuffer(1); private VB : ArrayBuffer = new ArrayBuffer(1);
    private V4 : ArrayBuffer = new ArrayBuffer(1); private VC : ArrayBuffer = new ArrayBuffer(1);
    private V5 : ArrayBuffer = new ArrayBuffer(1); private VD : ArrayBuffer = new ArrayBuffer(1);
    private V6 : ArrayBuffer = new ArrayBuffer(1); private VE : ArrayBuffer = new ArrayBuffer(1);
    private V7 : ArrayBuffer = new ArrayBuffer(1); private VF : ArrayBuffer = new ArrayBuffer(1);
    //Program Counter:
    private PC : number = 0x200;
    private stack : number[] = [];
    //Index Register:
    private I  : ArrayBuffer = new ArrayBuffer(2);

    //Sound Timer & Delay Timer
    private ST : ArrayBuffer = new ArrayBuffer(1); private DT : ArrayBuffer = new ArrayBuffer(1);
    //Display Buffer 64x32 pixels (2048 bits)
    private displayManager = new DisplayManager();
    //Main Memory 4096KB
    //Sprites loaded at addresses 0x00 to 0x4F ; Chip8 programs are loaded at 0X200
    private memory : ArrayBuffer = new ArrayBuffer(4096);
    

    public constructor() { this.init(); }
    
    
    private init() {
        //Initialize sprites from bytes 0x00 to 0x4F of interpreter managed memory
        let managedMemory = new Uint8Array(this.memory);
        let sprites : ArrayBuffer[] = Sprites.getSprites();
        for (let i = 0 ; i < sprites.length ; i++) {
            
            let sprite : ArrayBuffer = sprites[i];
            let spriteBytes = new Uint8Array(sprite);
            
            for (let j = 0 ; j < spriteBytes.length ; j ++) {
                let byte = spriteBytes[j];
                let bytePosition = (5*i) + j;
                managedMemory[bytePosition] = byte;
            }         
        }
    }
    
    public getDisplayBuffer() : ArrayBuffer[] { return this.displayManager.getBuffer(); }
    
    // public load (file : string) {
    //     let binary : Buffer  = readFileSync(file); 
        
    //     this.clearDisplay();
    //     this.PC = 0x200;
    //     let index : number = this.PC / 8;
    //     let writable = new Uint8Array(this.memory);
    //     for (let i = 0 ; i < binary.length ; i++ ) {
            
    //         writable[index++] = binary[i];
    //     }
        
    // }
    
    public async loadFile (buffer : ArrayBuffer) {
        let readableData = new Uint8Array(buffer);
        
        this.clearDisplay();
        
        this.PC = 0x200;
        let index : number = this.PC;
        let writable = new Uint8Array(this.memory);
        
    
        for (let i = 0 ; i < readableData.length ; i++ ) {
            writable[index++] = readableData[i];
        }
        
    }
    /**
     * performs one cycle of execution of a program
     */
    public step () : number {
        let instruction : number = this.fetch();
        let decoded : DecodeStruct = this.decode(instruction);
        return this.execute(decoded);
    }
    /**
     * fetches Chip8 instruction. A Chip8 instruction is 2 bytes. This method looks at the memory adress the program-counter
     * (PC) register is pointing to and finds the index of the corresponding Uint16Array this belongs to. returns instruction
     */
    private fetch() : number {
        let index = Math.floor(this.PC);
        let viewableMemory = new Uint8Array(this.memory);
        
        let data : number[] = [viewableMemory[index],viewableMemory[index+1]];
        let instruction : number = (data[0] << 8) + data[1];
        this.incrementProgramCounter();
        return instruction;
    }
    /**
     * i dont like how this turned out
     * @param instruction Uint16 number return from fetch method
     * @returns DecodeStruct that organizes data in instruction for easy execution
     */
    private decode(instruction : number) : DecodeStruct {
        let builder = new DecodeStructBuilder();
        builder.setInstruction(instruction);

        let firstNibble : number = (instruction & 0xF000) >> 12; 
        let secondNibble: number = (instruction & 0xF00) >> 8;              // X
        let thirdNibble : number = (instruction & 0xF0) >> 4;             // Y
        let fourthNibble : number = (instruction & 0xF);                  // N
        let secondByte : number = ((thirdNibble << 4) + fourthNibble);    //NN
        let memref : number = secondByte + (secondNibble << 8);           //NNN
    
        builder.setOp(firstNibble);
        builder.setX(secondNibble);
        builder.setY(thirdNibble);
        builder.setN(fourthNibble);
        builder.setNN(secondByte);
        builder.setNNN(memref);

        return new DecodeStruct(builder);
    }
    
    private execute (instruction : DecodeStruct) : number {
        switch (instruction.getOp()) {
            case 0x0:
                return this.handle0x0(instruction);
                break;
            case 0x1: // jump instruction
                this.PC = instruction.getNNN();
                break;
            case 0x2: // stack stuff
                this.stack.push(instruction.getNNN());
                this.PC = instruction.getNNN();
                break;
            case 0x3: //skip next insutrction if NN != VX
                if (instruction.getNN() == this.getRegisterData(instruction.getX())) { this.incrementProgramCounter(); } 
                break;
            case 0x4:
                break;
            case 0x5:
                break;
            case 0x6: // set register instruction
                this.handle0x6(instruction);
                break;
            case 0x7:
                this.handle0x7(instruction);
                break;
            case 0x8: //bunch of register manipulations
                this.handle0x8(instruction);
                break;
            case 0x9:
                break;
            case 0xA: // set index register to NNN
                let i = new Uint16Array(this.I);
                i[0] = instruction.getNNN(); ///0x22a
                break;
            case 0xB:
                break;
            case 0xC:
                let val = Math.floor(Math.random() * 255) & instruction.getNN();
                this.setRegisterData(instruction.getX(),val);
                break;
            case 0xD: //draw instruction
                this.handle0xD(instruction);
                return 0x1;
                break;
            case 0xE:
                break;
            case 0xF:
                break;
        }
        return 0x0;
    }

    private fetchData(address : number , size : number) : ArrayBuffer {
        if (address % 8 == 0) { 
            let byteIndex = address/8;
            return this.memory.slice(byteIndex,byteIndex+size);
        }
        let result = new ArrayBuffer(size)
        let byteIndex : number = Math.floor(address/8);
        let modulo : number = address % 8;
        let data : ArrayBuffer = this.memory.slice(byteIndex,byteIndex+size);
        let flag = 0;
        switch(modulo) {
            case 2:
                flag = 0xC0;
                break;
            case 4:
                flag = 0xF0;
                break;
            case 6:
                flag = 0xFC;
                break;
        }
        let towrite = new Uint8Array(result);
        let toread = new Uint8Array(data);
        for (let i = 0; i < result.byteLength ; i ++) {
            towrite[i] = toread[i];
            towrite[i] = towrite[i] << modulo;
            
            //forgive me
            towrite[i] += (toread[i+1] & flag) >> (8 - modulo)
        }

        return result;
    }

    private incrementProgramCounter() : void { this.PC += 2; }
    //Sets pixel in Chip8 DisplayBuffer, Origin (0,0) at bottom left of matrix
    public setPixel(x:number, y:number, pixelState:BitState) : void { this.displayManager.setPixel(x,y,pixelState); }

    public getPixel(x:number , y:number) : BitState { return this.displayManager.getPixel(x,y); }
    
    private clearDisplay() {  this.displayManager.clear(); }
    /**
     * Gets the start address of a sprite in memory
     */
    public getSpriteAddress (sprite:Sprite) : number {
        switch (sprite) {
            case Sprite.D_0: return 0x00;
            case Sprite.D_1: return 0x05;
            case Sprite.D_2: return 0X0A;
            case Sprite.D_3: return 0x0F;
            case Sprite.D_4: return 0x14; 
            case Sprite.D_5: return 0x19;
            case Sprite.D_6: return 0x1E;
            case Sprite.D_7: return 0x23;
            case Sprite.D_8: return 0x28;
            case Sprite.D_9: return 0x2D;
            case Sprite.C_A: return 0x32;
            case Sprite.C_B: return 0x37;
            case Sprite.C_C: return 0x3C;
            case Sprite.C_D: return 0x41;
            case Sprite.C_E: return 0x46;
            case Sprite.C_F: return 0x4B;
        }
    }

    // Only exists for testing
    protected getManagedMemory() : ArrayBuffer {
        return this.memory;
    }

    private getRegisterData(register: number) : number {
        switch(register) {
            case 0x00: return (new Uint8Array(this.V0))[0];
            case 0x01: return (new Uint8Array(this.V1))[0];
            case 0x02: return (new Uint8Array(this.V2))[0];
            case 0x03: return (new Uint8Array(this.V3))[0];
            case 0x04: return (new Uint8Array(this.V4))[0];
            case 0x05: return (new Uint8Array(this.V5))[0];
            case 0x06: return (new Uint8Array(this.V6))[0];
            case 0x07: return (new Uint8Array(this.V7))[0];
            case 0x08: return (new Uint8Array(this.V8))[0];
            case 0x09: return (new Uint8Array(this.V9))[0];
            case 0x0A: return (new Uint8Array(this.VA))[0];
            case 0x0B: return (new Uint8Array(this.VB))[0];
            case 0x0C: return (new Uint8Array(this.VC))[0];
            case 0x0D: return (new Uint8Array(this.VD))[0];
            case 0x0E: return (new Uint8Array(this.VE))[0];
            case 0x0F: return (new Uint8Array(this.VF))[0];
        }
        throw new Error("no such register number: " + register);
    }

    private setRegisterData(register: number,data: number) : void {
        switch(register) {
            case 0x0: 
                (new Uint8Array(this.V0))[0] = data;
                return;
            case 0x1: 
                (new Uint8Array(this.V1))[0] = data;
                return;
            case 0x2: 
                (new Uint8Array(this.V2))[0] = data;
                return;
            case 0x3: 
                (new Uint8Array(this.V3))[0] = data;
                return;
            case 0x4: 
                (new Uint8Array(this.V4))[0] = data;
                return;
            case 0x5: 
                (new Uint8Array(this.V5))[0] = data;
                return;
            case 0x6: 
                (new Uint8Array(this.V6))[0] = data;
                return;
            case 0x7: 
                (new Uint8Array(this.V7))[0] = data;
                return;
            case 0x8: 
                (new Uint8Array(this.V8))[0] = data;
                return;
            case 0x9: 
                (new Uint8Array(this.V9))[0] = data;
                return;
            case 0xA: 
                (new Uint8Array(this.VA))[0] = data;
                return;
            case 0xB: 
                (new Uint8Array(this.VB))[0] = data;
                return;
            case 0xC: 
                (new Uint8Array(this.VC))[0] = data;
                return;
            case 0xD: 
                (new Uint8Array(this.VD))[0] = data;
                return;
            case 0xE: 
                (new Uint8Array(this.VE))[0] = data;
                return;
            case 0xF: 
                (new Uint8Array(this.VF))[0] = data;
                return;
        }
        throw new Error("no such register number: " + register);
    }

    //INSTRUCTION HANDLERS
    private handle0x0(instruction : DecodeStruct) : number {
        switch(instruction.getN()) {
            case 0x0:
                this.displayManager.clear();
                return 0x01;
            case 0xE:
                //TODO: impl
                break;
        }
        return 0x0;
    }
    
    private handle0x2(instruction : DecodeStruct) {}
    private handle0x3(instruction : DecodeStruct) {}
    private handle0x4(instruction : DecodeStruct) {}
    private handle0x5(instruction : DecodeStruct) {}
    
    /**
     * sets value of given register "X" (second nibble of instruction) to value NN (second byte of instruction)
     * maybe i could of just gotten away with having the registers as type number and avoid the creation of Uint8Arrays but this'll do for now
     * @param instruction decoded instruction
     */
    private handle0x6(instruction : DecodeStruct) {
        switch(instruction.getX()) {
            case 0x0:
                let v0 = new Uint8Array(this.V0);
                v0[0] = instruction.getNN();
                break;
            case 0x1:
                let v1 = new Uint8Array(this.V1);
                v1[0] = instruction.getNN();
                break;
            case 0x2:
                let v2 = new Uint8Array(this.V2);
                v2[0] = instruction.getNN();
                break;
            case 0x3:
                let v3 = new Uint8Array(this.V3);
                v3[0] = instruction.getNN();
                break;
            case 0x4:
                let v4 = new Uint8Array(this.V4);
                v4[0] = instruction.getNN();
                break;
            case 0x5:
                let v5 = new Uint8Array(this.V5);
                v5[0] = instruction.getNN();
                break;
            case 0x6:
                let v6 = new Uint8Array(this.V6);
                v6[0] = instruction.getNN();
                break;
            case 0x7:
                let v7 = new Uint8Array(this.V7);
                v7[0] = instruction.getNN();
                break;
            case 0x8:
                let v8 = new Uint8Array(this.V8);
                v8[0] = instruction.getNN();
                break;
            case 0x9:
                let v9 = new Uint8Array(this.V9);
                v9[0] = instruction.getNN();
                break;
            case 0xA:
                let va = new Uint8Array(this.VA);
                va[0] = instruction.getNN();
                break;
            case 0xB:
                let vb = new Uint8Array(this.VB);
                vb[0] = instruction.getNN();
                break;
            case 0xC:
                let vc = new Uint8Array(this.VC);
                vc[0] = instruction.getNN();
                break;
            case 0xD:
                let vd = new Uint8Array(this.VD);
                vd[0] = instruction.getNN();
                break;
            case 0xE:
                let ve = new Uint8Array(this.VE);
                ve[0] = instruction.getNN();
                break;
            case 0xF:
                let vf = new Uint8Array(this.VF);
                vf[0] = instruction.getNN();
                break;
        }
    }

    private handle0x7(instruction : DecodeStruct) {
        switch(instruction.getX()) {
            case 0x0:
                let v0 = new Uint8Array(this.V0);
                v0[0] = v0[0] + instruction.getNN();
                break;
            case 0x1:
                let v1 = new Uint8Array(this.V1);
                v1[0] += instruction.getNN();
                break;
            case 0x2:
                let v2 = new Uint8Array(this.V2);
                v2[0] += instruction.getNN();
                break;
            case 0x3:
                let v3 = new Uint8Array(this.V3);
                v3[0] += instruction.getNN();
                break;
            case 0x4:
                let v4 = new Uint8Array(this.V4);
                v4[0] += instruction.getNN();
                break;
            case 0x5:
                let v5 = new Uint8Array(this.V5);
                v5[0] += instruction.getNN();
                break;
            case 0x6:
                let v6 = new Uint8Array(this.V6);
                v6[0] += instruction.getNN();
                break;
            case 0x7:
                let v7 = new Uint8Array(this.V7);
                v7[0] += instruction.getNN();
                break;
            case 0x8:
                let v8 = new Uint8Array(this.V8);
                v8[0] += instruction.getNN();
                break;
            case 0x9:
                let v9 = new Uint8Array(this.V9);
                v9[0] += instruction.getNN();
                break;
            case 0xA:
                let va = new Uint8Array(this.VA);
                va[0] += instruction.getNN();
                break;
            case 0xB:
                let vb = new Uint8Array(this.VB);
                vb[0] += instruction.getNN();
                break;
            case 0xC:
                let vc = new Uint8Array(this.VC);
                vc[0] += instruction.getNN();
                break;
            case 0xD:
                let vd = new Uint8Array(this.VD);
                vd[0] += instruction.getNN();
                break;
            case 0xE:
                let ve = new Uint8Array(this.VE);
                ve[0] += instruction.getNN();
                break;
            case 0xF:
                let vf = new Uint8Array(this.VF);
                vf[0] += instruction.getNN();
                break;
        }
    }
    
    private handle0x8(instruction : DecodeStruct) {
        let regX = instruction.getX();
        let regY = instruction.getY();
        switch (instruction.getN()) {
            case 0x00: // vx := vy
                this.setRegisterData(regX,this.getRegisterData(regY));
                break;
            case 0x01: // vx |= vy
                break;
            case 0x02: // vx &= vy
                break;
            case 0x03: // vx ^=vy
                break;
            case 0x04: // vx +=vy vf=1oncarry
                break;
            case 0x05: // vx -= vy vf=0 onborrow
                break;
            case 0x06: // vx >>= vy vf=oldleastsignificantbit
                break;
            case 0x07: // vx =-vy  vf=0 onborrow 
                break;
            case 0x0E: // vx <<=vy vf=oldmostsignificantbit
                break;
        }
    }
    private handle0x9(instruction : DecodeStruct) {}
    private handle0xA(instruction : DecodeStruct) {}
    private handle0xB(instruction : DecodeStruct) {}
    private handle0xC(instruction : DecodeStruct) {}
    
    /**
     * handles the draw instruction. this instruction takes in a sprite, and draws it for display.
     * the sprite data is found at the memory address pointed to by the I register, the total size
     * of the sprite is determined by the fourth nibble of the instruction (N). The x,y coordinates
     * of the sprites is found in the registers specified in the instruction. The register holding 
     * x-coordinate is specified in the second nibble (X) , the register holding y-coordinate is
     * specified in the third nibble (Y). The VF register will be set to 1 if a collision occurs.
     * 
     * Chip8 provided sprites (hex charachters 0-F) are have a height of 5 pixels and a width of 8 pixels.
     * Chip8 programs can provide their own sprites and have them displayed.
     * @param instruction decoded instruction
     */
    private handle0xD(instruction : DecodeStruct) {
        let x,y,height : number;
        x = this.getRegisterData(instruction.getX());
        y = this.getRegisterData(instruction.getY());
        
        //find the sprite data ArrayBuffer
        height = instruction.getN();
        let spriteAddress : number = new Uint16Array(this.I)[0];
        
        let spriteData : ArrayBuffer = this.memory.slice(spriteAddress,spriteAddress+height);
        
        // draw sprite and set VF register
        let vf = new Uint8Array(this.VF);
        vf[0] = this.displayManager.drawSprite(x.valueOf(),y.valueOf(),spriteData)
        
    }
    
    private handle0xE(instruction : DecodeStruct) {}
    private handle0xF(instruction : DecodeStruct) {}


}

export class DecodeStruct {
    // full 2 byte instruction
    private instruction : number;
    //first nibble. (4 bits)
    private  op : number;
    //second nibble. (4 bits)
    private  X  : number;
    //the third nibble. (4 bits)
    private  Y  : number;
    //the fourth nibble. (4 bits)
    private  N  : number;
    //the second byte. (8 bits)
    private  NN : number;
    //the second third and fourth nibbles (12 bits), used to reference memory
    private  NNN : number;

    public constructor (builder : DecodeStructBuilder) {
        this.instruction = builder.getInstruction();
        this.op = builder.getOp();
        this.X = builder.getX();
        this.Y = builder.getY();
        this.N = builder.getN();
        this.NN = builder.getNN();
        this.NNN = builder.getNNN();
    }

    public getInstruction() { return this.instruction; }
    public getOp  ()  { return this.op; }
    public getX   ()  { return this.X; }
    public getY   ()  { return this.Y; }
    public getN   ()  { return this.N; }
    public getNN  ()  { return this.NN; }
    public getNNN ()  { return this.NNN; }
    
}

export class DecodeStructBuilder {
    private instruction : number = NaN;
    private op      : number = NaN;
    private X       : number = NaN;
    private Y       : number = NaN;
    private N       : number = NaN;
    private NN      : number = NaN;
    private NNN     : number = NaN;
    
    constructor() {}
    
    public getInstruction () { return this.instruction; }
    public getOp  ()  { return this.op; }
    public getX   ()  { return this.X; }
    public getY   ()  { return this.Y; }
    public getN   ()  { return this.N; }
    public getNN  ()  { return this.NN; }
    public getNNN ()  { return this.NNN; }
    
    public setInstruction (instruction : number) { this.instruction = instruction; }
    public setOp  (op : number)  { this.op = op; }
    public setX   (X : number)   { this.X = X; }
    public setY   (Y: number)    { this.Y = Y; }
    public setN   (N: number)    { this.N = N; }
    public setNN  (NN: number)   { this.NN = NN; }
    public setNNN (NNN: number)  { this.NNN = NNN; }
}