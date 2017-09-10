import _ from 'lodash';
import uuid from 'uuid/v4';

export default class Room {
  constructor(io = null, id = {}, removeRoomId) {
    this._id = id;
    this._io = io;
    this._users = 0;
    this.selfDestruct = removeRoomId;

    const room = io.of(`/${id}`);
    room.on('connection', socket => this.handleSocket(socket));
  }

  handleSocket(socket) {
    this._users++;
    console.log('connected', this._users);
    socket.on('PAYLOAD', payload => {
      socket.broadcast.emit('PAYLOAD', payload);
    });

    socket.on('disconnect', () => this.handleDisconnect());
  }

  handleDisconnect() {
    this._users--;
    console.log('disconnected', this._users);
    if (this.users === 0) {
      return this.selfDestruct(this);
    }
  }

  get id() {
    return this._id;
  }

  get io() {
    return this.io;
  }

  get users() {
    return this._users;
  }

}
