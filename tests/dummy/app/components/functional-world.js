import Component from '@ember/component';
export default class MyComponent extends Component {
    constructor() {
        super(...arguments);
        this.onChange = this.onChange.bind(this);
    }
    inputPrefix = "Nemo";
    onChange(e) {
        this.set('inputPrefix', e.target.value);
    }    
}