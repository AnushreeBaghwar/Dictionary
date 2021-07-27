<template>
  <div id="app">
    <div class="heading">
      <font-awesome-icon icon="book" />
      YourDictionary
    </div>
    <div class="form-group">
      <input
        type="text"
        name=""
        placeholder="Search for a word"
        class="form-control"
        v-model="word"
      />
      <input
        type="button"
        value="GO"
        class="btn btn-outline-primary"
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
          <h3 id="text">{{ results[0].word }}</h3>
          <font-awesome-icon icon="volume-up" @click="textToAudio" />
          <div id="definitions" v-for="(meaning, ind) in results" :key="ind">
            {{ ind + 1 }}. {{ meaning.wordtype }} {{ meaning.definition }}
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
    <div class="bottom"></div>
  </div>
</template>
<script>
import Swal from "sweetalert2";

import { HollowDotsSpinner } from "epic-spinners";
export default {
  props: {
    visible: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
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
      open: false,
    };
  },
  methods: {
    fetchMeaning() {
      this.spin = true;
      this.$store
        .dispatch("getDictionary", this.word)
        .then((res) => {
          if (this.word != null) {
            this.showResults = true;
            this.results = res;
            console.log(this.results);
            this.spin = false;
          } else {
            this.showResults = false;
            this.spin = false;
          }
        })
        .catch((err) => {
          console.log(err);
          let timerInterval;
          Swal.fire({
            html: "Oops! No results found for " + this.word,
            timer: 3000,
            didOpen: () => {
              timerInterval = setInterval(() => {
                const content = Swal.getHtmlContainer();
                if (content) {
                  const b = content.querySelector("b");
                  if (b) {
                    b.textContent = Swal.getTimerLeft();
                  }
                }
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log("I was closed by the timer");
            }
          });
          this.spin = false;
        });
    },
    textToAudio() {
      let msg = document.getElementById("text").innerText;
      let speech = new SpeechSynthesisUtterance();
      speech.lang = "en-US";
      speech.text = msg;
      speech.volume = 1;
      speech.rate = 1;
      speech.pitch = 1;
      window.speechSynthesis.speak(speech);
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");
#app {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  position: fixed;
  height: 100%;
}
input.form-control {
  color: white;
  width: 80%;
  left: 10%;
  position: absolute;
  top: 15%;
}
input.btn.btn-outline-primary {
  background: #214579;
  position: fixed;
  left: 75%;
  top: 21%;
  height: 30px;
  padding-bottom: 30px;
}
.hollow-dots-spinner {
  position: absolute;
  left: 35%;
  top: 250px;
}
.result {
  position: absolute;
  left: 12%;
  height: 50%;
  width: 75%;
  z-index: 1;
  bottom: 20px;
  border-radius: 8px;
  box-shadow: 1px 1px 1px #9c9c9e80;
  background: #f4f7f9;
  overflow: auto;
  font-family: fangsong;
}
.heading {
  background: #fcfbfa;
  height: 8%;
  font-family: "Pacifico", cursive;
  font-size: 30px;
  padding-left: 10px;
  color: #214579;
}
.bottom {
  position: fixed;
  bottom: 0px;
  background: #fafaf9;
  width: 100%;
  height: 40%;
}
.form-group {
  background: #214579;
  height: 60%;
}
h3 {
  font-family: system-ui;
  font-size: 28px;
  padding: 5px;
  color: #214579;
}

h6 {
  font-family: system-ui;
  position: absolute;
  top: 5px;
  left: 5px;
}
svg.svg-inline--fa.fa-volume-up.fa-w-18 {
  font-size: 20px;
  position: relative;
  margin-left: 8px;
}
div#definitions {
  padding-left: 15px;
  padding-right: 15px;
}
</style>
