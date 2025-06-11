import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Политика конфиденциальности</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Общие положения</h2>
            <p>
              Настоящая Политика конфиденциальности регулирует порядок обработки и использования персональных данных пользователей сайта OtakuShop.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">2. Какие данные мы собираем</h2>
            <p>
              Мы можем собирать следующую информацию: имя, контактные данные (включая email), демографическую информацию, другую информацию, относящуюся к опросам и предложениям.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">3. Как мы используем ваши данные</h2>
            <p>
              Собранные данные используются для:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Обработки заказов</li>
              <li>Улучшения наших продуктов и услуг</li>
              <li>Отправки промо-материалов</li>
              <li>Проведения маркетинговых исследований</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">4. Защита данных</h2>
            <p>
              Мы предпринимаем соответствующие меры безопасности для защиты от несанкционированного доступа, изменения, раскрытия или уничтожения ваших персональных данных.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">5. Использование файлов cookie</h2>
            <p>
              Наш Сайт использует файлы cookie для улучшения пользовательского опыта. Вы можете отключить cookies в настройках вашего браузера.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;