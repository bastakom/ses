import { useState } from 'react'
import { Select, TextInput } from '@mantine/core'

const Bestall = () => {
  const [products, setProducts] = useState([{ id: 1 }]) // Initial product fields

  const addProductField = () => {
    const newProductId = products.length + 1
    setProducts([...products, { id: newProductId }])
  }

  return (
    <>
      <form className="flex flex-col gap-10">
        {products.map((product) => (
          <div key={product.id} className="border-b-2 pb-5">
            <Select
              label="Produkt"
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
            />
            <div className={`flex gap-10 mt-5`}>
              <Select
                label="Enhet"
                data={[
                  { value: 'pk', label: 'pk' },
                  { value: 'pk2', label: 'pk2' },
                  { value: 'pk3', label: 'pk3' },
                  { value: 'pk4', label: 'pk4' }
                ]}
              />
              <Select
                label="Min beställning"
                data={[
                  { value: '2', label: '2' },
                  { value: '3', label: '3' },
                  { value: '4', label: '4' },
                  { value: '5', label: '5' }
                ]}
              />

              <Select
                label="Beställ Antal"
                data={[
                  { value: '1', label: '1' },
                  { value: '2', label: '2' },
                  { value: '3', label: '3' },
                  { value: '4', label: '4' },
                  { value: '5', label: '5' }
                ]}
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={addProductField} className="border-2 uppercase">
          Lägg till produkt
        </button>
      </form>
    </>
  )
}

export default Bestall
