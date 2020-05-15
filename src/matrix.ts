"use strict";

import { Tuple } from "./tuple";

export class Matrix2x2 {
    data: number[];

    constructor() {
        this.data = [1.0, 0.0, 0.0, 1.0];
    }

    get determinant(): number {
        return this.data[0] * this.data[3] - this.data[1] * this.data[2];
    }

    cofactor(i: number, j: number): number {
        return (i + j) % 2 === 0 ? this.determinant : -this.determinant;
    }
}

export class Matrix3x3 {
    data: number[];

    constructor() {
        this.data = [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0];
    }

    get determinant(): number {
        // Rule of Sarrus because the general method is too slow.
        return (
            this.data[0] * this.data[4] * this.data[8] +
            this.data[1] * this.data[5] * this.data[6] +
            this.data[2] * this.data[3] * this.data[7] -
            this.data[6] * this.data[4] * this.data[2] -
            this.data[7] * this.data[5] * this.data[0] -
            this.data[8] * this.data[3] * this.data[1]
        );
    }

    cofactor(i: number, j: number): number {
        const det = this.submatrix(i, j).determinant;

        return (i + j) % 2 === 0 ? det : -det;
    }

    get inverse(): Matrix3x3 | undefined {
        if (this.determinant === 0) {
            return undefined;
        }

        const result = new Matrix3x3();

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                result.data[3 * j + i] = this.cofactor(i, j) / this.determinant;
            }
        }

        return result;
    }

    submatrix(row: number, col: number): Matrix2x2 {
        const result = new Matrix2x2();

        for (let i1 = 0, i2 = 0; i1 < 3; i1++) {
            if (i1 === row) {
                continue;
            }

            for (let j1 = 0, j2 = 0; j1 < 3; j1++) {
                if (j1 === col) {
                    continue;
                }

                result.data[3 * i2 + j2] = this.data[3 * i1 * j1];

                j2++;
            }

            i2++;
        }

        return result;
    }
}

export class Matrix4x4 {
    data: number[];

    constructor() {
        this.data = [
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
        ];
    }

    get determinant(): number {
        // Leibniz formula for determinants. This avoids creating new Matrix objects
        // and recursion.
        return (
            this.data[0] * this.data[5] * this.data[10] * this.data[15] +
            this.data[0] * this.data[9] * this.data[14] * this.data[7] +
            this.data[0] * this.data[13] * this.data[6] * this.data[11] +
            this.data[4] * this.data[1] * this.data[14] * this.data[11] +
            this.data[4] * this.data[9] * this.data[2] * this.data[15] +
            this.data[4] * this.data[13] * this.data[10] * this.data[3] +
            this.data[8] * this.data[1] * this.data[6] * this.data[15] +
            this.data[8] * this.data[5] * this.data[14] * this.data[3] +
            this.data[8] * this.data[13] * this.data[2] * this.data[7] +
            this.data[12] * this.data[1] * this.data[10] * this.data[7] +
            this.data[12] * this.data[5] * this.data[2] * this.data[11] +
            this.data[12] * this.data[9] * this.data[6] * this.data[3] -
            this.data[0] * this.data[5] * this.data[14] * this.data[11] -
            this.data[0] * this.data[9] * this.data[6] * this.data[15] -
            this.data[0] * this.data[13] * this.data[10] * this.data[7] -
            this.data[4] * this.data[1] * this.data[10] * this.data[15] -
            this.data[4] * this.data[9] * this.data[14] * this.data[3] -
            this.data[4] * this.data[13] * this.data[2] * this.data[11] -
            this.data[8] * this.data[1] * this.data[14] * this.data[7] -
            this.data[8] * this.data[5] * this.data[2] * this.data[15] -
            this.data[8] * this.data[13] * this.data[6] * this.data[3] -
            this.data[12] * this.data[1] * this.data[6] * this.data[11] -
            this.data[12] * this.data[5] * this.data[10] * this.data[3] -
            this.data[12] * this.data[9] * this.data[2] * this.data[7]
        );
    }

    get transpose(): Matrix4x4 {
        const result = new Matrix4x4();

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                result.data[4 * j + i] = this.data[4 * i + j];
            }
        }

        return result;
    }

    get inverse(): Matrix4x4 | undefined {
        if (this.determinant === 0) {
            return undefined;
        }

        const result = new Matrix4x4();

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                result.data[4 * j + i] = this.cofactor(i, j) / this.determinant;
            }
        }

        return result;
    }

    at(i: number, j: number): number {
        return this.data[4 * i + j];
    }

    cofactor(i: number, j: number): number {
        const det = this.submatrix(i, j).determinant;

        return (i + j) % 2 === 0 ? det : -det;
    }

    equals(matrix: Matrix4x4): boolean {
        for (let i = 0; i < 16; i++) {
            if (this.data[i] != matrix.data[i]) {
                return false;
            }
        }

        return true;
    }

    multiply(matrix: Matrix4x4): Matrix4x4 {
        const result = new Matrix4x4();
        result.data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                for (let k = 0; k < 4; k++) {
                    result.data[4 * i + j] +=
                        this.data[4 * i + k] * matrix.data[4 * k + j];
                }
            }
        }

        return result;
    }

    multiplyTuple(tuple: Tuple): Tuple {
        const x =
            tuple.x * this.data[0] +
            tuple.y * this.data[1] +
            tuple.z * this.data[2] +
            tuple.w * this.data[3];
        const y =
            tuple.x * this.data[4] +
            tuple.y * this.data[5] +
            tuple.z * this.data[6] +
            tuple.w * this.data[7];
        const z =
            tuple.x * this.data[8] +
            tuple.y * this.data[9] +
            tuple.z * this.data[10] +
            tuple.w * this.data[11];
        const w =
            tuple.x * this.data[12] +
            tuple.y * this.data[13] +
            tuple.z * this.data[14] +
            tuple.w * this.data[15];

        return new Tuple(x, y, z, w);
    }

    submatrix(row: number, col: number): Matrix3x3 {
        const result = new Matrix3x3();

        for (let i1 = 0, i2 = 0; i1 < 4; i1++) {
            if (i1 === row) {
                continue;
            }

            for (let j1 = 0, j2 = 0; j1 < 4; j1++) {
                if (j1 === col) {
                    continue;
                }

                result.data[3 * i2 + j2] = this.data[4 * i1 + j1];

                j2++;
            }

            i2++;
        }

        return result;
    }
}
