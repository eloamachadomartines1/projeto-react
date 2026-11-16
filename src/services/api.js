const URL_BASE = "https://stock.dev.vilhena.ifro.edu.br/api";

export async function buscarDados(rota) {
  const resposta = await fetch(`${URL_BASE}${rota}`);

  if (!resposta.ok) {
    throw new Error(`Erro ao buscar ${rota}: ${resposta.statusText}`);
  }

  return resposta.json();
}

export async function enviarDados(rota, dados) {
  const resposta = await fetch(`${URL_BASE}${rota}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  if (!resposta.ok) {
    throw new Error(`Erro ao enviar para ${rota}: ${resposta.statusText}`);
  }

  return resposta.json();
}
