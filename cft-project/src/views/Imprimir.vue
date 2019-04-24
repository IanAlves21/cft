<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-flex
      align-self-center
    >
      <v-layout align-center column fill-height>
        <v-card class="page">
          <v-img
            src="img/elgin.png"
            height="55"
            contain
          />

          <p>Emissão em {{ (new Date()).getDate() }}/{{ (new Date()).getMonth() }}/{{ (new Date()).getFullYear() }}</p>
          <h6><b>CNPJ:</b> 91.529.458/0001-98 <b>LABORATÓRIO DE INOVAÇÃO, TECNOLOGIA E ECONOMIA CRIATIVA</b>.</h6>
          <h6>Avenida Darcy Vargas, 1200, Parque 10 de Novembro, Manaus - AM, 69050-020 </h6>

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
              <td>{{ item.iname }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.price }}</td>
            </template>
          </v-data-table>
          <p><b>Data de Autorização:</b> {{ (new Date()).getDate() }}/{{ (new Date()).getMonth() }}/{{ (new Date()).getFullYear() }}
          {{ (new Date()).getHours() }}:{{ (new Date()).getMinutes() }}:{{ (new Date()).getSeconds() }}</p>
          <div class="qrcode">
            <qrcode-vue id="qrCode" :value="value" :size="size" level="H"></qrcode-vue>
          </div>
        </v-card>

      </v-layout>
      <v-layout align-center justify-end column fill-height>

        <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="success" dark class="bt" center @click="AbrirPopImprimir()">Imprimir</v-btn>
        <v-btn slot="activator" color="success" dark class="bt2" center @click="AbrirPopEnviar()">Enviar</v-btn>

        <v-card>
    
            <v-card-text class="titlePopUp">{{tituloDialogo}}</v-card-text>

             <v-card-text class="txtemail" v-if="this.txtEmail == true">{{emaillogado}}</v-card-text>
            <v-layout align-center justify-center>
              <v-btn class="btnP1" color="success"  @click="close()"> {{txtBtn}} </v-btn>
              <v-btn class="btnP1" color="success"  @click="generatePDF(), close()" v-if="this.printDialog == true"> Imprimir </v-btn>
              <v-btn class="btnP2" color="success"  @click="enviaremail(), emailEnviado()" v-if="this.enviarDialog ==true"> Enviar Email </v-btn>
            </v-layout>

        </v-card>
        </v-dialog>

        <v-flex>
          
        </v-flex>
      </v-layout>
    </v-flex>
  </v-container>
</template>

<style>
  .page {
    background: white;
    display: block;
    margin: auto;
    margin-bottom: 0.5cm;
    box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
    padding: 2cm;
  }
  .page{
    width: 21cm;
    /* height: 29.7cm; */
  }
  p, h6{
    text-align: center;
  }
  .qrcode {
    text-align: center;
  }

  .titlePopUp{
    text-align: center;
    font-size: 25px;
  }

  .btnP1{
    margin-right: 15px;
  }
  .txtemail{
    margin-top: 5px;
    margin-bottom: 25px;
    text-align: center;
  }
</style>

<script>

import QrcodeVue from 'qrcode.vue'
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from 'axios';
import qs from 'qs';
export default {
  components: {
    QrcodeVue
  },
  data: () => ({
    printDialog: false,
    enviarDialog: false,
    dialog: false,
    txtEmail: false,
    txtBtn: 'text',
    tituloDialogo: 'Imprimir',
    value: 'default',
    size: 300,
    emaillogado:'',
    qrUrl: 'default',
    headers: [
      {
        sortable: false,
        text: 'Nome do Produto',
        value: 'nome'
      },
      {
        sortable: false,
        text: 'Quantidade',
        value: 'qnt'
      },
      {
        sortable: false,
        text: 'Valor',
        value: 'valor'
      }
    ],
    items: [

    ]
  }),
  mounted() {
    var self = this;
    self.emaillogado = this.$store.getters.getEmail;
    var url = 'http://localhost:5000/list/get?listId=' + JSON.stringify(this.$store.getters.getListId);
    axios.get(url)
    .then(function(res){
      self.items = res.data.response;
     })
    .catch(function(error){
      console.log('Erro: ',error);
    })
    this.value = url;
    this.qrUrl = document.getElementById('qrCode').childNodes[0].toDataURL();

  },
  methods:{

    enviaremail(){
      var self = this;
      let pdf = this.retornaPDF(true);
      var pdfBase64 = pdf.output('datauristring');

      let Arquivos = {
              email: this.$store.getters.getEmail,
              file:  pdfBase64
          }
      console.log(pdfBase64);
      // Arquivos = qs.stringify(Arquivos);
    
      axios.post('http://localhost:5000/send/mail',
        Arquivos
      )
            .then(function(res){
              console.log(res);
            })
            .catch(function(error){
              console.log('Erro: ',error);
            })
    },
    retornaPDF(forDownload) {
      let doc = new jsPDF({compress: true});
      let espaco = 5;
      let qrImage = document.getElementById('qrCode').childNodes[0].toDataURL();
      let columns = [
        {title: 'Nome', dataKey: "iname"},
        {title: 'Quantidade', dataKey: "quantity"},
        {title: 'Valor', dataKey: "price"}
      ];

      doc.autoTable(columns, this.items, {margin: {top: 33}, theme: 'plain', styles: {cellWidth: 'wrap', rowPageBreak: 'auto', halign: 'justify'}})

      let finalY = doc.previousAutoTable.finalY
      doc.setDrawColor(0,0,0)
      doc.setLineWidth(1)
      doc.line(5, finalY + espaco, 205, finalY + espaco) // (Margin Left, Margin Top, Tamanho, Margin Top )
      doc.setFontSize(15)
      doc.text("LABORATÓRIO DE INOVAÇÃO, TECNOLOGIA E ECONOMIA CRIATIVA", 5, finalY + (espaco * 3)) //(Texto, Margin Left, Posicao Y no DOCUMENTO)
      let text2 = finalY + (espaco * 5)
      doc.text("Avenida Darcy Vargas, 1200, Parque 10 de Novembro, Manaus - AM, 69050-020 ", 5, text2)
      //doc.addImage(imgData, 'JPEG', 85, 10, 40, 20) //(Margin Left, Margin TOP, tamanho X da imagem, tamanho Y da imagem)
      if(forDownload) doc.addImage(qrImage, 'png', 75, text2 + 10, 40, 40)
      return doc;
    },
    generatePDF(){
      console.log("Gerando pdf...");

      let doc = this.retornaPDF(true);

      doc.save("Produtos.pdf");
    },

    AbrirPopImprimir(){
        this.tituloDialogo = 'Imprimir cupom';
        this.printDialog = true;
        this.enviarDialog = false;
        this.txtBtn = 'Cancelar';
        this.txtEmail = false;
    },
    AbrirPopEnviar(){
        this.tituloDialogo = 'Enviar cupom para Email';
        this.enviarDialog = true;
        this.printDialog = false;
        
        this.txtBtn = 'Cancelar';
        this.txtEmail = true;
    },
    emailEnviado(){
        this.tituloDialogo = 'Email enviado para:';
        this.enviarDialog = false;
        this.printDialog = false;
        this.txtBtn = 'Ok';
        this.txtEmail = true;
    },
    close() {
      this.dialog = false
    }

  }

}
</script>
