<template>
  <div>
    <button class="button" @click="gerarCPF">Gerar CPF</button>
    <code v-if="cpf" @click="copy(cpf)">
      {{ cpf }}
    </code>
  </div>
</template>

<script>
import { utils } from "../../mixin/utils";
export default {
  name: "AppBuildCpf",
  mixins: [utils],
  data() {
    return {
      cpf: "",
    };
  },
  methods: {
    gerarCPF() {
      const n = 9;
      const cpfDigits = Array.from({ length: n }, () =>
        Math.floor(Math.random() * 10)
      );

      const dv1 = this.calcularDigitoVerificador(cpfDigits, n + 1);
      cpfDigits.push(dv1);

      const dv2 = this.calcularDigitoVerificador(cpfDigits, n + 2);
      cpfDigits.push(dv2);

      const cpf = cpfDigits.join("");

      this.cpf = cpf;
    },

    calcularDigitoVerificador(digits, weight) {
      const sum = digits.reduce(
        (acc, digit, index) => acc + digit * (weight - index),
        0
      );
      const mod = sum % 11;
      const dv = mod < 2 ? 0 : 11 - mod;

      return dv;
    },
  },
};
</script>

<style lang="scss">
.button {
  background: $bg-color-2;
  border: none;
  padding: 8px;
  color: $text-color;
  cursor: pointer;
  border-radius: 4px;
  transition: ease-in-out 0.3s;

  &:hover {
    background: #383d44;
  }
}
code {
  padding: 2px;
  border-radius: 2px;
}
i {
  margin-left: 15px;
}
</style>
