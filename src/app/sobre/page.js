'use client';
import { useState } from 'react'
import styles from './page.module.css'

export default function Sobre(){

//declarar um estado booleano inicializado com true 'show'
    const [show, setshow] = useState(false)
    return(
        <main>
            <h1>Sobre nós pessoas!</h1>
            
               
            <button type='button' onClick={() => setshow(!show)}>{show ? 'Esconder': 'Aparecer'}</button>
            
            { show &&
            <div>
                <h2>Estudos</h2>
                <p>Formação técnica em andamento no ifro</p>
            </div>
            }

        </main>
    )
}