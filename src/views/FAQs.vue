<template>
  <v-main>
    <div class="text-center my-4">
      <p class="text-h5">{{ $t("IOR Services") }}</p>
      <p class="text-h6 mb-0">
        {{ $t("Frequently Asked Questions") }}
      </p>
    </div>
    <v-text-field
      :placeholder="$t('Search')"
      prepend-inner-icon="mdi-magnify"
      v-model="search"
      clearable
    ></v-text-field>
    <v-expansion-panels v-if="faqs.length" focusable>
      <v-expansion-panel v-for="(item, index) in faqs" :key="index">
        <v-expansion-panel-header>
          <strong>{{ item.qtn }}</strong>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="mt-4">
          <div class="d-flex align-start">
            <v-icon class="mr-2">mdi-arrow-right-bold</v-icon>
            <span v-html="item.ans"></span>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <p class="text-center" v-else>{{ $t("No Data Found") }}</p>
  </v-main>
</template>
<script>
export default {
  computed: {
    faqs() {
      return this.$i18n.messages[this.$root.$i18n.locale].allFAQs.filter(
        (i) => {
          return (
            !this.search ||
            i.qtn.toLowerCase().includes(this.search.toLowerCase()) ||
            i.ans.toLowerCase().includes(this.search.toLowerCase())
          );
        }
      );
    },
  },
  data() {
    return {
      search: null,
    };
  },
};
</script>
