import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({ providedIn: 'root' })
export class ToitService {
  createToit(): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(11, 0.2, 9);
    const material = new THREE.MeshStandardMaterial({ color: 0x3d4e5c });
    const toit = new THREE.Mesh(geometry, material);
    toit.position.set(5, 3.1, 4); 
    return toit;
  }
}
