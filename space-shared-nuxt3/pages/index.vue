<script lang="ts" setup>
import { FontAwesomeIconsList } from '@/plugins/font-awesome.plugin'

definePageMeta({
  pageLabel: 'Home',
  navOrder: 1,
  icon: FontAwesomeIconsList.fasHome,
  middleLink: true
})
</script>

<template>
  <div>
    <section id="home-top" class="section home-top">
      <video id="video" class="video" src="@/assets/home-video.mp4" autoplay loop />
      <div class="container">
        <div class="home-top-content">
          <h1 class="home-top-content-title">Work from Anywhere</h1>
          <div class="home-top-content-actions">
            <a class="btn btn-regular" href="#bigTitle">For individuals</a>
            <a class="btn btn-regular" href="#forBusiness">For Business</a>
          </div>
        </div>
      </div>
    </section>

    <section id="about" class="section about">
      <div class="container">
        <h2 id="bigTitle" class="big-title"><span>How does it work</span></h2>
        <div id="forIndividuals" class="block clearfix">
          <h3 class="block-title">For hosts</h3>
          <h4 class="block-subtitle">Monetise your spare desks</h4>
          <div class="block-gist">
            <div class="block-info">
              <p class="block-info-text">
                In this current climate, there are more than a few empty offices around -
                as people are encouraged to work from home. Did you know that each empty desk you have could be
                bringing you up to an extra £1500 a month? <br><br>

                We will work with you every step of the way, from guiding you to define the best prices for your
                area, to ensuring appropriate distancing precautions are taken. You set the availability, and we
                take care of the rest. There are no fees to join or to be on the platform, ever. We take a small
                commission (10%) and that's it. <br><br>
                You set your desired payout frequency so the admin is kept simple. We simply cannot find a
                downside to joining nimbld.
              </p>
              <div class="block-info-actions">
                <NuxtLink>
                  <el-button>Register</el-button>
                </NuxtLink>
                <NuxtLink>
                  <el-button>See more</el-button>
                </NuxtLink>
              </div>
            </div>
            <div class="block-image">
              <svg
                id="svgcomp-kd7dor6g" ref="svgcomp-kd7dor6g" key="svgcomp-kd7dor6g"
                viewBox="0 0 480 390" version="1.1" role="img"
                aria-label="ron-mcclenny-9yI8eQ9mdvY-unsplash.jpg"
              >
                <defs>
                  <filter id="mask-comp-kd7dor6g-svg-bleach">
                    <feColorMatrix
                      type="matrix" values="0 0 0 0 1
                                          0 0 0 0 1
                                          0 0 0 0 1
                                          0 0 0 1 0"
                    />
                  </filter>
                  <mask id="mask-comp-kd7dor6g">
                    <use
                      id="mask-comp-kd7dor6g-svg-use" filter="url(#mask-comp-kd7dor6g-svg-bleach)"
                      xlink:href="#mask-comp-kd7dor6g-svg" width="100%" height="100%" x="0" y="0"
                    />
                  </mask>
                  <svg
                    id="mask-comp-kd7dor6g-svg" role="presentation" aria-hidden="true"
                    preserveAspectRatio="none" data-bbox="22.08 35.313 155.84 127.334"
                    viewBox="22.08 35.313 155.84 127.334" height="200" width="200"
                    xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" data-type="tint"
                  >
                    <g>
                      <path fill="#141414" d="M132.308 44.816v117.831l45.612-9.503V35.313l-45.612 9.503z" />
                      <path fill="#141414" d="M22.08 162.647l45.612-9.503V35.313L22.08 44.816v117.831z" />
                      <path fill="#141414" d="M77.194 153.144l45.612 9.503V44.816l-45.612-9.503v117.831z" />
                    </g>
                  </svg>
                </defs>
                <image
                  key="image"
                  xlink:href="@/assets/home-for-hosts.webp"
                  data-type="image" width="480" height="390" preserveAspectRatio="xMidYMid slice"
                  mask="url(#mask-comp-kd7dor6g)" data-svg-mask="mask-comp-kd7dor6g-svg"
                  style="width: 480px; height: 390px; object-fit: cover;"
                />
              </svg>
            </div>
          </div>
        </div>
        <div id="forBusiness" class="block">
          <h3 class="block-title">For individuals</h3>
          <h4 class="block-subtitle">Affordable and flexible workspaces, anywhere</h4>
          <div class="block-gist">
            <div class="block-image">
              <svg
                id="svgcomp-kgwitsar" ref="svgcomp-kgwitsar" key="svgcomp-kgwitsar"
                viewBox="0 0 480 394" version="1.1" role="img"
                aria-label="paul-hanaoka-HbyYFFokvm0-unsplash.jpg"
              >
                <defs>
                  <filter id="mask-comp-kgwitsar-svg-bleach">
                    <feColorMatrix
                      type="matrix" values="0 0 0 0 1
                                          0 0 0 0 1
                                          0 0 0 0 1
                                          0 0 0 1 0"
                    />
                  </filter>
                  <mask id="mask-comp-kgwitsar">
                    <use
                      id="mask-comp-kgwitsar-svg-use" filter="url(#mask-comp-kgwitsar-svg-bleach)"
                      xlink:href="#mask-comp-kgwitsar-svg" width="100%" height="100%" x="0" y="0"
                    />
                  </mask>
                  <svg
                    id="mask-comp-kgwitsar-svg" role="presentation" aria-hidden="true"
                    preserveAspectRatio="none" data-bbox="22.08 35.313 155.84 127.334"
                    viewBox="22.08 35.313 155.84 127.334" height="200" width="200"
                    xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" data-type="tint"
                  >
                    <g>
                      <path fill="#141414" d="M132.308 44.816v117.831l45.612-9.503V35.313l-45.612 9.503z" />
                      <path fill="#141414" d="M22.08 162.647l45.612-9.503V35.313L22.08 44.816v117.831z" />
                      <path fill="#141414" d="M77.194 153.144l45.612 9.503V44.816l-45.612-9.503v117.831z" />
                    </g>
                  </svg>
                </defs>
                <image
                  key="image"
                  xlink:href="@/assets/home-for-users.webp"
                  data-type="image" width="480" height="394" preserveAspectRatio="xMidYMid slice"
                  mask="url(#mask-comp-kgwitsar)" data-svg-mask="mask-comp-kgwitsar-svg"
                  style="width: 480px; height: 394px; object-fit: cover;"
                />
              </svg>
            </div>
            <div class="block-info">
              <p class="block-info-text">
                Tired of working from home? Tired of a long commute? Expensive office
                contracts, long
                leases? <br><br>

                Why not work from a penthouse in Dublin, work from a barn in the South of France, work with
                like-minded
                creatives in a quiet office in London, or wherever else work takes you?
              </p>
              <div class="block-info-actions">
                <NuxtLink>
                  <el-button>Sign Up</el-button>
                </NuxtLink>
                <NuxtLink>
                  <el-button>See more</el-button>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="hosts" class="section hosts">
      <div class="container-fluid">
        <div class="gallery-wrapper">
          <div class="gallery-container" />
        </div>
      </div>
    </section>

    <section class="section newsletter">
      <h3 class="big-title">Sign up to out newsletter below:</h3>
      <form class="input-wrapper">
        <input type="text" class="form-control" placeholder="Email Address">
        <input type="submit" class="btn btn-regular" value="Subscribe">
      </form>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.section {
  position: relative;
  width: 100%;
  font-family: Nunito-Regular;
  margin-bottom: 100px;
  @media screen and (max-width: 768px) {
    margin-bottom: 30px;
  }
}

