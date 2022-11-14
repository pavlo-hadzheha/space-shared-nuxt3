<script lang="ts" setup>
const router = useRouter()
const auth = useAuth()

const navigation = router.options.routes
  .slice()
  .filter((_route) => !!_route.meta.navOrder)
  .sort((a, b) => a.meta.navOrder - b.meta.navOrder)
</script>

<template>
  <header>
    <div class="header">
      <ElContainer class="container p-1 h-full">
        <nav class="nav">
          <div class="nav__brand">
            <NuxtLink class="nav__item">
              <img src="@/assets/svg/planet-space-svgrepo-com.svg" width="46">
              SpaceShare
            </NuxtLink>
          </div>
          <div class="nav__links">
            <NuxtLink
              v-for="_page in navigation"
              :key="_page.name"
              :to="{ name: _page.name }"
              class="nav__item"
              active-class="text-primary"
            >
              <Icon :name="_page.meta.icon" />
              {{ _page.meta.pageLabel }}
            </NuxtLink>
            <span
              class="nav__item"
            >
              <Icon :name="$icons.fasMagnifyingGlassLocation" />
              Search
            </span>
          </div>
          <div class="nav__actions">
            <ClientOnly>
              <NuxtLink v-if="auth.isLoggedIn" to="/me">
                <AppButton :size="$buttonSize.MD">
                  <Icon :name="$icons.fasUserCog" />
                </AppButton>
              </NuxtLink>
              <NuxtLink v-else to="/auth">
                <AppButton :size="$buttonSize.MD">
                  <Icon :name="$icons.fasSignIn" />
                  Sign In/Sign Up
                </AppButton>
              </NuxtLink>
            </ClientOnly>
          </div>
        </nav>
      </ElContainer>
    </div>
    <div class="header header--alt md:hidden">
      <ElContainer class="container md:p-1 p-2 h-full">
        <nav class="nav">
          <div class="nav__brand">
            <NuxtLink class="nav__item">
              <img src="@/assets/svg/planet-space-svgrepo-com.svg" width="46">
            </NuxtLink>
          </div>

          <div class="nav__actions">
            <ClientOnly>
              <NuxtLink v-if="auth.isLoggedIn" to="/me">
                <AppButton :size="$buttonSize.MD">
                  <Icon :name="$icons.fasUserCog" />
                </AppButton>
              </NuxtLink>
              <NuxtLink v-else to="/auth">
                <AppButton :size="$buttonSize.MD">
                  <Icon :name="$icons.fasSignIn" />
                </AppButton>
              </NuxtLink>
            </ClientOnly>
          </div>
        </nav>
      </ElContainer>
    </div>
  </header>
</template>

<style lang="scss" scoped>

.header {
  @apply text-sm;
  @apply fixed bottom-0 right-0 left-0 h-14 bg-white z-10 shadow-from-below;
  font-family: Nunito-Regular;

  .nav {
    @apply h-full flex justify-around items-center;

    &__brand {
      @apply hidden font-medium w-12;
      .nav__item {
          @apply text-primary justify-center items-center flex-col flex gap-2;
      }
    }

    &__links {
      @apply h-full flex justify-around items-center flex-grow;
      .nav__item {
        @apply flex flex-col;
      }
    }

    &__actions {
      @apply hidden;
    }

    .nav__item {
      &-text {
        @apply hidden
      }
    }
  }

  @screen xs {
    .nav {
      // @apply justify-center;
    }
  }

  @screen sm {
    .nav {
      @apply text-sm;

      &__brand {
        @apply hidden;
      }

      &__actions {
        @apply hidden;
      }

      &__links {
        @apply w-full justify-around;
      }
    }
  }

  @screen md {
    // new styles
    @apply w-full flex justify-center items-center;
    // cancel styles
    @apply static shadow-none;
    height: max(12vh, 90px);

    .nav {
      @apply text-lg justify-between;

      &__brand {
        @apply block;
      }

      &__links {
        @apply flex-grow-0 w-max gap-x-5;
        .nav__item {
          @apply flex-row block;
          @apply text-md;
        }
      }

      &__actions {
        @apply block
      }
    }
  }

  @screen lg {
    .nav {
      &__links {
        @apply gap-x-10;
        .nav__item {
          @apply text-lg;
        }
      }
    }
  }
}

.header.header--alt {
  @apply visible static;
  .nav {
    @apply justify-between;

    &__brand {
      @apply block gap-y-0 pl-1;
      .nav__item {
        @apply gap-y-0;
      }

      img {
        @apply w-12;
      }
    }
    &__actions {
      @apply flex;
    }
  }

  @screen sm {
    .nav {
      &__brand {
        @apply visible
      }

      &__actions {
        @apply visible
      }
    }
  }

  @screen md {
    @apply hidden;
  }
}

</style>
