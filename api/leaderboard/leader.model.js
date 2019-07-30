const db = require('../../dbConfig');

const get = filter =>
  !filter ? db('leaderboard') : db('leaderboard').where(filter);

const paginate = (lim = 15, off = 0) =>
  db('leaderboard')
    .limit(lim)
    .offset(off);

const create = leader =>
  db('leaderboard')
    .insert(leader)
    .then(([id]) => get({ id })[0]);

const update = (id, changes) =>
  db('leaderboard')
    .where({ id })
    .update(changes)
    .then(count => (count > 0 ? get({ id })[0] : null));

const remove = async id => {
  const leader = await get({ id });
  if (leader[0]) {
    await db('leaderboard')
      .where({ id })
      .del();
    return leader;
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
