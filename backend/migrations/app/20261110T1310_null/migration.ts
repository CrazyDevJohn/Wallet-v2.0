#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/78b817cf6c8e9f9a0d220a7ddde63098add5f10c9903e496e89d0974d3c3ffcc/contract';
import startContract from '../../snapshots/78b817cf6c8e9f9a0d220a7ddde63098add5f10c9903e496e89d0974d3c3ffcc/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/f9e7f61f44c12917291fdc9dbc707cefafddc35c9094e2072c434012cadd60a2/contract';
import endContract from '../../snapshots/f9e7f61f44c12917291fdc9dbc707cefafddc35c9094e2072c434012cadd60a2/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [this.dropColumn({ schema: 'public', table: 'Transaction', column: 'use' })];
  }
}

MigrationCLI.run(import.meta.url, M);
