import articles from './journals.json';

export const journals = articles;
export const findJournal = id => journals.find(post => post.id === id);
export const readingMinutes = content => Math.max(1, Math.ceil((content || '').trim().split(/\s+/).length / 220));
export const formatJournalDate = (date, month = 'short') => new Date(date?.length === 10 ? date + 'T12:00:00-04:00' : date).toLocaleDateString('en-US', { month, day: 'numeric', year: 'numeric', timeZone: 'America/New_York' });
export function mergeJournals(remote) {
  const localIds = new Set(journals.map(post => String(post.id)));
  return [...journals, ...remote.filter(post => post?.id != null && typeof post.title === 'string' && !localIds.has(String(post.id)))];
}
