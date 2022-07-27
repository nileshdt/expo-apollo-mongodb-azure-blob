/*****************************
* Amplitude.js
* path: '/utils/analytics/Amplitude.js'
******************************/

import { Amplitude } from 'expo';

// Import getEnvVars() from environment.js
import getEnvVars from '../../environment';
const { amplitudeApiKey } = getEnvVars();


const initialize = () => {
 if (!amplitudeApiKey) {
   return;
 }

 Amplitude.initialize(amplitudeApiKey);
 isInitialized = true;
};