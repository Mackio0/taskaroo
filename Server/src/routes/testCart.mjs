import { Router } from 'express';

const router = Router();

router.post('/api/cart', (req, res, next) => {
  if (!req.user) {
    return next(useErrorHandler(`Bad Credentials.`, 401));
  }

  const { body: item } = req;
  const { cart } = req.session;

  if (cart) {
    cart.push(item);
  } else {
    req.session.cart = [item];
  }
  return res.status(200).json(item);
});

router.get('/api/cart', (req, res, next) => {
  if (!req.user) {
    return next(useErrorHandler(`Bad Credentials.`, 401));
  }
  const { cart } = req.session;
  return res.status(200).json(cart ?? []);
});

// router.delete('/api/cart', (req, res, next) => {
//   if (!req.user) {
//     return next(useErrorHandler('Bad credentials', 401));
//   }

//   req.session.cart = [];
//   delete req.session.cart;
//   return res.status(200).json({ msg: 'Deleted' });
// });

export default router;