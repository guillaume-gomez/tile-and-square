
interface OptionData {
  label: string;
  value: any;
}

interface SelectProps {
  label: string;
  value: any;
  options: OptionData[];
  onChange: (value: any) => void;
}

function Select({label, value, options, onChange } : SelectProps) {

  return (
    <div className="form-control">
      <select
        className="select select-primary"
        onChange={(e) =>onChange(e.target.value) }
        value={value}
      >
        {
          options.map(({label, value}) =>
            <option key={label} value={value}>{label}</option>
          )
        }
      </select>
    </div>
  )
}

export default Select;