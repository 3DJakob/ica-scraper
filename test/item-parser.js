const assert = require('assert')

const parseIcaItem = require('../lib/item-parser')

function testParseIcaItem () {
  assert.deepStrictEqual(parseIcaItem(' 900 g möjlig potatis'), [
    { amount: 900, unit: 'g', name: 'möjlig potatis', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem(' 4  kycklingfiléer'), [
    { amount: 4, unit: null, name: 'kycklingfiléer', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem('   salt och peppar'), [
    { amount: null, unit: null, name: 'salt', comment: null },
    { amount: null, unit: null, name: 'peppar', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem(' 1 tsk olja'), [
    { amount: 1, unit: 'tsk', name: 'olja', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem(' 1 dl + 1 tsk balsamicovinäger'), [
    { amount: 1, unit: 'dl', name: 'balsamicovinäger', comment: null },
    { amount: 1, unit: 'tsk', name: 'balsamicovinäger', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem(' 1  kruka basilika'), [
    { amount: 1, unit: null, name: 'kruka basilika', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem(' 2 msk smör eller margarin'), [
    { amount: 2, unit: 'msk', name: 'smör eller margarin', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem(' 1 1/2 dl mjölk'), [
    { amount: 1.5, unit: 'dl', name: 'mjölk', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem(' 250 g körsbärstomater'), [
    { amount: 250, unit: 'g', name: 'körsbärstomater', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem(' 125 g salladslök'), [
    { amount: 125, unit: 'g', name: 'salladslök', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem('  1/2 msk olivolja'), [
    { amount: 0.5, unit: 'msk', name: 'olivolja', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem(' 500 g nötfärs'), [
    { amount: 500, unit: 'g', name: 'nötfärs', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem('  1/2 tsk salt'), [
    { amount: 0.5, unit: 'tsk', name: 'salt', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem('  1/2 krm peppar'), [
    { amount: 0.5, unit: 'krm', name: 'peppar', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem(' 2 msk smör eller margarin'), [
    { amount: 2, unit: 'msk', name: 'smör eller margarin', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem(' 3  gula lökar'), [
    { amount: 3, unit: null, name: 'gula lökar', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem(' 10  potatisar'), [
    { amount: 10, unit: null, name: 'potatisar', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem(' 4 dl köttbuljong (tärning + vatten)'), [
    { amount: 4, unit: 'dl', name: 'köttbuljong (tärning + vatten)', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem(' 1 1/2 dl mörkt öl'), [
    { amount: 1.5, unit: 'dl', name: 'mörkt öl', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem(' 1  lagerblad'), [
    { amount: 1, unit: null, name: 'lagerblad', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem(' 1 tsk timjan'), [
    { amount: 1, unit: 'tsk', name: 'timjan', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem('   salt'), [
    { amount: null, unit: null, name: 'salt', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem('   vitpeppar'), [
    { amount: null, unit: null, name: 'vitpeppar', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem(' 1  knippe persilja'), [
    { amount: 1, unit: null, name: 'knippe persilja', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem(' 600 g strömmingsfilé'), [
    { amount: 600, unit: 'g', name: 'strömmingsfilé', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem('ca 900 g mjölig potatis'), [
    { amount: 900, unit: 'g', name: 'mjölig potatis', comment: 'ca' }
  ])

  assert.deepStrictEqual(parseIcaItem(' 4 msk dijonsenap'), [
    { amount: 4, unit: 'msk', name: 'dijonsenap', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem(' 3 msk hackad dill'), [
    { amount: 3, unit: 'msk', name: 'hackad dill', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem(' 2  ägg'), [
    { amount: 2, unit: null, name: 'ägg', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem(' 2 dl ströbröd'), [
    { amount: 2, unit: 'dl', name: 'ströbröd', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem(' 1 tsk salt'), [
    { amount: 1, unit: 'tsk', name: 'salt', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem(' 1 krm peppar'), [
    { amount: 1, unit: 'krm', name: 'peppar', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem(' 250 g gröna ärter'), [
    { amount: 250, unit: 'g', name: 'gröna ärter', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem('   matfett till stekning'), [
    { amount: null, unit: null, name: 'matfett till stekning', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem('   citronklyftor till servering'), [
    { amount: null, unit: null, name: 'citronklyftor till servering', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem('   salt och peppar'), [
    { amount: null, unit: null, name: 'salt', comment: null },
    { amount: null, unit: null, name: 'peppar', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem(' 225 g tinade tranbär'), [
    { amount: 225, unit: 'g', name: 'tinade tranbär', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem('  4/5 dl strösocker'), [
    { amount: 0.8, unit: 'dl', name: 'strösocker', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem('skalet av  1 citron'), [
    { amount: 1, unit: null, name: 'citron', comment: 'skalet av' }
  ])

  assert.deepStrictEqual(parseIcaItem('skalet av 1  citron'), [
    { amount: 1, unit: null, name: 'citron', comment: 'skalet av' }
  ])

  assert.deepStrictEqual(parseIcaItem('skalet av 1  apelsin'), [
    { amount: 1, unit: null, name: 'apelsin', comment: 'skalet av' }
  ])

  assert.deepStrictEqual(parseIcaItem('1 burk kokta kikärter (à 380 g)'), [
    { amount: 1, unit: null, name: 'burk kokta kikärter (à 380 g)', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem('3/4 dl soltorkade tomater'), [
    { amount: 3/4, unit: 'dl', name: 'soltorkade tomater', comment: null }
  ])

  assert.deepStrictEqual(parseIcaItem('bröd'), [
    { amount: null, unit: null, name: 'bröd', comment: null }
  ])
}

testParseIcaItem()
