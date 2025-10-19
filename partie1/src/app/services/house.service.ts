import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { LevelService, LevelParams } from './level.service';
import { ToitService, ToitParams } from './toit.service';

export interface HouseParams {
  levels: LevelParams[];
  withRoof?: boolean;
  roof?: ToitParams; 
}

@Injectable({ providedIn: 'root' })
export class HouseService {
  constructor(
    private levelService: LevelService,
    private toitService: ToitService
  ) {}

  createHouse(params: HouseParams): THREE.Group {
    const group = new THREE.Group();

    params.levels.forEach(level => {
      const levelGroup = this.levelService.createLevel(level);
      group.add(levelGroup);
    });
    if (params.withRoof && params.roof) {
      const toit = this.toitService.createToit(params.roof);
      group.add(toit);
    }

    return group;
  }
}
