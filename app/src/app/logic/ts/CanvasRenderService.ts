import { BitState, BitUtils } from "./BitUtils";


export class CanvasRenderService {
    private canvas;
    private pixel : Pixel;
    
    public constructor(canvas : HTMLCanvasElement) { 
        this.canvas = canvas; 
        this.pixel = new Pixel(canvas.width,canvas.height);
    }

    public updateCanvas(displayBuffer : ArrayBuffer[]) : void {
        let context : CanvasRenderingContext2D | null = this.canvas.getContext("2d");
        context!.fillStyle = window.getComputedStyle(document.documentElement).getPropertyValue("--color-primary-content");
        displayBuffer = displayBuffer;
        for (let row = 0 ; row < displayBuffer.length ; row++ ) {
            let y : number = row * this.pixel.getHeight();
            
            let rowBuffer : ArrayBuffer = displayBuffer[row];
            for (let xindex = 0 ; xindex < 64 ; xindex++) {
                let x : number = xindex * this.pixel.getWidth();
                if (BitUtils.readBit(xindex,rowBuffer) == BitState.ON) { 
                    context!.fillRect(x,y,this.pixel.getWidth(),this.pixel.getHeight()); 
                }
            }
            
        }
    }

    public clearCanvas() : void {
        let context : CanvasRenderingContext2D | null = this.canvas.getContext("2d");
        context!.fillStyle = window.getComputedStyle(document.documentElement).getPropertyValue("--color-primary");
        context!.fillRect(0,0,this.pixel.getWidth()*64,this.pixel.getHeight()*32);
    }

    public updatePixel() : void { this.pixel.resizePixel(this.canvas.width,this.canvas.height); }
}

export class Pixel {
    private static PIXEL_COUNT_WIDTH = 64;
    private static PIXEL_COUNT_HEIGHT = 32;

    private width! : number;
    private height!: number;
    

    public constructor(canvasWidth: number, canvasHeight: number) {
        this.resizePixel(canvasWidth,canvasHeight);
    }

    public resizePixel(canvasWidth: number, canvasHeight: number) {
        this.width = (canvasWidth/Pixel.PIXEL_COUNT_WIDTH) ;
        this.height = (canvasHeight/Pixel.PIXEL_COUNT_HEIGHT) ;
    }

    public getWidth() : number { return this.width; }
    public getHeight() : number { return this.height; }
}
