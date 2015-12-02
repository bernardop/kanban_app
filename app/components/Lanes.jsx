import React, {Component} from 'react';
import Lane from './Lane';

export default class Lanes extends Component {
    render = () => {
        const lanes = this.props.items;

        return <div className="lanes">{lanes.map(this.renderLane)}</div>;
    }

    renderLane = (lane) => {
        return <Lane className="lane" key={lane.id} lane={lane} />
    }
}