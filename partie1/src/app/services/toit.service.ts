import { Injectable } from '@angular/core';
import * as THREE from 'three';

export interface ToitParams {
  width: number;
  thickness: number;
  depth: number;
  color: number;
  position: THREE.Vector3;
}

@Injectable({ providedIn: 'root' })
export class ToitService {
  createToit(params: ToitParams): THREE.Mesh {
    const { width, thickness, depth, color, position } = params;
    const geometry = new THREE.BoxGeometry(width, thickness, depth);
    const material = new THREE.MeshStandardMaterial({ color });
    const toit = new THREE.Mesh(geometry, material);
    toit.position.copy(position);
    toit.castShadow = true;
    toit.receiveShadow = true;
    return toit;
  }
}
