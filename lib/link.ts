import type {StoryblokMultilink} from '@/.storyblok/types/storyblok';

export function resolveLinkUrl(link?: StoryblokMultilink): string | null {
    if (link == null) {
        return null;
    }

    const url = link.linktype === 'url' ? link.url : link.cached_url;

    if (url == null || url === '') {
        return null;
    }

    const href = link.linktype === 'story' && !url.startsWith('/')
        ? `/${url}`
        : url;

    return link.anchor != null && link.anchor !== ''
        ? `${href}#${link.anchor}`
        : href;
}
