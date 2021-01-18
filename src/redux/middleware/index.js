/*
  PURPOSE: simply compose together any middlwares exposed by the app's
  individual capsules, with any from the app's top-level as well
*/

// Top-Level Middlewares
import {fsaErrorLogger} from './errors.middleware';

export default [
  // TOP-LEVEL
  fsaErrorLogger
];
