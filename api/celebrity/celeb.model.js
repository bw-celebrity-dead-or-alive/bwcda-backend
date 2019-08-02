const db = require('../../dbConfig');

const get = filter =>
  !filter
    ? db('celebrities')
    : db('celebrities')
        .where(filter)
        .first();

const paginate = (lim = 15, off = 0) =>
  db('celebrities')
    .limit(lim)
    .offset(off);

const create = celebrity =>
  db('celebrities')
    .insert(celebrity)
    .returning('id')
    .then(([id]) => get({ id }));

const update = (id, changes) =>
  db('celebrities')
    .where({ id })
    .update(changes)
    .then(count => (count > 0 ? get({ id }) : null));

const remove = async id => {
  const celeb = await get({ id });
  if (celeb) {
    await db('celebrities')
      .where({ id })
      .del();
    return celeb;
  }
  return null;
};

module.exports = {
  get,
  create,
  update,
  remove,
  paginate
};
