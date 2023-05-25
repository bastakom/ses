import { useState } from 'react'
import { Checkbox, Input, Select } from '@mantine/core'
import { RxCross2 } from 'react-icons/rx'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/router'
import {
  MdErrorOutline,
  MdOutlineDone,
  MdKeyboardArrowDown
} from 'react-icons/md'
import { IMaskInput } from 'react-imask'
import { useId } from '@mantine/hooks'
import styles from './bestall.module.scss'

const Bestall = () => {
  const { locale } = useRouter()
  const [products, setProducts] = useState([{ id: 1 }])
  const [selectedProdukts, setSelectedProdukts] = useState({})
  const [selectedEnhet, setSelectedEnhet] = useState({})
  const [selectedMinBestallning, setSelectedMinBestallning] = useState({})
  const [selectedBestallAntal, setSelectedBestallAntal] = useState({})
  const [tableSummary, setTableSummary] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    surname: '',
    phone: '',
    foretag: '',
    orgnr: '',
    agree: false
  })

  const id = useId('orgnr')

  const removeProductField = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    )
    setProducts(updatedProducts)
    setSelectedProdukts((prevSelectedProdukts) => {
      const updatedSelectedProdukts = { ...prevSelectedProdukts }
      delete updatedSelectedProdukts[productId]
      return updatedSelectedProdukts
    })
  }

  const handleChange = (e) => {
    const { name } = e.target

    setFormData({ ...formData, [name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { name, email, message, phone, surname, foretag, orgnr, agree } =
      formData

    const hasEmptyFields = Object.keys(selectedProdukts).some((productId) => {
      const productValue = selectedProdukts[productId]
      const enhetValue = selectedEnhet[productId]
      const minBestallningValue = selectedMinBestallning[productId]
      const bestallAntalValue = selectedBestallAntal[productId]

      return (
        productValue === '' ||
        productValue === undefined ||
        enhetValue === '' ||
        enhetValue === undefined ||
        minBestallningValue === '' ||
        minBestallningValue === undefined ||
        bestallAntalValue === '' ||
        bestallAntalValue === undefined
      )
    })

    if (hasEmptyFields) {
      notifications.show({
        title: 'Fyll i nödvändig fält',
        message: 'Du har missat att fylla i något fält.',
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
      return
    }

    notifications.show({
      title: locale === 'sv' ? 'Skickar meddelande' : 'Sending message',
      message: locale === 'sv' ? 'Var god vänta...' : 'Please wait...',
      color: 'blue',
      autoClose: false,
      loading: true,
      id: 'loading'
    })

    try {
      if (
        (orgnr.length !== 10 ||
          name === '' ||
          email === '' ||
          phone === '' ||
          agree === false,
        hasEmptyFields)
      ) {
        throw new Error('du har missat ett fält')
      }
      const res = await fetch('/api/bestall', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedProdukts,
          selectedBestallAntal,
          selectedMinBestallning,
          selectedEnhet,
          name,
          email,
          message,
          phone,
          surname,
          foretag,
          orgnr,
          agree
        })
      })

      if (res.ok) {
        setSelectedBestallAntal({})
        setSelectedMinBestallning({})
        setSelectedEnhet({})
        setSelectedProdukts({ '1': '' })
        setTableSummary([])
        setFormData({
          name: '',
          email: '',
          message: '',
          surname: '',
          phone: '',
          foretag: '',
          orgnr: '',
          agree: false
        })

        const data = await res.json()
        const productId = data.id

        const updatedProducts = products.filter(
          (product) => product.id === 1 || product.id === productId
        )
        setProducts(updatedProducts)

        setSelectedProdukts((prevSelectedProdukts) => {
          const updatedSelectedProdukts = { ...prevSelectedProdukts }
          if (productId !== 1) {
            delete updatedSelectedProdukts[productId]
          }
          return updatedSelectedProdukts
        })

        notifications.show({
          title: `${
            locale === 'sv'
              ? 'Tack för ditt order!'
              : 'Thank you for your order!'
          }`,
          message:
            locale === 'sv'
              ? 'Vi återkommer med ett mail till dig om din order'
              : 'We will be back with you shortly',
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
          title: locale === 'sv' ? 'Något gick fel' : 'Something went wrong',
          message: locale === 'sv' ? 'Försök igen senare.' : 'Try again later.',
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
        title: 'Fyll i alla fält',
        message: 'Du har missat något fält',
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

  const addProductField = () => {
    const newProductId = products.length + 1
    setProducts([...products, { id: newProductId }])
    setSelectedProdukts({ ...selectedProdukts, [newProductId]: '' })
    setTableSummary([...tableSummary, { id: newProductId, values: {} }])
  }

  const handleProduktChange = (value, productId) => {
    setSelectedProdukts((prevSelectedProdukts) => {
      const updatedSelectedProdukts = {
        ...prevSelectedProdukts,
        [productId]: value
      }

      setTableSummary((prevTableSummary) => {
        const productIndex = prevTableSummary.findIndex(
          (item) => item.id === productId
        )

        if (productIndex !== -1) {
          prevTableSummary[productIndex] = {
            id: productId,
            values: {
              produkt: value,
              enhet: '',
              minBestallning: 'PAKET',
              bestallAntal: '1'
            }
          }
        } else {
          prevTableSummary.push({
            id: productId,
            values: {
              produkt: value,
              enhet: '',
              minBestallning: 'PAKET',
              bestallAntal: '1'
            }
          })
        }

        return [...prevTableSummary]
      })

      setSelectedEnhet((prevSelectedEnhet) => ({
        ...prevSelectedEnhet,
        [productId]:
          updatedSelectedProdukts[productId] ===
            'CBRN F2 Storlek 1 – 5 st/pk' ||
          updatedSelectedProdukts[productId] === 'CBRN F2 Storlek 2 – 5 st/pk'
            ? '2'
            : '1'
      }))

      setSelectedMinBestallning((prevSelectedMinBestallning) => ({
        ...prevSelectedMinBestallning,
        [productId]: 'PAKET'
      }))

      setSelectedBestallAntal((prevSelectedBestallAntal) => ({
        ...prevSelectedBestallAntal,
        [productId]:
          updatedSelectedProdukts[productId] ===
            'CBRN F2 Storlek 1 – 5 st/pk' ||
          updatedSelectedProdukts[productId] === 'CBRN F2 Storlek 2 – 5 st/pk'
            ? '2'
            : '1'
      }))

      return updatedSelectedProdukts
    })
  }

  const getEnhetOptions = (productId) => {
    if (
      selectedProdukts[productId] === 'CBRN F2 Storlek 1 – 5 st/pk' ||
      selectedProdukts[productId] === 'CBRN F2 Storlek 2 – 5 st/pk'
    ) {
      return [{ value: '2', label: '2 ST' }]
    } else {
      return [{ value: '1', label: '1 ST' }]
    }
  }
  const getOrderOptions = (productId) => {
    if (
      selectedProdukts[productId] === 'CBRN F2 Storlek 1 – 5 st/pk' ||
      selectedProdukts[productId] === 'CBRN F2 Storlek 2 – 5 st/pk'
    ) {
      return [
        { value: '2', label: '2 ST' },
        { value: '3', label: '3 ST' },
        { value: '4', label: '4 ST' },
        { value: '5', label: '5 ST' },
        { value: '6', label: '6 ST' },
        { value: '7', label: '7 ST' },
        { value: '8', label: '8 ST' },
        { value: '9', label: '9 ST' },
        { value: '10', label: '10 ST' }
      ]
    } else {
      return [
        { value: '1', label: '1 ST' },
        { value: '2', label: '2 ST' },
        { value: '3', label: '3 ST' },
        { value: '4', label: '4 ST' },
        { value: '5', label: '5 ST' },
        { value: '6', label: '6 ST' },
        { value: '7', label: '7 ST' },
        { value: '8', label: '8 ST' },
        { value: '9', label: '9 ST' },
        { value: '10', label: '10 ST' }
      ]
    }
  }

  const selectedDefaultValue = (productId) => {
    if (selectedProdukts[productId] === 'CBRN F2 Storlek 1 – 5 st/pk') {
      return '2 ST'
    } else {
      return '1 ST'
    }
  }

  return (
    <div className="flex flex-col">
      <h2 className={`text-center mb-20 ${styles.bestall_head}`}>
        {locale === 'sv' ? 'BESTÄLLNINGSFORMULÄR' : 'ORDER FORM'}
      </h2>
      <form
        className={`flex flex-col gap-10 ${styles.form}`}
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-8/12 ">
            {products.map((product) => (
              <div key={product.id} className="pb-10">
                {product.id > 1 ? (
                  <button
                    type="button"
                    className="flex justify-end items-end w-full"
                    onClick={() => removeProductField(product.id)}
                  >
                    <RxCross2 size={20} />
                  </button>
                ) : null}
                <Select
                  radius="none"
                  name="produkt"
                  label={locale === 'sv' ? 'PRODUKT' : 'PRODUCT'}
                  rightSection={<MdKeyboardArrowDown size={14} />}
                  placeholder={
                    locale === 'sv' ? '- VÄLJ PRODUKT ' : '- SELECT PRODUCT'
                  }
                  data={[
                    {
                      value: 'CBRN F2 Storlek 1 – 5 st/pk',
                      label: 'CBRN F2 Storlek 1 – 5 st/pk'
                    },
                    {
                      value: 'CBRN F2 Storlek 2 – 5 st/pk',
                      label: 'CBRN F2 Storlek 2 – 5 st/pk'
                    },
                    {
                      value: 'Filter OF 90 NBC – 60 st/pk',
                      label: 'Filter OF 90 NBC – 60 st/pk'
                    },
                    {
                      value: 'Filter OF 90S NBC – 60 st/pk',
                      label: 'Filter OF 90S NBC – 60 st/pk'
                    },
                    {
                      value: 'Filter PF 10 – 60 st/pk',
                      label: 'Filter PF 10 – 60 st/pk'
                    }
                  ]}
                  value={selectedProdukts[product.id]}
                  onChange={(value) => handleProduktChange(value, product.id)}
                />
                <div className={`flex gap-5 mt-5`}>
                  <Select
                    rightSection={<MdKeyboardArrowDown />}
                    radius="none"
                    className="w-6/12"
                    label={locale === 'sv' ? 'ENHET' : 'UNIT'}
                    name="beställning"
                    defaultValue="PAKET"
                    data={[
                      {
                        value: 'PAKET',
                        label: `${locale === 'sv' ? 'PAKET' : 'PACKAGE'}`
                      }
                    ]}
                    value={selectedMinBestallning[product.id]}
                    onChange={(value) =>
                      setSelectedMinBestallning(
                        (prevSelectedMinBestallning) => ({
                          ...prevSelectedMinBestallning,
                          [product.id]: value
                        })
                      )
                    }
                  />
                  <Select
                    name="enhet"
                    placeholder={
                      locale === 'sv' ? 'Minst Antal' : 'Min Quantity'
                    }
                    label={locale === 'sv' ? 'Minst Antal' : 'Min Quantity'}
                    disabled
                    radius="none"
                    defaultValue={selectedDefaultValue(product.id)}
                    data={getEnhetOptions(product.id)}
                    value={selectedEnhet[product.id]}
                    onChange={(value) =>
                      setSelectedEnhet((prevSelectedEnhet) => ({
                        ...prevSelectedEnhet,
                        [product.id]: value
                      }))
                    }
                  />

                  <Select
                    rightSection={<MdKeyboardArrowDown />}
                    radius="none"
                    label={
                      locale === 'sv' ? 'BESTÄLLT ANTAL' : 'ORDER QUANTITY'
                    }
                    placeholder={
                      locale === 'sv' ? 'Välj Antal' : 'Select Amount'
                    }
                    name="antal"
                    defaultValue={selectedDefaultValue(product.id)}
                    data={getOrderOptions(product.id)}
                    value={selectedBestallAntal[product.id]}
                    onChange={(value) =>
                      setSelectedBestallAntal((prevSelectedBestallAntal) => ({
                        ...prevSelectedBestallAntal,
                        [product.id]: value
                      }))
                    }
                  />
                </div>
              </div>
            ))}
            <div className={`flex justify-end mt-10`}>
              <button
                className={styles.add_product_button}
                type="button"
                onClick={addProductField}
              >
                {locale === 'sv' ? 'Lägg till produkt' : 'Add product'}
              </button>
            </div>

            {Object.keys(selectedProdukts).length > 0 ? (
              <div className={`summary mt-20 ${styles.bastall__table}`}>
                <h2 className="mb-2">
                  {' '}
                  {locale === 'sv' ? 'DIN BESTÄLLNING' : 'YOUR ORDER'}
                </h2>
                <table className="w-full">
                  <thead>
                    <tr className="text-left">
                      <th>{locale === 'sv' ? 'Produkt' : 'Product'}</th>
                      <th>{locale === 'sv' ? 'Enhet' : 'UNIT'}</th>
                      <th>
                        {locale === 'sv' ? 'Beställt Antal' : 'ORDER QUANTITY'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(selectedProdukts).map(
                      ([productId, value]) => (
                        <tr key={productId} className="border-b-2">
                          <td>{value}</td>
                          <td>{selectedMinBestallning[productId]}</td>
                          <td>{selectedBestallAntal[productId]}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        </div>
        <h2 className="text-center mt-20 font-semibold tracking-wider">
          {locale === 'sv' ? 'BESTÄLLNINGSINFORMATION' : 'ORDER INFORMATION'}
        </h2>
        <div className={`${styles.foretag} ${styles.input}`}>
          <label htmlFor="name">
            {locale === 'sv' ? 'Företag /' : 'Business /'}
          </label>
          <input
            type="text"
            id="foretag"
            name="foretag"
            value={formData.foretag}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">
            {locale === 'sv' ? 'ORG NR / ' : 'ORG NR /'}
          </label>
          <Input.Wrapper id={id}>
            <Input<any>
              component={IMaskInput}
              mask="000000-0000"
              id={id}
              type="text"
              minLength={11}
              placeholder="xxxxxx-xxxx"
              name="orgnr"
              value={formData.orgnr}
              onChange={handleChange}
              required
            />
          </Input.Wrapper>
        </div>
        <div className={`${styles.namn_efternamn} ${styles.input}`}>
          <label htmlFor="name">
            {locale === 'sv' ? 'Förnamn /' : 'First name /'}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">
            {locale === 'sv' ? 'Efternamn /' : 'Surname /'}
          </label>
          <input
            type="surname"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </div>

        <div className={`${styles.email_phone} ${styles.input}`}>
          <div className={`${styles.email} ${styles.input}`}>
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
            <label htmlFor="phone">
              {locale === 'sv' ? 'Telefon /' : 'Phone /'}
            </label>
            <input
              type="phone"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.message}>
          <label htmlFor="message">
            {locale === 'sv'
              ? 'ÖVRIG VIKTIG INFORMATION'
              : 'OTHER IMPORTANT INFORMATION'}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <div className={styles.agree}>
          <Checkbox
            label={`${
              locale === 'sv'
                ? 'Jag godkänner att SES Protection sparar och hanterar mina personuppgifter i enlighet med dataskyddsförordningen GDPR.'
                : 'I agree that SES Protection saves and handles my personal data in accordance with the data protection regulation GDPR.'
            }`}
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

        {Object.keys(selectedProdukts).length > 0 ? (
          <button type="submit" name="submit" className={styles.button}>
            {locale === 'sv' ? 'SKICKA' : 'SEND'}
          </button>
        ) : null}
      </form>
    </div>
  )
}

export default Bestall
