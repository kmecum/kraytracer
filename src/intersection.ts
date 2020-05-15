"use strict";

import { Point, Vector } from "./tuple";
import { Ray } from "./ray";
import { Shape } from "./shape";

export class Computations {
    private _t: number;
    private _object: Shape;
    private _point: Point;
    private _eyev: Vector;
    private _normalv: Vector | undefined;
    private _inside: boolean;
    private _overPoint: Point | undefined;

    constructor(
        t: number,
        object: Shape,
        point: Point,
        eyev: Vector,
        normalv: Vector | undefined
    ) {
        this._t = t;
        this._object = object;
        this._point = point;
        this._eyev = eyev;
        this._normalv = normalv;

        if (normalv !== undefined && normalv.dot(eyev) < 0) {
            this._inside = true;
            this._normalv = new Vector(-normalv.x, -normalv.y, -normalv.z);
        } else {
            this._inside = false;
        }

        if (normalv !== undefined) {
            this._overPoint = point.add(normalv.multiply(0.0001));
        }
    }

    get object(): Shape {
        return this._object;
    }

    get point(): Point {
        return this._point;
    }

    get eyev(): Vector {
        return this._eyev;
    }

    get normalv(): Vector | undefined {
        return this._normalv;
    }

    get inside(): boolean {
        return this._inside;
    }

    get overPoint(): Point | undefined {
        return this._overPoint;
    }
}

export class Intersection {
    t: number;
    object: Shape;

    constructor(t: number, object: Shape) {
        this.t = t;
        this.object = object;
    }

    precompute(r: Ray): Computations {
        const t = this.t;
        const object = this.object;

        const point = r.position(this.t);
        const eyev = new Vector(-r.direction.x, -r.direction.y, -r.direction.z);
        const normalv = this.object.normalAt(point);

        return new Computations(t, object, point, eyev, normalv);
    }
}

export function hit(xs: Intersection[]): Intersection | undefined {
    const visible = xs.filter((x: Intersection) => x.t >= 0);

    if (visible.length < 1) {
        return undefined;
    } else if (visible.length === 1) {
        return visible[0];
    }

    visible.sort((i1: Intersection, i2: Intersection) => i1.t - i2.t);

    return visible[0];
}
