import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { PorteService } from './porte.service';
import { FenetreService } from './fenetre.service';

export interface DoorParams {
  width: number;
  height: number;
  depth: number;
  color: number;
  position: THREE.Vector3;
}

export interface WindowParams {
  width: number;
  height: number;
  depth: number;
  color: number;
  position: THREE.Vector3;
}

export interface MurParams {
  width: number;
  height: number;
  depth: number;
  color?: number;
  position: THREE.Vector3;
  rotationY?: number;
  doors?: DoorParams[];
  windows?: WindowParams[];
}

@Injectable({ providedIn: 'root' })
export class MurService {
  constructor(
    private porteService: PorteService,
    private fenetreService: FenetreService
  ) {}

  createMur(params: MurParams): THREE.Group {
    const {
      width,
      height,
      depth,
      color = 0xffffff,
      position,
      rotationY,
      doors = [],
      windows = []
    } = params;

    const shape = new THREE.Shape();
    shape.moveTo(-width / 2, -height / 2);
    shape.lineTo(width / 2, -height / 2);
    shape.lineTo(width / 2, height / 2);
    shape.lineTo(-width / 2, height / 2);
    shape.lineTo(-width / 2, -height / 2);

    const bottomEdge = -height / 2;
    const holes = [...doors, ...windows];

    for (const opening of holes) {
      const { width: ow, height: oh, position: pos } = opening;

      const x0 = pos.x - ow / 2;
      let y0 = pos.y - oh / 2;

      if (Math.abs(y0 - bottomEdge) < 0.02) {
        y0 = bottomEdge + 0.02;
      }

      const hole = new THREE.Path();
      hole.moveTo(x0, y0);
      hole.lineTo(x0 + ow, y0);
      hole.lineTo(x0 + ow, y0 + oh);
      hole.lineTo(x0, y0 + oh);
      hole.lineTo(x0, y0);
      shape.holes.push(hole);
    }

    const extrudeSettings = { depth, bevelEnabled: false };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    geometry.translate(0, 0, -depth / 2);

    const material = new THREE.MeshStandardMaterial({ color });
    const mur = new THREE.Mesh(geometry, material);
    mur.castShadow = true;
    mur.receiveShadow = true;

    const group = new THREE.Group();
    group.add(mur);

    for (const d of doors) {
      const porte = this.porteService.createPorte(d.width, d.height, d.depth, d.color);
      porte.position.copy(d.position);
      group.add(porte);
    }

    for (const w of windows) {
      const fenetre = this.fenetreService.createFenetre(w.width, w.height, w.depth, w.color);
      fenetre.position.copy(w.position);
      group.add(fenetre);
    }

    group.position.copy(position);
    if (rotationY) group.rotation.y = rotationY;

    return group;
  }
}
