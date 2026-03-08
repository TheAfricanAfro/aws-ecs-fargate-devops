import {Chip8} from '../logic/ts/Chip8';
import {Sprites} from '../logic/ts/Sprites'
import {BitState} from '../logic/ts/BitUtils'


class Chip8Test extends Chip8 {
    public constructor () { super(); }
    public override getManagedMemory(): ArrayBuffer {
        return super.getManagedMemory();
    }
    
}

describe("CHIP-8 INITILIZATION TESTS", () => {
    let c8 : Chip8Test =  new Chip8Test();
    
    test("Test initialized memory 0x00 - 0x04 for sprite '0'", () => {
        let memory = c8.getManagedMemory();
        let memoryBytes = new Uint8Array(memory);
        let spriteBytes = new Uint8Array(Sprites.S0);
        
        expect(spriteBytes[0]).toBe(memoryBytes[0x00]);
        expect(spriteBytes[1]).toBe(memoryBytes[0x01]);
        expect(spriteBytes[2]).toBe(memoryBytes[0x02]);
        expect(spriteBytes[3]).toBe(memoryBytes[0x03]);
        expect(spriteBytes[4]).toBe(memoryBytes[0x04]);
    });

    test("Test initialized memory 0x05 - 0x09 for sprite '1'", () => {
        let memory = c8.getManagedMemory();
        let memoryBytes = new Uint8Array(memory);
        let spriteBytes = new Uint8Array(Sprites.S1);
        
        expect(spriteBytes[0]).toBe(memoryBytes[0x05]);
        expect(spriteBytes[1]).toBe(memoryBytes[0x06]);
        expect(spriteBytes[2]).toBe(memoryBytes[0x07]);
        expect(spriteBytes[3]).toBe(memoryBytes[0x08]);
        expect(spriteBytes[4]).toBe(memoryBytes[0x09]);
    });

    test("Test initialized memory 0x0A - 0x0E for sprite '2'", () => {
        let memory = c8.getManagedMemory();
        let memoryBytes = new Uint8Array(memory);
        let spriteBytes = new Uint8Array(Sprites.S2);
        
        expect(spriteBytes[0]).toBe(memoryBytes[0x0A]);
        expect(spriteBytes[1]).toBe(memoryBytes[0x0B]);
        expect(spriteBytes[2]).toBe(memoryBytes[0x0C]);
        expect(spriteBytes[3]).toBe(memoryBytes[0x0D]);
        expect(spriteBytes[4]).toBe(memoryBytes[0x0E]);
    });

    test("Test initialized memory 0x0F - 0x13 for sprite '3'", () => {
        let memory = c8.getManagedMemory();
        let memoryBytes = new Uint8Array(memory);
        let spriteBytes = new Uint8Array(Sprites.S3);
        
        expect(spriteBytes[0]).toBe(memoryBytes[0x0F]);
        expect(spriteBytes[1]).toBe(memoryBytes[0x10]);
        expect(spriteBytes[2]).toBe(memoryBytes[0x11]);
        expect(spriteBytes[3]).toBe(memoryBytes[0x12]);
        expect(spriteBytes[4]).toBe(memoryBytes[0x13]);
    });

    test("Test initialized memory 0x14 - 0x18 for sprite '4'", () => {
        let memory = c8.getManagedMemory();
        let memoryBytes = new Uint8Array(memory);
        let spriteBytes = new Uint8Array(Sprites.S4);
        
        expect(spriteBytes[0]).toBe(memoryBytes[0x14]);
        expect(spriteBytes[1]).toBe(memoryBytes[0x15]);
        expect(spriteBytes[2]).toBe(memoryBytes[0x16]);
        expect(spriteBytes[3]).toBe(memoryBytes[0x17]);
        expect(spriteBytes[4]).toBe(memoryBytes[0x18]);
    });

    test("Test initialized memory 0x19 - 0x1D for sprite '5'", () => {
        let memory = c8.getManagedMemory();
        let memoryBytes = new Uint8Array(memory);
        let spriteBytes = new Uint8Array(Sprites.S5);
        
        expect(spriteBytes[0]).toBe(memoryBytes[0x19]);
        expect(spriteBytes[1]).toBe(memoryBytes[0x1A]);
        expect(spriteBytes[2]).toBe(memoryBytes[0x1B]);
        expect(spriteBytes[3]).toBe(memoryBytes[0x1C]);
        expect(spriteBytes[4]).toBe(memoryBytes[0x1D]);
    });

    test("Test initialized memory 0x1E - 0x22 for sprite '6'", () => {
        let memory = c8.getManagedMemory();
        let memoryBytes = new Uint8Array(memory);
        let spriteBytes = new Uint8Array(Sprites.S6);
        
        expect(spriteBytes[0]).toBe(memoryBytes[0x1E]);
        expect(spriteBytes[1]).toBe(memoryBytes[0x1F]);
        expect(spriteBytes[2]).toBe(memoryBytes[0x20]);
        expect(spriteBytes[3]).toBe(memoryBytes[0x21]);
        expect(spriteBytes[4]).toBe(memoryBytes[0x22]);
    });

    test("Test initialized memory 0x23 - 0x26 for sprite '7'", () => {
        let memory = c8.getManagedMemory();
        let memoryBytes = new Uint8Array(memory);
        let spriteBytes = new Uint8Array(Sprites.S7);
        
        expect(spriteBytes[0]).toBe(memoryBytes[0x23]);
        expect(spriteBytes[1]).toBe(memoryBytes[0x24]);
        expect(spriteBytes[2]).toBe(memoryBytes[0x25]);
        expect(spriteBytes[3]).toBe(memoryBytes[0x26]);
        expect(spriteBytes[4]).toBe(memoryBytes[0x27]);
    });

    test("Test initialized memory 0x28 - 0x2C for sprite '8'", () => {
        let memory = c8.getManagedMemory();
        let memoryBytes = new Uint8Array(memory);
        let spriteBytes = new Uint8Array(Sprites.S8);
        
        expect(spriteBytes[0]).toBe(memoryBytes[0x28]);
        expect(spriteBytes[1]).toBe(memoryBytes[0x29]);
        expect(spriteBytes[2]).toBe(memoryBytes[0x2A]);
        expect(spriteBytes[3]).toBe(memoryBytes[0x2B]);
        expect(spriteBytes[4]).toBe(memoryBytes[0x2C]);
    });

    test("Test initialized memory 0x2D - 0x31 for sprite '9'", () => {
        let memory = c8.getManagedMemory();
        let memoryBytes = new Uint8Array(memory);
        let spriteBytes = new Uint8Array(Sprites.S9);
        
        expect(spriteBytes[0]).toBe(memoryBytes[0x2D]);
        expect(spriteBytes[1]).toBe(memoryBytes[0x2E]);
        expect(spriteBytes[2]).toBe(memoryBytes[0x2F]);
        expect(spriteBytes[3]).toBe(memoryBytes[0x30]);
        expect(spriteBytes[4]).toBe(memoryBytes[0x31]);
    });

    test("Test initialized memory 0x32 - 0x36 for sprite 'A'", () => {
        let memory = c8.getManagedMemory();
        let memoryBytes = new Uint8Array(memory);
        let spriteBytes = new Uint8Array(Sprites.SA);
        
        expect(spriteBytes[0]).toBe(memoryBytes[0x32]);
        expect(spriteBytes[1]).toBe(memoryBytes[0x33]);
        expect(spriteBytes[2]).toBe(memoryBytes[0x34]);
        expect(spriteBytes[3]).toBe(memoryBytes[0x35]);
        expect(spriteBytes[4]).toBe(memoryBytes[0x36]);
    });

    test("Test initialized memory 0x37 - 0x3B for sprite 'B'", () => {
        let memory = c8.getManagedMemory();
        let memoryBytes = new Uint8Array(memory);
        let spriteBytes = new Uint8Array(Sprites.SB);
        
        expect(spriteBytes[0]).toBe(memoryBytes[0x37]);
        expect(spriteBytes[1]).toBe(memoryBytes[0x38]);
        expect(spriteBytes[2]).toBe(memoryBytes[0x39]);
        expect(spriteBytes[3]).toBe(memoryBytes[0x3A]);
        expect(spriteBytes[4]).toBe(memoryBytes[0x3B]);
    });

    test("Test initialized memory 0x3C - 0x40 for sprite 'C'", () => {
        let memory = c8.getManagedMemory();
        let memoryBytes = new Uint8Array(memory);
        let spriteBytes = new Uint8Array(Sprites.SC);
        
        expect(spriteBytes[0]).toBe(memoryBytes[0x3C]);
        expect(spriteBytes[1]).toBe(memoryBytes[0x3D]);
        expect(spriteBytes[2]).toBe(memoryBytes[0x3E]);
        expect(spriteBytes[3]).toBe(memoryBytes[0x3F]);
        expect(spriteBytes[4]).toBe(memoryBytes[0x40]);
    });

    test("Test initialized memory 0x41 - 0x45 for sprite 'D'", () => {
        let memory = c8.getManagedMemory();
        let memoryBytes = new Uint8Array(memory);
        let spriteBytes = new Uint8Array(Sprites.SD);
        
        expect(spriteBytes[0]).toBe(memoryBytes[0x41]);
        expect(spriteBytes[1]).toBe(memoryBytes[0x42]);
        expect(spriteBytes[2]).toBe(memoryBytes[0x43]);
        expect(spriteBytes[3]).toBe(memoryBytes[0x44]);
        expect(spriteBytes[4]).toBe(memoryBytes[0x45]);
    });

    test("Test initialized memory 0x46 - 0x4A for sprite 'E'", () => {
        let memory = c8.getManagedMemory();
        let memoryBytes = new Uint8Array(memory);
        let spriteBytes = new Uint8Array(Sprites.SE);
        
        expect(spriteBytes[0]).toBe(memoryBytes[0x46]);
        expect(spriteBytes[1]).toBe(memoryBytes[0x47]);
        expect(spriteBytes[2]).toBe(memoryBytes[0x48]);
        expect(spriteBytes[3]).toBe(memoryBytes[0x49]);
        expect(spriteBytes[4]).toBe(memoryBytes[0x4A]);
    });    

    test("Test initialized memory 0x4B - 0x4F for sprite 'F'", () => {
        let memory = c8.getManagedMemory();
        let memoryBytes = new Uint8Array(memory);
        let spriteBytes = new Uint8Array(Sprites.SF);
        
        expect(spriteBytes[0]).toBe(memoryBytes[0x4B]);
        expect(spriteBytes[1]).toBe(memoryBytes[0x4C]);
        expect(spriteBytes[2]).toBe(memoryBytes[0x4D]);
        expect(spriteBytes[3]).toBe(memoryBytes[0x4E]);
        expect(spriteBytes[4]).toBe(memoryBytes[0x4F]);
    });    
});

