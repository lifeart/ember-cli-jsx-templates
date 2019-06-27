import Component from '@ember/component';
export default class MyComponent extends Component {
    inputPrefix = "Nemo";
    onChange(e) {
        this.set('inputPrefix', e.target.value);
    }    
}