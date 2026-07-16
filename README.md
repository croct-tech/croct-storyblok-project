<p align="center">
  <img src="public/storyblok-croct.svg" alt="Storyblok + Croct" width="242" />
</p>

<h3 align="center">Storyblok demo with personalization and AB testing</h3>

<p align="center">
  A Next.js 16 storefront powered by <a href="https://www.storyblok.com">Storyblok</a> for content management<br/>and <a href="https://croct.com?utm_medium=repo&utm_source=github&utm_campaign=20260000.CO.DE.storyblok_nextjs">Croct</a> for real-time personalization.
</p>

<p align="center">
  <a href="https://storyblok-next-personalization.vercel.app/">Live demo</a>
</p>

---

## Background

Storyblok published a great [tutorial on personalization with Next.js](https://www.storyblok.com/tp/personalization-nextjs) that walks through building personalized experiences using cookies, middleware rewrites, and manually defined content variants. It's a solid starting point for understanding the concepts.

In practice, though, that approach requires custom code for every new audience segment, manual variant wiring in the CMS, and has no built-in support for AB testing or analytics. As the number of pages and segments grows, it becomes hard to maintain.

This project is a fork of the [original demo](https://github.com/fgiuliani/storyblok-next-personalization) that replaces the manual personalization logic with [Croct](https://croct.com?utm_medium=repo&utm_source=github&utm_campaign=20260000.CO.DE.storyblok_nextjs). With Croct, any content already managed in Storyblok becomes personalizable and ready for AB testing, without changing how you structure or deliver your pages.

## What is Croct?

Croct is a headless platform for conversion optimization that pairs nicely with Storyblok. Using Croct, you get:

* [Server-side AB testing](https://croct.com/ab-testing?utm_medium=repo&utm_source=github&utm_campaign=20260000.CO.DE.storyblok_nextjs) support with real-time [audience segmentation](https://croct.com/segmentation?utm_medium=repo&utm_source=github&utm_campaign=20260000.CO.DE.storyblok_nextjs)
* [Server-side content personalization](https://croct.com/personalization?utm_medium=repo&utm_source=github&utm_campaign=20260000.CO.DE.storyblok_nextjs) based on location, behavior, or custom rules
* [Visitor profile explorer](https://croct.com/user-profiles?utm_medium=repo&utm_source=github&utm_campaign=20260000.CO.DE.storyblok_nextjs) so you can dive deeper and analyze the user journey using out-of-the-box events.
* Built-in analytics and Bayesian analysis for every variant and experience
* Seamless compatibility with your existing Storyblok schemas
* Fast implementation with zero CMS migration

With Croct, any content already managed in Storyblok becomes personalizable and ready for AB testing, without changing how you structure or deliver it.

Unlike currently available plugins, you can run experiments at the component level rather than the field level. Croct replaces static module content with dynamic content, allowing you to manage everything directly on the UI while using Storyblok content as a [fallback](https://docs.croct.com/reference/sdk/nextjs/content-rendering#fault-tolerance?utm_medium=repo&utm_source=github&utm_campaign=20260000.CO.DE.storyblok_nextjs).

Since it comes with built-in audience segmentation and analytics, there's no need to add extra integrations with CDPs to segment visitors or with analytics tools to gather insights.

## What is inside this demo?

A fashion store demo that shows how Storyblok and Croct work together in a Next.js App Router project. Storyblok manages all the content, while Croct makes it personalizable and trackable without any changes to the content structure.

- **CMS-managed pages** — announcement bar, homepage hero, feature strips, split features, and product catalog are all Storyblok stories
- **Personalized content** — Croct delivers targeted variants for any Storyblok component, with no extra CMS configuration
- **Interest tracking** — browsing behavior (category views, style quiz answers) is captured in real-time to build user profiles
- **Event-driven analytics** — funnel events like cart views, checkouts, and purchases are tracked through Croct for personalization and analytics
- **Concierge widget** — an interactive style quiz that collects preferences and feeds them into Croct for immediate personalization

## How to get started?

Follow these steps to run the project locally. You'll need access to a Storyblok space and optionally a Croct workspace.

### Prerequisites

- Node.js 18+
- A [Storyblok](https://app.storyblok.com/#!/signup) space with the demo content
- A [Croct](https://app.croct.com?utm_medium=repo&utm_source=github&utm_campaign=20260000.CO.DE.storyblok_nextjs) workspace (or use the pre-configured one)

### 1. Clone and install

```bash
git clone <repo-url>
cd storyblok-next-personalization
npm install
```

### 2. Set up Storyblok

Create a `.env.local` file with your Storyblok access token:

```env
NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN=<your-token>
```

### 3. Set up Croct

Run the Croct CLI to configure the app ID and API key automatically:

```bash
npx croct init
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How does the integration work?

Adding Croct to an existing Storyblok + Next.js project takes three small changes — no restructuring of your content or pages required. Check the [commit history](https://github.com/croct-tech/storyblok-next-personalization/commit/ed9cb61c4915aa9f1a11e513a8dc1d125642f57c) to see the exact diff.

**1. Wrap the Storyblok init with `withCroct`**

```ts
// lib/storyblok.ts
import {withCroct} from '@croct/plug-storyblok/next';

export const getStoryblokApi = storyblokInit(withCroct({
    accessToken: '...',
    use: [apiPlugin],
    components: { ... },
}));
```

**2. Add the `<CroctProvider>`**

```tsx
// app/layout.tsx
import {CroctProvider} from '@croct/plug-next/CroctProvider';

<CroctProvider>
    {children}
</CroctProvider>
```

**3. Export the proxy middleware**

```ts
// proxy.ts
export {proxy} from '@croct/plug-next/proxy';
```

That's it. No extra config, no migration. Once integrated, any content managed in Storyblok becomes personalizable and ready for AB testing and personalization through Croct.

For the full integration guide, see the [Storyblok SDK documentation](https://docs.croct.com/immersion/integrations/cms/storyblok/integration?utm_medium=repo&utm_source=github&utm_campaign=20260000.CO.DE.storyblok_nextjs).

### Project structure

The project follows a standard Next.js App Router layout. The integration-relevant parts are organized as follows:

- **`lib/storyblok.ts`** — Storyblok SDK initialization wrapped with `withCroct` to enable personalization on all stories
- **`app/layout.tsx`** — Root layout with `<CroctProvider>` and `<StoryblokProvider>`
- **`proxy.ts`** — Exports the Croct proxy middleware for server-side personalization
- **`components/blocks/`** — Storyblok content block components (hero, catalog, announcement bar, feature strips, etc.), each using `storyblokEditable` for visual editing

### Event tracking

The app tracks user behavior across the entire funnel through Croct, enabling personalization rules and analytics based on real interactions.

| Event             | Trigger                         | Source                |
|-------------------|---------------------------------|-----------------------|
| `cartViewed`      | Page loaded                     | `/cart`               |
| `cartModified`    | Item added, removed, or updated | `/cart`               |
| `checkoutStarted` | Page loaded                     | `/checkout`           |
| `orderPlaced`     | Order confirmed                 | `/confirmation`       |
| `interestShown`   | Category page viewed            | `/catalog/[category]` |
| `interestShown`   | Quiz answer selected            | Site-wide             |
| `leadGenerated`   | Newsletter subscribed           | `/`                   |
| `userSignedUp`    | Account created                 | `/signin`             |
| `goalCompleted`   | Hero CTA clicked                | `/`                   |
| `goalCompleted`   | Announcement bar clicked        | `/`                   |
| `goalCompleted`   | Item added to cart              | `/product/[slug]`     |
| `goalCompleted`   | Coupon redeemed                 | `/cart`               |
| `goalCompleted`   | Checkout started                | `/checkout`           |
| `goalCompleted`   | Purchase completed              | `/confirmation`       |
| `goalCompleted`   | Newsletter subscribed           | `/`                   |
| `goalCompleted`   | Account created                 | `/signin`             |
| `goalCompleted`   | Concierge started               | Site-wide             |
| `goalCompleted`   | Concierge completed             | Site-wide             |

### Deploying

The project is ready to deploy on any platform that supports Next.js. Click the button below to deploy directly to Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcroct-tech%2Fstoryblok-next-personalization&env=NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN&envDescription=Your%20Storyblok%20Content%20Delivery%20API%20access%20token&envLink=https%3A%2F%2Fwww.storyblok.com%2Fdocs%2Fapi%2Fcontent-delivery%2Fv2%2Fgetting-started%2Fauthentication)

Make sure to set the environment variables listed above in your hosting provider's dashboard.

## Docs

For more details on the tools used in this project, refer to the official documentation:

- [Croct docs](https://docs.croct.com?utm_medium=repo&utm_source=github&utm_campaign=20260000.CO.DE.storyblok_nextjs)
- [Croct Next.js SDK](https://docs.croct.com/reference/sdk/nextjs/integration?utm_medium=repo&utm_source=github&utm_campaign=20260000.CO.DE.storyblok_nextjs)
- [Croct Storyblok SDK](https://docs.croct.com/reference/sdk/storyblok/integration?utm_medium=repo&utm_source=github&utm_campaign=20260000.CO.DE.storyblok_nextjs)
- [Storyblok docs](https://www.storyblok.com/docs)
- [Next.js docs](https://nextjs.org/docs)