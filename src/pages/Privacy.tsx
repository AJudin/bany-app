export function Privacy() {
  return (
    <main className="bg-[#F5F5F0]">
      <div className="mx-auto max-w-[800px] px-6 py-[120px] lg:px-20">
        <h1 className="font-display text-3xl font-medium text-[#2C2C2C] md:text-4xl">
          Политика конфиденциальности
        </h1>
        <p className="mt-4 text-sm text-[#6B6B6B]">
          Последнее обновление: 1 января 2025
        </p>

        <div className="mt-12 flex flex-col gap-8 text-[#2C2C2C]">
          <section>
            <h2 className="font-display text-xl font-medium">1. Общие положения</h2>
            <p className="mt-3 leading-relaxed text-[#6B6B6B]">
              Настоящая политика конфиденциальности описывает, как ООО «ЭкоБаня» (ИНН 1234567890, ОГРН 1234567890123, адрес: Тульская область, г. Новомосковск, промзона «Строитель») собирает, использует и защищает персональные данные пользователей сайта ecobanya.ru.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium">2. Какие данные мы собираем</h2>
            <ul className="mt-3 list-inside list-disc leading-relaxed text-[#6B6B6B]">
              <li>Имя</li>
              <li>Номер телефона</li>
              <li>Адрес электронной почты</li>
              <li>Сообщение (при заполнении формы обратной связи)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium">3. Цели сбора данных</h2>
            <ul className="mt-3 list-inside list-disc leading-relaxed text-[#6B6B6B]">
              <li>Обработка заявок и консультаций</li>
              <li>Связь с клиентом по запросу</li>
              <li>Улучшение качества услуг</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium">4. Хранение данных</h2>
            <p className="mt-3 leading-relaxed text-[#6B6B6B]">
              Персональные данные хранятся на серверах в Российской Федерации. Срок хранения — 3 года с момента последнего взаимодействия.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium">5. Передача третьим лицам</h2>
            <p className="mt-3 leading-relaxed text-[#6B6B6B]">
              Данные не передаются третьим лицам, за исключением случаев, предусмотренных законодательством РФ.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium">6. Права пользователя</h2>
            <p className="mt-3 leading-relaxed text-[#6B6B6B]">
              Пользователь имеет право на доступ, исправление, удаление своих данных. Для этого напишите на info@ecobanya.ru.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium">7. Контакты</h2>
            <p className="mt-3 leading-relaxed text-[#6B6B6B]">
              По вопросам обработки данных: info@ecobanya.ru, +7 (800) 555-35-35.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
