const shuffle = (a) => {
  return a.reduce((l, e, i) => {
    const j = Math.floor(Math.random() * (a.length - i) + i); // j is in [i, a.length[
    [a[i], a[j]] = [a[j], a[i]];
    return a;
  }, a);
};

export const fixedShuffleIndex = (a, f) => {
  const w = shuffle(
    a.reduce((acc, e, i) => {
      if (!f[i]) {
        acc.push(e);
      }
      return acc;
    }, [])
  );
  return f.reduce((acc, e, i) => {
    if (e) {
      acc.splice(i, 0, a[i]);
    }
    return acc;
  }, w);
};

