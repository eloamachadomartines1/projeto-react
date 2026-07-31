import Link from 'next/link'
import styles from './Header.module.css'

export default function Header(){
    return(
        <header>
            <nav>
                <ul>
                    <li><Link href='/sobre'/></li>
                    <li></li>
                    <li></li>
                </ul>
            </nav>
        </header>
    )
}