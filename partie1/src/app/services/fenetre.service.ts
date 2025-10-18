import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({ providedIn: 'root' })
export class FenetreService {
  createFenetre(): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(1, 1.2 , 0.4);
    const material = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });
    const fenetre = new THREE.Mesh(geometry, material);
    fenetre.position.set(7, 1.5, 0.1);
    return fenetre;
  }
}

