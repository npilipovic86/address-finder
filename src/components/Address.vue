<template>
  <div class="container">
   <div class="field" v-if="!cordinate.lat">
        <input placeholder="Enter address for search..." v-model="street"  ref="input" class="input" name="address">
        <button type="submit" class="button" style="vertical-align:middle" @click="trigger"><span>Find </span></button>
    </div>
    <div class="container" v-if="places.length>0 " >
      <table class="table" >
        <thead>
          <tr>
            <th>Result:</th>
          </tr>
        </thead>
        <tbody >
          <tr  v-for="street in places" 
    :key="street.id" v-bind:value="street.place_id">
            <td  class="trigger" @click="select(street.place_id)">{{street.description}}</td>
          </tr>
        </tbody>
      </table>
    </div>
   <div  v-if="cordinate.lat&&cordinate.lng " >
      <div>Lat: {{cordinate.lat}}</div>
      <div>Lng: {{cordinate.lng}}</div>
      <button class="button" style="vertical-align:middle" @click="reset"><span>Reset</span></button>
    </div>
     <div  v-if="loader">
       <div class="loader">Loading...</div>
    </div >
  </div> 
</template>


<script>
export default {
  name: 'Address',
  props: {
    msg: String
  },
  data (){
    return {
      places:[],
      street:"",
      loader:false,
      cordinate:{}
    }
  },
  methods: {
    findAddress(address) {
       this.loader = true;
      let url = "api/place/autocomplete/json?input=" + this.changeString(address) +
       "&key=AIzaSyDynqPuBmcNZXSUGpIbFZFjN6waW-t5Epk";
      this.$http.get(url).then(function(response) { 
        this.places = response.body.predictions;
        if(this.places.length>0){
        this.loader = false;
        }
     
         } ).catch(e => {e.toString() });
    },
    reset(){
      this.places = [],
      this.street = "",
      this.cordinate = {}
    },
    changeString(string){
      return  string.split(' ').join('+');
    },
    trigger() {
      this.findAddress(this.street);      
    },
    select(id) {
      let url = "api/place/details/json?placeid="+id+"&key=AIzaSyDynqPuBmcNZXSUGpIbFZFjN6waW-t5Epk";
      this.$http.get(url).then(function(response){ 
       this.cordinate = response.body.result.geometry.location;
      }).catch(e => {e.toString() });   
    }
  },
    created() {
  
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
 font-family: 'Avenir', 'Courier New', Courier, monospace, Arial;
}
.button {
  display: inline-block;
  border-radius: 4px;
  background-color: #f4511e;
  border: none;
  color: #FFFFFF;
  text-align: center;
  font-size: 20px;
  padding: 1px;
  width: 90px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
}
.button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}
.button span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.button:hover span {
  padding-right: 25px;
}

.button:hover span:after {
  opacity: 1;
  right: 0;
}

.reset{
  cursor:pointer;
}
.trigger {
  padding: 10px;
  border: 1px solid red;
  margin-bottom: 16px;
  cursor:pointer;
}
.location{
  border: 1px solid red;
  font-family: 'Avenir', 'Courier New', Courier, monospace, Arial;
}
table, .location{
   margin-left:auto; 
   margin-right:auto;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}

.loader {
  color: #941414;
  font-size: 90px;
  text-indent: -9999em;
  overflow: hidden;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  margin: 72px auto;
  position: relative;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load6 1.7s infinite ease, round 1.7s infinite ease;
  animation: load6 1.7s infinite ease, round 1.7s infinite ease;
}
@-webkit-keyframes load6 {
  0% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  5%,
  95% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  10%,
  59% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;
  }
  20% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em;
  }
  38% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em;
  }
  100% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
}
@keyframes load6 {
  0% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  5%,
  95% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  10%,
  59% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;
  }
  20% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em;
  }
  38% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em;
  }
  100% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
}
@-webkit-keyframes round {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes round {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
