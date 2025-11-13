'use client';

import { getWhatsAppLink } from '@/config/site';

export default function FloatingWhatsApp() {
  const message = 'Hola, quiero más información sobre los servicios de Lavoplus';

  return (
    <a
      href={getWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear por WhatsApp"
      className="fixed right-6 bottom-6 z-50 inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-xl border-2 border-green-400 hover:scale-110 transition-transform focus:outline-none focus:ring-4 focus:ring-green-300/60"
    >
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.058 24l1.687-6.158a11.867 11.867 0 01-1.575-5.93C.178 5.366 5.487 0 12.114 0c3.163 0 6.135 1.233 8.377 3.472A11.77 11.77 0 0124 11.844c-.003 6.77-5.514 12.248-12.282 12.248h-.006a12.14 12.14 0 01-5.945-1.57L.058 24zm6.597-3.807l.353.21a9.092 9.092 0 004.704 1.375h.005c5.026 0 9.122-4.06 9.125-9.048a8.99 8.99 0 00-2.643-6.41 9.075 9.075 0 00-6.45-2.669c-5.021 0-9.116 4.059-9.119 9.046a9.07 9.07 0 001.532 5.05l.233.368-.622 2.272 2.322-.594zm10.89-4.383c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-1.01-.901-1.68-2.013-1.877-2.345-.198-.331-.021-.512.128-.66.132-.132.297-.347.446-.52.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
      </svg>
    </a>
  );
}
