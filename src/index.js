import React from 'react';

export const Veu =
    (options) =>
    (TheComponent) =>
    (class extends React.Component {
        constructor(props){
            super(props);
            // bind methods
            this.bindMethods = this.bindMethods.bind(this);
            this.plug = this.plug.bind(this);
            this.activateWatchAndProcessComputed = this.activateWatchAndProcessComputed.bind(this);
            
            // init the state with 
            this.state = {
                data : options.data || {},
                methods: options.methods ? this.bindMethods(options.methods) : {},
                watch: options.watch  ? this.bindMethods(options.watch) : {},
                computedResults : Object.keys(options.computed).reduce((previous, currentKey) => {
                    return {
                        ...previous, 
                        [currentKey] : null
                    }
                }, {}),
                computed: options.computed ? this.bindMethods(options.computed) : {}
            }
            console.log('state', this.state);
        }
        /**
         * bind all provided methods to current context
         * @param methods 
         */
        bindMethods(methods){
         return Object.keys(methods).reduce((previous, current) => {
                return {...previous, [current] : this.plug(methods[current])}
         }, {} )
        }
        /**
         * inject a single method in the this.state.data context
         * all this.keyName will be read and modifying a copy of "data" state
         */
        plug(fn){
            // saving 
            return () => {
              const previousState = {...this.state};
              const nextState = {...this.state};
              const result = fn.apply(nextState.data, arguments);
              const computedResults = this.activateWatchAndProcessComputed(nextState, previousState)
              this.setState({data:nextState.data, computedResults: {...this.state.computedResults, ...computedResults}})  
              return result;
            }
          }
        plugAndMemoize(fn){
            const lastArguments = arguments;
        }
        /**
         * trigger computed variables updates and watch handlers 
         * @param {Object} nextState 
         * @param {Object} previousState 
         */
        activateWatchAndProcessComputed(nextState, previousState){
            // very simple diff check, replace by something more robust
            const hasKeyChanged = Object.keys(nextState.data).some(key => {
                return nextState.data[key] !== previousState.data[key]
            });
            if (hasKeyChanged){
                Object.keys(nextState.data).forEach(key => {
                    if(nextState.data[key] !== previousState.data[key] && nextState.watch[key]){
                        nextState.watch[key](nextState.data[key]);
                    }
                })
                return Object.keys(this.state.computedResults).reduce((previous, currentKey) => {
                    return {
                        ...previous,
                        [currentKey]: this.state.computed[currentKey]()
                    }
                }, {})
            }
            return {}
        }
        render(){
            return <TheComponent {...this.props} {...this.state.data} {...this.state.methods} {...this.state.computedResults} />
        }
});

export default Veu