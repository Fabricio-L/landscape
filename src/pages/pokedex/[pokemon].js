import Layout from '@/components/Layout'
import styles from '@/styles/Pokedex.module.css'

export default function pokemon({ data }) {
  return (
    <Layout title="Pokedex">
      <h1>Pokemon</h1>
      {data && <h1>{data.name}</h1>}
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const { pokemon } = params

  // Fetch data
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
  const data = await res.json()

  if (!data) return { props: { data: null } }

  return { props: { data } }
}
