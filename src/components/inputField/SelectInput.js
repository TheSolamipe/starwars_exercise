import classnames from "classnames";
import '../../styles/selectField.css'

// const nestedRegex = /[\[\].]/g;

// const extractNestedError = (name, touched, errors) => {
//     let extractedError = null;
//     let extractedTouch = null;
//     if (nestedRegex.test(name)) {
//       try {
//         const extractedNames = name.split(nestedRegex).filter(Boolean);
//         for (let i = 0; i < extractedNames.length; i++) {
//           const current = extractedNames[i];
//           extractedError = (extractedError || errors)[current];
//           extractedTouch = (extractedTouch ||touched)[current];
//         }
//       } catch (error) { return {}; }
//     } else { return {}; };
  
//     return { extractedError, extractedTouch };
//   }



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

//   export const WrappedSelectWithError = ({ errors, touched, withMargin, ...rest }) => {
//     const { extractedError, extractedTouch } = extractNestedError(rest.name, touched, errors);
//     return (
//       <div className=  {`relative mb-0`} >
//         <WrappedSelect {...rest} />
//         {
//           (() => {
//             const { name } = rest;
//             const error = extractedError || errors[name];
//             return (error && (extractedTouch || touched[name])) ? (
//               <div className='invalid-feedback'>{error}</div>
//             ) : ''
//           })()
//         }
//       </div>
//     );
//   };