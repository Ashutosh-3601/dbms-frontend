import {StylesConfig} from 'react-select';

export const colourStyles: StylesConfig<unknown> = {
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: '#7c3aed',
        ':hover': {
          backgroundColor: '#6d28d9',
        }
      };
    },
    multiValueLabel: (styles) => ({
      ...styles,
      color: 'white',
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      ':hover': {
        backgroundColor: '#ef4444',
        color: 'white',
      },
    }),
    placeholder: (styles) => ({
        ...styles,
        fontStyle: 'italic',
        fontFamily: 'monospace',
        fontSize: '15px',
        color: 'GrayText',
        marginLeft: '0.5rem',
        marginRight: '0.5rem',//53
    })
};