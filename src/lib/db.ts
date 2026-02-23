// Mock database module
export async function getAllToolsForSitemap() {
    // Simulate network request latency
    await new Promise(resolve => setTimeout(resolve, 200));

    const now = new Date();
    return [
        { id: 'chatgpt', updatedAt: now },
        { id: 'midjourney', updatedAt: now },
        { id: 'excel-master', updatedAt: now },
    ];
}
