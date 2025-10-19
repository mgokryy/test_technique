import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { SolService, SolParams } from './sol.service';
import { MurService, MurParams } from './mur.service';

export interface LevelParams {
  sol: SolParams;
  murs: MurParams[];
}

@Injectable({ providedIn: 'root' })
export class LevelService {
  constructor(private solService: SolService, private murService: MurService) {}

  createLevel(params: LevelParams): THREE.Group {
    const group = new THREE.Group();

    const sol = this.solService.createSol(params.sol);
    group.add(sol);

    params.murs.forEach(mur => {
      const murObj = this.murService.createMur(mur);
      group.add(murObj);
    });

    return group;
  }
}
