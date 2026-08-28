import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { CosmosLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import type { NavLink } from '@/data/landing.data';

export default function HeaderSection({ navLinks }: { navLinks: NavLink[] }) {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (link: NavLink) =>
        !link.external && location.hash !== '' && link.href.endsWith(location.hash);

    // Le CTA pointe sur la meme ancre que l'entree « Commander », donc avec le
    // meme prefixe : sur /choose-plans ou /payments un simple '#commander'
    // ne renverrait nulle part.
    const ctaHref =
        navLinks.find((link) => !link.external && link.href.endsWith('#commander'))?.href ??
        '#commander';

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'bg-[rgba(9,9,11,0.85)] backdrop-blur-xl border-b border-zinc-800' : 'bg-transparent'}`}
        >
            <div className="mx-auto max-w-6xl px-6">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <h1 className="flex items-center gap-3 group cursor-pointer">
                        <CosmosLogo className="w-10 h-10 text-[#d4b96a] transition-all duration-500 group-hover:rotate-180" />
                        <span className="font-display text-xl font-medium text-[#fafafa] tracking-tight">
                            Ton Cosmos
                        </span>
                    </h1>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                {...(link.external ? { target: '_blank', rel: 'noopener' } : {})}
                                className={`inline-flex items-center gap-1 text-sm transition-colors duration-300 tracking-wide ${isActive(link) ? 'text-white' : 'text-[#a1a1aa] hover:text-[#fafafa]'}`}
                            >
                                {link.label}
                                {link.external && <ArrowUpRight size={14} aria-hidden="true" />}
                            </a>
                        ))}
                        <a
                            href={ctaHref}
                            className="px-4 py-2.5 rounded-sm text-sm bg-[#d4b96a] hover:bg-[#dec87e] text-[#09090b] font-medium cursor-pointer transition-all"
                        >
                            Obtenir mon rapport
                        </a>
                    </div>

                    {/* Mobile controls */}
                    <div className="flex items-center gap-2 md:hidden">
                        <Button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="flex items-center justify-center text-[#a1a1aa]"
                            aria-label="Menu"
                            variant="secondary"
                            size="icon-lg"
                        >
                            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden bg-[rgba(9,9,11,0.85)] backdrop-blur-xl border-t border-[rgba(255,255,255,0.06)] transition-all">
                    <div className="px-6 py-6 space-y-1">
                        {navLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                {...(link.external ? { target: '_blank', rel: 'noopener' } : {})}
                                className={`flex items-center gap-1.5 py-3 text-base transition-colors ${isActive(link) ? 'text-white' : 'text-[#a1a1aa] hover:text-[#fafafa]'}`}
                                onClick={() => setMobileOpen(false)}
                            >
                                {link.label}
                                {link.external && <ArrowUpRight size={16} aria-hidden="true" />}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
