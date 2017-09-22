import React, { Component } from 'react';
import AddFishForm from './AddFishForm';


class Inventory extends Component {
   constructor(){
      super();
      this.renderInventory = this.renderInventory.bind(this);
      this.handleChange = this.handleChange.bind(this);
   }
   handleChange(e, key) {
      const fish = this.props.fishes[key];
      const updatedFish = {
         ...fish,
         [e.target.name]: [e.target.value]
      };
      this.props.updateFish(key, updatedFish);
   }
   renderInventory(key) {
      const fish = this.props.fishes[key];
      return (
         <div className="fish-edit" key={key}>
            <input onChange={e=>this.handleChange(e, key)} type="text" name="name" value={fish.name} placeholder="Fish Name"/>
            <input onChange={e=>this.handleChange(e, key)} type="text" name="price" value={fish.price} placeholder="Fish Price"/>
            <select onChange={e=>this.handleChange(e, key)} type="text" name="status" value={fish.status} placeholder="Fish Status">
               <option value="available">Fresh !</option>
               <option value="unavailable">Sold Out !</option>
            </select>
            <textarea onChange={e=>this.handleChange(e, key)} name="desc" value={fish.desc} placeholder="Fish Desc"></textarea>
            <input onChange={e=>this.handleChange(e, key)} type="text" name="image" value={fish.image} placeholder="Fish Image"/>
            <button onClick={()=>this.props.removeFish(key)}>Remove Fish</button>
         </div>
      );
   }

   render() {
      return (
         <div>
            <h2>Inventory</h2>
            {Object.keys(this.props.fishes).map(this.renderInventory)}
            <AddFishForm addFish={this.props.addFish}/>
            <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
         </div>
      );
   }
}

export default Inventory;