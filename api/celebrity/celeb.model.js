const db = require('../../dbConfig');

const get = filter =>
  !filter
    ? db('celebrities')
    : db('celebrities')
        .where(filter)
        .first();

const create = celebrity =>
  db('celebrities')
    .insert(celebrity)
    .then(([id]) => get({ id }));

const update = (id, changes) =>
  db('celebrities')
    .where({ id })
    .update(changes)
    .then(count => (count > 0 ? get({ id }) : null));

const remove = async id => {
  const celeb = await get({ id });
  db('celebrities')
    .where({ id })
    .del()
    .then(count => (count > 0 ? celeb : null));
};

module.exports = {
  get,
  create,
  update,
  remove
};
