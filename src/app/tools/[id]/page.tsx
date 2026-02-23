import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Mock data fetcher for demonstration since we don't have a real DB connected here
async function getToolData(id: string) {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
        id,
        name: "AI 엑셀 마스터 PRO",
        target_audience: "재무팀/마케터",
        core_feature: "데이터 자동 분석 및 시각화",
        pikis_pick: "단순 반복 엑셀 작업을 3초만에 끝내주는 궁극의 마법 도구",
        description_ko: "AI 엑셀 마스터 PRO는 재무팀과 마케터를 위한 완벽한 솔루션입니다. 복잡한 수식 없이 텍스트 입력만으로 데이터를 분석하고 아름다운 차트로 시각화합니다.",
        average_rating: "4.8",
        review_count: "342",
        pricing_model: "Freemium",
    };
}

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const tool = await getToolData(resolvedParams.id);

    // Niche Targeting Formula: Target Audience + Problem Solving + AI
    const nicheTitle = `${tool.target_audience}를 위한 ${tool.core_feature} AI | ${tool.name} 사용법 및 무료 프롬프트`;

    return {
        title: nicheTitle,
        description: `${tool.name} 완벽 가이드. 어려운 영어 매뉴얼 대신 1초 만에 복사해서 쓸 수 있는 ${tool.target_audience} 맞춤형 한국어 프롬프트와 객관적 별점 평가를 확인하세요.`,
        keywords: [tool.name, `${tool.target_audience} AI`, "AI 툴 추천", "업무 자동화", tool.core_feature],
        openGraph: {
            title: nicheTitle,
            description: tool.pikis_pick,
        }
    };
}

export default async function ToolDetailPage({ params }: Props) {
    const resolvedParams = await params;
    const tool = await getToolData(resolvedParams.id);

    // Construct the JSON-LD Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: tool.name,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'WebBrowser',
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: tool.average_rating || "4.5",
            reviewCount: tool.review_count || "120",
        },
        offers: {
            '@type': 'Offer',
            price: tool.pricing_model === 'Free' ? '0' : '9.99',
            priceCurrency: 'USD',
        },
        description: tool.description_ko,
    };

    return (
        <>
            {/* Inject JSON-LD strictly in the head/body without rendering visually */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <main className="min-h-screen flex flex-col p-6 sm:p-10 font-sans relative">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-[#00f0ff] hover:text-white transition-colors mb-10 w-fit font-bold"
                >
                    <ArrowLeft className="w-5 h-5" />
                    돌아가기
                </Link>

                {/* Dynamic Detail Content Fake UI */}
                <div className="glass-panel max-w-2xl w-full rounded-[2rem] p-8 sm:p-12 relative overflow-hidden border-2 border-[#b026ff]/30 shadow-2xl">
                    <div className="mb-4 inline-block px-4 py-1 rounded-full border border-white/20 bg-white/5 text-xs font-bold text-gray-300 tracking-wider">
                        {tool.target_audience} 대상
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black mb-6 tracking-tight text-white drop-shadow-md">
                        {tool.name}
                    </h1>
                    <h2 className="text-xl sm:text-2xl font-bold mb-8 text-[#00f0ff] leading-relaxed">
                        {tool.core_feature} AI
                    </h2>

                    <div className="bg-black/40 p-6 rounded-2xl border border-white/10 w-full text-left mb-8">
                        <p className="text-gray-200 font-medium leading-relaxed text-base sm:text-lg">
                            {tool.description_ko}
                        </p>
                    </div>

                    <div className="flex items-center gap-6 p-5 rounded-2xl bg-[#b026ff]/10 border border-[#b026ff]/30">
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-400 font-semibold mb-1">에디터의 한줄평</span>
                            <span className="text-white font-bold">&quot;{tool.pikis_pick}&quot;</span>
                        </div>
                        <div className="ml-auto text-right">
                            <span className="text-2xl font-black text-[#ffcc00]">★ {tool.average_rating}</span>
                            <div className="text-xs text-gray-400 mt-1">({tool.review_count} 리뷰)</div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
