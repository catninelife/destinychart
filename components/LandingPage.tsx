import React from 'react';
import { Sparkles, TrendingUp, Globe, BarChart3, Shield, Zap, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { getTexts } from '../locales';

interface LandingPageProps {
  onGetStarted: () => void;
  lang: Language;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, lang }) => {
  const t = getTexts(lang);

  const features = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      titleZh: "AI 智能分析",
      titleEn: "AI-Powered Analysis",
      descZh: "基于 Gemini AI 深度学习，精准解析八字命理，生成个性化的人生运势报告",
      descEn: "Powered by Gemini AI for deep analysis of BaZi numerology and personalized life fortune reports"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      titleZh: "K线可视化",
      titleEn: "K-Line Visualization",
      descZh: "100年运势以金融K线形式呈现，直观展示人生起伏，发现关键转折点",
      descEn: "100-year fortune displayed as financial K-lines, visualizing life's ups and downs intuitively"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      titleZh: "真太阳时校准",
      titleEn: "True Solar Time",
      descZh: "根据出生地经纬度自动计算真太阳时，确保八字排盘精准无误",
      descEn: "Automatically calculates true solar time based on birthplace coordinates for accurate BaZi"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      titleZh: "隐私安全",
      titleEn: "Privacy & Security",
      descZh: "所有数据本地处理，不存储个人信息，保护您的隐私安全",
      descEn: "All data processed locally, no personal information stored, protecting your privacy"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      titleZh: "多维度解析",
      titleEn: "Multi-Dimensional Analysis",
      descZh: "涵盖事业、财富、婚姻、性格等6大维度，提供全面的人生指引",
      descEn: "Covers 6 dimensions including career, wealth, marriage, and personality for comprehensive guidance"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      titleZh: "PDF报告导出",
      titleEn: "PDF Export",
      descZh: "一键生成精美PDF报告，永久保存您的命运分析结果",
      descEn: "Generate beautiful PDF reports with one click, preserve your destiny analysis forever"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 pt-20 pb-16 text-center">
        {/* Version Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-sm mb-8 backdrop-blur-sm">
          <Sparkles className="w-4 h-4" />
          <span>{lang === 'zh' ? '基于 Gemini 3-Pro 驱动' : 'Powered by Gemini 3-Pro'} v1.0</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          {lang === 'zh' ? '洞悉命运起伏' : 'Life Fortune Analysis'}
        </h1>
        <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
          <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
            {lang === 'zh' ? '预见人生轨迹' : 'Visualize Your Destiny'}
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
          {lang === 'zh'
            ? '结合传统八字命理与现代金融数据可视化，将您的一生运势转化为直观的K线图。基于AI深度分析，助您发现人生牛市，规避风险熊市，把握关键转折点。'
            : 'Combining traditional BaZi numerology with modern financial visualization. Transform your lifetime fortune into intuitive K-line charts. Discover your bull markets, avoid bear risks, and seize key turning points.'
          }
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
          <button
            onClick={onGetStarted}
            className="group px-8 py-4 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50"
          >
            {lang === 'zh' ? '开始分析' : 'Get Started'}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="https://github.com/XIAOEEN/lifeline-k-"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all duration-200 border border-slate-600"
          >
            {lang === 'zh' ? '开源地址' : 'Open Source'}
          </a>
        </div>

        {/* Demo Screenshot - K-Line Chart */}
        <div id="demo" className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-800/50 backdrop-blur">
          <div className="absolute top-0 left-0 right-0 h-10 bg-slate-800/80 backdrop-blur flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="ml-4 text-xs text-gray-400 font-mono">
              {lang === 'zh' ? 'app.lifekline.com' : 'app.lifekline.com'}
            </div>
          </div>
          <div className="pt-10">
            <img
              src="/doc/k线.png"
              alt="K-Line Chart Demo"
              className="w-full h-auto"
              onError={(e) => {
                // Fallback if image doesn't load
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {lang === 'zh' ? '核心功能' : 'Core Features'}
          </h3>
          <p className="text-gray-400 text-lg">
            {lang === 'zh'
              ? '现代科技与传统命理的完美结合'
              : 'Perfect blend of modern technology and traditional numerology'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-teal-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10 backdrop-blur"
            >
              <div className="w-12 h-12 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">
                {lang === 'zh' ? feature.titleZh : feature.titleEn}
              </h4>
              <p className="text-gray-400 leading-relaxed">
                {lang === 'zh' ? feature.descZh : feature.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Screenshots Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {lang === 'zh' ? '系统界面' : 'Interface Preview'}
          </h3>
          <p className="text-gray-400 text-lg">
            {lang === 'zh'
              ? '简洁优雅的设计，专业精准的分析'
              : 'Clean design, professional analysis'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Homepage Screenshot */}
          <div className="rounded-xl overflow-hidden border border-slate-700 shadow-xl bg-slate-800/30 backdrop-blur hover:border-teal-500/50 transition-all duration-300">
            <div className="p-4 bg-slate-800/80 border-b border-slate-700">
              <h4 className="text-white font-semibold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                {lang === 'zh' ? '首页界面' : 'Homepage'}
              </h4>
            </div>
            <img
              src="/doc/首页.png"
              alt="Homepage Interface"
              className="w-full h-auto"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          {/* BaZi Screenshot */}
          <div className="rounded-xl overflow-hidden border border-slate-700 shadow-xl bg-slate-800/30 backdrop-blur hover:border-teal-500/50 transition-all duration-300">
            <div className="p-4 bg-slate-800/80 border-b border-slate-700">
              <h4 className="text-white font-semibold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                {lang === 'zh' ? '八字排盘' : 'BaZi Chart'}
              </h4>
            </div>
            <img
              src="/doc/八字排盘.png"
              alt="BaZi Chart"
              className="w-full h-auto"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          {/* K-Line Screenshot */}
          <div className="rounded-xl overflow-hidden border border-slate-700 shadow-xl bg-slate-800/30 backdrop-blur hover:border-teal-500/50 transition-all duration-300">
            <div className="p-4 bg-slate-800/80 border-b border-slate-700">
              <h4 className="text-white font-semibold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                {lang === 'zh' ? 'K线分析' : 'K-Line Analysis'}
              </h4>
            </div>
            <img
              src="/doc/k线.png"
              alt="K-Line Analysis"
              className="w-full h-auto"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>

      {/* VeeVerse Promotion Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="rounded-2xl bg-gradient-to-br from-purple-900/40 via-slate-800/60 to-blue-900/40 border border-purple-500/30 p-10 md:p-12 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 backdrop-blur">
                <span className="text-purple-300 text-sm font-semibold">
                  {lang === 'zh' ? '🚀 进阶产品推荐' : '🚀 Advanced Product'}
                </span>
              </div>
            </div>

            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                VeeVerse
              </span>
              {lang === 'zh' ? ' 灵魂旅迹' : ' Soul Journey'}
            </h3>

            <p className="text-xl md:text-2xl text-gray-200 mb-6 font-medium">
              {lang === 'zh'
                ? '带你找到属于你的那条航线'
                : 'Find Your Unique Path in Life'}
            </p>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-3xl">
              {lang === 'zh'
                ? '超越传统命理分析，VeeVerse 灵魂旅迹运用前沿 AI 技术，深度解析你的人生轨迹。不只是预测未来，更是帮助你理解过去、把握现在，在人生的十字路口找到最适合你的方向。每个人都有独特的灵魂航线，让我们一起探索你的专属旅程。'
                : 'Beyond traditional fortune telling, VeeVerse Soul Journey uses cutting-edge AI to deeply analyze your life trajectory. More than predicting the future, it helps you understand the past, seize the present, and find your best direction at life\'s crossroads.'
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <a
                href="https://veeverseai.cn/"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-lg font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.02]"
              >
                {lang === 'zh' ? '立即体验 VeeVerse' : 'Try VeeVerse Now'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <div className="flex items-center gap-2 text-purple-300 text-sm">
                <Sparkles className="w-4 h-4" />
                <span>{lang === 'zh' ? '更深度 · 更智能 · 更个性化' : 'Deeper · Smarter · Personalized'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="rounded-2xl bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 p-12 backdrop-blur">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {lang === 'zh' ? '开启您的命运之旅' : 'Start Your Journey'}
          </h3>
          <p className="text-gray-300 text-lg mb-8">
            {lang === 'zh'
              ? '只需几分钟，即可获得专业的AI命运分析报告'
              : 'Get your professional AI destiny analysis in minutes'
            }
          </p>
          <button
            onClick={onGetStarted}
            className="group px-10 py-5 bg-teal-500 hover:bg-teal-400 text-white text-lg font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 mx-auto shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50"
          >
            {lang === 'zh' ? '立即开始' : 'Get Started Now'}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-6xl mx-auto px-4 pb-12 text-center">
        <p className="text-gray-500 text-sm">
          {lang === 'zh'
            ? '本项目仅供娱乐和文化研究使用 • 开源项目 • MIT License'
            : 'For entertainment and cultural research only • Open Source • MIT License'
          }
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
