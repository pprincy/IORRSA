<template>
  <div data-html2canvas-ignore="true">
    <v-app-bar
      prominent
      :color="scrolled ? 'white' : 'transparent'"
      shrink-on-scroll
      elevate-on-scroll
      fixed
    >
      <v-container class="py-0 fill-height">
        <v-app-bar-nav-icon
          v-if="$vuetify.breakpoint.xs && $route.name !== 'FAQs'"
          class="mb-4"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-img
          src="@/assets/logo.svg"
          :alt="$t('RSA Logo')"
          aspect-ratio="1"
          :title="$t('RSA Logo')"
          max-height="50"
          max-width="175"
          class="mx-auto mb-4"
          contain
        ></v-img>
        <template v-if="!$vuetify.breakpoint.xs && $route.name === 'Home'">
          <v-btn
            class="ml-2 mb-3"
            @click="
              $vuetify.goTo(0, {
                duration: 300,
                offset: 0,
                easing: 'easeInOutCubic',
              })
            "
            text
          >
            {{ $t("Sign Up") }}
          </v-btn>
          <v-btn
            class="mb-3"
            @click="
              $vuetify.goTo(processFlow, {
                duration: 300,
                offset: 0,
                easing: 'easeInOutCubic',
              })
            "
            text
          >
            {{ $t("Process Flow") }}
          </v-btn>
        </template>
        <v-btn
          v-if="!$vuetify.breakpoint.xs && $route.name !== 'FAQs'"
          :to="{ name: 'FAQs' }"
          class="mb-3"
          target="_blank"
          text
        >
          {{ $t("FAQs") }}
        </v-btn>
        <v-spacer></v-spacer>
        <span
          v-if="$vuetify.breakpoint.mdAndUp"
          class="mr-3 mb-3"
          style="font-size: 0.75em"
        >
          {{ $t("Preferred language") }}
        </span>
        <v-select
          class="shrink mt-2"
          v-model="$root.$i18n.locale"
          :items="langs"
          @change="changeLocale()"
        >
        </v-select>
        <v-btn
          v-if="$vuetify.breakpoint.mdAndUp"
          class="mb-3 ml-3"
          target="_blank"
          href="https://clickdna.rsa.global/"
          color="error"
        >
          {{ $t("Login") }}
        </v-btn>
      </v-container>
    </v-app-bar>
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.xs && $route.name !== 'FAQs'"
      v-model="drawer"
      absolute
      left
      temporary
    >
      <v-list dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item
            v-if="$route.name === 'Home'"
            @click="
              $vuetify.goTo(0, {
                duration: 300,
                offset: 0,
                easing: 'easeInOutCubic',
              })
            "
          >
            <v-list-item-title>{{ $t("Sign Up") }}</v-list-item-title>
          </v-list-item>

          <v-list-item
            v-if="$route.name === 'Home'"
            @click="
              $vuetify.goTo(processFlow, {
                duration: 300,
                offset: 0,
                easing: 'easeInOutCubic',
              })
            "
          >
            <v-list-item-title>{{ $t("Process Flow") }}</v-list-item-title>
          </v-list-item>

          <v-list-item :to="{ name: 'FAQs' }" target="_blank">
            <v-list-item-title>{{ $t("FAQs") }}</v-list-item-title>
          </v-list-item>

          <v-list-item href="https://clickdna.rsa.global/" target="_blank">
            <v-list-item-title>{{ $t("Login") }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<!-- Google tag (gtag.js) -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-X6JFH9SE0C"
></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-X6JFH9SE0C");
</script>
<script>
import { locales } from "@/config/data";
import { EventBus } from "@/plugins/event-bus";

export default {
  computed: {
    langs() {
      return locales;
    },
    processFlow() {
      return document.querySelector(".process-section")?.offsetTop;
    },
  },
  data() {
    return {
      drawer: false,
      scrolled: false,
    };
  },

  created() {
    window.addEventListener("scroll", this.handleScroll);
  },

  methods: {
    changeLocale() {
      EventBus.$emit("localeChange");
    },
    handleScroll() {
      this.scrolled = window.scrollY > 0;
    },
  },

  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
<style lang="scss" scoped>
.shrink {
  width: 120px;
}
</style>
