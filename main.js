import './style.css'

const inputLink = document.querySelector('#linkArquivo');
const linkArquivo = document.querySelector('#linkArquivo');
const botaoColar = document.querySelector('#btn-colar');
const botaoBaixar = document.querySelector('#btn-baixar');

botaoColar.addEventListener("click", function() {
  navigator.clipboard
  .readText()
  .then( clipText => {
    inputLink.value = clipText;
  })
})

botaoBaixar.addEventListener("click", function(obj) {
  obj.preventDefault();
  botaoBaixar.innerText = "Baixando arquivo...";
  fetchFile(linkArquivo.value);
})

function fetchFile(url) {
  fetch(url).then(res => res.blob()).then(file => {
    let tempURL = URL.createObjectURL(file);
    let link = document.createElement("a");
    link.href = tempURL;
    link.download = url.replace(/^.*[\\\/]/, '');
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(tempURL);
    botaoBaixar.innerText = "Baixando arquivo...";
  }).catch( () =>  {
    botaoBaixar.innerText = "Baixando arquivo...";
    alert("FALHA AO BAIXAR ARQUIVO!!!");
  });
}
