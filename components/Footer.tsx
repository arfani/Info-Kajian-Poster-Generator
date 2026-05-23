export default function Footer() {
    return (
        <footer className="mt-8 border-t border-slate-200/60 pb-10 pt-8 text-center text-sm">
            <div className="flex flex-col items-center justify-center gap-4">
                {/* Dekoratif Divider */}
                <div className="flex items-center gap-3">
                    <div className="hidden h-px w-8 bg-gradient-to-r from-transparent to-slate-300 sm:block"></div>
                    <span className="max-w-[280px] text-center text-sm font-medium italic leading-relaxed text-slate-500 sm:max-w-lg sm:text-base">
                        &ldquo;Menuntut ilmu wajib bagi setiap Muslim&rdquo;
                    </span>
                    <div className="hidden h-px w-8 bg-gradient-to-l from-transparent to-slate-300 sm:block"></div>
                </div>

                <div className="space-y-1">
                    <p className="text-slate-500">
                        &copy; {new Date().getFullYear()} <span className="font-semibold text-slate-700">Jadwal Ngaji Lombok</span>
                    </p>
                    <p className="flex items-center justify-center gap-1.5 text-slate-400">
                        <span>Powered by</span>
                        <a
                            href="http://websitenesia.com"
                            className="font-bold text-primary transition-all duration-300 hover:text-secondary hover:underline decoration-secondary/30 underline-offset-4"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            websitenesia
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    )
}