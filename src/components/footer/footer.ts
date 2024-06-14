import './footer.scss';
import footerDocumentFragmentAsText from './footer.html';
import htmlFromString from '../../utilites/htmlFromString';

export const footerElement = htmlFromString(footerDocumentFragmentAsText) as DocumentFragment;
