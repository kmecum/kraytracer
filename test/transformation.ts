"use strict";

import { translation } from "../src/transformation";
import { Point, Vector } from "../src/tuple";
import { assert, expect } from "chai";

describe("Transformation", function () {
    describe("translation()", function () {
        it("should translate a point", function () {
            const transform = translation(5, -3, 2);
            const p = new Point(-3, 4, 5);

            const result = transform.multiplyTuple(p);

            expect(result.x).to.be.closeTo(2, 0.0001);
            expect(result.y).to.be.closeTo(1, 0.0001);
            expect(result.z).to.be.closeTo(7, 0.0001);
        });

        it("should translate a point (inverse)", function () {
            const transform = translation(5, -3, 2).inverse;

            if (transform === undefined) {
                assert.fail();
            }

            const p = new Point(-3, 4, 5);

            const result = transform.multiplyTuple(p);

            expect(result.x).to.be.closeTo(-8, 0.0001);
            expect(result.y).to.be.closeTo(7, 0.0001);
            expect(result.z).to.be.closeTo(3, 0.0001);
        });

        it("should not translate a vector", function () {
            const transform = translation(5, -3, 2);
            const v = new Vector(-3, 4, 5);

            const result = transform.multiplyTuple(v);

            expect(result.x).to.be.closeTo(-3, 0.0001);
            expect(result.y).to.be.closeTo(4, 0.0001);
            expect(result.z).to.be.closeTo(5, 0.0001);
        });
    });
});
