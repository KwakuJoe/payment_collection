import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#fef7ed',
      100: '#fdedd3',
      200: '#fad7a5',
      300: '#f6bc6d',
      400: '#f19833',
      500: '#D8711E',  // Your main color
      600: '#c85914',
      700: '#a64613',
      800: '#883817',
      900: '#6f2f16',
      950: '#3c1508'
    }
  }
});

export default {
  preset: MyPreset,
  options: {
    darkModeSelector: '.dark-mode'
  }
};