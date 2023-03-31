import Image from 'next/image'
import Layout from '@/components/Layout'
import { IconPokeball, IconWeight, IconRuler2 } from '@tabler/icons-react'
import styles from '@/styles/Pokemon.module.css'

export default function pokemon({ data }) {
  return (
    <Layout title="Pokedex">
      <section className={styles.section}>
        <h1>Pokemon</h1>
        {data && (
          <div className={styles.card}>
            <h3 className={styles.number}>
              <IconPokeball />
              {data.order}
            </h3>
            <Image
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64`}
              src={data.sprites.front_default}
              width={128}
              height={128}
              alt={`Pokemon - ${data.name}`}
            />
            <h3 className={styles.name}>{data.name}</h3>
            <h3 className={styles.h}>
              <IconRuler2 />: {data.height}
            </h3>
            <h3 className={styles.w}>
              <IconWeight />: {data.weight}
            </h3>
          </div>
        )}
      </section>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const { pokemon } = params

  // Fetch data
  const res = await fetch(`${process.env.REACT_APP_API_URL}/${pokemon}`)
  const data = await res.json()

  if (!data) return { props: { data: null } }

  return { props: { data } }
}
