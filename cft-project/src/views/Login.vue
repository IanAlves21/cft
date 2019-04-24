<template>
  <v-container fill-height fluid grid-list-sm>
    <v-layout justify-center align-center column pa-5>
      <v-flex xs12 md8>

            <v-img
              src="img/elgin.png"
              height="55"
              contain
            />
      <material-card
          color="info"
          title="Login"
        >
          <v-form ref="form" v-model="valid">
            <v-container>
              <v-layout wrap>
                <v-flex xs12 md6>
                        <v-text-field name="email" label="Email" class="purple-input" type="email"
                        data-cy="signinEmailField"
                        v-model="email_login"
                        :rules="emailRules" required
                        />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field name="password" class="purple-input" label="Password" type="password"
                  data-cy="signinPasswordField"
                  v-model="password_login"
                  :rules="passwordRules" required
                  />
                </v-flex>

                <v-flex xs12 text-xs-center>
                  <v-btn
                  class="mx-0 font-weight-light"
                  color="default"
                  :disabled="!valid"
                  @click="submit"
                  data-cy="signinSubmitBtn"
                  >
                    ENTRAR
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>
  <script>
  import axios from 'axios'
  import qs from 'qs';

  export default {
      name: 'Signin',
      logo: './img/elgin.png',
      data() {
          return {
              token: '',
              valid: false,
              email_login: '',
              password_login: '',
              emailRules: [
                  v => !!v || 'E-mail is required',
                  v => /.+@.+/.test(v) || 'E-mail must be valid'
              ],
              passwordRules: [
                  v => !!v || 'Password is required',
                  v =>
                      v.length >= 6 ||
                      'Password must be greater than 6 characters',
                  //v => /^(?=(?:.*?[A-Z]){2})(?=(?:.*?[a-z]){4})(?=(?:.*?[0-9]){2})(?=(?:.*?[!@$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@$%;*(){}_+^&]*$/.test(v) || 'Password fora do Padrao'
                ]
          };
      },

      mounted(){

      },
      methods: {
          submit() {
            //#######CRYPTO#######
            var crypto = require('crypto'),
            algorithm = 'aes-256-ctr',
            cry_password = 'd6F3Efeq';
            var self = this;
            //####################
            function encrypt(text){
              var cipher = crypto.createCipher(algorithm,cry_password)
              var crypted = cipher.update(text,'utf8','hex')
              crypted += cipher.final('hex');
              return crypted;
            }
            //#####################
            let newUser = {
              email: this.email_login,
              password: encrypt(this.password_login),
            }

            axios.post('http://localhost:5000/user/auth',newUser)
            .then(function(res){
              if(res.data.response){
                self.$store.dispatch('userLogin', {
                  email_user: self.email_login,
                  token_user: res.data.token,
                  new_user_id: res.data.userId,
                });
              }
            })
            .catch(function(error){
              console.log('Erro: ',error);
            })

          }
      }
  };
  </script>
