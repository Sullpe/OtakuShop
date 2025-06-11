import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQPage: React.FC = () => {
  const faqs = [
    {
      question: "Как оформить заказ?",
      answer: "Выберите товары, добавьте их в корзину, перейдите в корзину и нажмите 'Перейти к оформлению заказа'. Затем заполните данные доставки и оплаты."
    },
    {
      question: "Какие способы оплаты доступны?",
      answer: "Мы принимаем банковские карты Visa, Mastercard, МИР."
    },
    {
      question: "Сколько стоит доставка?",
      answer: "Доставка бесплатна при заказе от 60$. Для заказов на меньшую сумму стоимость доставки составляет $5.99."
    },
    {
      question: "Как отследить мой заказ?",
      answer: "После отправки заказа мы вышлем вам трек-номер для отслеживания на указанную электронную почту."
    },
    {
      question: "Как вернуть товар?",
      answer: "Вы можете вернуть товар в течение 14 дней после получения. Для этого свяжитесь с нашей службой поддержки по адресу info@otakushop.com."
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Часто задаваемые вопросы</h1>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium">{faq.question}</span>
                {activeIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-purple-700" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-purple-700" />
                )}
              </button>
              {activeIndex === index && (
                <div className="p-4 bg-white">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;