const lDB = require('../../dbConfig')('leaderboard');

const get = filter =>
  !filter ? lDB.orderBy('score', 'desc') : lDB.where(filter);

const newget = () =>
  lDB
    .join('players', 'leaderboard.player_id', 'players.id')
    .select('score', 'player_id', 'leaderboard.id as id', 'email', 'created_at')
    .orderBy('score', 'desc');

const paginate = (lim = 15, off = 0) =>
  lDB
    .join('players', 'leaderboard.player_id', 'players.id')
    .select(
      'leaderboard.score',
      'leaderboard.player_id',
      'leaderboard.id',
      'players.email',
      'players.name',
      'leaderboard.created_at'
    )
    .orderBy('score', 'desc')
    .limit(lim)
    .offset(off);

const create = player => lDB.insert(player).then(([id]) => get({ id }));

const update = (id, changes) =>
  lDB
    .where({ id })
    .update(changes)
    .then(count => (count > 0 ? get({ id }) : null));

const remove = async id => {
  const player = await get({ id });
  if (player[0]) {
    await lDB.where({ id }).del();
    return player;
  }
  return null;
};

module.exports = {
  get,
  newget,
  create,
  update,
  remove,
  paginate
};
