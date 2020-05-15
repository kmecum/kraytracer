"use strict";

import { Matrix4x4 } from "./matrix";
import { Point, Vector } from "./tuple";

export class Ray {
    origin: Point;
    direction: Vector;

    constructor(origin: Point, direction: Vector) {
        this.origin = origin;
        this.direction = direction;
    }

    position(t: number): Point {
        const offset = this.direction.multiply(t);
        return this.origin.add(offset);
    }

    transform(matrix: Matrix4x4): Ray {
        return new Ray(
            matrix.multiplyTuple(this.origin),
            matrix.multiplyTuple(this.direction)
        );
    }
}
