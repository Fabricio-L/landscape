import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from './Topbar.module.css'

export default function Topbar() {
  const router = useRouter()
  const path = router.asPath

  const links = {
    home: '/',
    pokedex: '/pokedex',
  }

  return (
    <section className={styles.section}>
      <ul className={styles.links}>
        <li>
          <Link
            href={links['home']}
            className={links['home'] === path ? styles.active : styles.default}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href={links['pokedex']}
            className={
              links['pokedex'] === path ? styles.active : styles.default
            }
          >
            Pokedex
          </Link>
        </li>
        <li className={path.split('/')[2] ? styles.active : styles.disable}>
          <Link
            href={path}
            className={path === path ? styles.active : styles.default}
          >
            {path.split('/')[2]}
          </Link>
        </li>
      </ul>
    </section>
  )
}
