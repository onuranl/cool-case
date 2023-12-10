<script>
export default {
  name: 'NInput',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>

<template>
  <input v-model="value" v-bind="$attrs" />
</template>

<style lang="scss" scoped>
input {
  height: 48px;
  padding-left: 32px;
  border-radius: 8px;
  border: 1px solid rgba(152, 161, 174, 0.2);
  background: rgba(255, 255, 255, 0.05);

  margin-bottom: 16px;

  color: rgba(167, 174, 180, 0.87);
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:focus {
    border: 1px solid #c1f1b5;
    color: rgba(255, 255, 255, 0.87);
  }
}
</style>
