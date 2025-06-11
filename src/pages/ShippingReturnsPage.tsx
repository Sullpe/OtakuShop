import React from 'react';

const ShippingReturnsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Доставка и возврат</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Условия доставки</h2>
            <div className="space-y-4">
              <p>
                <strong>Сроки доставки:</strong> 2-5 рабочих дней в зависимости от региона.
              </p>
              <p>
                <strong>Стоимость доставки:</strong> Бесплатно при заказе от 60$. Для заказов на меньшую сумму - $5.99.
              </p>
              <p>
                <strong>Способы доставки:</strong> Курьерская доставка, почта России.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Возврат товара</h2>
            <div className="space-y-4">
              <p>
                Вы можете вернуть товар в течение 14 дней с момента получения.
              </p>
              <p>
                <strong>Условия возврата:</strong> Товар должен не допускать наличия следов использования, помятостей или повреждения.
              </p>
              <p>
                <strong>Процесс возврата:</strong> Свяжитесь с нашей службой поддержки для получения инструкций по возврату.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Обмен товара</h2>
            <p>
              Мы осуществляем обмен манги в случае, если товар оказался дефектным, поврежденным или не соответствует заказу. Срок обмена - 7 дней с момента получения.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShippingReturnsPage;