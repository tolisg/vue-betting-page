<template>
  <div class="container-fluid">
    <div class="row mb-5">
      <div class="col">
        <h1 class="text-primary text-center">{{$t('PLEASE_SELECT_5_NUMBERS')}}</h1>
      </div>
    </div>
    <div class="row mb-3">
     <div class="col-lg-8 border-right">
      <h4>{{$t('AVAILABLE_SELECTIONS')}}</h4>
       <div class="row">
         <div v-for="(number, index) in numbers" class="col-lg-1 col-md-2 col-sm-3" :key="number.value" @click="addBetNumber(index)">
           <div :class="['number-card text-center', number.selected ? 'border-danger cursor-not-allowed' : 'cursor-pointer']">{{number.value}}</div>
         </div>
       </div>
     </div>
     <div class="col-lg-4">
       <h4>{{$t('YOUR_SELECTION')}}</h4>
       <div class="row">
         <div v-for="(number, index) in selection" class="col-lg-2 col-md-3 col-sm-4" :key="number">
           <div class="number-card text-center">
              <div class="remove-bet cursor-pointer" @click="removeBetNumber(index)"><i class="mdi mdi-delete text-danger"></i></div>
              {{number}}
            </div>
         </div>
       </div>
     </div>
    </div>
    <div class="row">
      <div class="col d-flex">
        <button type="button" class="btn btn-lg btn-primary ml-auto" :disabled="selection.length < 5" @click="submitBet">{{$t('SUBMIT')}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      numbers: [
        { value: 1, selected: false },
        { value: 2, selected: false },
        { value: 3, selected: false },
        { value: 4, selected: false },
        { value: 5, selected: false },
        { value: 6, selected: false },
        { value: 7, selected: false },
        { value: 8, selected: false },
        { value: 9, selected: false },
        { value: 10, selected: false },
        { value: 11, selected: false },
        { value: 12, selected: false },
        { value: 13, selected: false },
        { value: 14, selected: false },
        { value: 15, selected: false },
        { value: 16, selected: false },
        { value: 17, selected: false },
        { value: 18, selected: false },
        { value: 19, selected: false },
        { value: 20, selected: false },
        { value: 21, selected: false },
        { value: 22, selected: false },
        { value: 23, selected: false },
        { value: 24, selected: false },
        { value: 25, selected: false },
        { value: 26, selected: false },
        { value: 27, selected: false },
        { value: 28, selected: false },
        { value: 29, selected: false },
        { value: 30, selected: false }
      ],
      selection: []
    };
  },
  methods: {
    ...mapActions('bet', ['addBetAction']),
    addBetNumber(index) {
      if (this.numbers[index].selected || this.selection.length >= 5) {
        return;
      }
      this.numbers[index].selected = true;
      this.selection.push(this.numbers[index].value);
    },
    removeBetNumber(index) {
      const numberIndex = this.numbers.findIndex((o) => o.value === this.selection[index]);
      this.selection.splice(index, 1);
      this.numbers[numberIndex].selected = false;
    },
    async submitBet() {
      await this.addBetAction(this.selection);
      this.$router.push({ name: 'DrawPage', params: { directAccess: true } });
    }
  }
};
</script>