describe("CHIP-8 DISPLAY BUFFER MANIPULATION TESTS", () => {
    let c8 : Chip8Test =  new Chip8Test();

    test("Activating pixel empty Array Buffer", ()=>{
        c8.setPixel(0,0,BitState.ON); // sets row 31 of display buffer to : 0x 01 00 00 00 00 00 00 00 (turning bottom left pixel on)
        expect(c8.getPixel(0,0)).toBe(BitState.ON);
        expect(c8.getPixel(0,1)).toBe(BitState.OFF)
    });
    test("Activating pixel written Array Buffer", ()=>{
        //This test depends on side effect of previous test
        c8.setPixel(1,0,BitState.ON); // sets row 31 of display buffer to : 0x 11 00 00 00 00 00 00 00 (turning bottom left pixel on)
        expect(c8.getPixel(0,0)).toBe(BitState.ON);
        expect(c8.getPixel(1,0)).toBe(BitState.ON);
    });
    
     //This test depends on side effect of previous test
     test("Activating pixel written Array Buffer", ()=>{
        expect(c8.getPixel(15,0)).toBe(BitState.OFF);
        c8.setPixel(15,0,BitState.ON); // sets row 31 of display buffer to : 0x 11 00 00 00 00 00 00 00 (turning bottom left pixel on)
        expect(c8.getPixel(15,0)).toBe(BitState.ON);
    });

     //This test depends on side effect of previous test
     test("Deactivating pixel written Array Buffer", ()=>{
         expect(c8.getPixel(15,0)).toBe(BitState.ON);
        c8.setPixel(15,0,BitState.OFF); // sets row 31 of display buffer to : 0x 02 80 00 00 00 00 00 00 (turning bottom left pixel on)
        expect(c8.getPixel(15,0)).toBe(BitState.OFF);
    });

    //This test depends on side effect of previous test
    test("Deactivating pixel written Array Buffer", ()=>{
        expect(c8.getPixel(0,0)).toBe(BitState.ON);
        c8.setPixel(0,0,BitState.OFF); // sets row 31 of display buffer to : 0x 02 80 00 00 00 00 00 00 (turning bottom left pixel on)
        expect(c8.getPixel(0,0)).toBe(BitState.OFF);
    });
    
});

describe("CHIP-8 EXECUTION TESTS", () => {
    let c8 : Chip8Test =  new Chip8Test();
    console.log(c8);
     test("Activating pixel empty Array Buffer", () => {
        c8.load("./src/app/resources/ibm_logo.ch8");
        let i = 0;
        while(i++ < 5) {c8.step();}
    });
});