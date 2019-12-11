<template>
  <div>
    <h3 class="text-center text-muted text-uppercase pb-3">
      Index of everything
    </h3>
    <div class="block-content block-content-full block-content-sm bg-body-dark">
      <form @submit.prevent="searchHash()">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text input-group-text-alt pl-0">
              Search
              <font-awesome-icon
                icon="search"
                fixed-width
                class="ml-4 text-muted"
              />
            </span>
          </div>
          <b-form-input
            v-model="search"
            type="text"
            debounce="500"
            class="form-control-alt"
            placeholder="Type something ..."
          ></b-form-input>
        </div>
      </form>
    </div>
    <table class="table table-striped table-hover table-vcenter">
      <thead>
        <tr>
          <th colspan="2">Hash #</th>
          <th class="text-center">From</th>
          <th class="text-center">Items</th>
          <th class="text-right">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="hash in results" :key="hash.id">
          <td class="text-center">
            {{ hash.id }}
          </td>
          <router-link
            :to="{ name: 'details', params: { hash: hash.hash } }"
            tag="td"
            class="cursor"
          >
            <router-link
              :to="{ name: 'details', params: { hash: hash.hash } }"
              class="font-w600"
            >
              {{ hash.content }}
            </router-link>
            <div class="font-size-sm">{{ hash.hash }}</div>
          </router-link>
          <td class="text-center">
            {{ hash.username }}
          </td>
          <td class="text-center">
            {{ hash.item_count }}
          </td>
          <td class="font-size-sm text-right">
            {{ hash.created_at }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { vxm } from '@/store'
import * as scatter from '@/api/scatter'

@Component
export default class Messages extends Vue {
  hashes: any[] = []
  search = ''
  private searchOptions = {
    shouldSort: true,
    threshold: 0.3,
    location: 0,
    distance: 100,
    maxPatternLength: 24,
    minMatchCharLength: 3,
    keys: ['content']
  }
  searchResults: any = []

  get results() {
    if (this.searchResults.length) return this.searchResults
    else return this.hashes
  }

  async getHashes() {
    let data = await scatter.rpc.get_table_rows({
      code: vxm.core.chainInfo.contract,
      table: 'hashes',
      scope: vxm.core.chainInfo.contract,
      limit: 100
    })
    this.hashes = data.rows.reverse()
    return
  }

  async searchHash() {
    // @ts-ignore
    this.$search(this.search, this.hashes, this.searchOptions).then(
      (results: any) => {
        this.searchResults = results
      }
    )
  }

  async created() {
    this.getHashes()
    // @ts-ignore
    this.$options.interval = setInterval(await this.getHashes(), 1000)
  }

  @Watch('search')
  async onSearchChange(val: any, oldVal: any) {
    this.searchHash()
  }

  beforeDestroy() {
    // @ts-ignore
    clearInterval(this.$options.interval)
  }
}
</script>

<style scoped lang="scss"></style>
