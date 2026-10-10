import articles from './journals.json';

export const journals = [...articles].sort((a, b) => b.created_at.localeCompare(a.created_at));
export const findJournal = id => journals.find(post => String(post.id) === String(id));
export const readingMinutes = content => Math.max(1, Math.ceil((content || '').trim().split(/\s+/).length / 220));
export const formatJournalDate = (date, month = 'short') => new Date(date?.length === 10 ? date + 'T12:00:00-04:00' : date).toLocaleDateString('en-US', { month, day: 'numeric', year: 'numeric', timeZone: 'America/New_York' });
