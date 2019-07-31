const db = require('../../dbConfig');

const get = filter =>
  !filter
    ? db('leaderboard').orderBy('score', 'desc')
    : db('leaderboard').where(filter);

const paginate = (lim = 15, off = 0) =>
  db('leaderboard')
    .orderBy('score', 'desc')
    .limit(lim)
    .offset(off);

const create = player =>
  db('leaderboard')
    .insert(player)
    .then(([id]) => get({ id }));

const update = (id, changes) =>
  db('leaderboard')
    .where({ id })
    .update(changes)
    .then(count => (count > 0 ? get({ id }) : null));

const remove = async id => {
  const player = await get({ id });
  if (player[0]) {
    await db('leaderboard')
      .where({ id })
      .del();
    return player;
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
