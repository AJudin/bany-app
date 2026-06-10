export function Consent() {
  return (
    <main className="bg-[#F5F5F0]">
      <div className="mx-auto max-w-[800px] px-6 py-[120px] lg:px-20">
        <h1 className="font-display text-3xl font-medium text-[#2C2C2C] md:text-4xl">
          Согласие на обработку персональных данных
        </h1>
        <p className="mt-4 text-sm text-[#6B6B6B]">
          Дата документа: 1 января 2025 года
        </p>

        <div className="mt-12 flex flex-col gap-8 text-[#2C2C2C]">
          <section>
            <p className="leading-relaxed text-[#6B6B6B]">
              Настоящим я, субъект персональных данных, даю ООО «ЭкоБаня» (ИНН 1234567890, ОГРН 1234567890123) согласие на обработку моих персональных данных: имени, номера телефона и адреса электронной почты.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium">Цели обработки</h2>
            <ul className="mt-3 list-inside list-disc leading-relaxed text-[#6B6B6B]">
              <li>Обработка моей заявки на консультацию</li>
              <li>Связь со мной по указанным контактным данным</li>
              <li>Предоставление информации об услугах компании</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium">Способы обработки</h2>
            <p className="mt-3 leading-relaxed text-[#6B6B6B]">
              Сбор, запись, систематизация, накопление, хранение, уточнение, использование, передача (исключительно внутри компании), обезличивание, блокирование, удаление.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium">Срок действия согласия</h2>
            <p className="mt-3 leading-relaxed text-[#6B6B6B]">
              3 года с момента предоставления.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium">Права субъекта</h2>
            <p className="mt-3 leading-relaxed text-[#6B6B6B]">
              Я имею право отозвать настоящее согласие, направив письменное уведомление на info@ecobanya.ru. В случае отзыва компания прекращает обработку данных в течение 30 дней.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
