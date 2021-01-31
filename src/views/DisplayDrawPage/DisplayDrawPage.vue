<template>
  <div class="container-fluid">
    <div class="row mb-3">
      <div class="col">
        <h2 class="text-center">{{$t('DRAW_DISPLAY_PAGE')}}</h2>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col d-flex">
        <button type="button" class="btn btn-outline-primary ml-auto" @click="goBack">{{$t('GO_BACK')}}</button>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div v-if="draw.bet" class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-lg-6">
                <label class="d-block">{{$t('DRAW_DATE')}}</label>
                {{ draw.date }}
              </div>
              <div class="col-lg-6">
                <label class="d-block">{{$t('DRAW_NUMBERS')}}</label>
                <div class="row">
                  <div v-for="item in draw.draw" :key="item" class="col">
                    {{ item }}
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-lg-6">
                <label class="d-block">{{$t('BET_NUMBERS')}}</label>
                <div class="row">
                  <div v-for="item in draw.bet" :key="item" :class="['col', winingNumber(item) ? 'text-success' : '']">
                    {{ item }}
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <label class="d-block">{{$t('WINNINGS')}}</label>
                {{ draw.winnigs }}
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-lg-6">
                <label class="d-block">{{$t('STATUS')}}</label>
                {{ getStatus }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  async created() {
    await this.loadDrawData();
  },
  computed: {
    ...mapState({
      draw: (state) => state.draw.draw,
      getStatus() {
        let count = 0;
        this.draw.bet.forEach((element) => {
          if (this.draw.draw.includes(element)) {
            count++;
          }
        });
        return count >= 3 ? this.$t('WON') : this.$t('LOST');
      }
    })
  },
  methods: {
    ...mapActions('draw', ['getDrawAction']),
    async loadDrawData() {
      await this.getDrawAction(this.$route.params.id);
    },
    winingNumber(number) {
      return this.draw.draw.includes(number);
    },
    goBack() {
      this.$router.push({ name: 'HomePage' });
    }
  }
};
</script>
