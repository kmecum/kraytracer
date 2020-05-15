"use strict";

import { Matrix4x4 } from "./matrix";
import { Point, Vector } from "./tuple";

export function translation(x: number, y: number, z: number): Matrix4x4 {
    const translation = new Matrix4x4();
    translation.data = [
        1.0,
        0.0,
        0.0,
        x,
        0.0,
        1.0,
        0.0,
        y,
        0.0,
        0.0,
        1.0,
        z,
        0.0,
        0.0,
        0.0,
        1.0,
    ];

    return translation;
}

export function scaling(x: number, y: number, z: number): Matrix4x4 {
    const scaling = new Matrix4x4();
    scaling.data = [
        x,
        0.0,
        0.0,
        0.0,
        0.0,
        y,
        0.0,
        0.0,
        0.0,
        0.0,
        z,
        0.0,
        0.0,
        0.0,
        0.0,
        1.0,
    ];

    return scaling;
}

export function rotation(axis: Vector, angle: number): Matrix4x4 {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const ic = 1 - c;

    const x = axis.x;
    const y = axis.y;
    const z = axis.z;

    const rotation = new Matrix4x4();

    rotation.data = [
        x * x + (1 - x * x) * c,
        ic * x * y - z * s,
        ic * x * z + y * s,
        0,
        ic * x * y + z * s,
        y * y + (1 - y * y) * c,
        ic * y * z - x * s,
        0,
        ic * x * z - y * s,
        ic * y * z + x * s,
        z * z + (1 - z * z) * c,
        0,
        0,
        0,
        0,
        1,
    ];

    return rotation;
}

export function shearing(
    xy: number,
    xz: number,
    yx: number,
    yz: number,
    zx: number,
    zy: number
): Matrix4x4 {
    const shearing = new Matrix4x4();
    shearing.data = [
        1.0,
        xy,
        xz,
        0.0,
        yx,
        1.0,
        yz,
        0.0,
        zx,
        zy,
        1.0,
        0.0,
        0.0,
        0.0,
        0.0,
        1.0,
    ];

    return shearing;
}

export function viewTransform(from: Point, to: Point, up: Vector): Matrix4x4 {
    const forward = to.subtract(from).normalize();
    const upNormal = up.normalize();
    const left = forward.cross(upNormal);
    const trueUp = left.cross(forward);

    const orientation = new Matrix4x4();
    orientation.data = [
        left.x,
        left.y,
        left.z,
        0,
        trueUp.x,
        trueUp.y,
        trueUp.z,
        0,
        -forward.x,
        -forward.y,
        -forward.z,
        0,
        0,
        0,
        0,
        1,
    ];

    return orientation.multiply(translation(-from.x, -from.y, -from.z));
}
