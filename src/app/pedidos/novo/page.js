"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { buscarDados, enviarDados } from "@/services/api";
import styles from "./page.module.css";

export default function CriarPedidoPage() {
  const router = useRouter();

  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const [clienteId, setClienteId] = useState("");  
  const [produtoId, setProdutoId] = useState("");
  const [quantidade, setQuantidade] = useState(1);

  const [carrinho, setCarrinho] = useState([]);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarOpcoes() {
      try {
        const [resClientes, resProdutos] = await Promise.all([
          buscarDados("/clientes"),
          buscarDados("/produtos"),
        ]);
        setClientes(resClientes);
        setProdutos(resProdutos);
      } catch (e) {
        setErro("Não foi possível carregar clientes e produtos.");
      }
    }
    carregarOpcoes();
  }, []);

  function adicionarItem() {
    if (!produtoId || quantidade <= 0) return;

    const prodEncontrado = produtos.find((p) => String(p.id) === String(produtoId));
    if (!prodEncontrado) return;

    setCarrinho([
      ...carrinho,
      {
        produto_id: prodEncontrado.id,
        nome: prodEncontrado.nome,
        quantidade: Number(quantidade),
        preco_unitario: Number(prodEncontrado.preco),
      },
    ]);

    setProdutoId("");
    setQuantidade(1);
  }

  function removerItem(indice) {
    setCarrinho(carrinho.filter((_, i) => i !== indice));
  }

  async function finalizarPedido(evento) {
    evento.preventDefault();

    if (!clienteId || carrinho.length === 0) {
      setErro("Selecione um cliente e adicione pelo menos um produto.");
      return;
    }

    setSalvando(true);
    setErro("");

    try {
            // 1. Cria o pedido
      const pedidoCriado = await enviarDados("/pedidos", {
        cliente_id: Number(clienteId),
      });

      const idNovoPedido = Number(pedidoCriado.id || pedidoCriado.data?.id);

      // 2. Cria cada item vinculado ao pedido
      for (const item of carrinho) {
        await enviarDados("/itens_pedido", {
          pedido_id: idNovoPedido,
          produto_id: Number(item.produto_id),
          quantidade: Number(item.quantidade),
          preco_unitario: Number(item.preco_unitario),
        });
      }

      router.push("/pedidos");
    } catch (e) {
      setErro(e.message || "Erro ao registrar o pedido.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className={styles.containerForm}>
      <h1 className={styles.titulo}>Criar Novo Pedido</h1>

      {erro && <p className={styles.erro}>{erro}</p>}

      <form onSubmit={finalizarPedido} className={styles.formulario}>
        <div className={styles.campo}>
          <label>Cliente</label>
          <select value={clienteId} onChange={(e) => setClienteId(e.target.value)} required>
            <option value="">Selecione um cliente</option>
            {clientes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.campo}>
          <label>Produto</label>
          <select value={produtoId} onChange={(e) => setProdutoId(e.target.value)}>
            <option value="">Selecione um produto</option>
            {produtos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome} — R$ {Number(p.preco).toFixed(2)}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.linhaAdicionar}>
          <input
            type="number"
            min="1"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            className={styles.inputQuantidade}
          />
          <button type="button" onClick={adicionarItem} className={styles.botaoAdicionar}>
            Adicionar
          </button>
        </div>

        {carrinho.length > 0 && (
          <div className={styles.caixaItens}>
            <h4>Itens selecionados</h4>
            {carrinho.map((item, idx) => (
              <div key={idx} className={styles.itemLinha}>
                <span>
                  <strong>{item.quantidade}x</strong> {item.nome} (R$ {item.preco_unitario.toFixed(2)})
                </span>
                <button
                  type="button"
                  onClick={() => removerItem(idx)}
                  className={styles.botaoRemover}
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        )}

        <button type="submit" disabled={salvando} className={styles.botaoSalvar}>
          {salvando ? "Salvando..." : "Finalizar Pedido"}
        </button>
      </form>
    </div>
  );
}
