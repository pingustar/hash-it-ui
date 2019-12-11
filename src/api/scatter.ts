// @ts-ignore
import ScatterJS from '@scatterjs/core'
// @ts-ignore
import ScatterEOS from '@scatterjs/eosjs2'
// @ts-ignore
// import ScatterJS from 'scatterjs-core'
// @ts-ignore
// import ScatterEOS from 'scatterjs-plugin-eosjs2'
import { JsonRpc, Api } from 'eosjs'

// Don't forget to tell ScatterJS which plugins you are using.
ScatterJS.plugins(new ScatterEOS())

let network = ScatterJS.Network.fromJson({
  blockchain: 'eos',
  chainId: '1eaa0824707c8c16bd25145493bf062aecddfeb56c736f6ba6397f3195f33c9f',
  host: 'testnet.eos.miami',
  port: 443,
  protocol: 'https'
})
export let rpc = new JsonRpc(network.fullhost())
export let eos = ScatterJS.eos(network, Api, { rpc })

export async function initScatter() {
  try {
    const connected = await ScatterJS.connect('hashit.semiofficial.io', {
      network
    })
    if (!connected) throw 'Unable to connect to wallet.'
    console.log('connected')
    return await loginScatter()
  } catch (e) {
    console.error('connect error: ', e)
    throw e
  } finally {
    // @ts-ignore
    window.ScatterJS = null
  }
}

export async function loginScatter() {
  try {
    const id = await ScatterJS.login({ accounts: [network] })
    console.log(id)
    //const account = ScatterJS.identity.accounts.find(
    //  (x: any) => x.blockchain === 'eos'
    //)
    const account = await ScatterJS.account('eos')
    console.log(account)
    return account
  } catch (e) {
    console.error('login error', e)
    throw e
  }
}

export async function logoutScatter() {
  try {
    const logout = await ScatterJS.logout({ accounts: [network] })
    // const logout = await ScatterJS.disconnect()
    if (!logout) throw 'unable to logout'
    console.log(logout)
    console.log('logout success')
    // return true
  } catch (e) {
    console.error('logout error: ', e)
    throw e
  }
}
