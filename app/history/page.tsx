import { egyptHistoryTimeline, culturalAspects, empireRiseAndFall } from '@/data/egyptHistory';
import Link from 'next/link';

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-magazine-bg">
      {/* Header */}
      <section className="bg-magazine-text text-white py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <Link href="/" className="inline-block mb-4 text-magazine-accent hover:underline">
            ← 返回首页
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif mb-2">
            古埃及历史
          </h1>
          <p className="text-xl opacity-90">
            五千年文明的辉煌与沧桑
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {/* 简介 */}
        <section className="mb-16">
          <div className="magazine-card p-8">
            <p className="text-lg text-magazine-secondary leading-relaxed">
              古埃及文明是人类历史上最古老、最辉煌的文明之一，发源于尼罗河流域，延续了近三千年。
              从公元前3100年上下埃及的统一，到公元前30年克利奥帕特拉七世的去世，古埃及创造了金字塔、
              象形文字、木乃伊等令世人惊叹的奇迹。这个文明不仅在建筑、艺术、科学方面取得了卓越成就，
              更建立了复杂的社会制度和宗教信仰体系，对后世文明产生了深远影响。
            </p>
          </div>
        </section>

        {/* 时间线 */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <p className="text-caption mb-3">Timeline</p>
            <h2 className="text-4xl font-serif text-magazine-text">历史时间线</h2>
            <div className="section-divider max-w-xs mx-auto mt-6"></div>
          </div>

          <div className="space-y-8">
            {egyptHistoryTimeline.map((period, index) => (
              <div key={index} className="magazine-card overflow-hidden">
                <div className="bg-magazine-sand/30 p-6 border-b border-magazine-border">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-serif text-magazine-text">{period.name}</h3>
                      <p className="text-sm text-magazine-accent">{period.period}</p>
                    </div>
                    <span className="text-sm text-magazine-secondary bg-magazine-sand px-3 py-1 rounded-full">
                      {period.years}
                    </span>
                  </div>
                  <p className="mt-4 text-magazine-secondary">{period.description}</p>
                </div>
                
                <div className="p-6 grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-magazine-text mb-3">重要事件</h4>
                    <ul className="space-y-2">
                      {period.keyEvents.map((event, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-magazine-secondary">
                          <span className="text-magazine-accent mt-1">•</span>
                          <span>{event}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-magazine-text mb-3">主要成就</h4>
                    <ul className="space-y-2">
                      {period.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-magazine-secondary">
                          <span className="text-magazine-accent mt-1">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 文化发展 */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <p className="text-caption mb-3">Culture</p>
            <h2 className="text-4xl font-serif text-magazine-text">文化发展</h2>
            <div className="section-divider max-w-xs mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {culturalAspects.map((aspect, index) => (
              <div key={index} className="magazine-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs text-magazine-accent uppercase tracking-wider">
                    {aspect.category}
                  </span>
                </div>
                <h3 className="text-xl font-serif text-magazine-text mb-2">{aspect.title}</h3>
                <p className="text-sm text-magazine-secondary mb-4">{aspect.description}</p>
                <ul className="space-y-1">
                  {aspect.details.slice(0, 4).map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-magazine-secondary">
                      <span className="text-magazine-accent mt-1">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 帝国兴衰 */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <p className="text-caption mb-3">Rise & Fall</p>
            <h2 className="text-4xl font-serif text-magazine-text">帝国兴衰</h2>
            <div className="section-divider max-w-xs mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 兴起因素 */}
            <div className="magazine-card p-6 border-l-4 border-green-500">
              <h3 className="text-xl font-serif text-magazine-text mb-6 flex items-center gap-2">
                <span>📈</span>
                兴起因素
              </h3>
              <div className="space-y-4">
                {empireRiseAndFall.riseFactors.map((factor, index) => (
                  <div key={index} className="bg-green-50/50 p-4 rounded-lg">
                    <h4 className="font-medium text-magazine-text mb-1">{factor.title}</h4>
                    <p className="text-sm text-magazine-secondary">{factor.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 衰落因素 */}
            <div className="magazine-card p-6 border-l-4 border-red-500">
              <h3 className="text-xl font-serif text-magazine-text mb-6 flex items-center gap-2">
                <span>📉</span>
                衰落因素
              </h3>
              <div className="space-y-4">
                {empireRiseAndFall.fallFactors.map((factor, index) => (
                  <div key={index} className="bg-red-50/50 p-4 rounded-lg">
                    <h4 className="font-medium text-magazine-text mb-1">{factor.title}</h4>
                    <p className="text-sm text-magazine-secondary">{factor.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 历史意义 */}
        <section className="mb-16">
          <div className="magazine-card p-8 bg-magazine-text text-white">
            <h2 className="text-2xl font-serif mb-4">历史的启示</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              古埃及文明的兴衰给后世留下了深刻的启示。它的兴起证明了地理环境、政治统一、技术创新和文化凝聚力对于文明发展的重要性。
              而它的衰落则警示我们，即使是最辉煌的文明，也可能因为外敌入侵、内部腐败、资源枯竭和文化融合而走向终结。
            </p>
            <p className="text-white/80 leading-relaxed">
              然而，古埃及文明并未真正消失。它的建筑、艺术、科学成就和宗教思想通过希腊、罗马文明传承下来，
              影响了整个西方文明的发展。今天，当我们站在金字塔前，凝视着那些历经数千年依然庄严的石块时，
              我们不仅是在欣赏古代建筑的奇迹，更是在与那些创造了人类历史上最辉煌文明的古埃及人进行跨越时空的对话。
            </p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-magazine-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-serif text-magazine-text">埃及探索之旅</h3>
              <p className="text-sm text-magazine-secondary mt-1">2026.04.28 - 05.05</p>
            </div>
            <div className="flex gap-6 text-sm text-magazine-secondary">
              <Link href="/" className="hover:text-magazine-text transition-colors">首页</Link>
              <Link href="/#overview" className="hover:text-magazine-text transition-colors">行程</Link>
              <Link href="/history" className="hover:text-magazine-text transition-colors">历史</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
