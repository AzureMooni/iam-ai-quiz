import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/admin/'], // Protect internal routes
        },
        sitemap: 'https://iam-ai.kr/sitemap.xml',
    };
}
