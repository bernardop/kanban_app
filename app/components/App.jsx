import AltContainer from 'alt-container';
import React, {Component} from 'react';
import Lanes from './Lanes';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';

export default class App extends Component {


    render = () => {
        return (
            <div>
                <button className="add-lane" onClick={this.addItem}>+</button>
                <AltContainer
                    stores={[LaneStore]}
                    inject={{
                        items: () => LaneStore.getState().lanes
                    }}
                >
                    <Lanes />
                </AltContainer>
            </div>
        );
    }

    addItem = () => {
        LaneActions.create({name: 'New lane'});
    }
}