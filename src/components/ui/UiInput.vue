<template>
  <div class="form-input" :style="{width: width}">
    <input
      @input="updateValue"
      :type="type"
      :name="name"
      :id="name"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled"
      :min="min"
      :max="max"
      class="input-text"
    >
    <label :for="name" class="input-label">{{label}}</label>
    <TransitionGroup>
      <div
        class="form-error"
        v-for="element of error"
        :key="element.$uid">
        <div class="form-error__message">{{element.$message}}</div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['update:value'])
const props = defineProps({
  error: {
    type: Array,
    required: false
  },
  value: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    required: false
  },
  min: {
    type: Number,
    required: false
  },
  max: {
    type: Number,
    required: false
  },
  width: {
    type: String,
    default: '300px'
  }
})

const updateValue = (e: any) => {
  emit('update:value', e.target.value)
}
</script>

<style lang="scss" scoped>
.form {
  &-input {
    margin-bottom: 30px;
    position: relative;
  }
  &-error {
    background: rgba(211, 2, 2, 0.677);
    margin-top: 4px;
    border-radius: 7px;
    font-size: 13px;
    color: #fff;
    padding: 5px;
  }
}
.input {
  &-text {
  border: 2px solid #fff;
  padding: 0 10px;
  height: 40px;
  border-radius: 7px;
  font-size: 15px;
  width: 100%;
  position: relative;
  z-index: 1;
    &:focus {
      & + .input-label {
        z-index: 1;
        opacity: 1;
        top: -20px;
      }
    }
    &:not(:placeholder-shown) {
      & + .input-label {
        z-index: 1;
        opacity: 1;
        top: -20px;
      }
    }
  }
  &-label {
    font-weight: bold;
    display: block;
    position: absolute;
    top: 20px;
    opacity: 0;
    z-index: -1;
    transition: .3s;
    font-size: 13px;
    color: #1a2129;
  }
  &-text {
    color: #1a2129;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>