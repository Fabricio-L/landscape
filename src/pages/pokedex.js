import { useState } from 'react'
import Layout from '@/components/Layout'
import styles from '@/styles/Pokedex.module.css'
import Link from 'next/link'

export default function Pokemon({ data }) {
  const { results } = data
  const [filteredData, setFilteredData] = useState(results)
  const [wordEntered, setWordEntered] = useState('')

  const handleFilter = event => {
    const searchWord = event.target.value
    setWordEntered(searchWord)
    const newFilter = results.filter(poke => {
      return poke.name.toLowerCase().includes(searchWord.toLowerCase())
    })

    searchWord === '' ? setFilteredData(results) : setFilteredData(newFilter)
  }

  return (
    <Layout title="Pokedex">
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.search}>
            <input
              type="text"
              placeholder="Ingrese un pokemon"
              value={wordEntered}
              onChange={handleFilter}
            />
          </div>
          <div className={styles.list}>
            {filteredData?.map((poke, index) => (
              <Link
                key={index}
                className={styles.card}
                href={`pokedex/${poke.name}`}
              >
                {poke.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  // Fetch data
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}?limit=10000&offset=0`
  )
  const data = await res.json()

  return { props: { data } }
}
