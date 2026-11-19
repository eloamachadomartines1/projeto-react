"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { buscarDados } from "@/services/api";
import styles from "./page.module.css";

export default function ListarPedidosPage() {
  const [pedidos, setPedidos] = useState([]);
  const [itens, setItens] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarTudo() {
      try {
        const [resPedidos, resItens, resClientes, resProdutos] = await Promise.all([
          buscarDados("/pedidos"),
          buscarDados("/itens_pedido"),
          buscarDados("/clientes"),
          buscarDados("/produtos"),
        ]);

        // Coloca os pedidos mais recentes no topo da lista
        setPedidos([...resPedidos].reverse());
        setItens(resItens);
        setClientes(resClientes);
        setProdutos(resProdutos);
      } catch (e) {
        setErro(e.message || "Não foi possível carregar os pedidos.");
      } finally {
        setCarregando(false);
      }
    }

    carregarTudo();
  }, []);

  function obterNomeCliente(id) {
    const cliente = clientes.find((c) => Number(c.id) === Number(id));
    return cliente ? cliente.nome : `Cliente #${id}`;
  }

  function obterNomeProduto(id) {
    const produto = produtos.find((p) => Number(p.id) === Number(id));
    return produto ? produto.nome : `Produto #${id}`;
  }

  return (
    <div>
      <div className={styles.cabecalhoPagina}>
        <h1 className={styles.titulo}>Pedidos Cadastrados</h1>
        <Link href="/pedidos/novo" className={styles.botaoNovo}>
          Novo Pedido
        </Link>
      </div>

      {carregando && <p>Carregando pedidos...</p>}
      {erro && <p className={styles.erro}>{erro}</p>}

      <div className={styles.grade}>
        {pedidos.map((pedido) => {
          // A API retorna "pedido_numero" no GET /itens_pedido
          const itensDestePedido = itens.filter(
            (i) => Number(i.pedido_numero ?? i.pedido_id) === Number(pedido.id)
          );

          return (
            <div key={pedido.id} className={styles.card}>
              <span className={styles.etiqueta}>
                Pedido #{pedido.id} • {pedido.status || "pendente"}
              </span>
              <h2>{obterNomeCliente(pedido.cliente_id)}</h2>

              <h4 className={styles.tituloItens}>Itens do Pedido</h4>

              {itensDestePedido.length > 0 ? (
                <ul className={styles.listaItens}>
                  {itensDestePedido.map((item) => (
                    <li key={item.id} className={styles.itemLinha}>
                      <span>{obterNomeProduto(item.produto_id)}</span>
                      <strong>
                        {item.quantidade}x (R$ {Number(item.preco_unitario).toFixed(2)})
                      </strong>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.semItens}>Nenhum item vinculado.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
