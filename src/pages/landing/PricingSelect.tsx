import { motion } from 'framer-motion';
import Footer from '@/components/landing/Footer';
import HeaderSection from '@/components/landing/Header';
import { buildNavLinks, plans } from '@/data/landing.data';
import { ArrowLeft, Check, ChevronRight, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrnamentDivider } from '@/components/icons';
import { CREATE_ORDER_ENDPOINT, useApi } from '@/hooks/UseApi';
import ScrollToTop from '@/components/ScrollToTop';

type Plan = 'essentiel' | 'complet' | 'annee_cosmique' | 'cosmos_integral';

interface Order {
    id: number;
    email: string;
    full_name: string;
    birth_date: string;
    birth_time: string;
    birth_city: string;
    latitude: number;
    longitude: number;
    stripe_session_id: string;
    plan_type: string;
    status: string;
    amount_total: number;
    created_at: string;
    updated_at: string;
}

type OrderData = {
    email: string;
    full_name: string;
    birth_date: string;
    birth_time_unknown: string;
    birth_time: string;
    birth_city: string;
    latitude: number;
    longitude: number;
    selected_plan: Plan;
};

const navLinks = buildNavLinks('/');

export default function SelectPlanPage() {
    const navigate = useNavigate();

    const getStoredOrder = (): OrderData | null => {
        const stored = sessionStorage.getItem('orderData');
        return stored ? JSON.parse(stored) : null;
    };

    const [orderData] = useState<OrderData | null>(getStoredOrder);

    const [selectedPlan, setSelectedPlan] = useState<Plan>(() => {
        const data = getStoredOrder();
        return data?.selected_plan || 'complet';
    });

    const [loading, setLoading] = useState(false);
    const { request } = useApi<Order>();

    useEffect(() => {
        if (!orderData) {
            navigate('/landing', { replace: true });
        }
    }, [orderData, navigate]);

    const onSubmit = async () => {
        if (!orderData) return;

        setLoading(true);

        // const planSelected = plans[selectedPlan].name;
        const price = plans[selectedPlan].price;
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const finalBirthTime = orderData.birth_time || '12:00';

        const payload = {
            email: orderData.email,
            full_name: orderData.full_name,
            birth_date: orderData.birth_date,
            birth_time: finalBirthTime,
            timezone: timezone,
            birth_city: orderData.birth_city,
            latitude: orderData.latitude,
            longitude: orderData.longitude,
            plan_type: selectedPlan,
        };

        try {
            const response = await request(CREATE_ORDER_ENDPOINT, {
                method: 'POST',
                body: payload,
            });

            if (response?.success) {
                const order_id = response.data.id;
                const order_plan = response.data.plan_type;
                const amount_total = response.data.amount_total;

                localStorage.setItem('order_id', order_id.toString());

                sessionStorage.setItem(
                    'paymentData',
                    JSON.stringify({
                        ...orderData,
                        price,
                        selected_plan: order_plan,
                        amount_total,
                        order_id,
                    }),
                );

                navigate('/payments', { replace: true });
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    if (!orderData) return null;

    return (
        <main className="relative min-h-screen bg-[#09090b] text-[#fafafa] overflow-x-hidden">
            <ScrollToTop />
            <HeaderSection navLinks={navLinks} />
            <div className="max-w-4xl mx-auto pt-32 pb-20 px-5">
                {/* Header */}
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
                    <p className="text-[#a1a1aa] max-w-lg mx-auto text-base leading-relaxed">
                        Sélectionnez la profondeur d'analyse qui vous correspond pour découvrir les
                        secrets de votre thème natal.
                    </p>
                    <OrnamentDivider className="mt-10" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-5 items-start mb-12">
                    {(Object.entries(plans) as [Plan, typeof plans.essentiel][]).map(
                        ([key, plan]) => (
                            <button
                                key={key}
                                onClick={() => {
                                    setSelectedPlan(key);
                                }}
                                className={`relative text-left rounded-2xl border p-8 transition-all duration-300 cursor-pointer ${
                                    selectedPlan === key
                                        ? 'border-[#d4b96a]/30 bg-[rgba(255,255,255,0.04)]'
                                        : 'border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.015)] hover:border-[rgba(255,255,255,0.08)]'
                                }`}
                            >
                                {('popular' in plan && (plan as { popular?: boolean }).popular) ||
                                ('badge' in plan && (plan as { badge?: string }).badge) ? (
                                    <div className="absolute -top-3 left-8 px-4 py-1.5 bg-[#d4b96a] text-[#09090b] text-[11px] font-medium rounded-full tracking-wider uppercase">
                                        {'badge' in plan && (plan as { badge: string }).badge
                                            ? (plan as { badge: string }).badge
                                            : 'Recommandé'}
                                    </div>
                                ) : null}

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
                                    <div
                                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                            selectedPlan === key
                                                ? 'border-[#d4b96a] bg-[#d4b96a]'
                                                : 'border-[rgba(255,255,255,0.08)]'
                                        }`}
                                    >
                                        {selectedPlan === key && (
                                            <Check
                                                className="w-3.5 h-3.5 text-[#09090b]"
                                                strokeWidth={3}
                                            />
                                        )}
                                    </div>
                                </div>

                                <ul className="space-y-3">
                                    {plan.features.map((f) => (
                                        <li key={f} className="flex items-start gap-3 text-sm">
                                            <Check
                                                className="w-4 h-4 text-[#d4b96a] shrink-0 mt-0.5"
                                                strokeWidth={2}
                                            />
                                            <span className="text-[#a1a1aa]">{f}</span>
                                        </li>
                                    ))}
                                    {plan.missing.map((f) => (
                                        <li
                                            key={f}
                                            className="flex items-start gap-3 text-sm opacity-40"
                                        >
                                            <span className="w-4 h-4 shrink-0 mt-0.5 text-center text-zinc-300">
                                                —
                                            </span>
                                            <span className="text-zinc-300 line-through">{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </button>
                        ),
                    )}
                </div>

                <div className="mt-10 px-5 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-x-2 text-sm text-zinc-400 font-medium hover:text-[#a1a1aa] transition-colors cursor-pointer"
                    >
                        <ArrowLeft size={18} />
                        Retour
                    </button>
                    <button
                        onClick={onSubmit}
                        className="group inline-flex items-center gap-3 px-10 py-4 bg-[#d4b96a] text-[#09090b] font-medium text-sm tracking-wide rounded-full hover:bg-[#dec87e] transition-all duration-300 cursor-pointer"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Traitement...
                            </>
                        ) : (
                            <>
                                Passer au paiement{' '}
                                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                            </>
                        )}
                    </button>
                </div>
            </div>
            <Footer />
        </main>
    );
}
