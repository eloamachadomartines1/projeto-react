"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const rotaAtual = usePathname();

  const paginas = [
    { nome: "Início", caminho: "/" },
    { nome: "Categorias", caminho: "/categorias" },
    { nome: "Produtos", caminho: "/produtos" },
    { nome: "Clientes", caminho: "/clientes" },
    { nome: "Pedidos", caminho: "/pedidos" },
    { nome: "Novo Pedido", caminho: "/pedidos/novo" },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.barraSuperior}>
        <Link href="/" className={styles.logo}>
          Zuuuuca
        </Link>

        <button
          className={styles.botaoHamburguer}
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label="Abrir menu"
        >
          {menuAberto ? "Fechar" : "Menu"}
        </button>

        <nav className={styles.menuDesktop}>
          {paginas.map((item) => (
            <Link
              key={item.caminho}
              href={item.caminho}
              className={`${styles.link} ${rotaAtual === item.caminho ? styles.linkAtivo : ""}`}
            >
              {item.nome}
            </Link>
          ))}
        </nav>
      </div>

      {menuAberto && (
        <nav className={styles.menuMobile}>
          {paginas.map((item) => (
            <Link
              key={item.caminho}
              href={item.caminho}
              onClick={() => setMenuAberto(false)}
              className={`${styles.link} ${rotaAtual === item.caminho ? styles.linkAtivo : ""}`}
            >
              {item.nome}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
