"use strict";

export class Tuple {
    x: number;
    y: number;
    z: number;
    w: number;

    constructor(x: number, y: number, z: number, w: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    get magnitude(): number {
        return Math.sqrt(
            this.x * this.x +
                this.y * this.y +
                this.z * this.z +
                this.w * this.w
        );
    }

    equals(tuple: Tuple): boolean {
        return (
            this.x === tuple.x &&
            this.y == tuple.y &&
            this.z == tuple.z &&
            this.w == tuple.w
        );
    }

    add(tuple: Tuple): Tuple {
        return new Tuple(
            this.x + tuple.x,
            this.y + tuple.y,
            this.z + tuple.z,
            this.w + tuple.w
        );
    }

    subtract(tuple: Tuple): Tuple {
        return new Tuple(
            this.x - tuple.x,
            this.y - tuple.y,
            this.z - tuple.z,
            this.w - tuple.w
        );
    }

    multiply(scalar: number): Tuple {
        return new Tuple(
            this.x * scalar,
            this.y * scalar,
            this.z * scalar,
            this.w * scalar
        );
    }

    divide(scalar: number): Tuple {
        return new Tuple(
            this.x / scalar,
            this.y / scalar,
            this.z / scalar,
            this.w / scalar
        );
    }

    normalize(): Tuple {
        return new Tuple(
            this.x / this.magnitude,
            this.y / this.magnitude,
            this.z / this.magnitude,
            this.w / this.magnitude
        );
    }

    dot(tuple: Tuple): number {
        return (
            this.x * tuple.x +
            this.y * tuple.y +
            this.z * tuple.z +
            this.w * tuple.w
        );
    }

    cross(tuple: Tuple): Tuple {
        return new Tuple(
            this.y * tuple.z - this.z * tuple.y,
            this.z * tuple.x - this.x * tuple.z,
            this.x * tuple.y - this.y * tuple.x,
            0.0
        );
    }

    reflect(normal: Tuple): Tuple {
        return this.subtract(normal.multiply(2 * this.dot(normal)));
    }
}

export class Point extends Tuple {
    constructor(x: number, y: number, z: number) {
        super(x, y, z, 1.0);
    }
}

export class Vector extends Tuple {
    constructor(x: number, y: number, z: number) {
        super(x, y, z, 0.0);
    }
}

export class Color extends Tuple {
    constructor(r: number, g: number, b: number) {
        super(r, g, b, 0.0);
    }

    get r(): number {
        return this.x;
    }

    get g(): number {
        return this.y;
    }

    get b(): number {
        return this.z;
    }

    add(tuple: Tuple): Color {
        return new Color(this.x + tuple.x, this.y + tuple.y, this.z + tuple.z);
    }

    blend(tuple: Tuple): Color {
        return new Color(this.x * tuple.x, this.y * tuple.y, this.z * tuple.z);
    }

    multiply(scalar: number): Color {
        return new Color(this.x * scalar, this.y * scalar, this.z * scalar);
    }
}
