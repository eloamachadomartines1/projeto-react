'use client'
import { useState } from "react"
import styles from "./page.module.css"

export default function Contato() {
    //let cont = 0

    //para declarar variaveis com react linha 9 a 15 e vai aparecer a linha 2 quando escreve o 'setCont'
    const [cont, setCont] = useState(0)
    const [nome, setNome] = useState('')

    const somar = () => {
        // cont = cont + 1 
        setCont(cont + 1)
        //setCont(prev => prev +1 )
        console.log(cont)
    }
    return (
        <main>
            <h1 className={styles.h1}>Nosso contato</h1>
            <p>Cont: {cont}</p>
            <button type="button" onClick={somar}>Somar</button>

            {/* crie um formulario, com um fildset, um paragrafo, um label e um botao*/}
            <form>
                <fieldset>
                    <p>Nome digitado:{nome}</p>
                    <label htmlFor='nome'>Nome</label>
                    <input type="text" id="nome" name="nome" onKeyUp={ e => setNome(e.target.value)}/>

                    <label htmlFor="msg">Mensagem:</label>
                    <input type="text"  id="msg" name="msg" onKeyUp={e => setMsg*(e.target.value)}/>



                    <button type="button" >Ok</button>
                </fieldset>
            </form>
        </main>
    )
}