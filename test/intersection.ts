"use strict";

import { Intersection, hit } from "../src/intersection";
import { Point, Vector } from "../src/tuple";
import { Ray } from "../src/ray";
import { Sphere } from "../src/sphere";
import { assert, expect } from "chai";

describe("Intersection", function () {
    describe("hit()", function () {
        it("should hit with all positive t", function () {
            const s = new Sphere();
            const i1 = new Intersection(1, s);
            const i2 = new Intersection(2, s);

            const xs = [i1, i2];

            const h = hit(xs);

            if (h === undefined) {
                assert.fail();
            }

            assert.equal(h.t, i1.t);
            assert.equal(h.object, i1.object);
        });

        it("should hit with some negative t", function () {
            const s = new Sphere();
            const i1 = new Intersection(-1, s);
            const i2 = new Intersection(1, s);

            const xs = [i1, i2];

            const h = hit(xs);

            if (h === undefined) {
                assert.fail();
            }

            assert.equal(h.t, i2.t);
            assert.equal(h.object, i2.object);
        });

        it("should not hit all negative t", function () {
            const s = new Sphere();
            const i1 = new Intersection(-2, s);
            const i2 = new Intersection(-1, s);

            const xs = [i1, i2];

            const h = hit(xs);

            expect(h).to.be.undefined;
        });

        it("should return lowest non-negative hit", function () {
            const s = new Sphere();
            const i1 = new Intersection(5, s);
            const i2 = new Intersection(7, s);
            const i3 = new Intersection(-3, s);
            const i4 = new Intersection(2, s);

            const xs = [i1, i2, i3, i4];

            const h = hit(xs);

            if (h === undefined) {
                assert.fail();
            }

            assert.equal(h.t, i4.t);
            assert.equal(h.object, i4.object);
        });
    });

    describe("precompute()", function () {
        it("should precompute the state of an intersection", function () {
            const r = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1));
            const s = new Sphere();
            const i = new Intersection(4, s);

            const comps = i.precompute(r);

            assert.equal(comps.object, s);
            expect(comps.point.x).to.be.closeTo(0, 0.0001);
            expect(comps.point.y).to.be.closeTo(0, 0.0001);
            expect(comps.point.z).to.be.closeTo(-1, 0.0001);

            expect(comps.eyev.x).to.be.closeTo(0, 0.0001);
            expect(comps.eyev.y).to.be.closeTo(0, 0.0001);
            expect(comps.eyev.z).to.be.closeTo(-1, 0.0001);

            if (comps.normalv === undefined) {
                assert.fail();
                return;
            }

            expect(comps.normalv.x).to.be.closeTo(0, 0.0001);
            expect(comps.normalv.y).to.be.closeTo(0, 0.0001);
            expect(comps.normalv.z).to.be.closeTo(-1, 0.0001);
        });

        it("should correctly determine outside", function () {
            const r = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1));
            const s = new Sphere();
            const i = new Intersection(4, s);

            const comps = i.precompute(r);

            assert.isFalse(comps.inside);
        });

        it("should correctly determine inside", function () {
            const r = new Ray(new Point(0, 0, 0), new Vector(0, 0, 1));
            const s = new Sphere();
            const i = new Intersection(4, s);

            const comps = i.precompute(r);

            assert.isTrue(comps.inside);

            if (comps.normalv === undefined) {
                assert.fail();
            }

            expect(comps.normalv.x).to.be.closeTo(0, 0.0001);
            expect(comps.normalv.y).to.be.closeTo(0, 0.0001);
            expect(comps.normalv.z).to.be.closeTo(-1.0, 0.0001);
        });
    });
});
