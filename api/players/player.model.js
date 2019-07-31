const db = require('../../dbConfig');

const get = (id, lim = 20) =>
  !id
    ? db('players').limit(lim)
    : db('players')
        .where({ id })
        .first();

const getPlayerScores = id => {
  return db
    .select(
      'l.score',
      'l.player_id',
      'l.id',
      'p.email',
      'p.name',
      'l.created_at'
    )
    .from('leaderboard as l')
    .join('players as p', 'l.player_id', 'p.id')
    .where('p.id', id)
    .orderBy('score', 'desc');
};

const create = player =>
  db('players')
    .insert(player)
    .returning('id')
    .then(([id]) => get(id));

const update = (id, changes) =>
  db('players')
    .where({ id })
    .update(changes)
    .then(count => (count > 0 ? get(id) : null));

const remove = async id => {
  try {
    const player = await get(id);
    await db('players')
      .where({ id })
      .del();
    return player;
  } catch (error) {
    return null;
  }
};

module.exports = {
  get,
  getPlayerScores,
  create,
  remove,
  update
};
