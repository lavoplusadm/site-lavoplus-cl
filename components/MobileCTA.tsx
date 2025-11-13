import { getWhatsAppLink, getPrimaryPhone } from '@/config/site';

export default function MobileCTA() {
  const primaryPhone = getPrimaryPhone();

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 md:hidden">
      <div className="rounded-2xl bg-blue-600 p-4 shadow-2xl">
        <p className="text-sm font-semibold text-blue-100 mb-3">
          Mantén tu ropa impecable sin esperas.
        </p>
        <div className="flex flex-col gap-3">
          <a
            href={getWhatsAppLink("Hola, quisiera agendar una recolección")}
            className="flex items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-semibold text-blue-600 shadow hover:bg-blue-50 transition"
          >
            Agenda por WhatsApp
          </a>
          <a
            href={`tel:${primaryPhone.number}`}
            className="flex items-center justify-center rounded-xl border border-white/60 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
          >
            Llamar ahora
          </a>
        </div>
      </div>
    </div>
  );
}
