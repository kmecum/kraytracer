"use strict";

import { Intersection } from "./intersection";
import { Point, Vector } from "./tuple";
import { Ray } from "./ray";
import { Shape } from "./shape";

export class Plane extends Shape {
    protected localIntersect(ray: Ray): Intersection[] | undefined {
        if (Math.abs(ray.direction.y) < 0.0001) {
            return undefined;
        }

        const t = -ray.origin.y / ray.direction.y;
        return [new Intersection(t, this)];
    }

    protected localNormalAt(point: Point): Vector {
        point; // intentionally unused
        return new Vector(0, 1, 0);
    }
}
