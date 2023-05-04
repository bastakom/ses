import { useState } from 'react'
import Head from 'next/head'
import { notifications } from '@mantine/notifications'
import { MdOutlineDone, MdErrorOutline } from 'react-icons/md'
import { Checkbox, Group, Radio } from '@mantine/core'
import styles from './form.module.scss'

export default function Contact({ locale, bg }) {
  const [value, setValue] = useState('Övrigt')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    surname: '',
    phone: '',
    foretag: '',
    radio: '',
    agree: false
  })

  const onOptionChange = (e) => {
    const { name } = e.target
    setFormData({ ...formData, radio: name })
  }

  const handleChange = (e) => {
    const { name } = e.target

    setFormData({ ...formData, [name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { name, email, message, phone, surname, foretag, agree, radio } =
      formData

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
          radio
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
          radio: '',
          agree: false
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
            <Radio.Group>
              <Group mt="xs" onChange={onOptionChange}>
                <Radio
                  name="BESTÄLLNING"
                  value="BESTÄLLNING"
                  label="BESTÄLLNING"
                />
                <Radio value="PRODUKTER" label="PRODUKTER" name="PRODUKTER" />
                <Radio value="SAMARBETE" label="SAMARBETE" name="SAMARBETE" />
                <Radio value="ÖVRIGT" label="ÖVRIGT" name="ÖVRIGT" />
              </Group>
            </Radio.Group>
          </div>
        </div>

        <div className={styles.message}>
          <label htmlFor="message">BESKRIV DITT ÄRENDE /</label>
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
            required
          />
        </div>

        <button type="submit">{locale === 'sv' ? 'Skicka' : 'Send'}</button>
      </form>
    </div>
  )
}
