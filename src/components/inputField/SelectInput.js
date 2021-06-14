import classnames from "classnames";
import '../../styles/selectField.css';


export const WrappedSelect = ({ placeholder, options, textKey, extractValue, ...rest  }) => {
    return (
      <div className="form-group1 location_field">
        <select id="form-field" className={classnames("form-control form-control-lg form-area form-select")} {...rest}>
          {
            placeholder ? (
              <option value='' defaultValue>{placeholder}</option>
            ) : ''
          }
          {
            options.map((val, index) => {
              const text = textKey ? val[textKey] : val;
              const value = typeof extractValue === 'function' ? extractValue(val) : val;
              return <option key={index} value={value}>{text}</option>;
            })
          }
        </select>
      </div>
    );
  };