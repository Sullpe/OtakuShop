import React from 'react';

const CookiePolicyPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Политика использования файлов cookie</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Что такое файлы cookie?</h2>
            <p>
              Файлы cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве при посещении веб-сайтов. 
              Они помогают сайтам запоминать информацию о вашем посещении, что делает последующие посещения удобнее.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">2. Какие cookie мы используем</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Необходимые cookie</h3>
                <p>
                  Эти cookie необходимы для работы сайта и не могут быть отключены. Они обеспечивают безопасность и основные функции.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Аналитические cookie</h3>
                <p>
                  Позволяют нам анализировать использование сайта для улучшения его работы и удобства.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Функциональные cookie</h3>
                <p>
                  Запоминают ваши предпочтения (например, язык или регион) для персонализации контента.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Рекламные cookie</h3>
                <p>
                  Используются для показа релевантной рекламы и измерения эффективности рекламных кампаний.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">3. Управление cookie</h2>
            <p>
              Вы можете управлять или отключать cookie через настройки вашего браузера. Обратите внимание, что отключение 
              некоторых типов cookie может повлиять на работу сайта.
            </p>
            <div className="mt-4 space-y-2">
              <p><strong>Для популярных браузеров:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li><a href="#" className="text-purple-700 hover:underline">Google Chrome</a></li>
                <li><a href="#" className="text-purple-700 hover:underline">Mozilla Firefox</a></li>
                <li><a href="#" className="text-purple-700 hover:underline">Safari</a></li>
                <li><a href="#" className="text-purple-700 hover:underline">Microsoft Edge</a></li>
              </ul>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">4. Сторонние cookie</h2>
            <p>
              Некоторые cookie могут устанавливаться сторонними сервисами, которые встроены в наш сайт (например, аналитические 
              системы Google Analytics, социальные плагины). Мы не контролируем эти cookie и рекомендуем ознакомиться с 
              политиками конфиденциальности соответствующих сервисов.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">5. Изменения в политике</h2>
            <p>
              Мы можем время от времени обновлять эту политику. Все изменения будут опубликованы на этой странице, поэтому 
              рекомендуем периодически ее проверять.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">6. Контакты</h2>
            <p>
              Если у вас есть вопросы относительно нашей политики использования cookie, пожалуйста, свяжитесь с нами через 
              раздел <a href="/contact" className="text-purple-700 hover:underline">"Связаться с нами"</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyPage;