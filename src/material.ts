"use strict";

import { Color, Point, Vector } from "./tuple";
import { PointLight } from "./light";

export class Material {
    color: Color;
    ambient: number;
    diffuse: number;
    specular: number;
    shininess: number;

    constructor(
        color = new Color(1, 1, 1),
        ambient = 0.1,
        diffuse = 0.9,
        specular = 0.9,
        shininess = 200.0
    ) {
        this.color = color;
        this.ambient = ambient;
        this.diffuse = diffuse;
        this.specular = specular;
        this.shininess = shininess;
    }

    light(
        light: PointLight,
        point: Point,
        eyev: Vector,
        normalv: Vector,
        shadowed: boolean
    ): Color {
        if (shadowed) {
            return new Color(0.1, 0.1, 0.1);
        }

        const effectiveColor = this.color.blend(light.intensity);
        const lightvPoint = light.position.subtract(point);
        const lightv = new Vector(
            lightvPoint.x,
            lightvPoint.y,
            lightvPoint.z
        ).normalize();
        const ambient = effectiveColor.multiply(this.ambient);

        const lightDotNormal = lightv.dot(normalv);
        if (lightDotNormal < 0) {
            // Light is behind the object.
            return ambient;
        }

        const diffuse = effectiveColor.multiply(this.diffuse * lightDotNormal);

        const lightvNeg = new Vector(-lightv.x, -lightv.y, -lightv.z);

        const reflectv = lightvNeg.reflect(normalv);
        const reflectDotEye = reflectv.dot(eyev);

        if (reflectDotEye <= 0) {
            // Light reflects away from eye
            return ambient.add(diffuse);
        }

        const factor = reflectDotEye ** this.shininess;
        const specular = light.intensity.multiply(this.specular * factor);

        return ambient.add(diffuse).add(specular);
    }
}
