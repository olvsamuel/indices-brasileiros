const axios = require('axios');
const moment = require('moment')
const URLBCB = `https://api.bcb.gov.br`;
const util = require(`./helpers/util`)

class IndicesBrasileiros {
    static async buscarCDI(mes = 11, ano = '2021') {
        try {
            const headers = {
                'Connection': 'keep-alive',
                'Cache-Control': 'max-age=0',
                'Upgrade-Insecure-Requests': '1',
                'Origin': 'http://estatisticas.cetip.com.br',
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'Sec-GPC': '1',
                'Referer': 'http://estatisticas.cetip.com.br/astec/series_v05/paginas/lum_web_v04_10_02_gerador_sql.asp',
                'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
                'Cookie': 'dtCookie=v_4_srv_34_sn_DBCAC5AF4ACCC394AEA275A53E70022E_perc_100000_ol_0_mul_1_app-3Aa15981ff8c1642c7_0_rcs-3Acss_0; TS016d7c07=01ee5ef468eb97fcf950d6edf93fb652b1b8b99a98f6cd535a4c6422ab8e827f1953d5c6112e0480804dcd368b06beee720da8cae5; ASPSESSIONIDCQSTSBAS=AIGJBNIAGIGKHIGCKMDOMBPP; TS01871345=01ee5ef4684dbf7b9a7c1bc89c2dd7e77f77749ec45d0ab22b3df854573ae168942edd41374d5ca72db0708ff5ff0597aabe81991f'
            };
            mes = util.fixMes(mes);
            
            const diaInicio = '01'

            
            const diaFinal = moment(`${ano}-${mes}-01`).endOf('month').format('DD')
            
            //periodo -> 06/03/1986 até 01/11/2021
            const urlArquivo = '' //http://estatisticas.cetip.com.br/astec/temp/202111031238380.9227869.xls
            const dataString = `str_NomeArquivo=WEB_00_DI_Taxas_Over&str_NomeTabela=WEB_DI_Taxas_Over&str_Ativo=DI&str_ModeloDados=TAX_001di&str_Descricao=TTTTTT&str_NrLeilao=_Geral&str_ModeloLeilao=_Geral&str_Descricao_1=&str_Descricao_2=&str_Descricao_3=&chk_Descricao_1=&chk_Descricao_2=&chk_Descricao_3=&bln_MostrarContraparte=False&str_Populacao=_Geral&str_FaixaPrazo=_Geral&str_FaixaPrazoTotalizado=0&str_TipoFaixaPrazo=0&str_TipoEmissao=0&str_Emissao=_Geral&str_TipoMoeda=&str_Moeda=&str_Observacao=%21DI-CETIP+%28over%29%7C%7CObserva%E7%F5es+a+respeito+de+mudan%E7a+de+moeda+%2F+volume%3A%7C%281%29+Anos+1986%2C+1987+e+1988%2C+volume+em+Cz%24+milh%F5es+%28Cruzado%29.%7C%282%29+A+partir+de+16%2F01%2F1989%2C+corte+de+tr%EAs+zeros+no+Cruzado%2C+passando+a+Cruzado+Novo.+Volume+em+NCz%24+milh%F5es.%7C%283%29+A+partir+de+15%2F03%2F1990%2C+restabelecido+o+Cruzeiro+%28Cr%24%29+como+moeda+nacional.+Volume+em+Cr%24+milh%F5es.%7C%284%29+A+partir+de+01%2F04%2F1992%2C+em+virtude+do+crescente+volume%2C+o+mesmo+passa+a+ser+divulgado+em+Cr%24+bilh%F5es.%7C%285%29+Institu%EDdo+em+02%2F08%2F1993%2C+o+Cruzeiro+Real+%28CR%24%29+%2C+com+corte+de+tr%EAs+zeros+do+Cruzeiro%3B+volume+em+CR%24+milh%F5es.%7C%286%29+A+partir+de+01%2F11%2F1993%2C+em+virtude+do+crescimento+do+volume%2C+o+mesmo+passa+a+ser+divulgado+em+CR%24+bilh%F5es.%7C%287%29+Em+Julho%2F1994%2C+com+a+implanta%E7%E3o+do+Plano+Real%2C+com+divis%E3o+de+valores+financeiros+por+2.750%2C00+passando+o+volume+financeiro+a+ser+registrado+em+milhares+de+Reais.%7C+++++++++++%7CObserva%E7%F5es+a+respeito+da+formula%E7%E3o+da+taxa%3A%7C%28a%29+At%E9+30%2F06%2F1989%2C+as+taxas+dos+dias+que+precediam+a+fins+de+semana+e+feriados+eram+divididas+pelo+n%FAmero+de+dias+destes%2C+de+forma+a+mostrar+a+taxa+over+paga+pelos+dias+n%E3o+%FAteis.%7C%28b%29+At%E9+31%2F05%2F1990%2C+taxas+divulgadas+ao+ano+de+360+dias%2C+com+express%E3o+linear.%7C+Entre+01%2F06%2F1990+e+31%2F12%2F1997%2C+somente+taxas+di%E1rias+expressas+linear+ao+m%EAs.%7C%28c%29+A+partir+de+01%2F01%2F1998%2C+taxas+m%E9dias+di%E1rias+de+DI-Over+e+de+SELIC+divulgadas+ao+ano+de+252+dias+%FAteis%2C+com+express%E3o+exponencial.%7C+++++%7CObserva%E7%F5es+a+respeito+da+amostra+%2F+base+de+c%E1lculo+da+taxa%3A%7C%28I%29+At%E9+29%2F04%2F1988%2C+somente+taxas+envolvendo+todas+as+opera%E7%F5es+de+DI+Over.%7C%28II%29+De+02%2F05%2F1988+a+31%2F05%2F1990%2C+divis%E3o+em+Extra-Grupo%2C+Intra-Grupo+e+Total%2C+sendo+o+acumulado+mensal+apenas+do+Extra-Grupo.%7C%28III%29+A+partir+de+01%2F06%2F1990%2C+somente+taxas+do+Extra-Grupo.%7C%28IV%29+A+partir+de+02%2F01%2F1991%2C+inclus%E3o+de+taxas+m%EDnimas%2C+m%E1ximas+e+modais%2C+al%E9m+do+desvio+padr%E3o.%7C+++++%7CObserva%E7%F5es+localizadas%3A%7C%28i%29+De+acordo+com+a+lei+n%BA+7.320+de+11%2F06%2F1985%2C+revogada+posteriormente+pela+lei+n%BA+8.087+de+29%2F10%2F1990%2C+foram+comemorados+por+antecipa%E7%E3o%2C+nas+segundas-feiras%2C+os+feriados+que+ca%EDram+nos+demais+dias+da+semana%2C+com+exce%E7%E3o+dos+que+ocorreram+nos+s%E1bados+e+domingos+e+os+dos+dias+1%BA+de+janeiro+%28Confraterniza%E7%E3o+Universal%29%2C+7+de+setembro+%28Dia+da+Independ%EAncia%29%2C+25+de+dezembro+%28Natal%29+e+Sexta-Feira+Santa.%7CCom+base+no+exposto%2C+durante+o+per%EDodo+citado+pode+ocorrer++a+inexist%EAncia+de+taxa+para+dias+considerados+como+%FAteis+%28caso+de+segundas-feiras+imediatamente+anteriores+a+feriados%2C+para+onde+os+mesmos+foram+deslocados%29+assim+como+a+exist%EAncia+de+taxa+para+dias+considerados+como+n%E3o+%FAteis+%28caso+dos+feriados+ocorridos+entre+segunda+e+sexta-feira%2C+com+exce%E7%E3o+dos+casos+j%E1+citados%29.%7C%28ii%29+Em+23%2F12%2F1987%2C+houve+tamb%E9m+opera%E7%F5es+diretamente+para+o+dia+28%2C+com+cinco+dias+e+um+over+%28saque%29%2C+com+taxa+m%E9dia+de+57%2C66%25+a.a.%7CEm+30%2F12%2F1987%2C+houve+tamb%E9m+opera%E7%F5es+diretamente+para+o+dia+04%2F01%2F1988%2C+com+cinco+dias+e+dois+over+%28saques%29%2C+com+taxa+m%E9dia+de+94%2C91+%25+a.a.%2C+referentes+aos+dias+30+e+31%2F12%2F1987%2C+abandonando-se%2C+neste+caso%2C+a+taxa+m%E9dia+do+dia+31+%2860%2C08+%25+a.a.%29.%7C%28iii%29+Em+12%2F02%2F1988%2C+houve+tamb%E9m+opera%E7%F5es+diretamente+para+o+dia+18%2C+com+seis+dias+e+dois+over+%28saques%29%2C+com+taxa+m%E9dia+de+115%2C72+%25+a.a.%7C%A0%7C%7C%28+-+%29+Dados+Insuficientes.&str_NomeAtivoCabecalho=DI+-+Dep%F3sito+Interfinanceiro&str_NomeTipoInformacaoCabecalho=Taxas+-+DI+PR%C9+-+Over&str_TipoDescricao=5&str_ApresentarTipoOp=0&dta_DataInicio=${diaInicio}%2F${mes}%2F${ano}&dta_DataFinal=${diaFinal}%2F${mes}%2F${ano}&str_SQL=joao+Fdta_DataDivulg%2C+Fdpl_NumOp%2C+Fdpl_Volume%2C+Fsmp_Media%2C+Fsmp_FatorDiario%2C+Fsmp_Minima%2C+Fsmp_Maxima%2C+Fsmp_Moda%2C+Fsmp_DsvPdr%2C+Fsmp_SELIC+maria+WEB_DI_Taxas_Over+Where+%28+Fdta_DataDivulg+%3E%3D+%23${mes}%2F${diaInicio}%2F${ano}%23+AND+Fdta_DataDivulg+%3C%3D+%23${mes}%2F${diaFinal}%2F${ano}%23+%29+ORDER+BY+Fdta_DataDivulg&int_Idioma=1`;
            
            const options = {
                url: 'http://estatisticas.cetip.com.br/astec/series_v05/paginas/lum_web_v04_10_03_consulta.asp',
                method: 'POST',
                headers: headers,
                body: dataString
            };
            
            const { data } = await axios.post(options.url, dataString, options)
            
            const HtmlTableToJson = require('html-table-to-json');
            const jsonTables = HtmlTableToJson.parse(data);
    
            const formatReturn = jsonTables.results[0].map(i => {
                // console.log(i)
                if (i['10']) {
                    return {
                        // nrOperacoes: i['2'],
                        data: i['Taxas - DI PR� - Over'],
                        // volume: i['3'],
                        // media: i['4'],
                        // fatorDiario: i['5'],
                        // minima: i['6'],
                        // maxima: i['7'],
                        // moda: i['8'],
                        // dsvPdr: i['9'],
                        // txSelic: i['10'],
                        valor: parseFloat(i['10'].replace(`,`,`.`))
                    }
                }
            }).filter(t => t)
    
            return formatReturn
        } catch (error) {
            return []
        }
    };

