import React from 'react';

export default function BackgroundDecor({ darkMode }) {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
            {/* 1. Ambient Color Orbs di Belakang Kartu Upload & Hero (Memberi Efek Refraksi Kaca) */}
            <div
                className={`absolute -top-28 -left-24 w-[560px] h-[560px] rounded-full blur-[90px] ${
                    darkMode ? 'bg-[#176BFF]/25' : 'bg-[#7BAEFF]/55'
                }`}
            />
            {/* Orb Biru-Ungu Tepat di Belakang Kartu Upload Kanan agar Efek Kaca Terlihat Jelas */}
            <div
                className={`absolute top-[14%] right-[6%] w-[460px] h-[460px] rounded-full blur-[85px] ${
                    darkMode ? 'bg-[#743BFF]/25' : 'bg-gradient-to-br from-[#6EA5FF]/55 via-[#9BBFFF]/45 to-[#8B5CF6]/35'
                }`}
            />
            <div
                className={`absolute bottom-[8%] left-[18%] w-[520px] h-[380px] rounded-full blur-[95px] ${
                    darkMode ? 'bg-[#20A7FF]/15' : 'bg-[#86B4FF]/45'
                }`}
            />

            {/* 2. Gelombang Sutra 3D Kanan Atas (Mirip sampel.png) */}
            <svg
                className="absolute right-0 top-0 h-full w-auto opacity-95"
                viewBox="0 0 700 1024"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M450 -60C310 130 620 310 490 520C360 730 140 810 250 1060L760 1060L760 -60Z"
                    fill="url(#rightWaveMain)"
                    fillOpacity={darkMode ? '0.25' : '0.78'}
                />
                <path
                    d="M530 -40C400 160 660 340 540 555C420 770 230 845 330 1060L760 1060L760 -40Z"
                    fill="url(#rightWaveInner)"
                    fillOpacity={darkMode ? '0.2' : '0.55'}
                />
                <path
                    d="M450 -60C310 130 620 310 490 520C360 730 140 810 250 1060"
                    stroke="white"
                    strokeOpacity="0.85"
                    strokeWidth="2.2"
                />
                <path
                    d="M530 -40C400 160 660 340 540 555C420 770 230 845 330 1060"
                    stroke="white"
                    strokeOpacity="0.65"
                    strokeWidth="1.5"
                />
                <defs>
                    <linearGradient id="rightWaveMain" x1="220" y1="0" x2="680" y2="1000" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#B8D3FF" />
                        <stop offset="0.45" stopColor="#82B1FF" />
                        <stop offset="1" stopColor="#2B6BFF" />
                    </linearGradient>
                    <linearGradient id="rightWaveInner" x1="350" y1="80" x2="700" y2="960" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E5F0FF" />
                        <stop offset="0.5" stopColor="#659DFF" />
                        <stop offset="1" stopColor="#1B56E8" />
                    </linearGradient>
                </defs>
            </svg>

            <svg
                className="absolute right-[12%] top-[8%] w-[680px] h-[680px] opacity-75"
                viewBox="0 0 680 680"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M90 620C160 440 340 430 430 280C520 130 480 30 640 -20"
                    stroke="url(#glassRibbonGrad)"
                    strokeWidth="95"
                    strokeLinecap="round"
                    strokeOpacity={darkMode ? '0.15' : '0.45'}
                />
                <defs>
                    <linearGradient id="glassRibbonGrad" x1="90" y1="620" x2="640" y2="-20" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFFFFF" stopOpacity="0.9" />
                        <stop offset="0.5" stopColor="#8AB6FF" stopOpacity="0.7" />
                        <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.85" />
                    </linearGradient>
                </defs>
            </svg>

            <svg
                className="absolute left-0 bottom-0 w-[720px] max-w-full h-auto opacity-90"
                viewBox="0 0 720 260"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M-50 165C95 60 280 105 430 185C540 240 630 255 720 260L-50 260Z"
                    fill="url(#bottomLeftWave)"
                    fillOpacity={darkMode ? '0.32' : '0.85'}
                />
                <path
                    d="M-40 205C120 115 295 145 475 235"
                    stroke="white"
                    strokeOpacity="0.85"
                    strokeWidth="2.2"
                />
                <defs>
                    <linearGradient id="bottomLeftWave" x1="0" y1="80" x2="620" y2="260" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#3572FF" />
                        <stop offset="0.5" stopColor="#7BA9FF" />
                        <stop offset="1" stopColor="#D7E6FF" />
                    </linearGradient>
                </defs>
            </svg>

            <div className="hidden lg:block absolute left-[1.5%] xl:left-[3%] top-[54%] -translate-y-1/2 select-none">
                <svg
                    width="90"
                    height="98"
                    viewBox="0 0 88 96"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="animate-aeris-float drop-shadow-[0_18px_28px_rgba(23,107,255,0.32)]"
                >
                    <path
                        d="M14 20.5C11.5 11.2 20.8 4.2 29.2 8.9L74.5 34.4C82.8 39.1 82.9 51.0 74.7 55.8L29.8 82.2C21.5 87.1 11.1 80.3 13.5 70.9L14 20.5Z"
                        fill="url(#glassTriangleGrad)"
                        fillOpacity="0.72"
                        stroke="white"
                        strokeOpacity="0.9"
                        strokeWidth="2.5"
                    />
                    <path
                        d="M22 25.5C20.3 19.3 26.5 14.6 32.1 17.8L64.2 35.8C69.7 38.9 69.8 46.8 64.3 50.0L32.5 68.7C27.0 71.9 20.1 67.4 21.7 61.2L22 25.5Z"
                        stroke="white"
                        strokeOpacity="0.65"
                        strokeWidth="1.5"
                    />
                    <defs>
                        <linearGradient id="glassTriangleGrad" x1="12" y1="8" x2="80" y2="84" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FFFFFF" stopOpacity="0.95" />
                            <stop offset="0.5" stopColor="#80B2FF" stopOpacity="0.7" />
                            <stop offset="1" stopColor="#2062FF" stopOpacity="0.85" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <div className="hidden lg:block absolute -right-8 bottom-[14%] w-44 h-44 rounded-full bg-gradient-to-br from-white/80 via-[#6CA2FF]/65 to-[#1E5EFF]/85 backdrop-blur-xl border-2 border-white/80 shadow-[inset_0_6px_16px_rgba(255,255,255,0.9),0_22px_50px_rgba(23,107,255,0.38)]" />
        </div>
    );
}
