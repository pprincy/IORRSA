<template>
  <v-main>
    <div id="pdf-div">
      <TermsEn
        :seller-details="sellerDetails"
        :sign="sign"
        v-if="$root.$i18n.locale === 'en'"
      />
      <TermsZh :seller-details="sellerDetails" :sign="sign" v-else />
    </div>
    <v-form
      data-html2canvas-ignore="true"
      class="my-16 centerred"
      ref="form"
      v-if="!submitted"
      lazy-validation
    >
      <v-btn
        v-if="sellerDetails.legal_name && !sign"
        color="primary"
        class="my-16"
        @click="signDialog = true"
      >
        {{ $t("I Agree & I'm ready for e-sign") }}
      </v-btn>
      <template v-if="sellerDetails.legal_name && sign">
        <v-checkbox
          :rules="[
            (v) =>
              !!v || $t('Please confirm that you have verified the agreement'),
          ]"
        >
          <template v-slot:label>
            {{ $t("I have verified the agreement") }}
          </template>
        </v-checkbox>
        <v-btn
          color="primary"
          :loading="loader"
          @click="download()"
          class="mt-4"
          data-html2canvas-ignore="true"
        >
          {{ $t("Submit & Download") }}
        </v-btn>
      </template>
    </v-form>
    <Sign :dialog="signDialog" @sign="addSign" @close="signDialog = false" />
  </v-main>
</template>
<script>
import "jspdf/dist/polyfills.es.js";
import jsPDF from "jspdf";
import Sign from "@/views/Sign";
import TermsEn from "@/components/TermsEn";
import TermsZh from "@/components/TermsZh";
import FangSongFontNormal from "@/scss/fonts/FangSong-Normal";
import { mapActions } from "vuex";

export default {
  components: {
    Sign,
    TermsEn,
    TermsZh,
  },
  data() {
    return {
      signDialog: false,
      sign: null,
      loader: false,
      sellerDetails: {},
      submitted: false,
      signImage: null,
    };
  },
  created() {
    this.fetchSellerDetails();
  },
  methods: {
    ...mapActions(["getSellerDetails", "uploadAgreement", "snackBar"]),
    fetchSellerDetails() {
      this.getSellerDetails(this.$route.query.token).then((res) => {
        this.sellerDetails = res.data;
      });
    },
    addSign(data) {
      this.sign = data.sign;
      this.signImage = data.signImage;
    },
    download() {
      if (!this.$refs.form.validate()) {
        return;
      }
      const canvas = document.getElementsByTagName("canvas")[0];
      canvas.setAttribute("width", "546");
      canvas.setAttribute("height", "500");

      const callAddFont = function () {
        this.addFileToVFS(
          "../scss/fonts/FangSong-normal.ttf",
          FangSongFontNormal
        );
        this.addFont("../scss/fonts/FangSong-normal.ttf", "FangSong", "normal");
      };
      jsPDF.API.events.push(["addFonts", callAddFont]);

      const $this = this;
      $this.loader = true;
      const doc = new jsPDF("p", "pt", "a4", true);
      doc.advancedAPI((doc) => {
        const body = document.body;
        doc.html(body, {
          callback: function (doc) {
            const file = new File(
              [doc.output("blob")],
              "RSA Service Agreement.pdf",
              {
                type: "application/pdf",
              }
            );
            const payload = new FormData();
            payload.append(
              "data_file",
              file,
              `${$this.sellerDetails.legal_name} - RSA Agreement.pdf`
            );
            payload.append("token", $this.$route.query.token);
            payload.append("sign_image", $this.signImage);
            $this.uploadAgreement(payload).then((res) => {
              $this.loader = false;
              doc.save(`${$this.sellerDetails.legal_name} - RSA Agreement.pdf`);
              $this.snackBar({
                color: "success",
                message: res.data.message,
              });
              $this.submitted = true;
            });
          },
          x: -90,
          y: 5,
          autoPaging: "text",
          margin: 10,
          width: 800,
          windowWidth: 1920,
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
main {
  max-width: 1024px;
  margin: 0 auto;
}
.centerred {
  margin: 0 auto;
  width: 290px;
}
</style>
