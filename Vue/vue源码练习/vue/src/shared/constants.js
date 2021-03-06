export const SSR_ATTR = 'data-server-rendered'

/**
 * 资源类型（每一个 vue 组件都会挂载的成员）
 */
export const ASSET_TYPES = [
  'component',
  'directive',
  'filter'
]

/**
 * 生命周期函数 hook
 */
export const LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
]
