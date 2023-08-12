<template>
  <v-main>
    <v-row>
      <v-col cols="12" class="form-row">
        <Header />
        <v-container style="margin-top: 128px">
          <v-row>
            <v-col cols="12" md="7" class="align-self-center">
              <h1 class="main-title text-center">
                {{
                  $t("Your Gateway to {clientName}'s UAE Free Zone Program", {
                    clientName,
                  })
                }}
              </h1>
              <v-row>
                <v-col cols="12" md="6" sm="6">
                  <v-card class="elevation-5 card-section text-center">
                    <v-card-text>
                      <img src="/images/Customc-Clearance.png" />
                      <p class="text-h6 primary--text">
                        {{ $t("home.h1") }}
                      </p>
                      <p>
                        {{ $t("home.p1") }}
                      </p>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" md="6" sm="6">
                  <v-card class="elevation-5 card-section text-center">
                    <v-card-text>
                      <img src="/images/Our-privilege-is-yours.png" />
                      <p class="text-h6 primary--text">
                        {{ $t("home.h2") }}
                      </p>
                      <p>
                        {{ $t("home.p2") }}
                      </p>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6" sm="6">
                  <v-card class="elevation-5 card-section text-center">
                    <v-card-text>
                      <img src="/images/Time-and-cost-efficiency.png" />
                      <p class="text-h6 primary--text">
                        {{ $t("home.h3") }}
                      </p>
                      <p>
                        {{ $t("home.p3") }}
                      </p>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" md="6" sm="6">
                  <v-card class="elevation-5 card-section text-center">
                    <v-card-text>
                      <img src="/images/IOR-duties-done-right.png" />
                      <p class="text-h6 primary--text">
                        {{ $t("home.h4") }}
                      </p>
                      <p>
                        {{ $t("home.p4") }}
                      </p>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="5">
              <v-card v-if="verified" class="fill-height">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title class>
                    {{ $t("Sign Up") }}
                  </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-alert v-if="successMsg" type="success" text>
                    {{ successMsg }}
                  </v-alert>
                  <v-form v-if="!successMsg" ref="form" lazy-validation>
                    <v-row>
                      <v-col cols="12" md="6" class="py-0">
                        <v-text-field
                          v-model="formData.name"
                          :label="$t('Seller Company Name')"
                          type="text"
                          :rules="[
                            (v) => (v && !!v.trim()) || $t('Field is required'),
                          ]"
                          class="required"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6" class="py-0">
                        <v-text-field
                          v-model="formData.legal_name"
                          :label="$t('Company Legal Name')"
                          :hint="
                            $t(
                              'This name will be used for all agreement purposes'
                            )
                          "
                          type="text"
                          :rules="[
                            (v) => (v && !!v.trim()) || $t('Field is required'),
                          ]"
                          class="required"
                        >
                          <template v-slot:message="{ message }">
                            <span
                              :class="{
                                'hint-text':
                                  message ===
                                  $t(
                                    'This name will be used for all agreement purposes'
                                  ),
                              }"
                              v-html="message"
                            ></span>
                          </template>
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" md="6" class="py-0">
                        <v-text-field
                          v-model="formData.signatory_name"
                          :label="$t('Signatory Name')"
                          type="text"
                          :rules="[
                            (v) => (v && !!v.trim()) || $t('Field is required'),
                          ]"
                          class="required"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6" class="py-0">
                        <v-text-field
                          v-model="formData.email"
                          :label="$t('Email')"
                          type="email"
                          :rules="[
                            (v) => (v && !!v.trim()) || $t('Field is required'),
                            (v) =>
                              /.+@.+\..+/.test(v) || $t('E-mail must be valid'),
                          ]"
                          class="required"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6" class="py-0">
                        <v-text-field
                          v-model="formData.phone_number"
                          :label="$t('Phone number')"
                          type="number"
                          :rules="[
                            (v) => (v && !!v.trim()) || $t('Field is required'),
                            (v) => rules.min(5, formData.phone_number),
                          ]"
                          class="required"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6" class="py-0">
                        <v-text-field
                          v-model="formData.client_merchant_id"
                          :label="
                            $t('{clientName} Merchant Token', { clientName })
                          "
                          :rules="[
                            (v) => (v && !!v.trim()) || $t('Field is required'),
                          ]"
                          class="required"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6" class="py-0">
                        <v-text-field
                          v-model="formData.job_title"
                          :label="$t('Job Title')"
                          type="text"
                          :rules="[
                            (v) => (v && !!v.trim()) || $t('Field is required'),
                          ]"
                          class="required"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6" class="py-0">
                        <v-select
                          v-model="formData.shipping_status"
                          :label="$t('Also looking for')"
                          :items="allShippingStatuses"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="12" class="py-0">
                        <v-autocomplete
                          v-model="formData.country_code"
                          :label="$t('Country')"
                          :items="allCountries"
                          :rules="[
                            (v) => (v && !!v.trim()) || $t('Field is required'),
                          ]"
                          class="required"
                          autocomplete="new"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" class="py-0">
                        <v-textarea
                          no-resize
                          rows="1"
                          :label="$t('Legal Address')"
                          v-model="formData.legal_address"
                          :rules="[
                            (v) => (v && !!v.trim()) || $t('Field is required'),
                          ]"
                          class="required"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                    <v-checkbox
                      :rules="[
                        (v) =>
                          !!v ||
                          $t(
                            'Please confirm that you have read and agree to the Privacy Policy and Terms of Use'
                          ),
                      ]"
                    >
                      <template v-slot:label>
                        <p class="pt-4">
                          {{ $t("By submitting this form, you agree to our") }}
                          <a
                            href="https://www.rsa.global/privacy-policy"
                            target="_blank"
                            @click.stop
                          >
                            {{ $t("Privacy Policy") }}
                          </a>
                          {{ $t("and") }}
                          <a
                            href="https://www.rsa.global/terms-of-use"
                            target="_blank"
                            @click.stop
                          >
                            {{ $t("Terms of Use") }}
                          </a>
                        </p>
                      </template>
                    </v-checkbox>
                  </v-form>
                </v-card-text>
                <v-card-actions v-if="!successMsg">
                  <v-spacer></v-spacer>
                  <v-btn
                    class="ma-2 mt-0"
                    color="primary"
                    @click="save()"
                    :loading="loader"
                  >
                    {{ $t("Submit") }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col cols="12" class="process-section">
        <v-container>
          <h1 class="process-flow-title">
            {{ $t("Process Flow") }}
          </h1>
          <p class="mb-6">
            {{ $t("Follow the steps for an easy onboarding process") }}
          </p>
          <ul>
            <li>
              <img class="step-img" src="/images/Sign-Up.png" alt="Sign-Up" />
              <h1>1</h1>
              <h2>{{ $t("Step1Title") }}</h2>
              <p>
                {{ $t("Step1Text") }}
              </p>
            </li>
            <li>
              <img
                class="step-img"
                src="/images/Agreement.png"
                alt="Agreement"
              />
              <h1>2</h1>
              <h2>{{ $t("Step2Title") }}</h2>
              <p>{{ $t("Step2Text") }}</p>
            </li>
            <li>
              <img
                class="step-img"
                src="/images/Enrollment.png"
                alt="Enrollment"
              />
              <h1>3</h1>
              <h2>{{ $t("Step3Title") }}</h2>
              <p>{{ $t("Step3Text") }}</p>
            </li>
            <li>
              <img
                class="step-img"
                src="/images/Ready-to-ship.png"
                alt="Ready-to-ship"
              />
              <h1>4</h1>
              <h2>{{ $t("Step4Title") }}</h2>
              <p>{{ $t("Step4Text") }}</p>
            </li>
            <li>
              <img class="step-img" src="/images/Shipped.png" alt="Shipped" />
              <h1>5</h1>
              <h2>{{ $t("Step5Title") }}</h2>
              <p>{{ $t("Step5Text") }}</p>
            </li>
          </ul>
        </v-container>
      </v-col>
    </v-row>
    <v-container>
      <Footer />
    </v-container>
  </v-main>
</template>
<script>
import { countries, shippingStatuses } from "@/config/data";
import { load } from "recaptcha-v3";
import { mapActions } from "vuex";
import { EventBus } from "@/plugins/event-bus";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  components: {
    Header,
    Footer,
  },
  computed: {
    allCountries() {
      return Object.keys(countries).map((i) => {
        return {
          text: countries[i],
          value: i,
        };
      });
    },
    allShippingStatuses() {
      return Object.keys(shippingStatuses).map((i) => {
        return {
          text: shippingStatuses[i],
          value: i,
        };
      });
    },
  },

  data() {
    return {
      loader: false,
      verified: false,
      formData: {},
      successMsg: null,
      clientName: null,
      rules: {
        min(min, v) {
          console.log("rules.min(5, formData.phone_number)");
          return (
            (v || "").length >= min ||
            `Value must be at least ${min}` ||
            $t(`Value must be at least ${min}`)
          );
        },
      },
    };
  },

  created() {
    this.verifyClientId();
    EventBus.$off("localeChange");
    EventBus.$on("localeChange", () => {
      this.$refs.form.resetValidation();
    });
  },

  methods: {
    ...mapActions(["verifyLink", "saveSellerDetails"]),

    verifyClientId() {
      this.verifyLink({
        client_identification_token: this.$route.params.client_id,
      }).then((res) => {
        this.verified = res.data.verified;
        this.clientName = res.data.client_name;
      });
    },

    async save() {
      try {
        if (!this.$refs.form.validate()) {
          return;
        }
        this.loader = true;
        const recaptcha = await load(process.env.VUE_APP_RECAPTCHA_KEY, {
          useRecaptchaNet: true,
        });
        const token = await recaptcha.execute("login");
        this.formData.captcha = token;
        this.formData.client_identification_token =
          this.$route.params.client_id;
        const res = await this.saveSellerDetails(this.formData);
        this.loader = false;
        this.successMsg = res.data.message;
      } catch (error) {
        this.loader = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.form-row {
  background-image: url("/images/banner.png");
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  &::before {
    position: absolute;
    width: 100%;
    height: 100%;
    content: " ";
    opacity: 0.6;
    background: #fff;
  }
}
.hint-text {
  font-weight: bold;
  color: #c9761a;
}
.main-title,
.process-flow-title {
  color: $primary;
  font-weight: bolder;
  margin-bottom: 15px;
  line-height: normal;
  position: relative;
}
.process-flow-title {
  text-align: center !important;
  margin: 0 auto;
}
.card-section {
  background-color: rgba(255, 255, 255, 0.95);
  font-weight: 500;
  p {
    line-height: 1.275rem;
    color: $primary;
  }
}
.elevation-5 {
  height: 100%;
  img {
    height: 60px;
  }
}
.process-section {
  background: white;
  color: #78797c;
  position: relative;
  margin-bottom: 20px;
  p {
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.275rem;
    letter-spacing: 0.0071428571em;
    text-align: center;
  }
  .step-img {
    width: 120px;
    height: 120px;
    background: #cff3ff;
    border-radius: 40px;
    margin: 0 auto;
    padding: 10px;
  }
  h2 {
    color: $primary;
    padding-left: 10px;
    margin-top: 10px;
    font-size: 1.25em;
    text-align: center;
  }
  ul {
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-between;
  }
  li {
    display: flex;
    flex-direction: column;
    width: 200px;
    position: relative;
    p {
      padding-left: 10px;
    }
    h1 {
      color: $primary;
      margin-top: -26px;
      margin-left: 30%;
    }
  }
}

@media only screen and (max-width: 768px) {
  .process-section {
    text-align: center !important;
    ul {
      display: inline-block !important;
      li,
      h1 {
        position: unset !important;
      }
      h1 {
        margin-left: -30%;
      }
      li {
        width: 200px;
      }
    }
  }
}
</style>
