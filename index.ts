import Jimp = require("jimp");

async function create(rightText: string) {

    const mmd = await Jimp.read("./mmd.png");
    const red = Jimp.rgbaToInt(188, 0, 0, 255);
    const black = Jimp.rgbaToInt(0, 0, 0, 255);
    const font = await Jimp.loadFont("./font/impact.fnt");
    const textLeft = new Jimp(600, 40)
        .print(font, 0, 0, "TEST ALLIANCE PLEASE")
        .invert();
    const leftCopy = textLeft.clone()
        .blur(2)
        .scan(0, 0, 600, 40, function(x, y, idx) {
            if (Jimp.intToRGBA(this.getPixelColor(x, y)).a > 0) {
                this.setPixelColor(black, x, y);
            }
        })
        .autocrop();
    textLeft.invert();
    leftCopy.composite(textLeft, 0, 0);

    const textRight = new Jimp(600, 40)
        .print(font, 0, 0, rightText.toUpperCase())
        .invert();
    const rightCopy = textRight.clone()
        .blur(2)
        .scan(0, 0, 600, 40, function(x, y, idx) {
            if (Jimp.intToRGBA(this.getPixelColor(x, y)).a > 0) {
                this.setPixelColor(black, x, y);
            }
        })
        .autocrop();
    textRight.invert()
        .scan(0, 0, 600, 40, function(x, y, idx) {
            const inCol = Jimp.intToRGBA(this.getPixelColor(x, y));
            this.setPixelColor(Jimp.rgbaToInt(inCol.r * (188/255), 0, 0, inCol.a), x, y);
        });
    rightCopy.composite(textRight, 0, 0);


    return new Jimp(600, 100)
        .blit(mmd.scaleToFit(600, 100), 0, 0)
        .composite(leftCopy, 70, 69)
        .composite(rightCopy, 290, 69)
        .write("./out.png");
}
create("make header memes").then(() => void 0, m => console.log(m));
