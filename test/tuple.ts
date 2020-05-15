"use strict";

import { Vector, Point, Tuple } from "../src/tuple";

import { assert, expect } from "chai";

describe("Tuple", function () {
    describe("add()", function () {
        it("should add tuples correctly", function () {
            const t1 = new Tuple(1, 2, 3, 4);
            const t2 = new Tuple(5, 6, 7, 8);

            const r = t1.add(t2);

            assert.equal(r.x, 6);
            assert.equal(r.y, 8);
            assert.equal(r.z, 10);
            assert.equal(r.w, 12);
        });
    });

    describe("subtract()", function () {
        it("should subtract points correctly", function () {
            const p1 = new Point(3, 2, 1);
            const p2 = new Point(5, 6, 7);

            const result = p1.subtract(p2);

            expect(result.x).to.be.closeTo(-2, 0.0001);
            expect(result.y).to.be.closeTo(-4, 0.0001);
            expect(result.z).to.be.closeTo(-6, 0.0001);
        });

        it("should subtract a vector from a point", function () {
            const p = new Point(3, 2, 1);
            const v = new Vector(5, 6, 7);

            const result = p.subtract(v);

            expect(result.x).to.be.closeTo(-2, 0.0001);
            expect(result.y).to.be.closeTo(-4, 0.0001);
            expect(result.z).to.be.closeTo(-6, 0.0001);
        });

        it("should subtract a vector from a vector", function () {
            const v1 = new Vector(3, 2, 1);
            const v2 = new Vector(5, 6, 7);

            const result = v1.subtract(v2);

            expect(result.x).to.be.closeTo(-2, 0.0001);
            expect(result.y).to.be.closeTo(-4, 0.0001);
            expect(result.z).to.be.closeTo(-6, 0.0001);
        });
    });

    describe("dot()", function () {
        it("should calculate dot product", function () {
            const v1 = new Vector(1, 2, 3);
            const v2 = new Vector(2, 3, 4);

            const r = v1.dot(v2);

            expect(r).to.be.closeTo(20, 0.0001);
        });
    });

    describe("reflect()", function () {
        it("should reflect 45 degrees", function () {
            const v = new Vector(1, -1, 0);
            const n = new Vector(0, 1, 0);

            const r = v.reflect(n);

            expect(r.x).to.be.closeTo(1.0, 0.0001);
            expect(r.y).to.be.closeTo(1.0, 0.0001);
            expect(r.z).to.be.closeTo(0.0, 0.0001);
        });

        it("should reflect slanted", function () {
            const v = new Vector(0, -1, 0);
            const n = new Vector(Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0);

            const r = v.reflect(n);

            expect(r.x).to.be.closeTo(1.0, 0.0001);
            expect(r.y).to.be.closeTo(0.0, 0.0001);
            expect(r.z).to.be.closeTo(0.0, 0.0001);
        });
    });
});
