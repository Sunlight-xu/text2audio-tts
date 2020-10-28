<template>
  <div class="home">
    <ul>
      <li v-for="(i, index) in msg" :key="index">{{index}}.{{ i }}</li>
    </ul>
    <div>
      <input type="text" v-model="text" /> <button @click="add">添加</button>
    </div>
    <div>
      <input type="text" v-model.number="key" />
      <button @click="play">
        播放
      </button>
      <button @click="playAll">
        播放全部
      </button>
    </div>
    <audio ref="audio"></audio>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'Home',
  data() {
    return {
      text: '',
      msg: ['向前直行20米', '向左5米', '向右8米', '前方直行8米到达目的地'],
      audios: [
        require('../assets/audios/1.mp3'),
        'https://morningmood.oss-cn-beijing.aliyuncs.com/tts-audio/2.mp3',
        'https://morningmood.oss-cn-beijing.aliyuncs.com/tts-audio/3.mp3',
        'https://morningmood.oss-cn-beijing.aliyuncs.com/tts-audio/4.mp3'
      ],
      key: 0,
      timer: null
    }
  },
  methods: {
    async add() {
      if (!this.text) return
      let res =  await Axios.get('/api/audio', {
        params: {
          text: this.text
        }
      })
      this.msg.push(this.text)
      this.audios.push(res.data.url)
      this.text = ''
    },
    play() {
      let src = this.audios[this.key]
      if(!src) return
      this.$refs.audio.src = src
      this.$refs.audio.play()
    },
    playAll() {
      let src = this.audios[this.key]
      if(!src) return
      this.$refs.audio.src = src
      this.$refs.audio.play()
      this.loop()
    },
    loop() {
      if (!this.$refs.audio.duration) {
        requestAnimationFrame(this.loop)
      } else {
        console.log(this.$refs.audio.duration)
        if(this.timer) return
        this.timer = setTimeout(()=>{
          this.key++
          this.playAll()
          clearTimeout(this.timer)
          this.timer = null
        },this.$refs.audio.duration * 1000)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  display: flex;
  justify-content: space-between;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-top: 8px;
  color: #42b983;
}
a {
  color: #42b983;
}
</style>
