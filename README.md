# indices-brasileiros
busca de índices brasileiros

## importando as funções

const indices = require('indices-brasileiros')

## buscando CDI diretamente da cetip, passando mes e ano como string

indices.buscarCDI(11, '2021').then(e => {
    console.log(e)
})


## O retorno será um array de dados do mes passado por parametro:

[
  {
    data: '01/11/2021',
    valor: 7.65
  }
]
