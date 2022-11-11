/**
 * v-hasPermi 操作权限处理
 * Copyright (c) 2019 ruoyi
 */

import store from '@/store'

export default {
  mounted(el:any, binding:any, vnode:any) {
    const { value } = binding
    const all_permission = '*:*:*';
    // const permissions = store.getters && store.getters.permissions
    const permissions = ['11', '222']
    // console.log('222', permissions)

    if (value && value instanceof Array && value.length > 0) {
      const permissionFlag = value

      const hasPermissions = permissions.some((permission:any) => all_permission === permission || permissionFlag.includes(permission))

      if (!hasPermissions) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error('请设置操作权限标签值')
    }
  },
}
