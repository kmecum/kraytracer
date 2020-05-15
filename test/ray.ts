"use strict";

import { Ray } from "../src/ray";
import { Point, Vector } from "../src/tuple";
import { translation, scaling } from "../src/transformation";
import { assert } from "chai";

describe("Ray", function () {
    describe("transform()", function () {
        it("should translate a ray", function () {
            const r = new Ray(new Point(1, 2, 3), new Vector(0, 1, 0));
            const m = translation(3, 4, 5);

            const r2 = r.transform(m);

            assert.equal(r2.origin.x, 4);
            assert.equal(r2.origin.y, 6);
            assert.equal(r2.origin.z, 8);
            assert.equal(r2.direction.x, 0);
            assert.equal(r2.direction.y, 1);
            assert.equal(r2.direction.z, 0);
        });

        it("should scale a ray", function () {
            const r = new Ray(new Point(1, 2, 3), new Vector(0, 1, 0));
            const m = scaling(2, 3, 4);

            const r2 = r.transform(m);

            assert.equal(r2.origin.x, 2);
            assert.equal(r2.origin.y, 6);
            assert.equal(r2.origin.z, 12);
            assert.equal(r2.direction.x, 0);
            assert.equal(r2.direction.y, 3);
            assert.equal(r2.direction.z, 0);
        });
    });
});
