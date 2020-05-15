"use strict";

import { PointLight } from "../src/light";
import { Material } from "../src/material";
import { Color, Point, Vector } from "../src/tuple";
import { expect } from "chai";

describe("light()", function () {
    it("should calculate light with eye between the surface and light", function () {
        const m = new Material(new Color(1.0, 1.0, 1.0), 0.1, 0.9, 0.9, 200.0);

        const position = new Point(0, 0, 0);
        const eyev = new Vector(0, 0, -1);
        const normalv = new Vector(0, 0, -1);
        const light = new PointLight(new Point(0, 0, -10), new Color(1, 1, 1));

        const result = m.light(light, position, eyev, normalv, false);

        expect(result.r).to.be.closeTo(1.9, 0.0001);
        expect(result.g).to.be.closeTo(1.9, 0.0001);
        expect(result.b).to.be.closeTo(1.9, 0.0001);
    });

    it("should calculate light with eye offset 45 degrees", function () {
        const m = new Material(new Color(1.0, 1.0, 1.0), 0.1, 0.9, 0.9, 200.0);

        const position = new Point(0, 0, 0);
        const eyev = new Vector(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2);
        const normalv = new Vector(0, 0, -1);
        const light = new PointLight(new Point(0, 0, -10), new Color(1, 1, 1));

        const result = m.light(light, position, eyev, normalv, false);

        expect(result.r).to.be.closeTo(1.0, 0.0001);
        expect(result.g).to.be.closeTo(1.0, 0.0001);
        expect(result.b).to.be.closeTo(1.0, 0.0001);
    });

    it("should calculate light with light offset 45 degrees", function () {
        const m = new Material(new Color(1.0, 1.0, 1.0), 0.1, 0.9, 0.9, 200.0);

        const position = new Point(0, 0, 0);
        const eyev = new Vector(0, 0, -1);
        const normalv = new Vector(0, 0, -1);
        const light = new PointLight(new Point(0, 10, -10), new Color(1, 1, 1));

        const result = m.light(light, position, eyev, normalv, false);

        expect(result.r).to.be.closeTo(0.7364, 0.0001);
        expect(result.g).to.be.closeTo(0.7364, 0.0001);
        expect(result.b).to.be.closeTo(0.7364, 0.0001);
    });

    it("should calculate light with eye in reflection vector", function () {
        const m = new Material(new Color(1.0, 1.0, 1.0), 0.1, 0.9, 0.9, 200.0);

        const position = new Point(0, 0, 0);
        const eyev = new Vector(0, -Math.sqrt(2) / 2, -Math.sqrt(2) / 2);
        const normalv = new Vector(0, 0, -1);
        const light = new PointLight(new Point(0, 10, -10), new Color(1, 1, 1));

        const result = m.light(light, position, eyev, normalv, false);

        expect(result.r).to.be.closeTo(1.6364, 0.0001);
        expect(result.g).to.be.closeTo(1.6364, 0.0001);
        expect(result.b).to.be.closeTo(1.6364, 0.0001);
    });

    it("should calculate light with light begind surface", function () {
        const m = new Material(new Color(1.0, 1.0, 1.0), 0.1, 0.9, 0.9, 200.0);

        const position = new Point(0, 0, 0);
        const eyev = new Vector(0, 0, -1);
        const normalv = new Vector(0, 0, -1);
        const light = new PointLight(new Point(0, 0, 10), new Color(1, 1, 1));

        const result = m.light(light, position, eyev, normalv, false);

        expect(result.r).to.be.closeTo(0.1, 0.0001);
        expect(result.g).to.be.closeTo(0.1, 0.0001);
        expect(result.b).to.be.closeTo(0.1, 0.0001);
    });
});
