import React, { useContext, useState } from 'react';
import { addDoc, collection, doc, onSnapshot } from 'firebase/firestore';
import { Context } from '../..';
import { Button } from '@mui/material';
import n from './Subscribtion.module.css';

const SubscriptionPage: React.FC = () => {
  const { auth, firestore } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async () => {
    setLoading(true);
    setError(null);

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('You need to be logged in to subscribe.');
      }

      // Создаем ссылку на коллекцию `checkout_sessions`
      const checkoutSessionsRef = collection(
        firestore,
        'customers',
        currentUser.uid,
        'checkout_sessions'
      );

      // Добавляем документ в `checkout_sessions`
      const docRef = await addDoc(checkoutSessionsRef, {
        price: 'price_1QXmTlHU9dbafDXAvHbRHvpO',
        success_url: window.location.origin + '/chat',
        cancel_url: window.location.origin + '/subscription',
      });

      // Подписываемся на изменения в созданном документе
      const unsubscribe = onSnapshot(doc(firestore, docRef.path), (docSnap) => {
        const data = docSnap.data();
        if (data?.error) {
          setError(data.error.message);
          setLoading(false);
        } else if (data?.url) {
          window.location.assign(data.url); // Перенаправляем на Stripe Checkout
        }
      });

      return () => unsubscribe();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className={n.container}>
      <h2>Subscribe to Our Service</h2>
      <h3>Get access to exclusive features with a subscription plan.</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button onClick={handleSubscribe} variant={'outlined'} disabled={loading}>
        {loading ? 'Processing...' : 'Subscribe Now'}
      </Button>
    </div>
  );
};

export default SubscriptionPage;
