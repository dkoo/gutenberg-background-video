/**
 * Entrypoint for all custom blocks.
 */
import './styles.css';

import { isLodash } from './utils';

if ( isLodash() ) {
	_.noConflict();
}

import './background-video';
