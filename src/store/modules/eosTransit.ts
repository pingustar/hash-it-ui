import {
  VuexModule,
  mutation,
  action,
  getter,
  Module
} from 'vuex-class-component'
import { vxm } from '@/store'
import * as scatter from '@/api/scatter'
import { AccountInfo } from '@/types/scatter'

@Module({ namespacedPath: 'eosTransit/' })
export class EosTransitModule extends VuexModule {
  @getter accountInfo: AccountInfo | false = false

  get isAuthenticated() {
    if (this.accountInfo) return this.accountInfo.name
    else return false
  }

  // actions
  @action async initScatter() {
    try {
      const account = await scatter.initScatter()
      this.setAccount(account)
      localStorage.setItem('autoLogin', 'true')
      return
    } catch (e) {
      throw e
    }
  }

  @action async logout() {
    try {
      await scatter.logoutScatter()
      return
    } catch (e) {
      throw e
    } finally {
      this.setAccount(false)
      localStorage.removeItem('autoLogin')
      vxm.core.setUserInfo(false)
    }
  }

  // mutations
  @mutation setAccount(a: AccountInfo | false) {
    this.accountInfo = a
  }
}
export const eosTransit = EosTransitModule.ExtractVuexModule(EosTransitModule)
