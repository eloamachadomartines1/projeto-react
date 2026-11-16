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

        setPedidos(Array.isArray(resPedidos) ? resPedidos : resPedidos.data || []);
        setItens(Array.isArray(resItens) ? resItens : resItens.data || []);
        setClientes(Array.isArray(resClientes) ? resClientes : resClientes.data || []);
        setProdutos(Array.isArray(resProdutos) ? resProdutos : resProdutos.data || []);
      } catch {
        setErro("Não foi possível carregar os pedidos.");
      } finally {
        setCarregando(false);
      }
    }

    carregarTudo();
  }, []);

  function obterNomeCliente(id) {
    const cliente = clientes.find((c) => c.id === id);
    return cliente ? cliente.nome || cliente.name : `Cliente #${id}`;
  }

  function obterNomeProduto(id) {
    const produto = produtos.find((p) => p.id === id);
    return produto ? produto.nome || produto.name : `Produto #${id}`;
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
          const itensDestePedido = itens.filter(
            (i) => (i.pedido_id || i.pedidoId) === pedido.id
          );

          return (
            <div key={pedido.id} className={styles.card}>
              <span className={styles.etiqueta}>Pedido #{pedido.id}</span>
              <h2>{obterNomeCliente(pedido.cliente_id || pedido.clienteId)}</h2>

              <h4 className={styles.tituloItens}>Itens do Pedido</h4>

              {itensDestePedido.length > 0 ? (
                <ul className={styles.listaItens}>
                  {itensDestePedido.map((item, idx) => (
                    <li key={item.id || idx} className={styles.itemLinha}>
                      <span>{obterNomeProduto(item.produto_id || item.produtoId)}</span>
                      <strong>{item.quantidade} un.</strong>
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
