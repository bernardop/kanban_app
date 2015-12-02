import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
    constructor() {
        this.bindActions(NoteActions);

        this.notes = [];

        this.exportPublicMethods({
            get: this.get.bind(this),
            deleteMany: this.deleteMany.bind(this)
        });
    }

    create(note) {
        const notes = this.notes;

        note.id = uuid.v4();

        this.setState({
            notes: [...notes, note]
        });
    }

    update({id, task}) {
        const notes = this.notes;
        const noteIndex = this.findNote(id);

        if (noteIndex < 0) {
            return;
        }

        notes[noteIndex].task = task;

        this.setState({notes});
    }

    delete(id) {
        const notes = this.notes;
        const noteIndex = this.findNote(id);

        if (noteIndex < 0) {
            return;
        }

        this.setState({
            notes: [...notes.slice(0, noteIndex), ...notes.slice(noteIndex + 1)]
        });
    }

    deleteMany(ids = []) {
        for (let id of ids) {
            this.delete(id);
        }
    }

    findNote(id) {
        const notes = this.notes;
        const noteIndex = notes.findIndex((note) => note.id === id);

        if (noteIndex < 0) {
            console.warn('Failed to find note', notes, id);
        }

        return noteIndex;
    }

    get(ids = []) {
        return ids.map((id) => this.notes[this.findNote(id)]).filter((a) => a);
    }
}

export default alt.createStore(NoteStore, 'NoteStore');