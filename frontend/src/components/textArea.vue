<script>
import Post from '../api/post';
import EmojiPicker from 'vue-emoji-picker';
import { mapState } from "vuex";
import UploadFile from "../components/uploadFile.vue";
import FormData from "form-data";

export default {
	name: 'textArea',
  computed: {
    ...mapState({
        user: "user",
        post: "post",
        postFile: "postFile"  
		})
	},
  data() {
    return {
      input: "",
      search: "",
      posting: "",
      hideBtn: false,
      upLoadFile: false, 
    }
  },
  components: {
    EmojiPicker,
    UploadFile
	},
  methods: {
    // methode emoji //
    append(emoji) {
      this.input += emoji
    },
    // chache le bouton post
    hideBtnPost() {
      this.hideBtn = !this.hideBtn
    },
    // toogle sur la methode upload un fichier
    seeUpLoadFile() {
            this.upLoadFile = !this.upLoadFile;
            this.hideBtn = !this.hideBtn;
    },
    // methode post un post
    async textPost() {
      var textRited = document.getElementById("textPost");
      var users_id = this.user.info.userId
      var post = textRited.value
      var data = {users_id, post}
      var postFile = this.postFile;
      var formData = new FormData();
      formData.append('file', postFile);
      formData.append('fileName', postFile.name)
      formData.append('post', post);
      formData.append('userId', users_id)
      //envoi du post à la bdd table posts sans fichier
      if (!postFile) {
        const ENDPOINT = '/';
        Post (ENDPOINT, this.user, data)
        .then(res => {
          var textArea= document.getElementById("textPost");
          textArea.value = textArea.defaultValue;
          if (res.data.message ==1) {
            this.$store.commit('GET_ALL_POST');
            this.input="";
          } else {
            this.posting = res.data.message;
          }
        })
      //envoi du post à la bdd table posts avec fichier
      } else {
        const ENDPOINT = '/postfile/';
        Post (ENDPOINT, this.user, formData)
        .then(res => {
          var textArea= document.getElementById("textPost");
          textArea.value = textArea.defaultValue;
          if (res.data.message ==1) {
            var file= "";
            this.$store.commit('DATA_POSTFILE', file);
            this.$store.commit('GET_ALL_POST');
            this.upLoadFile = false;
            this.input="";
          } else {
            this.posting = res.data.message;
         }
        })
      }
    }
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      },
    },
  },
}
</script>

<template>
<v-card class="mx-auto" id="zoneText">
  <div class="wrapper">
    <label for="textPost">Ecrire un post</label>
    <textarea type="text" class="regular-input" id="textPost" v-model="input"  placeholder="Ecrivez votre post ici"></textarea>

    <EmojiPicker @emoji="append" :search="search">
      <div
        class="emoji-invoker"
        slot="emoji-invoker"
        slot-scope="{ events: { click: clickEvent } }"
        @click.stop="clickEvent"
      >
        <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
        </svg>
      </div>
      <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
        <div class="emoji-picker" :style="{ top: display.y + 'px', left: display.x + 'px' }">
          <div class="emoji-picker__search">
            <input type="text" v-model="search" v-focus>
          </div>
          <div>
            <div v-for="(emojiGroup, category) in emojis" :key="category">
              <h5>{{ category }}</h5>
              <div class="emojis">
                <span
                  v-for="(emoji, emojiName) in emojiGroup"
                  :key="emojiName"
                  @click="insert(emoji)"
                  :title="emojiName"
                >{{ emoji }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EmojiPicker>
  </div>
   <v-btn text color=#0F4071 v-if="upLoadFile === false" @click="seeUpLoadFile">
      Ajoutez un fichier
  </v-btn>
  <UploadFile v-else 
    @hide-btnPost="hideBtnPost"
    @up-load-file="seeUpLoadFile"
    :upLoadFile = this.upLoadFile 
  />
  <v-btn elevation="2" outlined v-if="this.input && this.hideBtn === false" @click="textPost">Poster</v-btn>
</v-card>
</template>

<style lang="scss">
.filename{
  display: flex;
}
#textPost{
  height: 51px;
}
#zoneText{
  background-color: powderblue;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.wrapper {
  position: relative;
  width: 90%;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 15px;
  padding-bottom: 15px;
}

.regular-input {
  padding: 0.5rem 1rem;
  border-radius: 3px;
  border: 1px solid #ccc;
  width: 100%;
  height: 8rem;
  outline: none;
  background-color: white;
}

.regular-input:focus {
  box-shadow: 0 0 0 3px rgba(66,153,225,.5);
}

.emoji-invoker {
  position: absolute;
  top: 2.5rem;
  right: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}
.emoji-invoker:hover {
  transform: scale(1.1);
}
.emoji-invoker > svg {
  fill: #b1c6d0;
}

.emoji-picker {
  
  z-index: 1;
  font-family: Montserrat;
  border: 1px solid #ccc;
  width: 15rem;
  height: 20rem;
  overflow: scroll;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 1px 1px 8px #c7dbe6;
}
.emoji-picker__search {
  display: flex;
}
.emoji-picker__search > input {
  flex: 1;
  border-radius: 10rem;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  outline: none;
}
.emoji-picker h5 {
  margin-bottom: 0;
  color: #b1b1b1;
  text-transform: uppercase;
  font-size: 0.8rem;
  cursor: default;
}
.emoji-picker .emojis {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.emoji-picker .emojis:after {
  content: "";
  flex: auto;
}
.emoji-picker .emojis span {
  padding: 0.2rem;
  cursor: pointer;
  border-radius: 5px;
}
.emoji-picker .emojis span:hover {
  background: #ececec;
  cursor: pointer;
}
</style>
