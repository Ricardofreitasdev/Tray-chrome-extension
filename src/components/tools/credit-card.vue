<template>
  <div>
    <button @click="buildCreditCard">
      Gerar cartão de credito
    </button>
    <code @click="copyCreditCard">{{ creditCard }}</code>
  </div>
</template>

<script>
import { utils } from '../../mixin/utils'
export default {
  name: 'AppBuildCreditCard',
  mixins: [utils],
  data() {
    return {
      creditCard: '',
    }
  },
  methods: {
    copyCreditCard() {
      this.copy(this.creditCard)
    },

    buildCreditCard() {
      const bin = '5' + Math.floor(Math.random() * 5) + '1' // Primeiros seis dígitos aleatórios com o padrão de bin da Mastercard
      const numeroCartao =
        bin +
        Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join(
          ''
        ) // Gera os próximos 10 dígitos aleatórios
      const soma = numeroCartao.split('').reduce((acc, digit, index) => {
        // Calcula a soma dos dígitos aplicando o algoritmo de Luhn
        let temp = parseInt(digit)
        if ((numeroCartao.length - index) % 2 === 0) {
          temp *= 2
          if (temp > 9) {
            temp -= 9
          }
        }
        return acc + temp
      }, 0)

      const ultimoDigito = 10 - (soma % 10) // Calcula o último dígito com base na soma
      const numeroCompleto = numeroCartao + ultimoDigito // Concatena todos os dígitos para formar o número completo

      this.creditCard = numeroCompleto
    },
  },
}
</script>

<style></style>