    static async buscarSelic(mes = 11, ano = `2023`) {
        mes = util.fixMes(mes);

        const dataInicio = moment(`${mes}-${ano}`, `MM-YYYY`)
            .startOf(`month`).format(`DD/MM/YYYY`);
        const dataFim = moment(`${mes}-${ano}`, `MM-YYYY`)
            .endOf(`month`).format(`DD/MM/YYYY`);
        const codigoSerie = `1178`;

        let url = 
            `${URLBCB}/dados/serie/bcdata.sgs.${codigoSerie}`
            url += `/dados?formato=json`
            url += `&dataInicial=${dataInicio}`
            url += `&dataFinal=${dataFim}`

        const { data: retorno } = await axios.get(url);

        return retorno.map(t => {
            return {
                data: t.data,
                valor: parseFloat(+t.valor)
            }
        });
        
    }

    static async buscarTxExtraMercado(mes = 11, ano = `2023`) {
        mes = util.fixMes(mes);

        const dataInicio = moment(`${mes}-${ano}`, `MM-YYYY`)
            .startOf(`month`).format(`DD/MM/YYYY`);
        const dataFim = moment(`${mes}-${ano}`, `MM-YYYY`)
            .endOf(`month`).format(`DD/MM/YYYY`);
        const codigoSerie = `27803`;

        let url = 
            `${URLBCB}/dados/serie/bcdata.sgs.${codigoSerie}`
            url += `/dados?formato=json`
            url += `&dataInicial=${dataInicio}`
            url += `&dataFinal=${dataFim}`

        const { data: retorno } = await axios.get(url);
        return retorno.map(t => {
            return {
                data: t.data,
                valor: parseFloat(+t.valor)
            }
        })

        
    }
}

module.exports = IndicesBrasileiros
