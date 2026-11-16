"use client";

import { useEffect, useState } from "react";
import { buscarDados } from "@/services/api";
import styles from "./page.module.css";

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        const [listaProdutos, listaCategorias] = await Promise.all([
          buscarDados("/produtos"),
          buscarDados("/categorias"),
        ]);
        setProdutos(listaProdutos);
        setCategorias(listaCategorias);
      } catch (e) {
        setErro(e.message);
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  function obterNomeCategoria(categoriaId) {
    const cat = categorias.find((c) => c.id === categoriaId);
    return cat ? cat.nome : "Sem categoria";
  }

  const produtosFiltrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div>
      <h1 className={styles.titulo}>Produtos em Estoque</h1>

      <input
        type="text"
        placeholder="Buscar produto pelo nome..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          border: "1px solid #bfa8ad",
          fontSize: "1rem",
        }}
      />

      {carregando && <p>Carregando lista de produtos...</p>}
      {erro && <p className={styles.erro}>{erro}</p>}

      <div className={styles.grade}>
        {produtosFiltrados.map((prod) => (
          <div key={prod.id} className={styles.card}>
            <span className={styles.etiqueta}>
              #{prod.id} • {obterNomeCategoria(prod.categoria_id)}
            </span>
            <h2>{prod.nome}</h2>
            {prod.descricao && (
              <p className={styles.detalhe}>{prod.descricao}</p>
            )}
            <p className={styles.detalhe}>
              Preço: <strong>R$ {Number(prod.preco).toFixed(2)}</strong>
            </p>
            <p className={styles.detalhe}>
              Estoque: <strong>{prod.quantidade_estoque} un.</strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
