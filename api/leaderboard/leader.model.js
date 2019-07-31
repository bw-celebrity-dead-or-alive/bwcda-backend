const db = require('../../dbConfig');
const lDB = db('leaderboard');

const get = id =>
  db
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

const paginate = (lim = 20, off = 0) =>
  db
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
    .orderBy('score', 'desc')
    .limit(lim)
    .offset(off);

const getScore = id => lDB.where({ id }).first();

// working
const create = score => lDB.insert(score).then(([id]) => getScore(id));

const update = (id, changes) =>
  lDB
    .where({ id })
    .update(changes)
    .then(count => (count > 0 ? getScore(id) : null));

const remove = async id => {
  const score = await getScore(id);
  if (score) {
    await lDB.where({ id }).del();
    return score;
  }
  return null;
};

module.exports = {
  get,
  create,
  getScore,
  update,
  remove,
  paginate
};
