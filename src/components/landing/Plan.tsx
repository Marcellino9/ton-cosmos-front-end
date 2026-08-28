import { motion } from 'framer-motion';
import { OrnamentDivider } from '@/components/icons';
import { plans } from '@/data/landing.data';
import { Check } from 'lucide-react';

type Plan = 'essential' | 'complete';

export default function PlanSection() {
    return (
        <section
            id="tarifs"
            className="relative bg-transparent backdrop-blur-sm py-10 sm:py-20 px-6"
        >
            <div className="mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-24"
                >
                    <span className="text-xs uppercase tracking-[0.3em] text-[#d4b96a] font-medium">
                        Tarifs
                    </span>
                    <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-[#fafafa] mt-6 mb-8 uppercase tracking-tight">
                        Nos offres
                        <br />
                        <span className="italic">disponibles</span>
                    </h2>
                    <OrnamentDivider className="mt-10" />
                </motion.div>

                <motion.div
                    key="birth"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8">
                        {(Object.entries(plans) as [Plan, typeof plans.essentiel][]).map(
                            ([key, plan]) => (
                                <div
                                    key={key}
                                    className={`relative text-left rounded-2xl border p-8 transition-all duration-300 border-zinc-700 bg-[rgba(255,255,255,0.015)] hover:border-zinc-600`}
                                >
                                    {'popular' in plan &&
                                        (plan as { popular?: boolean }).popular && (
                                            <div className="absolute -top-3 left-8 px-4 py-1.5 bg-[#d4b96a] text-[#09090b] text-[11px] font-medium rounded-full tracking-wider uppercase">
                                                Recommandé
                                            </div>
                                        )}

                                    <div className="flex items-start justify-between mb-8">
                                        <div>
                                            <h3 className="font-display text-2xl font-light text-[#fafafa]">
                                                {plan.name}
                                            </h3>
                                            <div className="flex items-baseline gap-2 mt-3">
                                                <span className="font-display text-4xl font-light text-[#d4b96a]">
                                                    {plan.price}€
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <ul className="space-y-3">
                                        {plan.features.map((f: string, index) => (
                                            <li
                                                key={index}
                                                className="flex items-start gap-3 text-sm"
                                            >
                                                <Check
                                                    className="w-4 h-4 text-[#d4b96a] shrink-0 mt-0.5"
                                                    strokeWidth={2}
                                                />
                                                <span className="text-[#a1a1aa]">{f}</span>
                                            </li>
                                        ))}
                                        {plan.missing.map((f: string, index) => (
                                            <li
                                                key={index}
                                                className="flex items-start gap-3 text-sm opacity-40"
                                            >
                                                <span className="w-4 h-4 shrink-0 mt-0.5 text-center text-zinc-300">
                                                    —
                                                </span>
                                                <span className="text-zinc-300 line-through">
                                                    {f}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ),
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
