import Jimp = require("jimp");

export async function create(rightText: string) {

    const mmd = await Jimp.read("./mmd.png");
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


    return new Jimp(width, bannerHeight)
        .blit(mmd.scaleToFit(width, bannerHeight), 0, 0)
        .composite(leftCopy, 60, textHeight)
        .composite(rightCopy, 280, textHeight);
}

export async function write(rightText: string, filePath = "./out.png") {
    return (await create(rightText)).write(filePath);
} 

// write("make header memes").then(() => void 0, m => console.log(m));
export async function getPNG(rightText: string) {
    let resolve: Function;
    let reject: Function;
    const resultPromise = new Promise<Buffer>((res, rej) => {
        resolve = res;
        reject = rej;
    });
    (await create(rightText))
        .getBuffer("image/png", (err, buf) => {
            if (err) {
                return reject(err);
            }
            else {
                return resolve(buf);
            }
        });
    return await resultPromise;
}
