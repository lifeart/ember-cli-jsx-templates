import Component from '@ember/component';
export default Component.extend({
    inputPrefix: "Nemo",
    onChange(e) {
        this.set('inputPrefix', e.target.value);
    }    
})