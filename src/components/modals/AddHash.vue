<template>
  <form @submit.prevent="create()">
    <h2 class="content-heading pt-0 text-center">
      Add something to Hash It
    </h2>
    <div class="row">
      <div class="col-lg-4">
        <p class="text-muted font-size-sm">
          Your sha256 hash.<br />Exactly 64 characters required.
        </p>
      </div>
      <div class="col-lg-8 col-xl-5">
        <div class="form-group">
          <label for="create-name">Hash #</label>
          <input
            v-model="hash"
            type="text"
            class="form-control"
            id="create-name"
            name="create-name"
            placeholder="required"
          />
        </div>
        <div class="text-right">
          <b-btn @click="a(hash)" variant="success" size="sm" :disabled="!hash">
            Generate SHA256 Hash
          </b-btn>
        </div>
        <div class="form-group">
          <label for="create-option-2">Hash Content</label>
          <textarea
            v-model="content"
            class="form-control"
            id="create-option-2"
            name="create-option-2"
            rows="2"
            placeholder="required, max 300 characters"
          ></textarea>
        </div>
      </div>
    </div>
    <hr />
    <b-row>
      <b-col class="text-center">
        <b-alert
          :show="error"
          variant="danger"
          dismissible
          @dismissed="error = false"
        >
          {{ error }}
        </b-alert>
        <b-btn
          type="submit"
          variant="hero-primary"
          :disabled="loading || !hash || !isAuthenticated"
          class="push"
        >
          <font-awesome-icon
            v-if="!loading"
            :icon="['fas', 'plus']"
            fixed-width
            class="mr-1"
          />
          <font-awesome-icon
            v-else
            :icon="['fas', 'spinner']"
            fixed-width
            spin
            class="mr-1"
          />
          Do it!
        </b-btn>
      </b-col>
    </b-row>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { vxm } from '@/store'
import * as scatter from '@/api/scatter'
import { RpcError } from 'eosjs'

@Component
export default class AddHash extends Vue {
  // data
  hash: string = ''
  content: string = ''
  loading = false
  error: any = false

  // getter
  get isAuthenticated() {
    return vxm.eosTransit.isAuthenticated
  }

  // methods
  a(b: string) {
    if (!b) return
    function c(a: any, b: any) {
      return (a >>> b) | (a << (32 - b))
    }
    for (
      var d,
        e,
        f = Math.pow,
        g = f(2, 32),
        h = 'length',
        i = '',
        j = [],
        k = 8 * b[h],
        l = (this.a.h = this.a.h || []),
        m = (this.a.k = this.a.k || []),
        n = m[h],
        o = {},
        p = 2;
      64 > n;
      p++
    )
      if (!o[p]) {
        for (d = 0; 313 > d; d += p) o[d] = p
        ;(l[n] = (f(p, 0.5) * g) | 0), (m[n++] = (f(p, 1 / 3) * g) | 0)
      }
    for (b += '\x80'; (b[h] % 64) - 56; ) b += '\x00'
    for (d = 0; d < b[h]; d++) {
      if (((e = b.charCodeAt(d)), e >> 8)) return
      j[d >> 2] |= e << (((3 - d) % 4) * 8)
    }
    for (j[j[h]] = (k / g) | 0, j[j[h]] = k, e = 0; e < j[h]; ) {
      var q = j.slice(e, (e += 16)),
        r = l
      for (l = l.slice(0, 8), d = 0; 64 > d; d++) {
        var s = q[d - 15],
          t = q[d - 2],
          u = l[0],
          v = l[4],
          w =
            l[7] +
            (c(v, 6) ^ c(v, 11) ^ c(v, 25)) +
            ((v & l[5]) ^ (~v & l[6])) +
            m[d] +
            (q[d] =
              16 > d
                ? q[d]
                : (q[d - 16] +
                    (c(s, 7) ^ c(s, 18) ^ (s >>> 3)) +
                    q[d - 7] +
                    (c(t, 17) ^ c(t, 19) ^ (t >>> 10))) |
                  0),
          x =
            (c(u, 2) ^ c(u, 13) ^ c(u, 22)) +
            ((u & l[1]) ^ (u & l[2]) ^ (l[1] & l[2]))
        ;(l = [(w + x) | 0].concat(l)), (l[4] = (l[4] + w) | 0)
      }
      for (d = 0; 8 > d; d++) l[d] = (l[d] + r[d]) | 0
    }
    for (d = 0; 8 > d; d++)
      for (e = 3; e + 1; e--) {
        var y = (l[d] >> (8 * e)) & 255
        i += (16 > y ? 0 : '') + y.toString(16)
      }
    this.hash = i
    return i
  }

  async create() {
    this.error = false
    this.loading = true
    const account = vxm.eosTransit.accountInfo
    if (account) {
      const actionCreate = {
        account: vxm.core.chainInfo.contract,
        name: 'submit',
        authorization: [
          {
            actor: account.name,
            permission: account.authority
          }
        ],
        data: {
          username: account.name,
          hash: this.hash,
          content: this.content
        }
      }
      let actions: any[] = []
      actions.push(actionCreate)
      try {
        const resp = await scatter.eos.transact(
          {
            actions: actions
          },
          {
            blocksBehind: 3,
            expireSeconds: 30
          }
        )
        this.error = false
        await this.$router.push({
          name: 'details',
          params: { hash: this.hash }
        })
        this.$bvToast.toast(`Hash successfully added! Happy hashing :)`, {
          variant: 'success',
          title: 'SUCCESS - Create',
          autoHideDelay: 4000,
          appendToast: false
        })
      } catch (e) {
        if (e instanceof RpcError) console.log(JSON.stringify(e.json, null, 2))
        console.log(e)
        this.error = e.message.replace('assertion failure with message: ', '')
      }
    }
    this.loading = false
  }
}
</script>

<style scoped lang="scss"></style>
