import { useState } from 'react'
import Head from 'next/head'
import { notifications } from '@mantine/notifications'
import { MdOutlineDone, MdErrorOutline } from 'react-icons/md'
import { Checkbox, Group } from '@mantine/core'
import styles from './form.module.scss'

export default function Contact({ locale, bg }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    surname: '',
    phone: '',
    foretag: '',
    agree: false,
    ovrigt: false,
    karriar: false,
    produkter: false,
    samarbete: false,
    bestallning: false
  })

  const handleChange = (e) => {
    const { name, checked } = e.target
    if (e.target.type === 'checkbox') {
      setFormData({ ...formData, [name]: checked })
    } else {
      setFormData({ ...formData, [name]: e.target.value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const {
      name,
      email,
      message,
      phone,
      surname,
      foretag,
      agree,
      ovrigt,
      karriar,
      produkter,
      samarbete,
      bestallning
    } = formData

    notifications.show({
      title: 'Skickar meddelande',
      message: 'Var god vänta...',
      color: 'blue',
      autoClose: false,
      loading: true,
      id: 'loading'
    })

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          surname,
          phone,
          foretag,
          agree,
          ovrigt,
          karriar,
          produkter,
          samarbete,
          bestallning
        })
      })

      if (res.ok) {
        setFormData({
          name: '',
          email: '',
          message: '',
          surname: '',
          phone: '',
          foretag: '',
          bestallning: false,
          agree: false,
          ovrigt: false,
          karriar: false,
          produkter: false,
          samarbete: false
        })
        notifications.show({
          title: 'Tack för ditt meddelande',
          message: 'Vi återkommer så snart vi kan!',
          icon: <MdOutlineDone />,
          color: 'green',
          styles: (theme) => ({
            root: {
              backgroundColor: theme.colors.white,
              borderColor: theme.colors.white,

              '&::before': { backgroundColor: theme.black }
            },

            title: { color: theme.black },
            description: { color: theme.black },
            closeButton: {
              color: theme.black,
              '&:hover': { backgroundColor: theme.colors.white }
            }
          })
        })
      } else {
        notifications.show({
          title: 'Något gick fel',
          message: 'Försök igen senare.',
          icon: <MdErrorOutline />,
          color: 'red',
          styles: (theme) => ({
            root: {
              backgroundColor: theme.colors.white,
              borderColor: theme.colors.white,

              '&::before': { backgroundColor: theme.black }
            },

            title: { color: theme.black },
            description: { color: theme.black },
            closeButton: {
              color: theme.black,
              '&:hover': { backgroundColor: theme.colors.white }
            }
          })
        })
      }
    } catch (err) {
      console.error(err)
      notifications.show({
        title: 'Meddelandet kunde inte skickas',
        message: 'Kontakta oss på telefon istället.',
        icon: <MdErrorOutline />,
        color: 'red',
        styles: (theme) => ({
          root: {
            backgroundColor: theme.colors.white,
            borderColor: theme.colors.white,

            '&::before': { backgroundColor: theme.black }
          },

          title: { color: theme.black },
          description: { color: theme.black },
          closeButton: {
            color: theme.black,
            '&:hover': { backgroundColor: theme.colors.white }
          }
        })
      })
    } finally {
      setTimeout(() => {
        notifications.hide('loading')
      }, 500)
    }
  }

  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className={styles.form_container}
    >
      <Head>
        <title>Kontakta oss</title>
      </Head>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.foretag}>
          <label htmlFor="name">Företag /</label>
          <input
            type="text"
            id="foretag"
            name="foretag"
            value={formData.foretag}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.namn_efternamn}>
          <label htmlFor="name">Förnamn /</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Efternamn /</label>
          <input
            type="surname"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.email_phone}>
          <div className={styles.email}>
            <label htmlFor="email">Email /</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.phone}>
            <label htmlFor="phone">Telefon /</label>
            <input
              type="phone"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.checkbox}>
          <div className={styles.rubrik}>
            <label>VAD GÄLLER DITT ÄRENDE /</label>
          </div>
          <div className={styles.checkbox_group}>
            <Checkbox
              label="BESTÄLLNING"
              labelPosition="left"
              color="dark"
              value={`${formData.bestallning}`}
              name="bestallning"
              radius="none"
              checked={formData.bestallning}
              size="xs"
              onChange={handleChange}
            />
            <Checkbox
              labelPosition="left"
              label="PRODUKTER"
              color="dark"
              value={`${formData.produkter}`}
              checked={formData.produkter}
              name="produkter"
              radius="none"
              size="xs"
              onChange={handleChange}
            />
            <Checkbox
              labelPosition="left"
              label="SAMARBETE"
              color="dark"
              value={`${formData.samarbete}`}
              checked={formData.samarbete}
              name="samarbete"
              radius="none"
              size="xs"
              onChange={handleChange}
            />
            <Checkbox
              label="KARRIÄR"
              labelPosition="left"
              color="dark"
              value={`${formData.karriar}`}
              checked={formData.karriar}
              name="karriar"
              radius="none"
              size="xs"
              onChange={handleChange}
            />
            <Checkbox
              label="ÖVRIGT"
              labelPosition="left"
              color="dark"
              value={`${formData.ovrigt}`}
              checked={formData.ovrigt}
              name="ovrigt"
              radius="none"
              size="xs"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.message}>
          <label htmlFor="message">BESKRIV DITT ÄRENDE.</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <div className={styles.agree}>
          <Checkbox
            label={`Jag godkänner att SES Protection sparar och hanterar mina personuppgifter i enlighet med dataskyddsförordningen GDPR.`}
            color="dark"
            defaultChecked={formData.agree}
            checked={formData.agree}
            name="agree"
            radius="none"
            size="xs"
            onChange={handleChange}
          />
        </div>

        <button type="submit">{locale === 'sv' ? 'Skicka' : 'Send'}</button>
      </form>
    </div>
  )
}
