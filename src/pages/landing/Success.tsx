import { motion, AnimatePresence } from 'framer-motion';
import Footer from '@/components/landing/Footer';
import HeaderSection from '@/components/landing/Header';
import { useSearchParams } from 'react-router-dom';
import { OrnamentDivider } from '@/components/icons';
import { useEffect, useState } from 'react';
import {
    CheckCircle2,
    FileText,
    Loader2,
    Mail,
    Send,
    Sparkles,
    type LucideIcon,
} from 'lucide-react';
import { WEB_SOCKET_BASE, BASE_USER_API } from '@/hooks/UseApi';
import ScrollToTop from '@/components/ScrollToTop';
import { buildNavLinks } from '@/data/landing.data';

const navLinks = buildNavLinks('/');

function StepItem({
    icon: Icon,
    title,
    description,
    status,
}: {
    icon: LucideIcon;
    title: string;
    description: string;
    status: 'wait' | 'loading' | 'done';
}) {
    const isDone = status === 'done';
    const isLoading = status === 'loading';
    const isWait = status === 'wait';

    return (
        <div
            className={`
                flex items-start gap-4 p-3 rounded-xl transition-all duration-500 border
                ${isLoading ? 'bg-white/5 border-white/10 shadow-lg' : 'border-transparent'}
                ${isWait ? 'opacity-40 grayscale' : 'opacity-100'}
            `}
        >
            <div className="relative">
                <div
                    className={`
                        p-2.5 mt-2 rounded-lg transition-colors duration-500
                        ${isDone ? 'bg-[#d4b96a]/10 text-[#d4b96a]' : 'bg-zinc-800 text-zinc-500'}
                        ${isLoading ? 'ring-2 ring-[#d4b96a]/50 text-[#d4b96a]' : ''}
                    `}
                >
                    <Icon className={`w-5 h-5 ${isLoading ? 'animate-pulse' : ''}`} />
                </div>

                {isLoading && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4b96a] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#d4b96a]"></span>
                    </span>
                )}
            </div>

            <div className="flex-1 pt-0.5">
                <h5
                    className={`
                    text-base text-start font-medium transition-colors duration-500
                    ${isDone ? 'text-zinc-500' : 'text-zinc-100'}
                `}
                >
                    {title}
                </h5>
                <p
                    className={`
                    text-sm text-start transition-colors duration-500 mt-0.5
                    ${isDone ? 'text-zinc-600' : 'text-zinc-400'}
                `}
                >
                    {description}
                </p>
            </div>

            <div className="pt-1">
                {isLoading && <Loader2 className="w-5 h-5 animate-spin text-[#d4b96a]" />}
                {isDone && (
                    <div className="bg-[#d4b96a]/20 p-1 rounded-full">
                        <CheckCircle2 className="w-4 h-4 text-[#d4b96a]" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default function PayementSuccessPage() {
    const [searchParams] = useSearchParams();
    const order_id = searchParams.get('order_id') as string;
    const subscription = searchParams.get('subscription') as string;
    const isSubscriptionFlow = subscription === 'success';

    const [step, setStep] = useState<number>(() => {
        const savedStep = localStorage.getItem('currentStep');
        return savedStep ? parseInt(savedStep, 10) : 1;
    });

    const [stepStatus, setStepStatus] = useState<string>('');

    const [isFinished, setIsFinished] = useState<boolean>(() => {
        const savedStep = localStorage.getItem('currentStep');
        return savedStep === '5' || isSubscriptionFlow;
    });

    const [isSubscribing, setIsSubscribing] = useState(false);

    const handleSubscribe = async () => {
        if (!order_id) return;
        setIsSubscribing(true);
        try {
            const response = await fetch(
                `${BASE_USER_API}/api/v1/subscription/subscribe-from-order/${order_id}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                },
            );

            const result = await response.json();
            if (result.success && result.data?.checkout_url) {
                window.location.href = result.data.checkout_url;
            } else {
                console.error(
                    "Erreur lors de la création de la session d'abonnement :",
                    result.message,
                );
                setIsSubscribing(false);
            }
        } catch (error) {
            console.error("Erreur lors de l'appel d'abonnement :", error);
            setIsSubscribing(false);
        }
    };

    useEffect(() => {
        sessionStorage.clear();

        if (isSubscriptionFlow) {
            localStorage.removeItem('currentStep');
            setStep(5);
            setIsFinished(true);
            setStepStatus('');
            return;
        }

        if (!order_id) return;

        let hasResolved = false;
        const finishFlow = () => {
            if (hasResolved) return;
            hasResolved = true;
            setStep(5);
            setIsFinished(true);
            setStepStatus('');
            localStorage.removeItem('currentStep');
        };

        const session_id = searchParams.get('session_id') as string | null;
        const socketId = session_id || `ton-cosmos-${order_id}`;
        const socket = new WebSocket(`${WEB_SOCKET_BASE}/stripe/ws/${socketId}`);

        const fallbackTimer = window.setTimeout(() => {
            console.warn('WebSocket timeout - using fallback completion');
            finishFlow();
        }, 20000);

        socket.onopen = () => {
            console.info(`✓ WebSocket connecté: ${socketId}`);
        };

        socket.onerror = (error) => {
            console.warn(`✗ WebSocket erreur (${socketId}):`, error);
            finishFlow();
        };

        socket.onclose = () => {
            console.info(`WebSocket fermé pour ${socketId}`);
            if (!hasResolved) {
                finishFlow();
            }
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log('📨 Message socket reçu:', data);

                if (data.status && data.step) {
                    const newStep = data.step;

                    setStep(newStep);
                    setStepStatus(typeof data.status === 'string' ? data.status : '');

                    localStorage.setItem('currentStep', newStep.toString());

                    if (newStep === 5) {
                        finishFlow();
                    }
                }
            } catch (error) {
                console.error('Erreur parsing socket:', error);
            }
        };

        return () => {
            window.clearTimeout(fallbackTimer);
            if (socket.readyState !== WebSocket.CLOSED) {
                socket.close();
            }
        };
    }, [order_id, searchParams, isSubscriptionFlow]);

    return (
        <main className="relative min-h-screen bg-[#09090b] text-[#fafafa] overflow-x-hidden">
            <ScrollToTop />
            <HeaderSection navLinks={navLinks} />

            <div className="max-w-2xl w-full pt-30 sm:pt-32 md:pt-40 pb-16 sm:pb-25 mx-auto px-4 sm:px-6">
                <AnimatePresence mode="wait">
                    {isSubscriptionFlow ? (
                        <motion.div
                            key="subscription-success"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center"
                        >
                            <div className="mb-6 sm:mb-8 flex justify-center">
                                <div className="relative">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="bg-[#d4b96a] p-3 sm:p-4 rounded-full"
                                    >
                                        <CheckCircle2 className="w-8 h-8 sm:w-12 sm:h-12 text-[#09090b]" />
                                    </motion.div>
                                    <motion.div
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        className="absolute inset-0 border-2 border-[#d4b96a] rounded-full"
                                    />
                                </div>
                            </div>

                            <h2 className="font-display text-3xl sm:text-5xl font-light text-[#fafafa] mb-4 sm:mb-6 uppercase tracking-tight px-2">
                                Bienvenue au{' '}
                                <span className="italic text-[#d4b96a]">Cercle Cosmos</span>
                            </h2>

                            <div className="rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(212,185,106,0.05)] p-6 sm:p-8 mb-8 sm:mb-10 mx-auto">
                                <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-[#d4b96a] mx-auto mb-4" />
                                <p className="text-[#fafafa] text-base sm:text-lg mb-2 font-medium">
                                    Votre abonnement est actif !
                                </p>
                                <p className="text-[#a1a1aa] text-sm sm:text-base leading-relaxed">
                                    Vous recevrez vos prévisions mensuelles et aurez accès au
                                    portail client.
                                </p>
                            </div>

                            <button
                                onClick={() => (window.location.href = '/')}
                                className="px-8 py-4 bg-[#d4b96a] text-[#09090b] font-medium text-sm tracking-wide rounded-full hover:bg-[#eaddaa] transition-all duration-300"
                            >
                                Retour à l'accueil
                            </button>
                        </motion.div>
                    ) : !isFinished ? (
                        <motion.div
                            key="processing"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="text-center"
                        >
                            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#d4b96a] font-medium">
                                Merci pour votre confiance
                            </span>

                            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-light text-[#fafafa] mt-4 sm:mt-6 mb-6 sm:mb-8 uppercase tracking-tight leading-tight">
                                Création de votre
                                <br />
                                <span className="italic">Portrait Astral</span>
                            </h2>

                            <OrnamentDivider className="mx-auto mb-8 sm:mb-12 w-32 sm:w-auto" />

                            <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.015)] p-5 sm:p-8 backdrop-blur-sm relative overflow-hidden">
                                <div className="space-y-6 sm:space-y-8">
                                    <StepItem
                                        icon={FileText}
                                        title="Lecture Astrale"
                                        description="Alignement des astres au moment de votre naissance"
                                        status={step === 1 ? 'loading' : step > 1 ? 'done' : 'wait'}
                                    />
                                    <StepItem
                                        icon={Sparkles}
                                        title="Interprétation Cosmique"
                                        description="Analyse des influences planétaires sur votre profil"
                                        status={step === 2 ? 'loading' : step > 2 ? 'done' : 'wait'}
                                    />
                                    <StepItem
                                        icon={Sparkles}
                                        title="Rédaction de votre Guide"
                                        description="Mise en page de vos révélations personnalisées"
                                        status={step === 3 ? 'loading' : step > 3 ? 'done' : 'wait'}
                                    />
                                    <StepItem
                                        icon={Send}
                                        title={
                                            step === 4 && stepStatus === 'generating_audio'
                                                ? 'Création de la version Audio'
                                                : step === 4 && stepStatus === 'generating_poster'
                                                  ? 'Création du Poster HD'
                                                  : 'Envoi de votre Destin'
                                        }
                                        description={
                                            step === 4 && stepStatus === 'generating_audio'
                                                ? 'Votre synthèse audio vocale est en cours de génération...'
                                                : step === 4 && stepStatus === 'generating_poster'
                                                  ? 'Votre poster haute définition de la carte du ciel est en cours de création...'
                                                  : 'Votre rapport complet est finalisé et envoyé par email'
                                        }
                                        status={step === 4 ? 'loading' : step > 4 ? 'done' : 'wait'}
                                    />
                                </div>
                            </div>

                            <p className="mt-8 sm:mt-10 text-[#a1a1aa] text-xs sm:text-sm italic px-4">
                                Cette opération peut prendre quelque minutes.{' '}
                                <br className="hidden sm:block" />
                                Ne fermez pas cette page pour garantir la livraison.
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center"
                        >
                            <div className="mb-6 sm:mb-8 flex justify-center">
                                <div className="relative">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="bg-[#d4b96a] p-3 sm:p-4 rounded-full"
                                    >
                                        <CheckCircle2 className="w-8 h-8 sm:w-12 sm:h-12 text-[#09090b]" />
                                    </motion.div>
                                    <motion.div
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        className="absolute inset-0 border-2 border-[#d4b96a] rounded-full"
                                    />
                                </div>
                            </div>

                            <h2 className="font-display text-3xl sm:text-5xl font-light text-[#fafafa] mb-4 sm:mb-6 uppercase tracking-tight px-2">
                                Votre Destin vous a été{' '}
                                <span className="italic text-[#d4b96a]">Révélé</span>
                            </h2>

                            <div className="rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(212,185,106,0.05)] p-6 sm:p-8 mb-8 sm:mb-10 mx-auto">
                                <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-[#d4b96a] mx-auto mb-4" />
                                <p className="text-[#fafafa] text-base sm:text-lg mb-2 font-medium">
                                    Votre rapport a été envoyé !
                                </p>
                                <p className="text-[#a1a1aa] text-sm sm:text-base leading-relaxed">
                                    Consultez votre boîte de réception <br className="sm:hidden" />{' '}
                                    (et vos spams).
                                </p>
                            </div>

                            {/* UPSELL CERCLE COSMOS */}
                            <div className="mt-12 text-left bg-zinc-900/50 border border-[#d4b96a]/20 p-6 sm:p-10 rounded-3xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4b96a]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                                <div className="relative z-10">
                                    <div className="inline-block px-3 py-1 bg-[#d4b96a]/10 border border-[#d4b96a]/30 text-[#d4b96a] text-xs uppercase tracking-widest rounded-full mb-6">
                                        Offre Exclusive Post-Achat
                                    </div>
                                    <h3 className="font-display text-2xl sm:text-4xl text-[#fafafa] font-light mb-4">
                                        Rejoignez le{' '}
                                        <span className="text-[#d4b96a] italic">Cercle Cosmos</span>
                                    </h3>
                                    <p className="text-zinc-400 text-sm sm:text-base mb-8 max-w-lg leading-relaxed">
                                        Allez plus loin dans votre exploration. Recevez chaque mois
                                        vos prévisions détaillées, basées sur vos transits
                                        astrologiques actuels. Une boussole cosmique pour naviguer
                                        au quotidien.
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                        <div className="flex items-center gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-[#d4b96a]" />
                                            <span className="text-sm text-zinc-300">
                                                Prévisions mensuelles sur-mesure
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-[#d4b96a]" />
                                            <span className="text-sm text-zinc-300">
                                                Accès au portail client
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                                        <button
                                            onClick={handleSubscribe}
                                            disabled={isSubscribing}
                                            className="w-full sm:w-auto px-8 py-4 bg-[#d4b96a] text-[#09090b] font-medium text-sm tracking-wide rounded-full hover:bg-[#eaddaa] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70"
                                        >
                                            {isSubscribing ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />{' '}
                                                    Préparation...
                                                </>
                                            ) : (
                                                <>M'abonner pour 19€/mois</>
                                            )}
                                        </button>
                                        <button
                                            onClick={() => (window.location.href = '/')}
                                            className="w-full sm:w-auto px-8 py-4 bg-transparent text-zinc-400 font-medium text-sm tracking-wide rounded-full hover:text-zinc-200 transition-all duration-300"
                                        >
                                            Non merci, retourner à l'accueil
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <Footer />
        </main>
    );
}
