import Layout from '@/components/Layout'
import styles from '@/styles/Home.module.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().required('Por favor ingresa tu name'),
  mail: yup
    .string()
    .email('Ingresa un mail electrónico válido')
    .required('Por favor ingresa tu mail electrónico'),
  phone: yup.string(),
  age: yup
    .number()
    .required('Por favor ingresa tu age')
    .min(18, 'Debes ser mayor de 18 años'),
})

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async data => {
    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        mail: data.mail,
        phone: data.phone,
        age: data.age,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .then(data => {
        alert(data.message)
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <Layout title="Form">
      <section className={styles.section}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h1 className={styles.title}>Complete sus datos</h1>
          <div className={styles.field}>
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" name="name" {...register('name')} />
            {errors.name && (
              <span className={styles.error}>{errors.name.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="mail">Correo</label>
            <input type="email" id="mail" name="mail" {...register('mail')} />
            {errors.mail && (
              <span className={styles.error}>{errors.mail.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="phone">Teléfono</label>
            <input type="text" id="phone" name="phone" {...register('phone')} />
            {errors.phone && (
              <span className={styles.error}>{errors.phone.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="age">Edad</label>
            <input type="number" id="age" name="age" {...register('age')} />
            {errors.age && (
              <span className={styles.error}>{errors.age.message}</span>
            )}
          </div>

          <button type="submit" className={styles.button}>
            Enviar
          </button>
        </form>
      </section>
    </Layout>
  )
}
