import Controller from '@ember/controller';

export default Controller.extend({
    showLabel: true,
    actions: {
        sayHi() {
            this.toggleProperty('showLabel')
        }
    }
});
