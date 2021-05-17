const bcrypt = require('bcrypt');

const auth = require('../../../auth');

// const { upsert } = require('../../../store/dummy');
const TABLA = 'auth';

module.exports = (injectStore) => {
  let store = injectStore;
  if (!store) {
    store = require('../../../store/dummy');
  }

  async function login(username, password) {
    const data = await store.query(TABLA, { username: username });
    console.log(data)
    console.log(username, password)
    return bcrypt.compare(password, data.password)
      .then(sonIguales => {
        if (sonIguales == true)
          /**Generar token */
          return auth.sign({...data})
        else
          throw new Error('Informacion Inválida');
      });
  }

  async function upsert(data) {
    const authData = {
      id: data.id
    }
    if (data.username) {
      authData.username = data.username;
    }
    
    if (data.password) {
      // authData.password = data.password;
      authData.password = await bcrypt.hash(data.password, 5);
    }
    console.log('log de authData', authData)
    console.log('log in controller tabla ' + TABLA)
    return store.upsert(TABLA, authData);
  }
  return {
    login,
    upsert,
  };
};