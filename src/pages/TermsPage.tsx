import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Условия использования</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Общие положения</h2>
            <p>
              Используя сайт OtakuShop, вы соглашаетесь с настоящими Условиями использования. Если вы не согласны с этими условиями, пожалуйста, не используйте наш Сайт.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">2. Интеллектуальная собственность</h2>
            <p>
              Все материалы, размещенные на Сайте, включая тексты, графику, логотипы, являются собственностью OtakuShop и защищены законами об авторском праве.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">3. Ограничения ответственности</h2>
            <p>
              OtakuShop не несет ответственности за любые прямые, косвенные, случайные убытки, связанные с использованием или невозможностью использования Сайта.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">4. Изменения условий</h2>
            <p>
              Мы оставляем за собой право изменять данные Условия в любое время. Продолжение использования Сайта после внесения изменений означает ваше согласие с новыми условиями.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">5. Контактная информация</h2>
            <p>
              По всем вопросам, связанным с настоящими Условиями, вы можете связаться с нами через раздел "Связаться с нами" на Сайте.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;