import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div>
      <section className={styles.cartaoPrincipal}>
        <span className={styles.etiqueta}>4º Bimestre - Front-End</span>
        <h1 className={styles.titulo}>Zuuuuca - Controle de Estoque</h1>
        <p className={styles.descricao}>
          Aplicação web para consulta de produtos, categorias, clientes e registro de pedidos.
        </p>

        <div className={styles.caixaDupla}>
          <h3>Desenvolvido por</h3>
          <ul className={styles.listaNomes}>
            <li>Eloá Machado Martines</li>
          </ul>
        </div>
      </section>

      <section className={styles.gradeAtalhos}>
        <Link href="/pedidos" className={styles.atalho}>
          <h3>Listar Pedidos</h3>
          <p>Consulte os pedidos realizados e os itens vinculados a cada um.</p>
        </Link>

        <Link href="/pedidos/novo" className={styles.atalho}>
          <h3>Criar Pedido</h3>
          <p>Selecione um cliente e adicione produtos com suas quantidades.</p>
        </Link>

        <Link href="/produtos" className={styles.atalho}>
          <h3>Catálogo de Produtos</h3>
          <p>Visualize os produtos cadastrados e a quantidade em estoque.</p>
        </Link>
      </section>
    </div>
  );
}
