


export class BitUtils {
    private static JS_NUMBER_BITS = 32;
    //private constructor to prevent instantiation
    private constructor () {}

    /**
     * Given an offset and ArrayBuffer writes a single bit in place.
     * @param offset offset from the start of buffer (index 0)
     * @param buffer 
     * This method has the effect of over-writing byte chunks, e.g:
     * given buffer represented as hex 0XAB and an offset of 8 the
     * buffer will be modified to 0XA1;
     */
    public static setBit(bitstate: BitState ,offset: number , buffer : ArrayBuffer) : void {
        let totalbits = (buffer.byteLength * 8) - 1;
        if (totalbits < offset) { throw new Error("bit offset larger than buffer size"); }
        
        let writableBuffer : Uint8Array = new Uint8Array(buffer);
        /** since we are writing to a Uint8Array because javascript sucks we have to
         * determine the offset relative to 8-bits, and find the index in the writable
         * array to actually modify
        */
        let index : number = Math.floor(offset/8);
        let bitshift : number = (index == 0) ? offset : (offset - (8 * index));
        
        let flag : number = 1 << bitshift;
        switch(bitstate) {
            case BitState.ON:
                writableBuffer[index] = writableBuffer[index] | flag ;
                break;
            case BitState.OFF:
                flag = ~ flag;
                writableBuffer[index] = writableBuffer[index] & flag;
                break;
        }
        
    }

    public static readBit(offset: number , buffer: ArrayBuffer) : BitState {
        let totalbits = (buffer.byteLength * 8) - 1;
        if (totalbits < offset) { 
            throw new Error("bit offset larger than buffer size"); }
        
        let readableBuffer : Uint8Array = new Uint8Array(buffer);
        let index : number = Math.floor(offset/8);
        let bitshift : number = (index == 0) ? offset : (offset - (8 * index ));

        let readNumber : number = readableBuffer[index];
        let bit : number = (readNumber << BitUtils.JS_NUMBER_BITS - 1 - bitshift)
        return (bit < 0) ? BitState.ON : BitState.OFF;
    }
}


export enum BitState {
    OFF,
    ON
}