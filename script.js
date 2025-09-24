// Seletores principais
const btnGerar = document.querySelector('#botaoGerar');
const btnCopiar = document.querySelector('#botaoCopiar');
const tipoMensagem = document.querySelector('#comunicacao');
const periodo = document.querySelector('#periodo');
const mensagem = document.querySelector('#resposta');
const turma = document.querySelector('#turma');
const aula = document.querySelector('#aulas');
const prof = document.querySelector('#professor');
const retornoCopia = document.querySelector('label[for="botaoCopiar"]');

// Campos extras
const parLinkMaterial   = document.querySelector('#linkMaterial');
const parComentarios    = document.querySelector('#comentarios');
const parPercentCSAT    = document.querySelector('#txtPercentCSAT');
const parQtdComentarios = document.querySelector('#qtdComentarios');
const parQtdAvaliacoes  = document.querySelector('#qtdAvaliacoes');

const linkMaterial   = document.querySelector('#link');
const txtPercentCSAT = document.querySelector('#txtPercentCSAT');
const qtdComentarios = document.querySelector('#qtdComentarios');
const comentarios    = document.querySelector('#comentarios textarea');

// Zoom fixo da turma
const zoomARH5 = {
  link: "https://zoom.us/j/98187385555?pwd=9ZqmdOoKSw2jo78xlCTCEWGZKyQuWD.1",
  id: "981 8738 5555",
  senha: "ARH5"
};

// ----------------- Carregar dados externos -----------------
const carregarOptions = (url, select) => {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      // pega a chave dinamicamente (professores ou aulas)
      const lista = Object.values(data)[0];
      lista.forEach(nome => {
        const option = document.createElement('option');
        option.value = nome.toLowerCase().replace(/\s+/g, '');
        option.textContent = nome;
        select.appendChild(option);
      });
    })
    .catch(err => console.error(`Erro ao carregar ${url}:`, err));
};

carregarOptions('aulas.json', aula);
carregarOptions('professores.json', prof);

// ----------------- Controle de campos -----------------
const campos = {
  envioMaterial: [parLinkMaterial],
  CSATProfessor: [parPercentCSAT, parQtdComentarios, parComentarios, parQtdAvaliacoes]
};

function tipoComunicacao() {
  // esconde todos
  [parLinkMaterial, parPercentCSAT, parQtdComentarios, parComentarios, parQtdAvaliacoes]
    .forEach(el => el.style.display = 'none');

  // mostra apenas os do tipo selecionado
  (campos[tipoMensagem.value] || []).forEach(el => el.style.display = 'block');
}

// ----------------- Gerar mensagem -----------------
btnGerar.addEventListener('click', () => {
  retornoCopia.textContent = '⚠️ Clique em "Copiar" para copiar o texto gerado.';

  const aulaSelecionada = aula.options[aula.selectedIndex]?.text || '';
  const profSelecionado = prof.options[prof.selectedIndex]?.text || '';
  const turmaSelecionada = turma.options[turma.selectedIndex]?.text || '';

  const linkInformado = linkMaterial.value;
  const percentCSAT   = txtPercentCSAT.value;
  const qtdComents    = qtdComentarios.value;
  const qtdAvaliacoes = document.querySelector('#qtdAvaliacoes').value;
  const comentariosTxt= comentarios.value;

  const periodos = {
    manha: "Bom dia,",
    tarde: "Boa tarde,",
    noite: "Boa noite,"
  };
  const periodoMsg = periodos[periodo.value] || "";

  let texto = '';
  switch (tipoMensagem.value) {
    case 'lembreteAula':
      texto = `${periodoMsg} turma! 😁\nTudo bem com vocês?\n\nPassando aqui para lembrá-los que teremos aula hoje às 19H00. 📌\nO tema será: ${aulaSelecionada}.\nA pessoa formadora será: ${profSelecionado}.\n\n🔗 Link de acesso: ${zoomARH5.link}\n\nID da reunião: ${zoomARH5.id}\nSenha: ${zoomARH5.senha}`;
      mensagem.innerText = texto;
      break;

    case 'envioMaterial':
      texto = `${periodoMsg} ${profSelecionado}!<br>Tudo bem?<br><br>Estou compartilhando com você o material da nossa próxima aula da turma ${turmaSelecionada}:<br>${linkInformado}<br><br>Atenciosamente,`;
      mensagem.innerHTML = texto;
      break;

    case 'CSATProfessor':
      texto = `${periodoMsg} ${profSelecionado}!<br>Tudo bem?<br><br>Estou compartilhando com você o CSAT da última aula da turma ${turmaSelecionada}:<br>O CSAT ficou em ${percentCSAT}% com ${qtdAvaliacoes} avaliações e ${qtdComents} comentários:<br>${comentariosTxt}<br><br>Atenciosamente,`;
      mensagem.innerHTML = texto;
      break;

    default:
      mensagem.innerText = "**Primeiro você precisa selecionar a comunicação que você quer fazer.**";
      mensagem.style.color = 'red';
      return;
  }

  mensagem.style.color = 'black';
});

// ----------------- Copiar mensagem -----------------
btnCopiar.addEventListener('click', () => {
  navigator.clipboard.writeText(mensagem.innerText)
    .then(() => retornoCopia.innerText = '✅ Texto copiado com sucesso!')
    .catch(() => retornoCopia.innerText = '😥 Erro ao copiar o texto...');
});
