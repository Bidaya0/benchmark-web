<template>
  <footer>
    <div class="container">
      <div class="copyright">
        <span>© 2022 Selefra.All rights reserved.</span>
        <a
          href="/"
          target="_blank"
          style="pointer-events:none;"
        >Terms </a>
        <a
          href="/"
          target="_blank"
          style="pointer-events:none;"
        >Privacy </a>
        <a
          href="https://selefra.io/docs"
          target="_blank"
          style="pointer-events:none;"
        >Docs</a>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const toHome = () => {
  router.push('/');
  // nextTick(() => {
  //   if (!import.meta.env.SSR) {
  //     document.body.scrollTop = document.documentElement.scrollTop = 0
  //   }
  // })
};
</script>

<style scoped lang="scss">
footer {
  padding-left: 32px;
  background: #FFFFFF;
  color: #434C5B;
  
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  border-top: 1px solid #E5E6EB;
  .copyright {
    display: flex;
    font-size: 14px;
    align-items: center;
    height: 62px;
    span{
      margin-right: 32px;
    }

    a {
      margin-right: 16px;
    }
  }
}

@media only screen and (max-width: 767px) {
  footer {
    width: fit-content;
  }
}

@media only screen and (min-width: 768px) {
}
</style>
