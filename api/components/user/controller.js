// const nanoid = require('nanoid');
const { nanoid } = require('nanoid');
const auth = require('../auth');

const TABLA = 'user';

module.exports = function (injectedStore, injectedCache) {
  let store = injectedStore;
  let cache = injectedCache;
  if (!store) {
    store = require('../../../store/dummy');
  }
  if (!cache) {
    store = require('../../../store/dummy');
  }

  console.log(store)

  async function list() {
    // return store.list(TABLA);
    let users = await cache.list(TABLA);

    if(!users){
      console.log('No esta en cache lo busca en la DB')
      users = await store.list(TABLA);
      cache.upsert(TABLA, users)
    } else {
      console.log('Datos desde cache')
    }
    return users;
  }

  function get(id) {
    return store.get(TABLA, id);
  }
  async function upsert(body) {
    console.log(body)
    const user = {
      name: body.name,
      username: body.username,
    }

    if (body.id) {
      user.id = body.id;
    } else {
      user.id = nanoid();
    }

    if (body.password || body.username) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: body.password,
      })
    }
    console.log('controller de user ', TABLA, user)
    return store.upsert(TABLA, user);
  }

  function follow(from, to){
    return store.upsert(TABLA + '_follow', {
      user_from: from,
      user_to: to
    });
  }

  async function following(user){
    const join = {}
    join[TABLA] = 'user_to';
    const query = {user_from: user};
    return await store.query(TABLA + '_follow', query, join)
  }

  return {
    list,
    get,
    upsert,
    follow,
    following
  };
}