import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#f0f9f9',
      100: '#dbf0f0',
      200: '#bae1e2',
      300: '#8cccce',
      400: '#57aeb2',
      500: '#04383F',  // Your main color
      600: '#036169',
      700: '#045055',
      800: '#064247',
      900: '#08373c',
      950: '#021d20'
    }
  }
});

export default {
  preset: MyPreset,
  options: {
    darkModeSelector: '.dark-mode'
  }
};