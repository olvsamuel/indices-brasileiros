module.exports = {
    fixMes(mes){
        mes = mes.toString();
        if (mes.length == 1) {
            mes = `0${mes}`;
        }
        return mes;
    }
}
