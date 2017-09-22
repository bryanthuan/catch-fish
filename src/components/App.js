import React, { Component } from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';


class App extends Component {
   constructor() {
      super();
      this.addFish = this.addFish.bind(this);
      this.loadSamples = this.loadSamples.bind(this);
      this.addToOrder = this.addToOrder.bind(this);
      this.updateFish = this.updateFish.bind(this);
      this.removeFish = this.removeFish.bind(this);
      this.removeFromOrder = this.removeFromOrder.bind(this);
      this.state = {
         fishes: {},
         order: {}
      }
   }
   

   componentWillMount() {
      this.ref = base.syncState(`${this.props.params.storeId}/fishes`,{
         context: this,
         state: 'fishes'
      });   
      // check if there is any prder in localstorage
      const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
      if(localStorageRef){
         // update our App component's order state
         this.setState({
            order: JSON.parse(localStorageRef)
         })
      }
   }

   componentWillUnmount() {
      base.removeBinding(this.ref);
   }

   componentWillUpdate(nextProps, nextState) {
      localStorage.setItem(`order-${this.props.params.storeId}`,JSON.stringify(nextState.order));
   }

   addFish(fish) {
      // Update our state
      const fishes = {...this.state.fishes};
      const timestamp = Date.now();
      fishes[`fish-${timestamp}`] = fish;
      this.setState({ fishes});
   }
   loadSamples() {
      this.setState({
         fishes: sampleFishes
      });
   }
   addToOrder(key) {
      const order  = {...this.state.order};
      order[key] = order[key] + 1 || 1;
      // update our state
      this.setState({order});
   }

   removeFromOrder(key) {
     const order = {...this.state.order};
     delete order[key];
     this.setState({order});
   }

   updateFish(key, updatedFish) {
     const fishes = {...this.state.fishes};
     fishes[key] = updatedFish;
     this.setState({fishes});
   }

   removeFish(key) {
     const fishes = {...this.state.fishes};
     fishes[key] = null;
     this.setState({fishes});
   }
   render() {
      return (
         <div className="catch-of-the-day">
               <div className="menu">
                  <Header tagline="Fresh Seafood Market"/>
                  <ul className="list-of-fish">
                    {
                       Object.keys(this.state.fishes)
                        .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
                    }
                  </ul>
               </div>
               <Order 
               fishes={this.state.fishes} 
               order={this.state.order}
               params={this.props.params}
               removeFromOrder={this.removeFromOrder}
               />
               <Inventory 
               loadSamples={this.loadSamples} 
               addFish={this.addFish}
               fishes={this.state.fishes}
               updateFish={this.updateFish}
               removeFish={this.removeFish}
               />
         </div>
      );
   }
}

export default App;  