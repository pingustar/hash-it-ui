import {
  VuexModule,
  mutation,
  action,
  getter,
  Module
} from 'vuex-class-component'
import i18n from '@/i18n'
import * as scatter from '@/api/scatter'
import { vxm } from '@/store'
import { ChatInfo, UserInfo } from '@/types/chat'

@Module({ namespacedPath: 'core/' })
export class CoreModule extends VuexModule {
  @getter chainInfo = {
    chainId: '1eaa0824707c8c16bd25145493bf062aecddfeb56c736f6ba6397f3195f33c9f',
    contract: 'hashhashhash'
  }
  @getter language: string = 'en'
  @getter userInfo: UserInfo | false = false
  @getter sidebarOpen = false

  @mutation setUserInfo(u: UserInfo | false) {
    this.userInfo = u
  }

  @mutation setSidebar(b: boolean) {
    this.sidebarOpen = b
  }

  // Get / Set Language from Browser/LocaleStorage
  // or
  // Set Language from user input
  @mutation setLanguage(lang?: string) {
    if (lang) {
      this.language = i18n.locale = lang
      localStorage.setItem('language', lang)
    } else {
      let userLang: string | null = localStorage.getItem('language')
      if (userLang) {
        this.language = i18n.locale = userLang
      } else {
        let browserLang = navigator.language.split('-')[0]
        this.language = i18n.locale = browserLang
        localStorage.setItem('language', browserLang)
      }
    }
  }
}
export const core = CoreModule.ExtractVuexModule(CoreModule)
