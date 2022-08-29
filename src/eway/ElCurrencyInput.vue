<template>
  <el-input ref="inputRef" :modelValue="formattedValue" />
</template>

<script>
import { useCurrencyInput } from "vue-currency-input";

export default {
  name: "ElCurrencyInput",
  props: {
    modelValue: Number,
    options: Object,
  },
  setup(props) {
    const { inputRef, formattedValue } = useCurrencyInput(props.options);
    if (formattedValue == 0) {
      return ""
    }
    return { inputRef, formattedValue };
  },
};
</script>
