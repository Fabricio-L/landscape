import { useForm } from 'react-hook-form'
import styles from '@/styles/Home.module.css'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Layout from '@/components/Layout'

const schema = yup.object().shape({
  nombre: yup.string().required('Por favor ingresa tu nombre'),
  correo: yup
    .string()
    .email('Ingresa un correo electrónico válido')
    .required('Por favor ingresa tu correo electrónico'),
  telefono: yup.string(),
  edad: yup
    .number()
    .required('Por favor ingresa tu edad')
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

  const onSubmit = data => {
    console.log(data)
  }

  return (
    <Layout title="Form">
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.field}>
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            {...register('nombre')}
          />
          {errors.nombre && (
            <span className={styles.error}>{errors.nombre.message}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="correo">Correo electrónico</label>
          <input
            type="email"
            id="correo"
            name="correo"
            {...register('correo')}
          />
          {errors.correo && (
            <span className={styles.error}>{errors.correo.message}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            {...register('telefono')}
          />
          {errors.telefono && (
            <span className={styles.error}>{errors.telefono.message}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="edad">Edad</label>
          <input type="number" id="edad" name="edad" {...register('edad')} />
          {errors.edad && (
            <span className={styles.error}>{errors.edad.message}</span>
          )}
        </div>

        <button type="submit" className={styles.button}>
          Enviar
        </button>
      </form>
    </Layout>
  )
}
