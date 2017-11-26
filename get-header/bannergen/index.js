"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Jimp = require("jimp");
function create(rightText) {
    return __awaiter(this, void 0, void 0, function () {
        var mmd, font, black, width, textHeight, bannerHeight, blueRadius, textLeft, leftCopy, textRight, rightCopy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Jimp.read("./mmd.png")];
                case 1:
                    mmd = _a.sent();
                    return [4 /*yield*/, Jimp.loadFont("./font/impact.fnt")];
                case 2:
                    font = _a.sent();
                    black = Jimp.rgbaToInt(0, 0, 0, 255);
                    width = 600;
                    textHeight = 60;
                    bannerHeight = 100;
                    blueRadius = 1;
                    textLeft = new Jimp(width, textHeight)
                        .print(font, 10, 10, "TEST ALLIANCE PLEASE")
                        .invert()
                        .scan(0, 0, width, textHeight, function (x, y, idx) {
                        var colIn = Jimp.intToRGBA(this.getPixelColor(x, y));
                        this.setPixelColor(Jimp.rgbaToInt(colIn.r, colIn.g, colIn.b, colIn.a * (1 - (colIn.r + colIn.g + colIn.b) / (255 * 3))), x, y);
                    });
                    leftCopy = textLeft.clone()
                        .blur(blueRadius)
                        .scan(0, 0, width, textHeight, function (x, y, idx) {
                        if (Jimp.intToRGBA(this.getPixelColor(x, y)).a > 0) {
                            this.setPixelColor(black, x, y);
                        }
                    });
                    textLeft.invert();
                    leftCopy.composite(textLeft, blueRadius, 0);
                    textRight = new Jimp(width, textHeight)
                        .print(font, 10, 10, rightText.toUpperCase())
                        .invert()
                        .scan(0, 0, width, textHeight, function (x, y, idx) {
                        var colIn = Jimp.intToRGBA(this.getPixelColor(x, y));
                        this.setPixelColor(Jimp.rgbaToInt(colIn.r, colIn.g, colIn.b, colIn.a * (1 - (colIn.r + colIn.g + colIn.b) / (255 * 3))), x, y);
                    });
                    rightCopy = textRight.clone()
                        .blur(blueRadius)
                        .scan(0, 0, width, textHeight, function (x, y, idx) {
                        if (Jimp.intToRGBA(this.getPixelColor(x, y)).a > 0) {
                            this.setPixelColor(black, x, y);
                        }
                    });
                    textRight.invert()
                        .scan(0, 0, width, textHeight, function (x, y, idx) {
                        var inCol = Jimp.intToRGBA(this.getPixelColor(x, y));
                        this.setPixelColor(Jimp.rgbaToInt(inCol.r * (188 / 255), 0, 0, inCol.a), x, y);
                    });
                    rightCopy.composite(textRight, blueRadius, 0);
                    return [2 /*return*/, new Jimp(width, bannerHeight)
                            .blit(mmd.scaleToFit(width, bannerHeight), 0, 0)
                            .composite(leftCopy, 60, textHeight)
                            .composite(rightCopy, 280, textHeight)];
            }
        });
    });
}
exports.create = create;
function write(rightText, filePath) {
    if (filePath === void 0) { filePath = "./out.png"; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, create(rightText)];
                case 1: return [2 /*return*/, (_a.sent()).write(filePath)];
            }
        });
    });
}
exports.write = write;
// write("make header memes").then(() => void 0, m => console.log(m));
function getPNG(rightText) {
    return __awaiter(this, void 0, void 0, function () {
        var resolve, reject, resultPromise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    resultPromise = new Promise(function (res, rej) {
                        resolve = res;
                        reject = rej;
                    });
                    return [4 /*yield*/, create(rightText)];
                case 1:
                    (_a.sent())
                        .getBuffer("image/png", function (err, buf) {
                        if (err) {
                            return reject(err);
                        }
                        else {
                            return resolve(buf);
                        }
                    });
                    return [4 /*yield*/, resultPromise];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getPNG = getPNG;
