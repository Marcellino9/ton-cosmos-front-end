import ContentSection from '@/components/landing/ContentSection';
import FAQSection from '@/components/landing/FAQSection';
import Footer from '@/components/landing/Footer';
import type { PayloadBirthForm } from '@/components/landing/form/BirthForm';
import HeaderSection from '@/components/landing/Header';
import HeroSection from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
import OrderForm from '@/components/landing/OrderForm';
import PlanSection from '@/components/landing/Plan';
import { useNavigate } from 'react-router-dom';
import { buildNavLinks } from '@/data/landing.data';

export default function LandingPage() {
    const navigate = useNavigate();

    const navLinks = buildNavLinks();

    const onCreateOrder = (data: PayloadBirthForm) => {
        const payload = {
            email: data.email,
            full_name: `${data.firstName} ${data.lastName}`,
            birth_date: data.birthDate,
            birth_time_unknown: data.birthTimeUnknown,
            birth_time: data.birthTime,
            birth_city: data.birthCity,
            latitude: data.latitude,
            longitude: data.longitude,
            selected_plan: 'complet',
        };

        sessionStorage.setItem('orderData', JSON.stringify(payload));

        navigate('/choose-plans', { replace: true });
    };

    return (
        <main className="relative min-h-screen bg-[#09090b] text-[#fafafa] overflow-x-hidden">
            <HeaderSection navLinks={navLinks} />
            <HeroSection />

            <div className="mx-auto max-w-5xl px-6">
                <div className="h-px bg-[rgba(255,255,255,0.04)]" />
            </div>

            <ContentSection />

            <div className="mx-auto max-w-5xl px-4">
                <div className="h-px bg-linear-to-r from-transparent via-white/6 to-transparent" />
            </div>

            <HowItWorks />

            <div className="mx-auto max-w-5xl px-6">
                <div className="h-px bg-[rgba(255,255,255,0.04)]" />
            </div>

            <PlanSection />

            <OrderForm onNextStep={onCreateOrder} />

            <div className="mx-auto max-w-5xl px-6">
                <div className="h-px bg-[rgba(255,255,255,0.04)]" />
            </div>

            <FAQSection />

            <Footer />
        </main>
    );
}