.home-top {
  position: relative;
  max-height: max(88vh, 696.5px);
  overflow: hidden;

  .video {
    background-color: darkgrey;
    filter: brightness(60%);
    min-width: 100%;
    z-index: -1;
  }

  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  &-content {
    text-align: center;

    &-title {
      color: white;
      font-size: 80px;
      font-family: Nunito-Bold;
      margin-bottom: 0.4em;
      word-wrap: normal;
    }

    &-actions {
      display: flex;
      justify-content: center;
      gap: 20px;

      .btn {
        font-size: 24px;
      }
    }
  }

  &-video {
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    position: absolute;
    width: 100%;
    z-index: -1;

    video {
      width: 100%;
    }
  }
}

.about {
  .block {
    margin-bottom: 100px;

    .block-title {
      font-size: calc((40 / 16) * 1rem);
      margin-bottom: 1rem;
    }

    .block-subtitle {
      font-size: 2rem;
      font-family: Nunito-Bold;
      margin-bottom: 1rem;
      color: var(--primary-color);
    }

    .block-gist {
      display: flex;
      align-items: stretch;
      margin-top: 1em;
      gap: 30px;

      .block-image {
        height: 100%;
        svg {
          width: 480px;
        }
      }

      .block-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        &-text {
          font-size: 1.125rem;
          line-height: 1.3em;
          margin-bottom: 1rem;
        }

        &-actions {
          display: flex;
          justify-content: space-between;

          .btn {
            font-size: 1.25rem;
          }
        }
      }
    }
  }

  overflow-x: hidden;

  .big-title {
    text-align: right;
    font-size: 60px;
    margin-bottom: 130px;

    span {
      position: relative;
      width: 700px;

      &::after {
        content: '';
        position: absolute;
        bottom: -29px;
        left: -30px;
        background-color: rgba(var(--primary-green-raw), var(--alpha));
        height: 60px;
        width: 200%;
        z-index: -1;
      }
    }
  }
}

