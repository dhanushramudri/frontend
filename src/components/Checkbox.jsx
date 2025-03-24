const Checkbox = ({ options, selected, onChange }) => {
    const handleChange = (optionId) => {
      const updatedSelection = selected?.includes(optionId)
        ? selected.filter((id) => id !== optionId)
        : [...(selected || []), optionId];
      onChange(updatedSelection);
    };
  
    return (
      <div>
        {options.map((option) => (
          <label key={option.id} className="block"> {/* Unique key for each option */}
            <input
              type="checkbox"
              name={option.id}
              checked={selected?.includes(option.id)}
              onChange={() => handleChange(option.id)}
              className="mr-2"
            />
            {option.text}
          </label>
        ))}
      </div>
    );
  };
  
  export default Checkbox;