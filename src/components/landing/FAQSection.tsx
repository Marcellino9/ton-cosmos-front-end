import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { OrnamentDivider } from '@/components/icons';
import { faqs } from '@/data/landing.data';

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="relative py-32 sm:py-40 px-6">
            <div className="mx-auto max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <span className="text-xs uppercase tracking-[0.3em] text-[#d4b96a] font-medium">
                        Questions fréquentes
                    </span>
                    <h2 className="font-display text-4xl sm:text-5xl font-light text-[#fafafa] mt-6 mb-8">
                        Informations
                    </h2>
                    <OrnamentDivider className="mt-10" />
                </motion.div>

                <div className="space-y-3">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className={`w-full text-left rounded-xl border p-6 transition-all duration-300 ${
                                    openIndex === i
                                        ? 'border-[#d4b96a]/20 bg-[rgba(255,255,255,0.02)]'
                                        : 'border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.015)] hover:bg-[rgba(255,255,255,0.02)]'
                                }`}
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-sm font-medium text-[#fafafa]">
                                        {faq.q}
                                    </span>
                                    <ChevronDown
                                        className={`w-4 h-4 text-[#71717a] shrink-0 transition-transform duration-300 ${
                                            openIndex === i ? 'rotate-180' : ''
                                        }`}
                                    />
                                </div>
                                <AnimatePresence>
                                    {openIndex === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="text-sm text-[#a1a1aa] leading-relaxed mt-5 pt-5 border-t border-[rgba(255,255,255,0.06)]">
                                                {faq.a}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
