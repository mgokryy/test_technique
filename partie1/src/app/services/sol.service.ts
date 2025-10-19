import { Injectable } from '@angular/core';
import * as THREE from 'three';

export interface SolParams {
  width: number;
  depth: number;
  thickness: number;
  color?: number;
  position?: THREE.Vector3;
}

@Injectable({ providedIn: 'root' })
export class SolService {
  createSol(params: SolParams): THREE.Mesh {
    const { width, depth, thickness, color = 0xdab89b, position = new THREE.Vector3(0, 0, 0) } = params;
    const geometry = new THREE.BoxGeometry(width, thickness, depth);
    const material = new THREE.MeshStandardMaterial({ color });
    const sol = new THREE.Mesh(geometry, material);
    sol.position.copy(position);
    sol.castShadow = true;
    sol.receiveShadow = true;
    return sol;
  }
}
