import { BLOG_URL } from '@/data/landing.data';

export default function Footer() {
    return (
        <section className="bg-slate-900/50 backdrop-blur-2xl text-slate-100 py-12 px-4 sm:px-6 lg:px-8 z-50">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-800">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-serif text-amber-300 mb-2">Ton Cosmos</h3>
                        <p className="text-slate-400 text-sm">
                            Astrologie IA personnalisée pour découvrir qui tu es vraiment.
                        </p>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="font-serif text-white mb-4">Produit</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li>
                                <a
                                    href="/#commander"
                                    className="hover:text-white transition-colors"
                                >
                                    Commencer
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/#processus"
                                    className="hover:text-white transition-colors"
                                >
                                    Comment ça marche
                                </a>
                            </li>
                            <li>
                                <a href="/#tarifs" className="hover:text-white transition-colors">
                                    Formules
                                </a>
                            </li>
                            <li>
                                <a href="/#faq" className="hover:text-white transition-colors">
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a
                                    href={BLOG_URL}
                                    target="_blank"
                                    rel="noopener"
                                    className="hover:text-white transition-colors"
                                >
                                    Blog astrologie
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-serif text-white mb-4">Légal</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Conditions générales
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Confidentialité
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Mentions légales
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Cookies
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-serif text-white mb-4">Suivre Indira</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li>
                                <a
                                    href="https://www.tiktok.com/@indira_astrologue?_r=1&_t=ZN-97rhneZuXDy&fbclid=IwY2xjawS7bQpleHRuA2FlbQIxMABicmlkETEzTFNRYlBoMzlyMVhVVkltc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHq-4GEgPzlB_XinTi1V5Nu1Gfkkn3Tfo1Lz7ZTtugRNzyQRoxVpen12Jyt8D_aem_o1_sU9QgBaJzW2uXgYdJdA"
                                    target="_blank"
                                    rel="noopener"
                                    className="hover:text-white transition-colors"
                                >
                                    TikTok @Indira
                                </a>
                            </li>

                            <li>
                                <a
                                    href="mailto:contact@toncosmos.fr"
                                    className="hover:text-white transition-colors"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="text-center text-xs text-slate-500">
                    <p>© 2026 JVN Lab - Ton Cosmos. Tous droits réservés.</p>
                    <p className="mt-2">
                        Les rapports astrologiques générés par IA sont à titre ludique et informatif
                        uniquement.
                    </p>
                </div>
            </div>
        </section>
    );
}
