"use strict";

import { Sphere } from "../src/sphere";
import { Point, Vector } from "../src/tuple";
import { Ray } from "../src/ray";
import { rotation, scaling, translation } from "../src/transformation";

import { assert, expect } from "chai";

describe("Sphere", function () {
    describe("intersect()", function () {
        it("should intersect at tangent", function () {
            const r = new Ray(new Point(0, 1, -5), new Vector(0, 0, 1));
            const s = new Sphere();

            const xs = s.intersect(r);

            if (xs === undefined) {
                assert.fail();
            }

            assert.equal(xs.length, 2);
            expect(xs[0].t).to.be.closeTo(5.0, 0.0001);
            expect(xs[1].t).to.be.closeTo(5.0, 0.0001);
        });

        it("should miss a sphere", function () {
            const r = new Ray(new Point(0, 2, -5), new Vector(0, 0, 1));
            const s = new Sphere();

            const xs = s.intersect(r);

            expect(xs).to.be.undefined;
        });

        it("should hit inside a sphere", function () {
            const r = new Ray(new Point(0, 0, 0), new Vector(0, 0, 1));
            const s = new Sphere();

            const xs = s.intersect(r);

            if (xs === undefined) {
                assert.fail();
            }

            assert.equal(xs.length, 2);
            expect(xs[0].t).to.be.closeTo(-1.0, 0.0001);
            expect(xs[1].t).to.be.closeTo(1.0, 0.0001);
        });

        it("should hit behind sphere", function () {
            const r = new Ray(new Point(0, 0, 5), new Vector(0, 0, 1));
            const s = new Sphere();

            const xs = s.intersect(r);

            if (xs === undefined) {
                assert.fail();
            }

            assert.equal(xs.length, 2);
            expect(xs[0].t).to.be.closeTo(-6.0, 0.0001);
            expect(xs[1].t).to.be.closeTo(-4.0, 0.0001);
        });

        it("should hit a scaled sphere", function () {
            const r = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1));
            const s = new Sphere();
            s.transform = scaling(2, 2, 2);

            const xs = s.intersect(r);

            if (xs === undefined) {
                assert.fail();
            }

            assert.equal(xs.length, 2);
            expect(xs[0].t).to.be.closeTo(3.0, 0.0001);
            expect(xs[1].t).to.be.closeTo(7.0, 0.0001);
        });

        it("should hit a translated sphere", function () {
            const r = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1));
            const s = new Sphere();
            s.transform = translation(5, 0, 0);

            const xs = s.intersect(r);

            expect(xs).to.be.undefined;
        });
    });

    describe("normalAt()", function () {
        it("should be right on the x axis", function () {
            const s = new Sphere();
            const n = s.normalAt(new Point(1, 0, 0));

            if (n === undefined) {
                assert.fail();
            }

            expect(n.x).to.be.closeTo(1.0, 0.0001);
            expect(n.y).to.be.closeTo(0.0, 0.0001);
            expect(n.z).to.be.closeTo(0.0, 0.0001);
        });

        it("should be right on the y axis", function () {
            const s = new Sphere();
            const n = s.normalAt(new Point(0, 1, 0));

            if (n === undefined) {
                assert.fail();
            }

            expect(n.x).to.be.closeTo(0.0, 0.0001);
            expect(n.y).to.be.closeTo(1.0, 0.0001);
            expect(n.z).to.be.closeTo(0.0, 0.0001);
        });

        it("should be right on the z axis", function () {
            const s = new Sphere();
            const n = s.normalAt(new Point(0, 0, 1));

            if (n === undefined) {
                assert.fail();
            }

            expect(n.x).to.be.closeTo(0.0, 0.0001);
            expect(n.y).to.be.closeTo(0.0, 0.0001);
            expect(n.z).to.be.closeTo(1.0, 0.0001);
        });

        it("should be right on a nonaxial point", function () {
            const s = new Sphere();
            const n = s.normalAt(
                new Point(Math.sqrt(3) / 3, Math.sqrt(3) / 3, Math.sqrt(3) / 3)
            );

            if (n === undefined) {
                assert.fail();
            }

            expect(n.x).to.be.closeTo(Math.sqrt(3) / 3, 0.0001);
            expect(n.y).to.be.closeTo(Math.sqrt(3) / 3, 0.0001);
            expect(n.z).to.be.closeTo(Math.sqrt(3) / 3, 0.0001);
        });

        it("should be normalized", function () {
            const s = new Sphere();
            const n = s.normalAt(
                new Point(Math.sqrt(3) / 3, Math.sqrt(3) / 3, Math.sqrt(3) / 3)
            );

            if (n === undefined) {
                assert.fail();
            }

            const n_normalized = n.normalize();

            expect(n.x).to.be.closeTo(n_normalized.x, 0.0001);
            expect(n.y).to.be.closeTo(n_normalized.y, 0.0001);
            expect(n.z).to.be.closeTo(n_normalized.z, 0.0001);
        });

        it("should get normal for translated sphere", function () {
            const s = new Sphere();
            s.transform = translation(0, 1, 0);

            const n = s.normalAt(new Point(0, 1.70711, -0.70711));

            if (n === undefined) {
                assert.fail();
            }

            expect(n.x).to.be.closeTo(0, 0.0001);
            expect(n.y).to.be.closeTo(0.70711, 0.0001);
            expect(n.z).to.be.closeTo(-0.70711, 0.0001);
        });

        it("should get normal for transformed sphere", function () {
            const s = new Sphere();
            const m = scaling(1, 0.5, 1).multiply(
                rotation(new Vector(0, 0, 1), Math.PI / 5)
            );

            s.transform = m;

            const n = s.normalAt(
                new Point(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2)
            );

            if (n === undefined) {
                assert.fail();
            }

            expect(n.x).to.be.closeTo(0, 0.0001);
            expect(n.y).to.be.closeTo(0.97014, 0.0001);
            expect(n.z).to.be.closeTo(-0.24254, 0.0001);
        });
    });
});
