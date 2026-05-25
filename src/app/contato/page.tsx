import { WHATSAPP_LINKS, WHATSAPP_NUMBER } from '@/lib/config'

export default function ContatoPage() {
  const whatsappFormatted = WHATSAPP_NUMBER.replace(
    /(\d{2})(\d{2})(\d{5})(\d{4})/,
    '+$1 ($2) $3-$4',
  )

  return (
    <div className="min-h-screen bg-cream-200">
      {/* Page hero */}
      <section className="bg-cream-50 px-6 py-20 md:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 font-mono text-[12px] uppercase tracking-widest text-ink-400">
            Vem nos visitar
          </p>
          <h1 className="font-sans text-5xl font-bold text-ink-900 md:text-6xl">
            Contato
          </h1>
          <p className="mt-4 font-sans text-[17px] text-ink-700">
            Estamos de segunda a sábado, das 11h às 15h.
          </p>
        </div>
      </section>

      {/* Info grid */}
      <section className="px-6 py-16 md:px-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {/* Endereço */}
          <div className="rounded-xl bg-cream-50 p-8 shadow-sm">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-ink-400">
              Endereço
            </p>
            <address className="not-italic">
              <p className="font-sans text-[17px] font-medium text-ink-900">
                Rua a definir, 000
              </p>
              <p className="font-mono text-[14px] text-ink-700">
                Campo Grande · MS · 79000-000
              </p>
            </address>
          </div>

          {/* Horário */}
          <div className="rounded-xl bg-cream-50 p-8 shadow-sm">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-ink-400">
              Horário de funcionamento
            </p>
            <ul className="space-y-1">
              <li className="flex justify-between font-mono text-[14px] text-ink-700">
                <span>Seg – Sex</span>
                <span>11h – 15h</span>
              </li>
              <li className="flex justify-between font-mono text-[14px] text-ink-700">
                <span>Sábado</span>
                <span>11h – 15h</span>
              </li>
              <li className="flex justify-between font-mono text-[14px] text-ink-400">
                <span>Domingo</span>
                <span>fechado</span>
              </li>
            </ul>
          </div>

          {/* WhatsApp */}
          <div className="rounded-xl bg-cream-50 p-8 shadow-sm">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-ink-400">
              WhatsApp
            </p>
            <a
              href={WHATSAPP_LINKS.geral}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[17px] text-ink-900 underline underline-offset-4 transition-colors hover:text-accent-terra"
            >
              {whatsappFormatted}
            </a>
          </div>

          {/* Instagram */}
          <div className="rounded-xl bg-cream-50 p-8 shadow-sm">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-ink-400">
              Instagram
            </p>
            <a
              href="https://instagram.com/escritoriodebohemio"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[17px] text-ink-900 underline underline-offset-4 transition-colors hover:text-accent-terra"
            >
              @escritoriodebohemio
            </a>
          </div>
        </div>
      </section>

      {/* Google Maps embed */}
      <section className="px-6 pb-20 md:px-16">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235413.40862073447!2d-54.87022!3d-20.44279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9486e95c4e31d9ef%3A0xc5fb88efd1fee13!2sCampo%20Grande%2C%20MS!5e0!3m2!1spt-BR!2sbr!4v1716500000000!5m2!1spt-BR!2sbr"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização Escritório de Bohemio"
          />
        </div>
      </section>
    </div>
  )
}
