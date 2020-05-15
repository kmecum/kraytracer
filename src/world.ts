"use strict";

import { Color, Point } from "./tuple";
import { Computations, Intersection, hit } from "./intersection";
import { Material } from "./material";
import { PointLight } from "./light";
import { Ray } from "./ray";
import { Shape } from "./shape";
import { Sphere } from "./sphere";
import { scaling } from "./transformation";

// TODO: turn this into a proper scene graph
export class World {
    lights: PointLight[];
    objects: Shape[];

    constructor() {
        this.lights = [
            new PointLight(new Point(-10, 10, -10), new Color(1, 1, 1)),
        ];

        const s1 = new Sphere();
        s1.material = new Material(
            new Color(0.8, 1.0, 0.6),
            0.1,
            0.7,
            0.2,
            200.0
        );

        const s2 = new Sphere();
        s2.transform = scaling(0.5, 0.5, 0.5);

        this.objects = [s1, s2];
    }

    intersect(ray: Ray): Intersection[] {
        let intersections: Intersection[] = [];

        for (const o of this.objects) {
            const xs = o.intersect(ray);
            if (xs !== undefined) {
                intersections = intersections.concat(xs);
            }
        }

        intersections.sort((i1, i2) => i1.t - i2.t);

        return intersections;
    }

    shadeHit(comps: Computations): Color {
        let result = new Color(0, 0, 0);

        if (comps.normalv === undefined) {
            return result;
        }

        for (const light of this.lights) {
            let shadowed = false;
            if (comps.overPoint !== undefined) {
                shadowed = this.isShadowed(light, comps.overPoint);
            }

            result = result.add(
                comps.object.material.light(
                    light,
                    comps.point,
                    comps.eyev,
                    comps.normalv,
                    shadowed
                )
            );
        }

        return result;
    }

    colorAt(ray: Ray): Color {
        const xs = this.intersect(ray);
        const h = hit(xs);

        if (h === undefined) {
            return new Color(0, 0, 0);
        }

        const comps = h.precompute(ray);
        return this.shadeHit(comps);
    }

    private isShadowed(light: PointLight, point: Point): boolean {
        const v = light.position.subtract(point);
        const direction = v.normalize();

        const r = new Ray(point, direction);
        const xs = this.intersect(r);

        const h = hit(xs);

        if (h !== undefined && h.t < v.magnitude) {
            return true;
        } else {
            return false;
        }
    }
}
