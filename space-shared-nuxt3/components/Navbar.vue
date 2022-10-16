<script lang="ts" setup>
const router = useRouter()

const navigation = router.options.routes.slice()
  .filter((_route) => !!_route.meta.navOrder)
  .sort((a, b) => a.meta.navOrder - b.meta.navOrder)

</script>

<template>
  <header class="header">
    <div class="container">
      <div class="wrapper">
        <nav class="nav">
          <div class="nav-brand">
            <NuxtLink class="nav-item">
              <img
                src="@/assets/svg/planet-space-svgrepo-com.svg"
                width="46"
              >
              SpaceShare
            </NuxtLink>
          </div>
          <div class="nav-links">
            <NuxtLink
              v-for="_page in navigation"
              :key="_page.name"
              :to="{name: _page.name}"
              class="nav-item"
              active-class="text-primary"
            >
              <Icon :name="_page.meta.icon" />
              {{ _page.meta.pageLabel }}
            </NuxtLink>
          </div>
          <div class="nav-actions" />
        </nav>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
  .header.header-alt {
    @apply h-80 hidden static shadow-none;

    .wrapper {
      @apply w-full p-20;

      .nav {
        @apply text-18;

        &-brand {
          .nav-item {
            @apply text-primary;
          }
        }

        .nav-item {
          &-text {
            display: none;
          }
        }
      }
    }
  }

  .header {
    @apply w-full flex justify-center items-center;
    height: max(12vh, 90px);
    font-family: Nunito-Regular;

    .nav {
      @apply flex justify-between items-center w-full text-[18px];

      &-brand {
        .nav-item {
            @apply text-primary justify-center items-center flex-col flex gap-1;
        }
      }

      &-links {
        @apply h-full flex justify-center items-center;

        .nav-item {
          @apply px-[1.4em] py-[0.5em]
        }
      }

      &-actions {
        @apply h-full flex justify-center items-center;
      }
    }
  }

  @media screen and (max-width: 992px) {
    .header {

      .nav {
        @apply text-14;

      }
    }
  }

  @media screen and (max-width: 768px) {
    .header {
      @apply fixed bottom-0 right-0 left-0 h-60 bg-white z-1 shadow-4;
      // box-shadow: 0 0 10px 0;

      .nav {
        @apply text-14;

        &-brand {
          @apply hidden;
        }

        &-links {
          @apply w-full justify-around;
        }

        &-actions {
          @apply hidden;
        }

        .nav-link {
          @apply flex-col items-center;
        }

      }
    }

    .header.header-alt {
      @apply flex;

      .nav {
        &-brand {
          @apply block;
        }

        &-actions {
          @apply block;
        }

        .nav-link {
          @apply flex-row;
        }

      }
    }
  }

  @media screen and (max-width: 425px) {
    .header {
      .nav {
        @apply text-12;
      }
    }
  }

  .search-bar {
    position: fixed;
    inset: 0;
    padding: 10px;
    z-index: 3;
    .wrap {
      position: relative;
      label {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-58%);
        z-index: 4;
        font-size: 1.1em;
        cursor: pointer;
      }
    }

    .backdrop {
      position: absolute;
      inset: 0;
      background-color: rgba(0,0,0,0.6);
      backdrop-filter: blur(4px) saturate(80%);
      z-index: -1;
    }
  }

  #search {
    position: relative;
    margin: 0;
    width: 100%;
    height: 48px;
    border-radius: var(--br);
    border: none;
    outline: none;
    padding: 8px 40px;
    box-sizing: border-box;
  }

  .suggestions {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .suggestion {
      background-color: white;
      border-radius: var(--br);
      padding: 8px 40px;
      &:focus {
        background-color: var(--primary-color);
        color: white;
      }
    }
  }
</style>
