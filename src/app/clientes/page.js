"use client";

import { useEffect, useState } from "react";
import { buscarDados } from "@/services/api";
import styles from "./page.module.css";

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    buscarDados("/clientes")
      .then((dados) => setClientes(Array.isArray(dados) ? dados : dados.data || []))
      .catch(() => setErro("Não foi possível carregar os clientes."))
      .finally(() => setCarregando(false));
  }, []);

  return (
    <div>
      <h1 className={styles.titulo}>Clientes Cadastrados</h1>

      {carregando && <p>Carregando clientes...</p>}
      {erro && <p className={styles.erro}>{erro}</p>}

      {!carregando && !erro && (
        <div className={styles.caixaTabela}>
          <table className={styles.tabela}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Contato / E-mail</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cli, index) => (
                <tr key={cli.id || index}>
                  <td>#{cli.id ?? index + 1}</td>
                  <td><strong>{cli.nome || cli.name}</strong></td>
                  <td>{cli.email || cli.telefone || "Não informado"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
