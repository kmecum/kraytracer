"use strict";

import { Matrix4x4 } from "../src/matrix";
import { Point, Tuple } from "../src/tuple";

import { assert, expect } from "chai";

describe("Sphere", function () {
    describe("equals()", function () {
        it("should be true for equal matrices", function () {
            const a = new Matrix4x4();
            a.data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2];

            const b = new Matrix4x4();
            b.data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2];

            assert.isTrue(a.equals(b));
        });

        it("should be false for non-equal matrices", function () {
            const a = new Matrix4x4();
            a.data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2];

            const b = new Matrix4x4();
            b.data = [2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1];

            assert.isFalse(a.equals(b));
        });
    });

    describe("multiply()", function () {
        it("should be correct for two matrices", function () {
            const a = new Matrix4x4();
            a.data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2];

            const b = new Matrix4x4();
            b.data = [-2, 1, 2, 3, 3, 2, 1, -1, 4, 3, 6, 5, 1, 2, 7, 8];

            const expected = new Matrix4x4();
            expected.data = [
                20,
                22,
                50,
                48,
                44,
                54,
                114,
                108,
                40,
                58,
                110,
                102,
                16,
                26,
                46,
                42,
            ];

            assert.isTrue(a.multiply(b).equals(expected));
        });

        it("should respect identity", function () {
            const a = new Matrix4x4();
            a.data = [1, 2, 3, 4, 2, 4, 4, 2, 8, 6, 4, 1, 0, 0, 0, 1];

            const identity = new Matrix4x4();

            assert.isTrue(a.multiply(identity).equals(a));
        });
    });

    describe("multiplyTuple()", function () {
        it("should be correct", function () {
            const a = new Matrix4x4();
            a.data = [1, 2, 3, 4, 2, 4, 4, 2, 8, 6, 4, 1, 0, 0, 0, 1];

            const b = new Point(1, 2, 3);

            const expected = new Tuple(18, 24, 33, 1);
            const result = a.multiplyTuple(b);

            assert.equal(expected.x, result.x);
            assert.equal(expected.y, result.y);
            assert.equal(expected.z, result.z);
            assert.equal(expected.w, result.w);
        });
    });

    describe("inverse()", function () {
        it("should invert a matrix", function () {
            const a = new Matrix4x4();
            a.data = [-5, 2, 6, -8, 1, -5, 1, 8, 7, 7, -6, -7, 1, -3, 7, 4];

            const b = a.inverse;

            if (b === undefined) {
                assert.fail();
                return;
            }

            expect(b.at(3, 2)).to.be.closeTo(-160.0 / 532.0, 0.0001);
            expect(b.at(2, 3)).to.be.closeTo(105.0 / 532.0, 0.0001);
        });
    });

    describe("transpose()", function () {
        it("should transpose a matrix", function () {
            const a = new Matrix4x4();
            a.data = [0, 9, 3, 0, 9, 8, 0, 8, 1, 8, 5, 3, 0, 0, 5, 8];

            const a_transpose = new Matrix4x4();
            a_transpose.data = [0, 9, 1, 0, 9, 8, 8, 0, 3, 0, 5, 5, 0, 8, 3, 8];

            assert.isTrue(a_transpose.equals(a.transpose));
        });
    });
});
