import * as migration_20260624_000000_multi_tenant_backfill from './20260624_000000_multi_tenant_backfill'

export const migrations = [
  {
    up: migration_20260624_000000_multi_tenant_backfill.up,
    down: migration_20260624_000000_multi_tenant_backfill.down,
    name: '20260624_000000_multi_tenant_backfill',
  },
]
