<template>
  <v-dialog v-model="localDialog" max-width="600px" persistent>
    <v-card>
      <v-card-title class="text-h6"> Signature </v-card-title>
      <v-card-text class="text-center">
        <v-file-input
          accept="image/*"
          label="Upload Signature"
          @change="addSign"
        ></v-file-input>
        <div class="caption">OR</div>
        <label class="float-left mt-2 ml-2">Draw your signature here</label>
        <VueSignaturePad
          id="signature"
          width="100%"
          height="500px"
          ref="signaturePad"
          :options="options"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="darken-1" text @click="$emit('close', false)">
          close
        </v-btn>
        <v-btn
          @click="undo"
          text
          color="black darken-1"
          :disabled="disableSave"
        >
          Undo
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          @click="save"
          :disabled="disableSave"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      localDialog: false,
      disableSave: true,
      options: {
        penColor: "#000",
        onBegin: () => {
          this.$refs.signaturePad.resizeCanvas();
          this.disableSave = this.$refs.signaturePad.isEmpty();
        },
        onEnd: () => {
          this.disableSave = this.$refs.signaturePad.isEmpty();
        },
      },
    };
  },
  watch: {
    dialog(newVal) {
      this.localDialog = newVal;
    },
  },
  methods: {
    undo() {
      this.$refs.signaturePad.undoSignature();
      this.disableSave = this.$refs.signaturePad.isEmpty();
    },
    save() {
      const { data } = this.$refs.signaturePad.saveSignature();
      this.$emit("sign", { sign: data, signImage: 2 });
      this.$emit("close", false);
    },
    addSign(file) {
      if (!file) return;
      this.$emit("sign", { sign: URL.createObjectURL(file), signImage: 1 });
      this.$emit("close", false);
    },
  },
};
</script>

<style>
#signature {
  border: double 3px transparent;
  border-radius: 5px;
  background-image: linear-gradient(white, white),
    radial-gradient(circle at top left, #233168, #da1a32);
  background-origin: border-box;
  background-clip: content-box, border-box;
}
</style>
