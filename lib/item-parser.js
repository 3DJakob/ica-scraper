module.exports = function parseIcaItem (text) {
  let m

  // "   a och b"
  if ((m = /^(ca|skalet av)? {3}(.*) och (.*)$/.exec(text))) {
    return [
      { amount: null, unit: null, name: m[2], comment: (m[1] || null) },
      { amount: null, unit: null, name: m[3], comment: (m[1] || null) }
    ]
  }

  // " 1 u + 1 u a"
  if ((m = /^(ca|skalet av)? (\d+) (\S+) \+ (\d+) (\S+) (.*)$/.exec(text))) {
    return [
      { amount: Number.parseInt(m[2]), unit: m[3], name: m[6], comment: (m[1] || null) },
      { amount: Number.parseInt(m[4]), unit: m[5], name: m[6], comment: (m[1] || null) }
    ]
  }

  // "  1/2 u a" & "1 1/2 u a"
  if ((m = /^(ca|skalet av)? (\d+)? (\d)\/(\d) (\S*) (.*)$/.exec(text))) {
    return [
      { amount: Number.parseInt(m[2] || '0') + (Number.parseInt(m[3]) / Number.parseInt(m[4])), unit: (m[5] || null), name: m[6], comment: (m[1] || null) }
    ]
  }

  // " 1 u a"
  if ((m = /^(ca|skalet av)? (\d+) (\S*) (.*)$/.exec(text))) {
    return [
      { amount: Number.parseInt(m[2]), unit: (m[3] || null), name: m[4], comment: (m[1] || null) }
    ]
  }

  // "  1 a"
  if ((m = /^(ca|skalet av)? {2}(\d+) (.*)$/.exec(text))) {
    return [
      { amount: Number.parseInt(m[2]), unit: null, name: m[3], comment: (m[1] || null) }
    ]
  }

  // "   a"
  if ((m = /^(ca|skalet av)? {3}(.*)$/.exec(text))) {
    return [
      { amount: null, unit: null, name: m[2], comment: (m[1] || null) }
    ]
  }

  // "1/2 u a" & "1/2  a"
  if ((m = /^(\d+)\/(\d+) (\S*) (.*)$/.exec(text))) {
    return [
      { amount: (Number.parseInt(m[1]) / Number.parseInt(m[2])), unit: (m[3] || null), name: m[4], comment: null }
    ]
  }

  // "1 a"
  if ((m = /^(\d+) (.*)$/.exec(text))) {
    return [
      { amount: Number.parseInt(m[1]), unit: null, name: m[2], comment: null }
    ]
  }

  // "a"
  if ((m = /^([^\d\s].*[^\d\s])$/.exec(text))) {
    return [
      { amount: null, unit: null, name: m[1], comment: null }
    ]
  }

  throw new Error(`Failed to parse ingredient: "${text}"`)
}
