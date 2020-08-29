import {
   FormGroup,
   Input,
   Label,
   InputProps,
   InputGroupAddon,
   InputGroup,
   CustomInput,
   FormFeedback,
} from 'reactstrap';
// import { Fragment } from "react";
interface Props extends InputProps {
   formGroupClassName?: string;
   formGroupId?: string;
   labelClassName?: string;
   labelFor?: string;
   /** If passed, an error state will be declared upon this input */
   error?: string | React.ReactNode;
   /** If type was select, options are required as array */
   options?: [string] | [React.ReactNode];
   /** Error message classes */
   formFeedbackClassName?: string;
   label: string | React.ReactNode;
   /** Bootstrap addon (either after or before the input depending on addon type) */
   inputAddon?: string | React.ReactNode;
   /**
    * This component will be displayed near the input, its good to use it for things such as icons (eye icon for password maybe)
    */
   InputChildren?: string | React.ReactNode;
   addonType?: 'append' | 'prepend';
   /** Bootstrap sizes, (sm | md | lg) or any extra depending on your bootstrap */
   inputGroupSize: string;
   inputGroupClassName?: string;
   /** If true and error was passed, only error borders will be seen */
   hideErrorMessage?: boolean;
}
const UIInput: React.FC<Props> = ({
   labelClassName,
   formGroupClassName = '',
   formFeedbackClassName = '',
   formGroupId,
   options,
   label,
   labelFor,
   error,
   valid,
   className = '',
   inputGroupClassName = '',
   inputAddon,
   type,
   addonType = 'append',
   inputGroupSize = 'md',
   hideErrorMessage,
   InputChildren,
   ...rest
}) => {
   className += ` ${error ? 'error-input ' : ''}`;
   className += ` ${valid ? 'valid-input' : ''}`;

   const inp =
      type === 'select' ? (
         <CustomInput type="select" className={className} invalid={!!error} valid={valid} {...rest}>
            {options}
         </CustomInput>
      ) : (
         <Input type={type} className={className} invalid={!!error} valid={valid} {...rest}>
            {options}
         </Input>
      );

   return (
      <FormGroup className={`uinput-group ${formGroupClassName}`} id={formGroupId}>
         {label && (
            <Label htmlFor={labelFor} className={labelClassName}>
               {label}
            </Label>
         )}
         {inputAddon ? (
            <InputGroup className={inputGroupClassName} size={inputGroupSize}>
               {addonType === 'append' && inp}
               {inputAddon && (
                  <InputGroupAddon
                     className={addonType === 'append' ? 'rounded-right' : 'rounded-left'}
                     addonType={addonType}>
                     {inputAddon}
                  </InputGroupAddon>
               )}
               {InputChildren}
               {addonType === 'prepend' && inp}
               {error && !hideErrorMessage && (
                  <FormFeedback className={formFeedbackClassName} valid={!error}>
                     {error}
                  </FormFeedback>
               )}
            </InputGroup>
         ) : (
            <div className="position-relative">
               {inp}
               {error && !hideErrorMessage && <FormFeedback>{error}</FormFeedback>}
               {InputChildren}
            </div>
         )}
      </FormGroup>
   );
};
export default UIInput;
