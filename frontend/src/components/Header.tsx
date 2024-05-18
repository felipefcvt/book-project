import Link from "../../node_modules/next/link";
import styles from '../styles/global.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <h1>Book</h1>

            <div>
                <Link href={'/'}>Buscar livro</Link>
                <Link href={'/book/favorites'}>Favoritos</Link>
            </div>
        </header>
    )
}