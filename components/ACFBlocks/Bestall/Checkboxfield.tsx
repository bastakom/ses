import { Checkbox, Radio, Select } from '@mantine/core'
import styles from './checkboxfield.module.scss'
import { useState } from 'react'

interface CheckboxState {
  [key: string]: boolean
}

const Checkboxfield = ({ handleChange, checkboxvalue, label }) => {
  const [checkboxState, setCheckboxState] = useState('')
  const [value, setValue] = useState('react')

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target
    setCheckboxState({ ...checkboxState, [name]: checked })
  }

  console.log(checkboxState)
  return (
    <div className={styles.checkbox__product}>
      <Checkbox
        label={label}
        labelPosition="left"
        color="dark"
        value={`${checkboxvalue}`}
        name={checkboxvalue}
        radius="none"
        size="xs"
        checked={checkboxvalue}
        onChange={handleCheckboxChange}
      />

      {checkboxState === checkboxvalue && (
        <div className="flex gap-20">
          <div className={styles.checkboxes_size}>
            <h2> Storlek</h2>
            <Checkbox
              labelPosition="right"
              label="S"
              color="dark"
              name="S"
              value="S"
              radius="none"
              size="sm"
              onChange={handleChange}
            />
            <Checkbox
              labelPosition="right"
              label="M"
              value="M"
              color="dark"
              name="M"
              radius="none"
              size="sm"
              onChange={handleChange}
            />
            <Checkbox
              labelPosition="right"
              label="XL"
              color="dark"
              value="XL"
              name="XL"
              radius="none"
              size="sm"
              onChange={handleChange}
            />
          </div>
          <div className={styles.checkboxes_size}>
            <h2> ENHET</h2>
            <Radio.Group value={value} name="favoriteFramework">
              <Radio value="react" label="Förp 10st" />
              <Radio value="svelte" label="Förp 50st" />
              <Radio value="ng" label="Förp 100st" />
            </Radio.Group>
          </div>
          <div>
            <h2> ANTAL</h2>
            <Select
              data={[
                { value: '0', label: '0' },
                { value: '1', label: '1' },
                { value: '2', label: '2' },
                { value: '3', label: '3' }
              ]}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Checkboxfield
