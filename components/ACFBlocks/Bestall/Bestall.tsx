import { useState } from 'react'
import { Select } from '@mantine/core'
import { RxCross2 } from 'react-icons/rx'
import { notifications } from '@mantine/notifications'
import { MdErrorOutline, MdOutlineDone } from 'react-icons/md'
import styles from './bestall.module.scss'

const Bestall = () => {
  const [products, setProducts] = useState([{ id: 1 }])
  const [selectedProdukts, setSelectedProdukts] = useState({})
  const [selectedEnhet, setSelectedEnhet] = useState({})
  const [selectedMinBestallning, setSelectedMinBestallning] = useState({})
  const [selectedBestallAntal, setSelectedBestallAntal] = useState({})
  const [tableSummary, setTableSummary] = useState([])

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    notifications.show({
      title: 'Skickar meddelande',
      message: 'Var god vänta...',
      color: 'blue',
      autoClose: false,
      loading: true,
      id: 'loading'
    })

    try {
      const res = await fetch('/api/bestall', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedProdukts,
          selectedBestallAntal,
          selectedMinBestallning,
          selectedEnhet
        })
      })

      if (res.ok) {
        setSelectedBestallAntal('')
        setSelectedMinBestallning('')
        setSelectedEnhet('')
        setSelectedProdukts('')

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

      // Update table summary data
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
              minBestallning: 'PK',
              bestallAntal: '1'
            }
          }
        } else {
          prevTableSummary.push({
            id: productId,
            values: {
              produkt: value,
              enhet: '',
              minBestallning: 'PK',
              bestallAntal: '1'
            }
          })
        }

        return [...prevTableSummary]
      })

      setSelectedEnhet((prevSelectedEnhet) => ({
        ...prevSelectedEnhet,
        [productId]: ''
      }))
      setSelectedMinBestallning((prevSelectedMinBestallning) => ({
        ...prevSelectedMinBestallning,
        [productId]: 'PK'
      }))
      setSelectedBestallAntal((prevSelectedBestallAntal) => ({
        ...prevSelectedBestallAntal,
        [productId]: '1'
      }))

      return updatedSelectedProdukts
    })
  }

  const getEnhetOptions = (productId) => {
    // Define the options based on the selected Produkt
    if (
      selectedProdukts[productId] === 'CBRN F2 Storlek 1 – 5 st/pk' ||
      selectedProdukts[productId] === 'CBRN F2 Storlek 2 – 5 st/pk'
    ) {
      return [
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' }
      ]
    } else {
      return [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' }
      ]
    }
  }

  console.log(Object.keys(selectedProdukts))

  return (
    <div className="flex flex-col">
      <form
        className={`flex flex-col gap-10 ${styles.form}`}
        onSubmit={handleSubmit}
      >
        {products.map((product) => (
          <div key={product.id} className="border-b-2 pb-10">
            <button
              type="button"
              className="flex justify-end items-end w-full"
              onClick={() => removeProductField(product.id)}
            >
              <RxCross2 size={20} />
            </button>
            <Select
              name="produkt"
              label="Produkt"
              placeholder="Välj produkt"
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
            <div className={`flex gap-10 mt-5`}>
              <Select
                name="enhet"
                placeholder="Välj Enhet"
                label="Enhet"
                required
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
                label="Min beställning"
                name="beställning"
                defaultValue="PK"
                data={[{ value: 'PK', label: 'PK' }]}
                value={selectedMinBestallning[product.id]}
                onChange={(value) =>
                  setSelectedMinBestallning((prevSelectedMinBestallning) => ({
                    ...prevSelectedMinBestallning,
                    [product.id]: value
                  }))
                }
              />
              <Select
                label="Beställ Antal"
                placeholder="Välj Antal"
                name="antal"
                data={[
                  { value: '1', label: '1' },
                  { value: '2', label: '2' },
                  { value: '3', label: '3' },
                  { value: '4', label: '4' },
                  { value: '5', label: '5' }
                ]}
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
        <button
          className={styles.button}
          type="button"
          onClick={addProductField}
        >
          Lägg till produkt
        </button>
        {Object.keys(selectedProdukts).length > 0 ? (
          <div className={`summary mt-20 ${styles.bastall__table}`}>
            <h2 className="mb-10"> DIN BESTÄLLNING /</h2>
            <table className="w-full">
              <thead>
                <tr className="text-left border-2">
                  <th>Produkt</th>
                  <th>Enhet</th>
                  <th>Min beställning</th>
                  <th>Beställt Antal</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(selectedProdukts).map(([productId, value]) => (
                  <tr key={productId} className="border-2">
                    <td>{value}</td>
                    <td>{selectedEnhet[productId]}</td>
                    <td>{selectedMinBestallning[productId]}</td>
                    <td>{selectedBestallAntal[productId]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
        {Object.keys(selectedProdukts).length > 0 ? (
          <button type="submit" name="submit" className={styles.button}>
            Beställ
          </button>
        ) : null}
      </form>
    </div>
  )
}

export default Bestall
