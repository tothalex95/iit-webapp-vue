<template>
  <md-table v-model="filteredCatalogue" md-sort="neptunCode" md-sort-order="asc" class="md-scrollbar">
    <md-table-toolbar>
      <div class="md-toolbar-section-start">
        <md-switch
          v-model="presence"
          @change="all = presence && homework"
        >Presence requirements fulfilled</md-switch>
        <md-switch
          v-model="homework"
          @change="all = presence && homework"
        >Homework requirements fulfilled</md-switch>
        <md-switch v-model="all" @change="presence = homework = all">All requirements fulfilled</md-switch>
      </div>
      <div class="md-toolbar-section-end">
        <md-autocomplete
          v-model="neptunCode"
          :md-options="neptunCodes"
          :md-open-on-focus="false"
          md-input-maxlength="6"
          @input="neptunCode = neptunCode.toUpperCase()"
        >
          <label>Neptun Code</label>

          <template slot="md-autocomplete-item" slot-scope="{ item, term }">
            <md-highlight-text :md-term="term">{{ item }}</md-highlight-text>
          </template>

          <template
            slot="md-autocomplete-empty"
            slot-scope="{ term }"
          >No student identified by {{ term }} was found.</template>
        </md-autocomplete>
        <md-button class="md-raised" @click="reset()">Reset</md-button>
        <md-button class="md-raised" @click="exportCatalogue()">Export</md-button>
      </div>
    </md-table-toolbar>

    <md-table-empty-state
      md-icon="search"
      md-label="No students found"
      :md-description="`No student identified by ${neptunCode} was found in the catalogue.`"
    />

    <md-table-row slot="md-table-row" slot-scope="{ item, index }">
      <md-table-cell md-label="#" md-numeric>{{ index + 1 + '.' }}</md-table-cell>
      <md-table-cell md-label="Neptun Code" md-sort-by="neptunCode">{{ item.neptunCode }}</md-table-cell>
      <md-table-cell md-label="Presence">
        <md-icon>{{ getPresenceResult(item) | iconName }}</md-icon>
      </md-table-cell>
      <md-table-cell md-label="Homeworks">
        <md-icon>{{ getHomeworksResult(item) | iconName }}</md-icon>
      </md-table-cell>
      <md-table-cell md-label="Practice">
        <md-icon>{{ getPracticeResult(item) | iconName(true) }}</md-icon>
      </md-table-cell>
      <md-table-cell md-label="Plus points" md-numeric>{{ item.plusPoint ? item.plusPoint : null }}</md-table-cell>
      <md-table-cell md-label="Information">
        <md-button @click="selectedStudent = item.neptunCode">
          <md-icon>info</md-icon>
        </md-button>

        <md-dialog
          :md-active.sync="selectedStudent === item.neptunCode"
          :md-close-on-esc="false"
          :md-click-outside-to-close="false"
        >
          <md-dialog-title>Information about student identified by {{ item.neptunCode }}</md-dialog-title>

          <md-dialog-content class="md-scrollbar">
            <md-tabs>
              <md-tab md-label="Presence">
                <div>
                  <md-progress-bar md-mode="determinate" :md-value="item.presence / item.max * 100"></md-progress-bar>
                  <md-tooltip
                    md-direction="bottom"
                  >{{ (item.presence / item.max * 100).toFixed(2) + '%' }}</md-tooltip>
                </div>
                <md-table>
                  <md-table-row
                    v-for="(presence, pIndex) in item.presenceDetails"
                    v-bind:key="pIndex"
                  >
                    <md-table-cell>{{ presence.date }}</md-table-cell>
                    <md-table-cell>
                      <md-icon>{{ presence.detail | iconName }}</md-icon>
                    </md-table-cell>
                  </md-table-row>
                </md-table>
              </md-tab>
              <md-tab md-label="Homework">
                <md-table>
                  <md-table-row>
                    <md-table-cell>Homework I.</md-table-cell>
                    <md-table-cell>
                      <md-icon>{{ item.hw1 | iconName }}</md-icon>
                    </md-table-cell>
                  </md-table-row>
                  <md-table-row>
                    <md-table-cell>Homework II.</md-table-cell>
                    <md-table-cell>
                      <md-icon>{{ item.hw2 | iconName }}</md-icon>
                    </md-table-cell>
                  </md-table-row>
                </md-table>
              </md-tab>
              <md-tab
                v-if="item.plusPoint"
                md-label="Plus points"
              >The student has {{ item.plusPoint }} plus points.</md-tab>
              <md-tab
                v-if="item.hw2 !== 2"
                md-label="Practice"
              >The student identified by {{ item.neptunCode }} {{ getPresenceResult(item) ? 'fulfilled' : 'failed to fulfil'}} the requirements.</md-tab>
            </md-tabs>
          </md-dialog-content>

          <md-dialog-actions>
            <md-button @click="selectedStudent = null">Close</md-button>
          </md-dialog-actions>
        </md-dialog>
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
import saveAs from 'file-saver'

export default {
  props: {
    catalogue: Array,
    course: String
  },
  data: () => ({
    neptunCode: '',
    presence: false,
    homework: false,
    all: false,
    selectedStudent: null
  }),
  methods: {
    getPresenceResult (catalogueEntry) {
      if (catalogueEntry.fulfilled) {
        return 1
      }
      if (catalogueEntry.hw2 === 2) {
        return 2
      }
      return catalogueEntry.presence >= catalogueEntry.max * 0.7 ? 1 : 0
    },
    getHomeworksResult (catalogueEntry) {
      return catalogueEntry.fulfilled
        ? 1
        : catalogueEntry.hw1 && catalogueEntry.hw2
    },
    getPracticeResult (catalogueEntry) {
      return catalogueEntry.fulfilled
        ? 1
        : this.getPresenceResult(catalogueEntry) &&
            this.getHomeworksResult(catalogueEntry)
    },
    reset () {
      this.neptunCode = ''
      this.presence = false
      this.homework = false
      this.all = false
    },
    exportCatalogue () {
      let data = []

      this.catalogue.forEach(s => {
        data.push(
          [
            s.neptunCode,
            this.getPracticeResult(s) ? '+' : '-',
            s.plusPoint ? s.plusPoint : ''
          ].join('\t')
        )
      })

      let blob = new Blob([data.join('\n')], {
        type: 'text/plain'
      })

      saveAs(blob, this.course + '.txt')
    }
  },
  computed: {
    filteredCatalogue: {
      get () {
        let result = this.catalogue
        if (this.neptunCode) {
          result = result.filter(
            s => s.neptunCode.indexOf(this.neptunCode) >= 0
          )
        }
        if (this.presence) {
          result = result.filter(s => this.getPresenceResult(s) === 1)
        }
        if (this.homework) {
          result = result.filter(s => this.getHomeworksResult(s) === 1)
        }
        return result
      },
      set (value) {
        this.catalogue = value
      }
    },
    neptunCodes () {
      return this.catalogue.map(s => s.neptunCode).sort()
    }
  },
  filters: {
    iconName (result, all) {
      if (!result) {
        return 'close'
      }
      if (result === 1 || result === true) {
        return all ? 'done_all' : 'done'
      }
      return 'help'
    }
  }
}
</script>
