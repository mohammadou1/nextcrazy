import Select, { Props, Theme, Styles } from 'react-select';
import SelectStyles from '~/styles/react-select';
import { useTranslate } from '~/i18n';
interface UISelectProps extends Props {
   innerRef?: any;
}

const UISelect: React.FC<UISelectProps> = ({ id, innerRef, styles, ...rest }) => {
   const { translate } = useTranslate();

   const selectTheme = (theme: Theme) => ({
      ...theme,
      borderRadius: 0,
      spacing: {
         ...theme.spacing,
      },
      colors: {
         ...theme.colors,
         text: 'green',
         primary: SelectStyles.borderColors,
         primary75: SelectStyles.optionFocusedBackgroundColor,
         primary50: SelectStyles.optionFocusedBackgroundColor,
         primary25: SelectStyles.optionBackgroundColor,
         neutral0: SelectStyles.backgroundColor,
         neutral5: '#fff',
         neutral10: 'blue',
         neutral20: SelectStyles.defaultBorderColors,
         neutral30: SelectStyles.borderHoverColor,
         neutral40: SelectStyles.noOptionsColor,
         neutral50: SelectStyles.placeholderColor,
         neutral60: SelectStyles.focusedArrowColor,
         neutral70: '#fff',
         neutral80: SelectStyles.searchColor,
         neutral90: '#fff',
      },
   });

   const selectStyles: Styles = {
      ...styles,
      option: (style, state) => ({
         ...style,
         color: SelectStyles.searchColor,
         backgroundColor: state.isFocused
            ? SelectStyles.optionFocusedBackgroundColor
            : style.backgroundColor,
         '&:hover': {
            backgroundColor: SelectStyles.optionFocusedBackgroundColor,
         },
         '&:active': {
            backgroundColor: SelectStyles.optionFocusedBackgroundColor,
         },
      }),
      dropdownIndicator: style => ({
         ...style,
         color: SelectStyles.searchColor,
      }),
   };

   return (
      <Select
         inputId={id}
         instanceId={id}
         {...rest}
         styles={selectStyles}
         noOptionsMessage={message =>
            `${translate({ id: 'no_results_found' })} ${message.inputValue}`
         }
         ref={innerRef}
         theme={selectTheme}
      />
   );
};

export default UISelect;
