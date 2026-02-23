import { MetadataRoute } from 'next';
import { getAllToolsForSitemap } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://piktai.com';

    // 1. Define Static Core Pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/ko`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0, // Highest priority for the main page
        },
        {
            url: `${baseUrl}/submit`, // B2B Onboarding portal
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ];

    // 2. Fetch Dynamic Tool Pages
    const tools = await getAllToolsForSitemap();

    const dynamicToolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
        url: `${baseUrl}/tools/${tool.id}`,
        lastModified: tool.updatedAt || new Date(),
        changeFrequency: 'weekly',
        priority: 0.7, // Detail pages have slightly lower priority than the home page
    }));

    // Combine and return
    return [...staticPages, ...dynamicToolPages];
}
