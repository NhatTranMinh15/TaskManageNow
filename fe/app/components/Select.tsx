'use client'

import { FocusEvent, MouseEvent, useState } from "react";
import styles from "@/public/css/components/select.module.css";
export type Option = {
  id: string | number;
  name: string;
  value: string;
}
type Props = {
  multiple?: boolean;
  inputName: string
  inputId?: string
  options: Option[]
  search: string
  setSearch: (value: string) => void
}

const Select = ({ multiple = false, inputName, inputId, options, search, setSearch }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  function selectOption(option: Option) {
    if (multiple) {
      const o = selectedOptions.find((o) => { return o.id === option.id });
      if (!o) {
        setSelectedOptions([...selectedOptions, option])
      }
    } else {
      setSelectedOptions([option])
    }
  }

  function removeSelectedOption(e: MouseEvent<HTMLElement, globalThis.MouseEvent>, option: Option) {
    setSelectedOptions(selectedOptions.filter((s) => { return s.id !== option.id }))
  }

  function removeAllSelectedOption() {
    setSearch("")
    setSelectedOptions([])
  }

  function closeOptions(e: FocusEvent<HTMLElement, Element>) {
    const currentTarget = e.currentTarget;

    // Give browser time to focus the next element
    requestAnimationFrame(() => {
      // Check if the new focused element is a child of the original container
      if (!currentTarget.contains(document.activeElement)) {
        setOpen(false);
      }
    });
  }
  return (
    <div className={`${styles.container} `} tabIndex={0} onClick={(e) => { e.stopPropagation() }} onBlur={(e) => { closeOptions(e) }}>

      {/* useMemo this input value */}
      <input type="hidden" name={inputName} value={selectedOptions.map((o) => { return o.id as string })} />

      <div className={`${styles.section} `}>
        <input type="text" id={inputId ? inputId : inputName} value={search} className="input w-full" onChange={(e) => { setSearch(e.target.value) }} onClick={(e) => { setOpen(true) }} />
        <button type="button" className="px-1 text-2xl" onClick={removeAllSelectedOption}>&times;</button>
        <div className="self-stretch border border-[#0f960f]" />
        <button type="button" className={`${styles.caret} ${open ? styles.open : styles.close}`} onClick={() => { setOpen(o => !o) }}></button>
      </div>

      <div className={`${styles.section} ${styles.selections}`}>
        {
          selectedOptions.map((option) => (
            <span tabIndex={0} key={`btn-${option.id}`} className={`${styles.selection}`} onClick={(e) => { removeSelectedOption(e, option) }}>
              {option.name}
            </span>
          ))
        }
      </div>

      <ul className={`${styles.options} ${open ? "block" : "hidden"}`}>
        {
          options.map((option) => (
            <li key={option.id} className={`${styles.option}`} onClick={(e) => { selectOption(option) }}>
              {option.name}
            </li>
          ))
        }
      </ul>

    </div>
  )
}

export default Select