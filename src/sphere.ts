"use strict";

import { Intersection } from "./intersection";
import { Point, Vector } from "./tuple";
import { Ray } from "./ray";
import { Shape } from "./shape";

export class Sphere extends Shape {
    protected localIntersect(ray: Ray): Intersection[] | undefined {
        const sphereToRay = ray.origin.subtract(new Point(0, 0, 0));

        const a = ray.direction.dot(ray.direction);
        const b = 2 * ray.direction.dot(sphereToRay);
        const c = sphereToRay.dot(sphereToRay) - 1;

        const discriminant = b * b - 4 * a * c;

        if (discriminant < 0) {
            return undefined;
        }

        const xs: Intersection[] = [];
        xs.push(
            new Intersection((-b - Math.sqrt(discriminant)) / (2 * a), this)
        );
        xs.push(
            new Intersection((-b + Math.sqrt(discriminant)) / (2 * a), this)
        );

        return xs;
    }

    protected localNormalAt(point: Point): Vector {
        return point.subtract(new Point(0, 0, 0));
    }
}
