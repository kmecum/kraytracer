"use strict";

import { Color, Point, Vector } from "../src/tuple";
import { Intersection } from "../src/intersection";
import { PointLight } from "../src/light";
import { Ray } from "../src/ray";
import { World } from "../src/world";
import { assert, expect } from "chai";

describe("World", function () {
    describe("intersect()", function () {
        it("should intersect world with ray", function () {
            const w = new World();
            const r = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1));

            const xs = w.intersect(r);

            assert.equal(xs.length, 4);
            expect(xs[0].t).to.be.closeTo(4, 0.0001);
            expect(xs[1].t).to.be.closeTo(4.5, 0.0001);
            expect(xs[2].t).to.be.closeTo(5.5, 0.0001);
            expect(xs[3].t).to.be.closeTo(6, 0.0001);
        });
    });

    describe("shadeHit()", function () {
        it("should shade an intersection", function () {
            const w = new World();
            const r = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1));
            const s = w.objects[0];
            const i = new Intersection(4, s);

            const comps = i.precompute(r);
            const c = w.shadeHit(comps);

            expect(c.r).to.be.closeTo(0.38066, 0.0001);
            expect(c.g).to.be.closeTo(0.47583, 0.0001);
            expect(c.b).to.be.closeTo(0.2855, 0.0001);
        });

        it("should shade an intersection from the inside", function () {
            const w = new World();
            w.lights = [
                new PointLight(new Point(0, 0.25, 0), new Color(1, 1, 1)),
            ];

            const r = new Ray(new Point(0, 0, 0), new Vector(0, 0, 1));
            const s = w.objects[1];
            const i = new Intersection(0.5, s);

            const comps = i.precompute(r);
            const c = w.shadeHit(comps);

            expect(c.r).to.be.closeTo(0.90498, 0.0001);
            expect(c.g).to.be.closeTo(0.90498, 0.0001);
            expect(c.b).to.be.closeTo(0.90498, 0.0001);
        });
    });

    describe("colorAt()", function () {
        it("should be black when a ray misses", function () {
            const w = new World();
            const r = new Ray(new Point(0, 0, -5), new Vector(0, 1, 0));

            const c = w.colorAt(r);

            expect(c.r).to.be.closeTo(0, 0.0001);
            expect(c.g).to.be.closeTo(0, 0.0001);
            expect(c.b).to.be.closeTo(0, 0.0001);
        });

        it("should be correct on a hit", function () {
            const w = new World();
            const r = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1));

            const c = w.colorAt(r);

            expect(c.r).to.be.closeTo(0.38066, 0.0001);
            expect(c.g).to.be.closeTo(0.47583, 0.0001);
            expect(c.b).to.be.closeTo(0.2855, 0.0001);
        });

        it("should intersect behind ray", function () {
            const w = new World();

            const outer = w.objects[0];
            outer.material.ambient = 1;

            const inner = w.objects[1];
            inner.material.ambient = 1;

            const r = new Ray(new Point(0, 0, 0.75), new Vector(0, 0, -1));

            const c = w.colorAt(r);

            assert.isTrue(c.equals(inner.material.color));
        });
    });
});
