<template>
  <div class="container-fluid text-center">
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <div class="card">
          <div class="card-header bg-primary">
            <h4 class="card-title text-white mb-0">{{$t('USER_REGISTRATION')}}</h4>
          </div>
          <div class="card-body pt-3">
            <validation-observer v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(onSubmit)">
                <div class="row">
                  <div class="col-sm-12 form-group">
                     <div class="col-sm-12 form-group">
                      <validation-input :label="$t('EMAIL')" rules="required|email">
                        <input v-model="email" type="text" class="form-control" />
                      </validation-input>
                    </div>
                    <div class="col-sm-12 form-group">
                      <validation-input :label="$t('PASSWORD')" rules="required|password">
                        <input v-model="password" type="password" class="form-control" />
                      </validation-input>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col d-flex">
                    <button type="submit" class="btn btn-primary btn-block">{{$t('REGISTER')}}</button>
                  </div>
                </div>
              </form>
            </validation-observer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      password: '',
      email: ''
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user
    })
  },
  methods: {
    ...mapActions('auth', ['registerUserAction']),
    async onSubmit() {
      await this.registerUserAction({ email: this.email, password: this.password });
      if (this.user) {
        this.$router.push({ name: 'HomePage' });
      }
    }
  }
};
</script>
