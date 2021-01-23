<template>
  <div class="Auth">
    <div class="row">
      <aside class="col-7 bg-primary p-5">
        <h1 class="text-white">Zwallet</h1>
        <img src="@/assets/auth-phones.png" alt="Phones">
        <h2 class="text-white mb-5">App that Covering Banking Needs.</h2>
        <h3 class="text-white fw-light fs-5">Zwallet is an application that focussing in banking needs for all users in the world. Always updated and always following world trends. 5000+ users registered in Zwallet everyday with worldwide users coverage.</h3>
      </aside>
      <main class="col-5 p-4">
        <h2 class="mb-5" v-if="$route.name !== 'CreatePIN'">Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</h2>
        <h3 class="text-muted fw-light fs-5" v-if="$route.name !== 'CreatePIN'">Transfering money is eassier than ever, you can access Zwallet wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</h3>
        <h2 class="mb-5" v-if="$route.name === 'CreatePIN'">Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN That You Created Yourself.</h2>
        <h3 class="text-muted fw-light fs-5" v-if="$route.name === 'CreatePIN'">Create 6 digits pin to secure all your money and your data in Zwallet app. Keep it secret and don’t tell anyone about your Zwallet account password and the PIN.</h3>
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Auth'
}
</script>

<style scoped lang="css">
div.Auth aside h2,
div.Auth aside h3,
div.Auth main h2,
div.Auth main h3,
div.Auth main p,
div.Auth main form {
  width: 85%;
  line-height: 1.5;
}

@media (max-width: 768px) {
  div.Auth aside {
    display: none;
  }

  div.Auth main {
    width: 720px;
  }

  div.Auth main h2,
  div.Auth main h3,
  div.Auth main form,
  div.Auth main p {
    width: 100%;
  }
}
</style>