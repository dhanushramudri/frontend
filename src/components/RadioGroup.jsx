const RadioGroup = ({ options, selected, onChange }) => {
    return (
      <div>
        {options.map((option) => (
          <label key={option.id} className="block"> {/* Unique key for each option */}
            <input
              type="radio"
              name={option.id}
              value={option.id}
              checked={selected === option.id}
              onChange={() => onChange(option.id)}
              className="mr-2"
            />
            {option.text}
          </label>
        ))}
      </div>
    );
  };
  
  export default RadioGroup;