/// <reference types="jimp" />

async function create(rightText: string) {
    const mmd = await Jimp.read(require("fs").readFileSync("./mmd.png"));
    const font = await Jimp.loadFont("./font/impact.fnt");
    const black = Jimp.rgbaToInt(0, 0, 0, 255);
    const width = 600;
    const textHeight = 60;
    const bannerHeight = 100;
    const blueRadius = 1;
    const textLeft = new Jimp(width, textHeight)
        .print(font, 10, 10, "TEST ALLIANCE PLEASE")
        .invert()
        .scan(0, 0, width, textHeight, function(x, y, idx) {
            const colIn = Jimp.intToRGBA(this.getPixelColor(x, y));
            this.setPixelColor(Jimp.rgbaToInt(colIn.r, colIn.g, colIn.b, colIn.a * (1-(colIn.r + colIn.g + colIn.b)/(255 * 3))), x, y);
        });
    const leftCopy = textLeft.clone()
        .blur(blueRadius)
        .scan(0, 0, width, textHeight, function(x, y, idx) {
            if (Jimp.intToRGBA(this.getPixelColor(x, y)).a > 0) {
                this.setPixelColor(black, x, y);
            }
        });
    textLeft.invert();
    leftCopy.composite(textLeft, blueRadius, 0);

    const textRight = new Jimp(width, textHeight)
        .print(font, 10, 10, rightText.toUpperCase())
        .invert()
        .scan(0, 0, width, textHeight, function(x, y, idx) {
            const colIn = Jimp.intToRGBA(this.getPixelColor(x, y));
            this.setPixelColor(Jimp.rgbaToInt(colIn.r, colIn.g, colIn.b, colIn.a * (1-(colIn.r + colIn.g + colIn.b)/(255 * 3))), x, y);
        });
    const rightCopy = textRight.clone()
        .blur(blueRadius)
        .scan(0, 0, width, textHeight, function(x, y, idx) {
            if (Jimp.intToRGBA(this.getPixelColor(x, y)).a > 0) {
                this.setPixelColor(black, x, y);
            }
        });
    textRight.invert()
        .scan(0, 0, width, textHeight, function(x, y, idx) {
            const inCol = Jimp.intToRGBA(this.getPixelColor(x, y));
            this.setPixelColor(Jimp.rgbaToInt(inCol.r * (188/255), 0, 0, inCol.a), x, y);
        });
    rightCopy.composite(textRight, blueRadius, 0);


    const img = new Jimp(width, bannerHeight)
        .blit(mmd.scaleToFit(width, bannerHeight), 0, 0)
        .composite(leftCopy, 60, textHeight)
        .composite(rightCopy, 280, textHeight);
    
    return await (new Promise<Buffer>((resolve, reject) => img.getBuffer(Jimp.MIME_PNG, (err, buf) => err ? reject(err) : resolve(buf))));
}

const q: {
    <K extends keyof ElementTagNameMap>(selectors: K): ElementTagNameMap[K] | null;
    <E extends Element = Element>(selectors: string): E | null;
} = x => document.querySelector(x);

window.addEventListener("load", () => {
    q("#gen").addEventListener("mousedown", e => {
        const image = create((q("#redtext") as HTMLInputElement).value).then(buf => {
            (q("#result") as HTMLImageElement).src = `data:image/png;base64,${buf.toString("base64")}`;
        });
    });
});
