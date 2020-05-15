"use struct";

import { Intersection } from "./intersection";
import { Material } from "./material";
import { Matrix4x4 } from "./matrix";
import { Point, Vector } from "./tuple";
import { Ray } from "./ray";

export abstract class Shape {
    private _transform: Matrix4x4;
    private _invertedTransform: Matrix4x4 | undefined;
    private _material: Material;

    constructor() {
        this._transform = new Matrix4x4();
        this._invertedTransform = this._transform.inverse;
        this._material = new Material();
    }

    get material(): Material {
        return this._material;
    }

    set material(material: Material) {
        this._material = material;
    }

    get transform(): Matrix4x4 {
        return this._transform;
    }

    set transform(transform: Matrix4x4) {
        this._transform = transform;
        this._invertedTransform = this.transform.inverse;
    }

    get invertedTransform(): Matrix4x4 | undefined {
        return this._invertedTransform;
    }

    intersect(ray: Ray): Intersection[] | undefined {
        if (this._invertedTransform === undefined) {
            return undefined;
        }

        const localRay = ray.transform(this._invertedTransform);

        return this.localIntersect(localRay);
    }

    normalAt(point: Point): Vector | undefined {
        if (this.invertedTransform === undefined) {
            return undefined;
        }

        const localPoint = this.invertedTransform.multiplyTuple(point);

        const localNormal = this.localNormalAt(localPoint);

        const worldNormal = this.invertedTransform.transpose.multiplyTuple(
            localNormal
        );
        worldNormal.w = 0;

        return worldNormal?.normalize();
    }

    protected abstract localIntersect(ray: Ray): Intersection[] | undefined;
    protected abstract localNormalAt(point: Point): Vector;
}
