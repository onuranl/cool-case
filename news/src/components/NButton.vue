<script>
export default {
  name: 'NButton',
  props: ['text', 'disabled', 'onClick']
}
</script>

<template>
  <button @click="onClick" :disabled="disabled">{{ text }}</button>
</template>

<style lang="scss" scoped>
button {
  padding: 16px 24px;
  border-radius: 8px;
  background: #c1f1b5;
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.25);

  color: #19326f;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>
