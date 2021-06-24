<template>
  <div id="app">
    <div class="form-group">
      <input type="text" name="" class="form-control" v-model="word" />
      <input
        type="button"
        value="Search"
        class="btn btn-secondary"
        @click="fetchMeaning"
      />
      <hollow-dots-spinner
        v-if="spin"
        :animation-duration="1000"
        :dot-size="20"
        :dots-num="3"
        color="white"
      />

      <div v-if="showResults" class="result">
        <div>
          {{ word }}
          <div v-for="(meaning, ind) in results" :key="ind">
            {{ ind + 1 }}. 
            <br>
            {{ meaning.wordtype }} {{ meaning.definition }}
            <br>
            <br>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { HollowDotsSpinner } from "epic-spinners";
export default {
  components: {
    HollowDotsSpinner,
  },
  name: "mainPage",
  data() {
    return {
      word: null,
      spin: false,
      results: [],
      showResults: false,
    };
  },
  methods: {
    fetchMeaning() {
      this.spin = true;
      this.$store
        .dispatch("getDictionary", this.word)
        .then((res) => {
          // console.log(res);
          this.showResults = true;
          this.results = res;
          console.log(this.results);
          this.spin = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
#app {
  background-image: url(./assets/bg.jpeg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  position: fixed;
  height: 100%;
}
input.form-control {
  color: white;
  position: relative;
  top: 200px;
  width: 80%;
  left: 10%;
}

input.btn.btn-secondary {
  position: relative;
  top: 200px;
  left: 10%;
  border-radius: 100%;
}
.hollow-dots-spinner {
  position: absolute;
  left: 35%;
  top: 250px;
}
.result {
  position: relative;
  left: 10%;
  width: 80%;
  top: 210px;
  border: 1px solid #ccc;
  overflow: auto;
  background: antiquewhite;
  height: 300px;
  padding: 2%;
  font-family: fangsong;
}
</style>
