<template>
  <div
    class="wrapper"
    :class="{
      'bg-primary': visibleForm === ELocalForm.SIGN_IN,
      'bg-success': visibleForm === ELocalForm.SIGN_UP,
    }"
  >
    <NuxtLink class="self-start absolute top-5 left-5">
      <AppButton
        :size="$buttonSize.XXL"
        :type="buttonType"
        text
        @click="$router.back()"
      >
        <Icon class="text-white" :name="$icons.fasArrowLeft" />
      </AppButton>
    </NuxtLink>
    <div class="container h-full">
      <div class="container__inner">
        <div class="glass">
          <div class="glass__box signin">
            <AppButton
              :size="$buttonSize.XL"
              :type="$componentType.SUCCESS"
              @click="visibleForm = ELocalForm.SIGN_IN"
            >
              SignIn
            </AppButton>
          </div>

          <div class="glass__box signup">
            <AppButton
              :size="$buttonSize.XL"
              :type="$componentType.PRIMARY"
              @click="visibleForm = ELocalForm.SIGN_UP"
            >
              SignUp
            </AppButton>
          </div>
        </div>
        <div
          class="container__inner__slider"
          :class="{'is-right': visibleForm === ELocalForm.SIGN_UP}"
        >
          <div
            class="form form--signin"
            :class="{
              'left-0': visibleForm === ELocalForm.SIGN_IN,
              '-left-full': visibleForm === ELocalForm.SIGN_UP,
            }"
          >
            <Compute
              #default="{model, config, data}"
              :model="useFormSignIn.model"
              :config="useFormSignIn.config"
              :data="useFormSignIn.config.data"
            >
              <el-form
                :ref="config.ref"
                :rules="config.rules"
                :model="model"
                class="w-full"
                label-position="top"
              >
                <h1 class="text-info text-3xl mb-10">Sign In</h1>
                <el-form-item
                  :prop="data.email.prop"
                  :label="data.email.label"
                >
                  <el-input
                    v-model="model.email"
                    type="email"
                    :size="$componentSize.DEFAULT"
                  />
                </el-form-item>

                <el-form-item
                  :prop="data.password.prop"
                  :label="data.password.label"
                >
                  <el-input
                    v-model="model.password"
                    type="password"
                    :size="$componentSize.DEFAULT"
                    show-password
                  />
                </el-form-item>

                <AppButton :size="$buttonSize.MD" @click.prevent="signIn">
                  Submit
                </AppButton>
              </el-form>
            </Compute>
          </div>

          <div
            class="form form--signup"
            :class="{
              'right-0': visibleForm === ELocalForm.SIGN_UP,
              '-right-full': visibleForm === ELocalForm.SIGN_IN,
            }"
          >
            <Compute
              #default="{model, config, data}"
              :model="useFormSignUp.model"
              :config="useFormSignUp.config"
              :data="useFormSignUp.config.data"
            >
              <el-form
                :ref="config.ref"
                :rules="config.rules"
                :model="model"
                class="w-full"
                label-position="top"
              >
                <h1 class="text-info text-3xl mb-10">Sign Up</h1>
                <el-form-item
                  :prop="data.firstName.prop"
                  :label="data.firstName.label"
                >
                  <el-input
                    v-model="model.firstName"
                    type="email"
                    :size="$componentSize.SMALL"
                  />
                </el-form-item>

                <el-form-item
                  :prop="data.lastName.prop"
                  :label="data.lastName.label"
                >
                  <el-input
                    v-model="model.lastName"
                    type="email"
                    :size="$componentSize.SMALL"
                  />
                </el-form-item>

                <el-form-item
                  :prop="data.email.prop"
                  :label="data.email.label"
                >
                  <el-input
                    v-model="model.email"
                    type="email"
                    :size="$componentSize.SMALL"
                  />
                </el-form-item>

                <el-form-item
                  :prop="data.password.prop"
                  :label="data.password.label"
                >
                  <el-input
                    v-model="model.email"
                    type="password"
                    :size="$componentSize.SMALL"
                    show-password
                  />
                </el-form-item>
                <AppButton
                  :size="$buttonSize.MD"
                  :type="$componentType.SUCCESS"
                  @click.prevent="signUp"
                >
                  Submit
                </AppButton>
              </el-form>
            </Compute>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EComponentType } from '@/types'

enum ELocalForm {
  SIGN_IN = 1,
  SIGN_UP = 2
}

definePageMeta({
  pageLabel: 'Add',
  layout: 'blank'
})

const buttonType = ref<EComponentType>(EComponentType.SUCCESS)
const visibleForm = ref<ELocalForm>(ELocalForm.SIGN_IN)

const useFormSignIn = (() => {
  const model = reactive(create())
  const config = useFormConfig({
    email: { label: 'Email', type: 'email', required: true },
    password: { label: 'Password', required: true }
  })

  function create () {
    return {
      email: '',
      password: ''
    }
  }
  return {
    model,
    config,
    create
  }
})()

const useFormSignUp = (() => {
  const model = reactive(create())
  const config = useFormConfig({
    firstName: { label: 'First name', required: true },
    lastName: { label: 'Last name', required: true },
    email: { label: 'Email', type: 'email', required: true },
    password: { label: 'Password', required: true }
  })

  function create () {
    return {
      role: null,
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  }
  return {
    model,
    config,
    create
  }
})()

async function signIn () {
  await useFormSignIn.config.validate()
}

async function signUp () {
  await useFormSignUp.config.validate()
}

watch(visibleForm, (_form) => {
  if (_form === ELocalForm.SIGN_IN) {
    useFormSignIn.config.resetFields()
  } else {
    useFormSignIn.config.resetFields()
  }
})

</script>

<style lang="scss" scoped>
.wrapper {
  @apply p-7 h-screen overflow-hidden duration-300 relative;
  .container {
    @apply flex justify-center items-center;
    &__inner {
      @apply relative w-[800px] h-[500px] m-5;
      &__slider {
        @apply absolute left-0 top-0 h-full w-1/2 bg-white;
        @apply z-10 flex justify-center items-center overflow-x-hidden;
        box-shadow: 0 5px 45px rgba(0,0,0,0.15);
        transition: left 0.5s ease;
        &.is-right {
            @apply left-1/2;
        }
      }
    //   @apply bg-green-300;
    }
  }
}

.form {
    @apply absolute w-full p-12 duration-700;
}

.glass {
    @apply absolute top-10 w-full h-[420px] flex items-center justify-center;
    background-color: rgba(white, 0.2);
    box-shadow: 0 5px 45px rgba(0,0,0,0.25);
    &__box {
        @apply relative flex items-center justify-center w-1/2 h-full;
        @apply flex-col;
    }
}
</style>
