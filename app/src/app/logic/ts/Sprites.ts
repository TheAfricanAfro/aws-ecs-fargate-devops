// Sprite charachters for hex characters 0-F. Will be loaded into Chip8 managed memory 0x00 - 0x4F (first 80 bytes) 
export class Sprites {
    public static readonly S0 : ArrayBuffer = new ArrayBuffer(5); public static readonly S8 : ArrayBuffer = new ArrayBuffer(5);
    public static readonly S1 : ArrayBuffer = new ArrayBuffer(5); public static readonly S9 : ArrayBuffer = new ArrayBuffer(5);
    public static readonly S2 : ArrayBuffer = new ArrayBuffer(5); public static readonly SA : ArrayBuffer = new ArrayBuffer(5);
    public static readonly S3 : ArrayBuffer = new ArrayBuffer(5); public static readonly SB : ArrayBuffer = new ArrayBuffer(5);
    public static readonly S4 : ArrayBuffer = new ArrayBuffer(5); public static readonly SC : ArrayBuffer = new ArrayBuffer(5);
    public static readonly S5 : ArrayBuffer = new ArrayBuffer(5); public static readonly SD : ArrayBuffer = new ArrayBuffer(5);
    public static readonly S6 : ArrayBuffer = new ArrayBuffer(5); public static readonly SE : ArrayBuffer = new ArrayBuffer(5);
    public static readonly S7 : ArrayBuffer = new ArrayBuffer(5); public static readonly SF : ArrayBuffer = new ArrayBuffer(5);
    
    
    static {
        let initS0 = new Uint8Array(Sprites.S0);
        initS0[0] = 0xF0;
        initS0[1] = 0x90;
        initS0[2] = 0x90;
        initS0[3] = 0x90;
        initS0[4] = 0xF0;

        let initS1 = new Uint8Array(Sprites.S1);
        initS1[0] = 0x20;
        initS1[1] = 0x60;
        initS1[2] = 0x20;
        initS1[3] = 0x20;
        initS1[4] = 0x70;

        let initS2 = new Uint8Array(Sprites.S2);
        initS2[0] = 0xF0;
        initS2[1] = 0x10;
        initS2[2] = 0xF0;
        initS2[3] = 0x80;
        initS2[4] = 0xF0;

        let initS3 = new Uint8Array(Sprites.S3);
        initS3[0] = 0xF0;
        initS3[1] = 0x10;
        initS3[2] = 0xF0;
        initS3[3] = 0x10;
        initS3[4] = 0xF0;

        let initS4 = new Uint8Array(Sprites.S4);
        initS4[0] = 0x90;
        initS4[1] = 0x90;
        initS4[2] = 0xF0;
        initS4[3] = 0x10;
        initS4[4] = 0x10;

        let initS5 = new Uint8Array(Sprites.S5);
        initS5[0] = 0xF0;
        initS5[1] = 0x80;
        initS5[2] = 0xF0;
        initS5[3] = 0x10;
        initS5[4] = 0xF0;

        let initS6 = new Uint8Array(Sprites.S6);
        initS6[0] = 0xF0;
        initS6[1] = 0x80;
        initS6[2] = 0xF0;
        initS6[3] = 0x90;
        initS6[4] = 0xF0;

        let initS7 = new Uint8Array(Sprites.S7);
        initS7[0] = 0xF0;
        initS7[1] = 0x10;
        initS7[2] = 0x20;
        initS7[3] = 0x40;
        initS7[4] = 0x40;

        let initS8 = new Uint8Array(Sprites.S8);
        initS8[0] = 0xF0;
        initS8[1] = 0x90;
        initS8[2] = 0xF0;
        initS8[3] = 0x90;
        initS8[4] = 0xF0;

        let initS9 = new Uint8Array(Sprites.S9);
        initS9[0] = 0xF0;
        initS9[1] = 0x90;
        initS9[2] = 0xF0;
        initS9[3] = 0x10;
        initS9[4] = 0xF0;

        let initSA = new Uint8Array(Sprites.SA);
        initSA[0] = 0xF0;
        initSA[1] = 0x90;
        initSA[2] = 0xF0;
        initSA[3] = 0x90;
        initSA[4] = 0x90;

        let initSB = new Uint8Array(Sprites.SB);
        initSB[0] = 0xE0;
        initSB[1] = 0x90;
        initSB[2] = 0xE0;
        initSB[3] = 0x90;
        initSB[4] = 0xE0;

        let initSC = new Uint8Array(Sprites.SC);
        initSC[0] = 0xF0;
        initSC[1] = 0x80;
        initSC[2] = 0x80;
        initSC[3] = 0x80;
        initSC[4] = 0xF0;

        let initSD = new Uint8Array(Sprites.SD);
        initSD[0] = 0xE0;
        initSD[1] = 0x90;
        initSD[2] = 0x90;
        initSD[3] = 0x90;
        initSD[4] = 0xE0;

        let initSE = new Uint8Array(Sprites.SE);
        initSE[0] = 0xF0;
        initSE[1] = 0x80;
        initSE[2] = 0xF0;
        initSE[3] = 0x80;
        initSE[4] = 0xF0;

        let initSF = new Uint8Array(Sprites.SF);
        initSF[0] = 0xF0;
        initSF[1] = 0x80;
        initSF[2] = 0xF0;
        initSF[3] = 0x80;
        initSF[4] = 0x80;
    }
    
    public static getSprites() : ArrayBuffer[] {
        return [Sprites.S0,Sprites.S1,Sprites.S2,Sprites.S3,Sprites.S4,Sprites.S5,Sprites.S6,Sprites.S7,Sprites.S8,Sprites.S9,Sprites.SA,Sprites.SB,Sprites.SC,Sprites.SD,Sprites.SE,Sprites.SF];
    }
}
//ENUM FOR DIGITS 0-9 AND CHARS A-F, USED IN MAPPING MEMORY ADDRESS OF SPRITES
export enum Sprite {
    D_0, C_A,
    D_1, C_B,
    D_2, C_C,
    D_3, C_D,
    D_4, C_E,
    D_5, C_F,
    D_6,
    D_7,
    D_8,
    D_9,
}