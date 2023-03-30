import { useState } from 'react'
import Layout from '@/components/Layout'
import styles from '@/styles/Pokedex.module.css'
import Link from 'next/link'

export default function pokemon({ data }) {
  const [filteredData, setFilteredData] = useState([])
  const [wordEntered, setWordEntered] = useState('')

  const handleFilter = event => {
    const searchWord = event.target.value
    setWordEntered(searchWord)
    const newFilter = data.results.filter(poke => {
      return poke.name.toLowerCase().includes(searchWord.toLowerCase())
    })

    if (searchWord === '') {
      setFilteredData([])
    } else {
      setFilteredData(newFilter)
    }
  }

  return (
    <Layout title="Pokedex">
      <div>
        <input
          type="text"
          placeholder="Ingrese un pokemon"
          value={wordEntered}
          onChange={handleFilter}
        />
      </div>
      {filteredData?.slice(0, 15).map((poke, index) => (
        <Link href={`pokedex/${poke.name}`} key={index}>
          {poke.name}
        </Link>
      ))}
    </Layout>
  )
}

export async function getStaticProps() {
  // Fetch data
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0`
  )
  const data = await res.json()

  return { props: { data } }
}
