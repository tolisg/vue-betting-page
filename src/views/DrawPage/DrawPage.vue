<template>
  <div class="container-fluid">
    <div class="row mb-3">
     <div class="col-lg-8 border-right">
       <h2>{{$t('DRAW_NUMBERS')}}</h2>
       <div class="row">
        <div v-for="number in draw" class="col-lg-2" :key="number">
            <div class="number-card text-center">
                {{number}}
              </div>
          </div>
       </div>
     </div>
     <div class="col-lg-4">
       <h2>{{$t('BET_NUMBERS')}}</h2>
       <div class="row">
         <div v-for="number in getBet" class="col-lg-2" :key="number">
           <div :class="['number-card text-center', checkBet(number) ? 'highlight-bet' : '']">
              {{number}}
            </div>
         </div>
       </div>
       <div class="row">
         <div class="col">
           <h4 class="text-info" >{{$t('YOUR_WINNINGS_ARE')}} {{winingAmount}}</h4>
         </div>
       </div>
       <div v-if="draw.length === 5" class="row">
         <div class="col">
           <h4>{{status}}</h4>
         </div>
       </div>
     </div>
    </div>
     <modal name="draw-status-modal" :click-to-close="false">
       <div class="card h-100 pb-2">
         <div class="card-body">
           <div class="row">
             <div class="col">
                {{$t('DRAW_COMPLETED_HAVE')}} {{getWiningNumbers}} {{$t('WINING_NUMBERS')}}, {{$t('YOUR_WINNINGS_ARE')}} {{winingAmount}} !
             </div>
           </div>
         </div>
          <div class="col">
            <button type="button" class="btn btn-outline-primary btn-block mb-2" @click="saveHistory">{{$t('SAVE_TO_HISTORY')}}</button>
            <button type="button" class="btn btn-outline-primary btn-block" @click="goBack">{{$t('GO_BACK')}}</button>
          </div>
       </div>
    </modal>
    <loader v-if="drawInd" :msg="$t('DRAW_STARTED_PLEASE_WAIT')" />
  </div>
</template>

<script>
import { random } from 'lodash';
import { mapGetters, mapActions } from 'vuex';
import { format } from 'fecha';
import Loader from '@/components/Loader.vue';
import messages from '@/shared/modules/notifications';

export default {
  components: {
    Loader,
  },
  data() {
    return {
      draw: [],
      drawInd: false,
      interval: null
    };
  },
  mounted() {
    this.drawProcess();
  },
  computed: {
    ...mapGetters('bet', ['getBet']),
    winingAmount() {
      let count = 0;
      const winnigs = { 3: '5€', 4: '10€', 5: '20€' };
      this.getBet.forEach((element) => {
        if (this.draw.includes(element)) {
          count++;
        }
      });
      return winnigs[count] || '-';
    },
    getWiningNumbers() {
      let count = 0;
      this.getBet.forEach((element) => {
        if (this.draw.includes(element)) {
          count++;
        }
      });
      return count;
    },
    status() {
      return this.getWiningNumbers >= 3 ? this.$t('CONGRATULATIONS_YOU_WON') : this.$t('YOU_LOST_TRY_AGAIN');
    }
  },
  watch: {
    draw() {
      if (this.draw.length === 5) {
        clearInterval(this.interval);
        this.drawInd = false;
        this.show();
      }
    }
  },
  methods: {
    ...mapActions('draw', ['addDrawAction']),
    checkBet(number) {
      return this.draw.includes(number);
    },
    show() {
      this.$modal.show('draw-status-modal');
    },
    hide() {
      this.$modal.hide('draw-status-modal');
    },
    goBack() {
      this.hide();
      this.$router.push({ name: 'HomePage' });
    },
    async saveHistory() {
      this.hide();
      await this.addDrawAction({
        draw: this.draw, bet: this.getBet, winnigs: this.winingAmount, date: format(new Date(), 'DD-MM-YYYY hh:mm')
      });
      messages({ type: 'info', message: this.$t('ADDED_HISTORY_SUCCESSFULLY') });
      this.$router.push({ name: 'HomePage' });
    },
    drawProcess() {
      this.drawInd = true;
      setTimeout(() => {
        this.draw.push(random(1, 30));
        this.interval = setInterval(() => {
          let drawNumber = random(1, 30);
          while (this.draw.includes(drawNumber)) {
            drawNumber = random(1, 30);
          }
          this.draw.push(drawNumber);
        }, 4000);
      }, 3000);
    }
  },
};
</script>