.gallery-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .gallery-container {
    width: 850px;
  }
}

.newsletter {
  width: min(70%, 600px);
  margin: 0 auto 4rem;
  .big-title {
    font-size: 30px;
    text-align: center;
    margin-bottom: 30px;
  }
  .input-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 40px 40px;
    row-gap: 20px;
  }

  @media screen and (max-width: 768px) {
    width: calc(100% - 40px);
    margin: 0 auto 8rem;
    .big-title {
      font-size: 20px;
      margin-bottom: 20px;
    }
  }

  @media screen and (max-width: 576px) {
    width: calc(100% - 40px);
    .big-title {
      font-size: 20px;
      margin-bottom: 20px;
    }
  }
}

@media screen and (max-width: 992px) {
  .about {
    .container {
      padding: 20px;
    }

    .block {
      .block-gist {
        flex-direction: column;
      }

      &:first-of-type {
        .block-gist {
          .block-image {
            align-self: flex-end;
            order: 1;
            width: 100%;

            svg {
              width: 100%;
            }
          }

          .block-info {
            order: 2
          }
        }

        .block-title,
        .block-subtitle {
          text-align: right;
        }
      }

      &:last-of-type {
        .block-gist {
          .block-image {
            width: 100%;

            svg {
              width: 100%;
            }
          }
        }
      }
    }

    .big-title {
      font-size: 48px;
    }
  }
}

@media screen and (max-width: 768px) {
  .home-top {
    &-content {

      &-title {
        font-size: 36px;
      }

      &-actions {
        .btn {
          font-size: 18px;
        }
      }
    }
  }

  .about {
    .big-title {
      font-size: 48px;
      margin-bottom: 100px;
    }
  }
}

@media screen and (max-width: 576px) {
  .home-top {
    &-content {
      &-actions {
        .btn {
          font-size: 14px;
        }
      }
    }
  }

  .about {
    .block {
      .block-title {
        font-size: 1.75rem;
      }

      .block-subtitle {
        font-size: 1.25rem;
      }

      .block-gist {
        .block-info {
          &-text {
            font-size: 1rem;
            line-height: 1.2em;
            margin-bottom: 1rem;
          }

          &-actions {
            .btn {
              font-size: 1rem;
            }
          }
        }
      }
    }

    .big-title {
      font-size: 30px;
      padding-right: 10vw;
      margin-bottom: 60px;

      span {
        &::after {
          height: 35px;
          bottom: -15px
        }
      }
    }
  }
}
</style>
