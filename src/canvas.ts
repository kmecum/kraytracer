"use strict";

import { Color } from "./tuple";

export class Canvas {
    public data: Color[];

    private _width: number;
    private _height: number;

    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;
        this.data = Array(width * height);
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }
}
