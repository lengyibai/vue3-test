<template>
  <div ref="TriggerRay" class="TriggerRay">
    <div v-if="play" class="icon">
      <div class="shine">
        <span style="--i: 1"></span>
        <span style="--i: 2"></span>
        <span style="--i: 3"></span>
        <span style="--i: 4"></span>
        <span style="--i: 5"></span>
        <span style="--i: 6"></span>
        <span style="--i: 7"></span>
        <span style="--i: 8"></span>
        <span style="--i: 9"></span>
        <span style="--i: 10"></span>
        <span style="--i: 11"></span>
        <span style="--i: 12"></span>
        <span style="--i: 13"></span>
        <span style="--i: 14"></span>
        <span style="--i: 15"></span>
        <span style="--i: 16"></span>
      </div>
    </div>
    <i
      :style="{ color: color, width: size, height: size }"
      :class="{
        scale: active,
      }"
      @click="fn"
      v-html="icon"
    ></i>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";

interface Props {
  modelValue?: boolean;
  color?: string;
  icon?: string;
  size?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  color: "red",
  icon: "",
  size: "50px",
});

const TriggerRay = ref();

const play = ref(false);
const active = ref(false);
const color = ref("#666");

if (props.modelValue) {
  color.value = props.color;
}

const fn = () => {
  if (color.value === props.color) {
    color.value = "#666";
    return;
  }
  active.value = true;
  play.value = true;
  setTimeout(() => {
    color.value = props.color;
  }, 150);
  setTimeout(() => {
    active.value = false;
  }, 500);

  if (play.value) {
    setTimeout(() => {
      play.value = false;
    }, 750);
  }
};

onMounted(() => {
  TriggerRay.value.style.setProperty("--color", props.color);
  TriggerRay.value.style.setProperty("--size", TriggerRay.value.offsetWidth / 100);
});
</script>
<style scoped lang="less">
/* stylelint-disable keyframes-name-pattern */
.TriggerRay {
  --color: red;
  --size: 1;

  position: relative;

  i {
    z-index: 1;
    display: inline-block;
  }

  .scale {
    animation: scale 0.5s;
  }

  @keyframes scale {
    35% {
      transform: scale(0);
    }

    75% {
      transform: scale(1.3);
    }

    100% {
      transform: scale(1);
    }
  }

  .icon {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .shine {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .shine::after {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    box-sizing: border-box;
    content: "";
    transform: translate(-50%, -50%);
    animation: ray_border 0.4s ease-out;
  }

  @keyframes ray_border {
    0% {
      width: 0;
      height: 0;
      border: 0 solid var(--color);
      opacity: 0.75;
    }

    35% {
      width: calc(100px * var(--size));
      height: calc(100px * var(--size));
      border: calc(50px * var(--size)) solid var(--color);
      opacity: 0.75;
    }

    100% {
      width: calc(200px * var(--size));
      height: calc(200px * var(--size));
      border: 0 solid var(--color);
      opacity: 0.75;
    }
  }

  .shine span {
    position: absolute;
    display: block;
    width: calc(5px * var(--size));
    border-radius: 50%;
    background-color: var(--color);
  }

  .shine span:nth-child(even) {
    height: calc(30px * var(--size));
    animation: ray_even 0.75s ease;
  }

  .shine span:nth-child(odd) {
    height: calc(15px * var(--size));
    animation: ray_odd 0.75s ease;
  }

  @keyframes ray_even {
    0% {
      opacity: 1;
      transform: rotate(calc(22.5deg * var(--i))) translateY(0);
    }

    60% {
      height: calc(30px * var(--size));
      opacity: 0.8;
    }

    100% {
      height: calc(10px * var(--size));
      opacity: 0;
      transform: rotate(calc(22.5deg * var(--i))) translateY(calc(120px * var(--size)));
    }
  }

  @keyframes ray_odd {
    0% {
      opacity: 1;
      transform: rotate(calc(22.5deg * var(--i))) translateY(0);
    }

    60% {
      height: calc(15px * var(--size));
      opacity: 1;
    }

    100% {
      height: calc(10px * var(--size));
      opacity: 0;
      transform: rotate(calc(22.5deg * var(--i))) translateY(calc(125px * var(--size)));
    }
  }
}
</style>
