let tipoMensagem = document.querySelector('select#comunicacao');
let periodo = document.querySelector('select#periodo');
let mensagem = document.querySelector('div#resposta');
let periodoMsg = '';
let aula = document.querySelector('select#aula');
let prof = document.querySelector('select#professor');
let retornoCopia = document.querySelector('div#retornoCopia');
let turma = document.querySelector('select#turma');
const zoomARH5 = {  'link':"https://zoom.us/j/98187385555?pwd=9ZqmdOoKSw2jo78xlCTCEWGZKyQuWD.1",
                    'id reunião': '981 8738 5555',
                    'senha da reunião': 'ARH5'
                }
let parLinkMaterial = document.querySelector('p#linkMaterial')
let linkMaterial = document.querySelector('input#link');

function tipoComunicacao() {
    if (tipoMensagem.value == 'envioMaterial') {
        parLinkMaterial.style.display = 'block'
    } else {
        parLinkMaterial.style.display = 'none'
    }
}

function gerarMensagem() {
    retornoCopia.innerText = '⚠️ Esse ainda não foi copiado!'
    const aulaSelecionada = aula.options[aula.selectedIndex].text;
    const profSelecionado = prof.options[prof.selectedIndex].text;
    const turmaSelecionada = turma.options[turma.selectedIndex].text
    const linkInformado = linkMaterial.value
    switch (periodo.value) {
        case 'manha':
            periodoMsg = 'Bom dia,'
            break;
        case 'tarde':
            periodoMsg = 'Boa tarde,'
            break;
        case 'noite':
            periodoMsg = 'Boa tarde,'
            break;
    }
    if (tipoMensagem.value == 'lembreteAula') {
        mensagem.innerText = `${periodoMsg} turma! 😁\nTudo bem com vocês?\n\nPassando aqui para lembrá-los que teremos aula hoje às 19H00. 📌\nO tema será: ${aulaSelecionada}.\nA pessoa formadora será: ${profSelecionado}.\n\n🔗 Link de acesso: ${zoomARH5.link}\n\nID da reunião: ${zoomARH5["id reunião"]}\nSenha: ${zoomARH5["senha da reunião"]}`
        mensagem.style.color = 'black'
    } else if (tipoMensagem.value == 'envioMaterial') {
        mensagem.innerHTML = `${periodoMsg} ${profSelecionado}!<br>Tudo bem?<br><br>Estou compartilhando com você o material da nossa próxima aula da turma ${turmaSelecionada}:<br>${linkInformado}<br><br>Atenciosamente,`
        mensagem.style.color = 'black'
    } else {
        mensagem.innerText = `**Primeiro você precisa selecionar a comunicação que você quer fazer.**`
        mensagem.style.color = 'red'
    }
}

function copiarMensagem() {
    let mensagemCopiada = mensagem.innerText;
    navigator.clipboard.writeText(mensagemCopiada)
    .then(sucesso)
    .catch(erro);
}

function sucesso() {
    retornoCopia.innerText = '✅ Texto copiado com sucesso!'
}

function erro() {
    retornoCopia.innerText = '😥 Erro ao copiar o texto...'
}