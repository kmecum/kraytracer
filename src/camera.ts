"use strict";

import { Canvas } from "./canvas";
import { Matrix4x4 } from "./matrix";
import { Point, Color } from "./tuple";
import { Ray } from "./ray";
import { World } from "./world";

export class Camera {
    private _hSize: number;
    private _vSize: number;
    private _transform: Matrix4x4;
    private _halfWidth: number;
    private _halfHeight: number;
    private _pixelSize: number;

    constructor(hSize: number, vSize: number, fieldOfView: number) {
        this._hSize = hSize;
        this._vSize = vSize;
        this._transform = new Matrix4x4();

        const halfView = Math.tan(fieldOfView / 2);
        const aspect = hSize / vSize;

        if (aspect >= 1) {
            this._halfWidth = halfView;
            this._halfHeight = halfView / aspect;
        } else {
            this._halfWidth = halfView * aspect;
            this._halfHeight = halfView;
        }

        this._pixelSize = (this._halfWidth * 2) / hSize;
    }

    set transform(transform: Matrix4x4) {
        this._transform = transform;
    }

    rayForPixel(px: number, py: number): Ray | undefined {
        const xOffset = (px + 0.5) * this._pixelSize;
        const yOffset = (py + 0.5) * this._pixelSize;

        const worldX = this._halfWidth - xOffset;
        const worldY = this._halfHeight - yOffset;

        if (this._transform.inverse === undefined) {
            return undefined;
        }

        const pixel = this._transform.inverse.multiplyTuple(
            new Point(worldX, worldY, -1)
        );
        const origin = this._transform.inverse.multiplyTuple(
            new Point(0, 0, 0)
        );
        const direction = pixel.subtract(origin).normalize();

        return new Ray(origin, direction);
    }

    render(world: World): Canvas {
        const image = new Canvas(this._hSize, this._vSize);
        for (let y = 0; y < this._vSize; y++) {
            for (let x = 0; x < this._hSize; x++) {
                const r = this.rayForPixel(x, y);
                if (r === undefined) {
                    image.data[image.width * y + x] = new Color(0, 0, 0);
                } else {
                    image.data[image.width * y + x] = world.colorAt(r);
                }
            }
        }

        return image;
    }
}
