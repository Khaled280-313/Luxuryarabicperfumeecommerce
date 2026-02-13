import { RouterProvider } from 'react-router';
import { router } from './routes';
import { ShopProvider } from './context/ShopContext';

export default function App() {
  return (
    <ShopProvider>
      <RouterProvider router={router} />
    </ShopProvider>
  );
}
