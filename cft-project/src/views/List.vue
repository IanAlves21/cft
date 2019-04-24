
<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      justify-center
      wrap>
      <v-flex
        md12
      >
    <material-card
          color="info"
          title="Lista de Compras"
          text="Adicione os itens de produtos a sua lista!"
        >
      <v-flex
          xs12
          md4
      >

      <v-dialog v-model="dialog" max-width="500px">
      <v-btn slot="activator" color="pink" dark class="mb-2" center>Novo Item</v-btn>

      <v-card>
          <v-card-title>
          <span class="headline">Adicionar Item</span>
          </v-card-title>
          <v-card-text>
          <v-container grid-list-md>
              <v-layout wrap>
              <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editItem.nome" label="Nome"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                  <v-text-field prefix="R$" v-model="editItem.valor" label="Valor"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editItem.qnt" label="Quantidade"></v-text-field>
              </v-flex>
              </v-layout>
          </v-container>
          </v-card-text>
          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close()">Cancelar</v-btn>
          <v-btn color="blue darken-1" flat @click.native="addItem()">Salvar</v-btn>
          </v-card-actions>
      </v-card>
      </v-dialog>
      </v-flex>
      <v-data-table onloadedmetadata=""
            :headers="headers"
            :items="items"
            hide-actions
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="subheading font-weight-light text-default text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ item }"
            >
              <td>{{ item.nome }}</td>
              <td>{{ item.valor }}</td>
              <td>{{ item.qnt }}</td>
              <div class="d-flex">
                <v-tooltip
                  top
                  content-class="top">
                  <v-btn
                    v-on:click=removeItem(item)
                    slot="activator"
                    class="v-btn--simple"
                    color="danger"
                    icon
                  >
                    <v-icon color="error">mdi-close</v-icon>
                  </v-btn>
                  <span>Deletar</span>
                </v-tooltip>

              </div>
            </template>
          </v-data-table>

    <v-layout align-center justify-end column fill-height>
        <v-flex>
          <!-- <v-btn
          class="mx-0 font-weight-light"
          color="default"
          v-on:click=Finalizar()
          >
          Finalizar
          </v-btn> -->
          <v-btn
          class="mx-0 font-weight-light"
          color="default"
          @click="submit"
          >
          Finalizar
          </v-btn>
        </v-flex>
      </v-layout>

      </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>

import axios from 'axios'
import qs from 'qs';

export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        sortable: false,
        text: 'Nome do Produto',
        value: 'nome'
      },
      {
        sortable: false,
        text: 'Valor',
        value: 'valor'
      },
      {
        sortable: false,
        text: 'Quantidade',
        value: 'qnt'
      }
    ],
    items: [],
    defaultItem: {
      nome: '',
      valor: 0,
      qnt: 0
    },
    editItem: {
      nome: '',
      valor: 0,
      qnt: 0
    },
  }),
  methods: {

    removeItem(item) {
      var index = this.items.indexOf(item)
      this.items.splice(index, 1)

      axios.post('http://localhost:5000/item/delete',{
        'id': 5
      })
            .then(function(res){
              console.log(res);
            })
            .catch(function(error){
              console.log('Erro: ',error);
      })
    },
    addItem() {
      this.dialog = false
      this.editItem.valor = this.editItem.valor
      this.items.push(this.editItem),
      setTimeout(() => {
        this.editItem = Object.assign({}, this.defaultItem)
      }, 300)
    },
    close() {
      this.dialog = false
      setTimeout(() => {
        this.editItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    submit() {
      var itens = [];
      for(let item of this.items){
        itens.push({name: item.nome, price: item.valor, quantity: item.qnt});
      }

      var data_to_submit = {
        userId: this.$store.getters.getUserId,
        itens: itens
      }
      var self = this;
      axios.post('http://localhost:5000/list/create', data_to_submit)
      .then(function(res){
        self.$store.dispatch('userSetList', {
          user_list_id: res.data.listId,
        });
      })
    }
  }
}
</script>
