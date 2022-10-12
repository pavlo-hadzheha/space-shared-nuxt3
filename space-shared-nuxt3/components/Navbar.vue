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
            <NuxtLink class="nav-link">
              <img
                src="@/assets/svg/planet-space-svgrepo-com.svg"
                class="nav-item-icon"
                width="46"
              >
              <span class="nav-item-text">SpaceShare</span>
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
    height: 80px;
    display: none;
    position: static;
    box-shadow: none;

    .wrapper {
      padding: 20px;
      width: 100%;

      .nav {
        &-brand {
          font-size: 14px;

          .nav-item-icon {
            margin-bottom: 5px;
          }
        }

        font-size: 18px;

        .nav-item {
          &-text {
            display: none;
          }
        }
      }
    }
  }

  .header {
    height: max(12vh, 90px);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Nunito-Regular;

    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      font-size: 18px;

      &-brand {
        text-align: center;

        .nav-link {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: var(--primary-color);

          .nav-item-icon {
            margin-bottom: 10px;
          }

          .nav-item-text {
            fill: var(--primary-color)
          }
        }
      }

      &-links {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .nav-item {
          @apply px-[1.4em] py-[0.5em]
        }
      }

      &-actions {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .nav-item {
        &-icon {
          display: block;
        }

        .nav-link {
          color: black;
          display: flex;
          gap: 5px;

          &.btn-regular {
            color: white;
          }

          &.active {
            color: var(--primary-color) !important;
          }
        }
      }

    }
  }

  @media screen and (max-width: 992px) {
    .header {

      .nav {
        font-size: 14px;

      }
    }
  }

  @media screen and (max-width: 768px) {
    .header {
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      height: 60px;
      background-color: white;
      z-index: 1;
      box-shadow: 0 0 10px 0;

      .nav {
        font-size: 14px;

        &-brand {
          display: none;
        }

        &-links {
          width: 100%;
          justify-content: space-around;
        }

        &-actions {
          display: none;
        }

        .nav-link {
          flex-direction: column;
          align-items: center;
        }

      }
    }

    .header.header-alt {
      display: flex;

      .nav {

        &-brand {
          display: block;
        }

        &-actions {
          display: block;
        }

        .nav-link {
          flex-direction: row;
        }

      }
    }
  }

  @media screen and (max-width: 425px) {
    .header {
      .nav {
        font-size: 12px;
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
