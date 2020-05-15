"use strict";

import { Camera } from "./camera";
import { Color, Point, Vector } from "./tuple";
import { Material } from "./material";
import { PointLight } from "./light";
import { Sphere } from "./sphere";
import { World } from "./world";
import { scaling, translation, viewTransform } from "./transformation";
import { Plane } from "./plane";

const WIDTH = 640;
const HEIGHT = 480;

declare global {
    interface Window {
        main(): void;
    }
}

function render(data: Color[]): void {
    const canvas: HTMLCanvasElement = document.getElementById(
        "canvas"
    ) as HTMLCanvasElement;
    const context: CanvasRenderingContext2D = canvas.getContext(
        "2d"
    ) as CanvasRenderingContext2D;

    const imageData = context.createImageData(WIDTH, HEIGHT);

    for (
        let i1 = 0, i2 = 0;
        i1 < imageData.data.length && i2 < data.length;
        i1 += 4, i2++
    ) {
        imageData.data[i1 + 0] = data[i2].r * 255;
        imageData.data[i1 + 1] = data[i2].g * 255;
        imageData.data[i1 + 2] = data[i2].b * 255;
        imageData.data[i1 + 3] = 255;
    }

    context.putImageData(imageData, 0, 0);
}

function main(): void {
    const world = new World();
    world.lights = [
        new PointLight(new Point(-10, 10, -10), new Color(1, 1, 1)),
        new PointLight(new Point(10, 5, -10), new Color(1, 1, 1)),
    ];

    // Build a bunch of objects for the scene
    const floor = new Plane();

    const middle = new Sphere();
    middle.transform = translation(-0.5, 1, 0.5);
    middle.material = new Material(new Color(0.1, 1, 0.5), undefined, 0.7, 0.3);

    const right = new Sphere();
    right.transform = translation(1.5, 0.5, -0.5).multiply(
        scaling(0.5, 0.5, 0.5)
    );
    right.material = new Material(new Color(0.5, 1, 0.1), undefined, 0.7, 0.3);

    const left = new Sphere();
    left.transform = translation(-1.5, 0.33, -0.75).multiply(
        scaling(0.33, 0.33, 0.33)
    );
    left.material = new Material(new Color(1, 0.8, 0.1), undefined, 0.7, 0.3);

    world.objects = [floor, middle, right, left];

    const camera = new Camera(WIDTH, HEIGHT, Math.PI / 3);
    camera.transform = viewTransform(
        new Point(0, 1.5, -5),
        new Point(0, 1, 0),
        new Vector(0, 1, 0)
    );

    const data = camera.render(world).data;

    render(data);
}

window.main = main;
