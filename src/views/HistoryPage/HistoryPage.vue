<template>
  <div class="container-fluid">
    <div class="row mb-3">
      <div class="col">
        <h2 class="text-center">{{$t('HISTORY_PAGE')}}</h2>
      </div>
    </div>
    <div class="row">
      <template v-if="history.length">
        <div v-for="draw in history" :key="draw._id" class="col-lg-12 mb-2">
          <div class="card">
            <div class="card-body">
              <div class="action-icons">
                <button type="button" class="btn btn-info btn-sm mr-2" @click="displayDraw(draw)" :title="$t('DISPLAY')"><i class="mdi mdi-magnify"></i></button>
                <button type="button" class="btn btn-danger btn-sm" @click="deleteDraw(draw)" :title="$t('DELETE')"><i class="mdi mdi-delete"></i></button>
              </div>
              <div class="row">
                <div class="col-lg-6">
                  <label>{{$t('DRAW_NUMBERS')}}</label>
                  {{draw.draw}}
                </div>
                <div class="col-lg-6">
                  <label>{{$t('BET_NUMBERS')}}</label>
                  {{draw.bet}}
                </div>
                <div class="col-lg-6">
                  <label>{{$t('DRAW_DATE')}}</label>
                  {{draw.date}}
                </div>
                <div class="col-lg-6">
                  <label>{{$t('WINNINGS')}}</label>
                  {{draw.winnigs}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="col text-center">
         {{$t('NO_HISTORY_AVAILABLE')}}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import messages from '@/shared/modules/notifications';

export default {
  async created() {
    await this.loadDraws();
  },
  computed: {
    ...mapState({
      history: (state) => state.draw.draws
    })
  },
  methods: {
    ...mapActions('draw', ['getDrawsAction', 'deleteDrawAction']),
    async loadDraws() {
      await this.getDrawsAction();
    },
    async deleteDraw(draw) {
      await this.deleteDrawAction(draw);
      // eslint-disable-next-line no-underscore-dangle
      messages({ type: 'info', message: `${this.$t('DRAW_ID')}: ${draw._id} ${this.$t('DELETED_SUCCESSFULLY')}!` });
    },
    displayDraw(draw) {
      // eslint-disable-next-line no-underscore-dangle
      this.$router.push({ name: 'DisplayDrawPage', params: { id: draw._id } });
    }
  },
};
</script>

<style lang="scss" scoped>
  .action-icons{
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 2;
  }
</style>
