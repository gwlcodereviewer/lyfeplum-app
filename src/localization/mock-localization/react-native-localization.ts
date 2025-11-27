export default class RNLocalization {
  languageKnown = 'en';

  props: any;

  constructor(props: any) {
    this.props = props;
    this.setLanguage(this.languageKnown);
  }

  setLanguage(interfaceLanguage: any): void {
    this.languageKnown = interfaceLanguage;
    if (this.props[interfaceLanguage]) {
      const localizedStrings = this.props[this.languageKnown];
      for (const key in localizedStrings) {
        if (localizedStrings.hasOwnProperty(key)) {
          // TODO: uncomment the below line while testing
          // this[key] = localizedStrings[key];
        }
      }
    }
  }
}
