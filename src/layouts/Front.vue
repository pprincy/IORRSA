<template>
  <v-container style="margin-top: 128px; margin-bottom: 36px">
    <Header />
    <router-view></router-view>
    <Footer />
  </v-container>
</template>
<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  components: {
    Header,
    Footer,
  },
};
</script>
