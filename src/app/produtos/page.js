"use client";

import { useEffect, useState } from "react";
import styles from './page.module.css'
import CardProd from "@/components";

export default function Produtos() {
    const [prods, setProds] = useState(null);
    const [cats, setCats] = useState(null);
    const [prodSelected, setProdSelected] = useState(null);

    useEffect(() => {
        const fetchProds = async () => {
            try {
                const response = await fetch('https://stock.dev.vilhena.ifro.edu.br/api/produtos');
                if (!response.ok) {
                    throw new Error(`Erro ao buscar Produtos: ${response.statusText}`);
                }

                const data = await response.json();
                console.log(data);
                setProds(data);
            } catch (e) {
                console.log(`${e.message}`);
            }
        };

        fetchProds();
    }, []);

// CRIE UM FETCHCATS PARA BUSCAR AS CATEGORIAS...
useEffect(() => {
    const fetchCats = async () => {
        const response = await fetch('https://stock.dev.vilhena.ifro.edu.br/api/categorias')
        if (!response.ok){
            throw new Error(`Erro ao buscar Categorias ${response.statusText}`)
        }
        const data = await response.json()
        console.log(data);
        setCats(data)
    }
    fetchCats();
}, [])

const getNomeCategoria = (id_categoria) => {
    const categoria = cats?.find(cat => cat.id === id_categoria);
    return categoria ? categoria.nome : 'Categoria Indefinida';
}

    return (

        <div>
            <h1>Produtos</h1>
            {prods === null ?
                <p>Carregando lista de produtos...</p> :
                <div>
                    <table className={styles.tbl}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NOME</th>
                                <th>DESCRICAO</th>
                                <th>CATEGORIA</th>
                                <th>ESTOQUE</th>
                                <th>PRECO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prods.map((prod) => (
                                <tr key={prod.id} onClick={() => prodSelected(prod)}>
                                    <td>{prod.id}</td>
                                    <td>{prod.nome}</td>
                                    <td>{prod.descricao}</td>
                                    <td>{getNomeCategoria(prod.categoria_id)}</td>
                                    <td>{prod.quantidade_estoque}</td>
                                    <td>{prod.preco}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            } 
            {/* {como criar uma redenrização condicional com base no estado prod} */}
            {prodSelected && <CardProd/>}
        </div>

    );
}
