"use strict";

import { Color, Point } from "./tuple";

export class PointLight {
    position: Point;
    intensity: Color;

    constructor(position: Point, intensity: Color) {
        this.position = position;
        this.intensity = intensity;
    }
}
