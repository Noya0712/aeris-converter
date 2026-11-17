import React, { useState } from 'react';

/**
 * Accessible Accordion Component (Section 7.4 & 12)
 * - Satu item terbuka pada satu waktu
 * - Menggunakan <button>, aria-expanded, aria-controls, id
 * - Mendukung navigasi keyboard (Tab, Enter, Space)
 */
export default function Accordion({ items = [], darkMode = false, defaultOpenIndex = 0 }) {
    const [openIndex, setOpenIndex] = useState(defaultOpenIndex);

    const toggleItem = (idx) => {
        setOpenIndex((prev) => (prev === idx ? -1 : idx));
    };

    return (
        <div className="space-y-3.5">
            {items.map((item, idx) => {
                const isOpen = openIndex === idx;
                const buttonId = `faq-trigger-${item.id || idx}`;
                const panelId = `faq-panel-${item.id || idx}`;

                return (
                    <div
                        key={item.id || idx}
                        className={`rounded-[18px] backdrop-blur-xl border transition-all duration-200 ${
                            darkMode
                                ? isOpen
                                    ? 'bg-white/[0.12] border-[#246BFF]/60 shadow-[0_12px_32px_rgba(0,0,0,0.3)]'
                                    : 'bg-white/[0.06] border-white/15 hover:border-white/30'
                                : isOpen
                                ? 'bg-white/65 border-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.95),0_14px_34px_-8px_rgba(36,107,255,0.18)]'
                                : 'bg-white/[0.42] border-white/75 hover:bg-white/55 hover:border-white shadow-[0_8px_24px_-10px_rgba(36,107,255,0.1)]'
                        }`}
                    >
                        <h3>
                            <button
                                id={buttonId}
                                type="button"
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                                onClick={() => toggleItem(idx)}
                                className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left rounded-[18px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#246BFF] focus-visible:ring-offset-2"
                            >
                                <span
                                    className={`text-[15px] sm:text-[17px] font-semibold leading-snug ${
                                        isOpen
                                            ? darkMode
                                                ? 'text-white'
                                                : 'text-[#246BFF]'
                                            : darkMode
                                            ? 'text-slate-100'
                                            : 'text-[#101A4A]'
                                    }`}
                                >
                                    {item.question}
                                </span>

                                <span
                                    aria-hidden="true"
                                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-200 ${
                                        isOpen ? 'rotate-180' : 'rotate-0'
                                    } ${
                                        darkMode
                                            ? isOpen
                                                ? 'bg-[#246BFF] border-[#246BFF] text-white'
                                                : 'bg-white/10 border-white/20 text-slate-300'
                                            : isOpen
                                            ? 'bg-[#246BFF] border-[#246BFF] text-white'
                                            : 'bg-white/70 border-white text-[#246BFF]'
                                    }`}
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2.4}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </button>
                        </h3>

                        <div
                            id={panelId}
                            role="region"
                            aria-labelledby={buttonId}
                            className={`grid transition-all duration-200 ease-out ${
                                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                            }`}
                        >
                            <div className="overflow-hidden">
                                <div
                                    className={`px-5 sm:px-6 pb-5 pt-0.5 text-[14px] sm:text-[15px] leading-relaxed ${
                                        darkMode ? 'text-slate-300' : 'text-[#3E4D78]'
                                    }`}
                                >
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
