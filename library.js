let links = []; 
document.querySelectorAll('a').forEach(a => {
  if (!(a.href.includes('/substack') ||
      a.href.includes('lluminate') ||
      a.href.includes('unaccounted'))) {
    links.push(a.href + 'feed');
  }
});
copy(links);
