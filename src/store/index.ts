import Vue from 'vue'
import Vuex from 'vuex'

import { core, CoreModule } from './modules/core'
import { eosTransit, EosTransitModule } from './modules/eosTransit'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    core,
    eosTransit
  },
  strict: process.env.NODE_ENV !== 'production'
})

export const vxm = {
  core: CoreModule.CreateProxy(store, CoreModule) as CoreModule,
  eosTransit: EosTransitModule.CreateProxy(
    store,
    EosTransitModule
  ) as EosTransitModule
}
